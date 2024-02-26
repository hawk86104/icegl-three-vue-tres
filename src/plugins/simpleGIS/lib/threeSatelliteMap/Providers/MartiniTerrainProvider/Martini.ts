// https://github.com/mapbox/martini
export class Martini {
    gridSize: number;
    numTriangles: number;
    numParentTriangles: number;
    indices: Uint32Array;
    coords: Uint16Array;

    constructor(gridSize = 257) {
        this.gridSize = gridSize;
        const tileSize = gridSize - 1;
        if (tileSize & (tileSize - 1)) throw new Error(
            `Expected grid size to be 2^n+1, got ${gridSize}.`);

        this.numTriangles = tileSize * tileSize * 2 - 2;
        this.numParentTriangles = this.numTriangles - tileSize * tileSize;

        this.indices = new Uint32Array(this.gridSize * this.gridSize);

        // coordinates for all possible triangles in an RTIN tile
        // 为锡瓦上的所有可能的三角形坐标
        this.coords = new Uint16Array(this.numTriangles * 4);

        // get triangle coordinates from its index in an implicit binary tree
        // 从隐式二叉树的索引中获取三角形坐标
        for (let i = 0; i < this.numTriangles; i++) {
            let id = i + 2;
            let ax = 0, ay = 0, bx = 0, by = 0, cx = 0, cy = 0;
            if (id & 1) {
                bx = by = cx = tileSize; // bottom-left triangle
            } else {
                ax = ay = cy = tileSize; // top-right triangle
            }
            while ((id >>= 1) > 1) {
                const mx = (ax + bx) >> 1;
                const my = (ay + by) >> 1;

                if (id & 1) { // left half
                    bx = ax; by = ay;
                    ax = cx; ay = cy;
                } else { // right half
                    ax = bx; ay = by;
                    bx = cx; by = cy;
                }
                cx = mx; cy = my;
            }
            const k = i * 4;
            this.coords[k + 0] = ax;
            this.coords[k + 1] = ay;
            this.coords[k + 2] = bx;
            this.coords[k + 3] = by;
        }
    }

    createTile(terrain: Float32Array) {
        return new MartiniTile(terrain, this);
    }
}

export class MartiniTile {
    terrain: Float32Array;
    martini: Martini;
    errors: Float32Array;

    constructor(terrain: Float32Array, martini: Martini) {
        const size = martini.gridSize;
        if (terrain.length !== size * size) throw new Error(
            `Expected terrain data of length ${size * size} (${size} x ${size}), got ${terrain.length}.`);

        this.terrain = terrain;
        this.martini = martini;
        this.errors = new Float32Array(terrain.length);
        this.update();
    }

    update() {
        const { numTriangles, numParentTriangles, coords, gridSize: size } = this.martini;
        const { terrain, errors } = this;

        // iterate over all possible triangles, starting from the smallest level
        // 从最小级别开始迭代所有可能的三角形
        for (let i = numTriangles - 1; i >= 0; i--) {
            const k = i * 4;
            const ax = coords[k + 0];
            const ay = coords[k + 1];
            const bx = coords[k + 2];
            const by = coords[k + 3];
            const mx = (ax + bx) >> 1;
            const my = (ay + by) >> 1;
            const cx = mx + my - ay;
            const cy = my + ax - mx;

            // calculate error in the middle of the long edge of the triangle
            // 计算三角形长边的中间的误差
            const interpolatedHeight = (terrain[ay * size + ax] + terrain[by * size + bx]) / 2;
            const middleIndex = my * size + mx;
            const middleError = Math.abs(interpolatedHeight - terrain[middleIndex]);

            errors[middleIndex] = Math.max(errors[middleIndex], middleError);

            if (i < numParentTriangles) { // bigger triangles; accumulate error with children 较大的三角形;用孩子累积错误
                const leftChildIndex = ((ay + cy) >> 1) * size + ((ax + cx) >> 1);
                const rightChildIndex = ((by + cy) >> 1) * size + ((bx + cx) >> 1);
                errors[middleIndex] = Math.max(errors[middleIndex], errors[leftChildIndex], errors[rightChildIndex]);
            }
        }
    }

    getMesh(maxError = 0) {
        const { gridSize: size, indices } = this.martini;
        const { errors } = this;
        let numVertices = 0;
        let numTriangles = 0;
        const max = size - 1;

        // use an index grid to keep track of vertices that were already used to avoid duplication
        // 使用索引网格来跟踪已用于避免重复的顶点
        indices.fill(0);

        // retrieve mesh in two stages that both traverse the error map:
        // 在两个阶段检索网格，两阶段都遍历错误映射：
        // - countElements: find used vertices (and assign each an index), and count triangles (for minimum allocation)
        // - countElements: 查找使用的顶点（并分配每个索引），并计算三角形（用于最小分配）
        // - processTriangle: fill the allocated vertices & triangles typed arrays
        // - processTriangle: 填充分配的顶点和三角形类型阵列

        function countElements(ax: number, ay: number, bx: number, by: number, cx: number, cy: number) {
            const mx = (ax + bx) >> 1;
            const my = (ay + by) >> 1;

            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
                countElements(cx, cy, ax, ay, mx, my);
                countElements(bx, by, cx, cy, mx, my);
            } else {
                indices[ay * size + ax] = indices[ay * size + ax] || ++numVertices;
                indices[by * size + bx] = indices[by * size + bx] || ++numVertices;
                indices[cy * size + cx] = indices[cy * size + cx] || ++numVertices;
                numTriangles++;
            }
        }
        countElements(0, 0, max, max, max, 0);
        countElements(max, max, 0, 0, 0, max);

        const vertices = new Uint16Array(numVertices * 2);
        const triangles = new Uint32Array(numTriangles * 3);
        let triIndex = 0;

        function processTriangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number) {
            const mx = (ax + bx) >> 1;
            const my = (ay + by) >> 1;

            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
                // triangle doesn't approximate the surface well enough; drill down further
                processTriangle(cx, cy, ax, ay, mx, my);
                processTriangle(bx, by, cx, cy, mx, my);

            } else {
                // add a triangle
                const a = indices[ay * size + ax] - 1;
                const b = indices[by * size + bx] - 1;
                const c = indices[cy * size + cx] - 1;

                vertices[2 * a] = ax;
                vertices[2 * a + 1] = ay;

                vertices[2 * b] = bx;
                vertices[2 * b + 1] = by;

                vertices[2 * c] = cx;
                vertices[2 * c + 1] = cy;

                triangles[triIndex++] = a;
                triangles[triIndex++] = b;
                triangles[triIndex++] = c;
            }
        }
        processTriangle(0, 0, max, max, max, 0);
        processTriangle(max, max, 0, 0, 0, max);

        return { vertices, triangles };
    }

    // https://github.com/mapbox/martini/pull/12/commits/4677d0c5cfe446ccc96d3982ff4f442cddba5063
    getMeshWithSkirts(maxError = 0) {
        const { gridSize: size, indices } = this.martini;
        const { errors } = this;
        let numVertices = 0;
        let numTriangles = 0;
        const max = size - 1;
        let aIndex, bIndex, cIndex = 0;
        // Skirt indices
        let leftSkirtIndices: number[] = [];
        let rightSkirtIndices: number[] = [];
        let bottomSkirtIndices: number[] = [];
        let topSkirtIndices: number[] = [];
        // use an index grid to keep track of vertices that were already used to avoid duplication
        indices.fill(0);

        // retrieve mesh in two stages that both traverse the error map:
        // - countElements: find used vertices (and assign each an index), and count triangles (for minimum allocation)
        // - processTriangle: fill the allocated vertices & triangles typed arrays
        function countElements(ax: number, ay: number, bx: number, by: number, cx: number, cy: number) {
            const mx = (ax + bx) >> 1;
            const my = (ay + by) >> 1;

            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
                countElements(cx, cy, ax, ay, mx, my);
                countElements(bx, by, cx, cy, mx, my);
            } else {
                aIndex = ay * size + ax;
                bIndex = by * size + bx;
                cIndex = cy * size + cx;

                if (indices[aIndex] === 0) {
                    if (ax === 0)
                        leftSkirtIndices.push(numVertices);
                    else if (ax === max) {
                        rightSkirtIndices.push(numVertices);
                    }
                    if (ay === 0)
                        bottomSkirtIndices.push(numVertices);
                    else if (ay === max)
                        topSkirtIndices.push(numVertices);
                    indices[aIndex] = ++numVertices;
                }
                if (indices[bIndex] === 0) {
                    if (bx === 0)
                        leftSkirtIndices.push(numVertices);
                    else if (bx === max)
                        rightSkirtIndices.push(numVertices);
                    if (by === 0)
                        bottomSkirtIndices.push(numVertices);
                    else if (by === max)
                        topSkirtIndices.push(numVertices);
                    indices[bIndex] = ++numVertices;
                }
                if (indices[cIndex] === 0) {
                    if (cx === 0)
                        leftSkirtIndices.push(numVertices);
                    else if (cx === max)
                        rightSkirtIndices.push(numVertices);
                    if (cy === 0)
                        bottomSkirtIndices.push(numVertices);
                    else if (cy === max)
                        topSkirtIndices.push(numVertices);
                    indices[cIndex] = ++numVertices;

                }
                numTriangles++;
            }
        }
        countElements(0, 0, max, max, max, 0);
        countElements(max, max, 0, 0, 0, max);

        const numTotalVertices = (
            numVertices
            + leftSkirtIndices.length
            + rightSkirtIndices.length
            + bottomSkirtIndices.length
            + topSkirtIndices.length) * 2;
        const numTotalTriangles = (
            numTriangles
            + ((leftSkirtIndices.length - 1) * 2)
            + ((rightSkirtIndices.length - 1) * 2)
            + ((bottomSkirtIndices.length - 1) * 2)
            + ((topSkirtIndices.length - 1) * 2)) * 3;

        const vertices = new Uint16Array(numTotalVertices);
        const triangles = new Uint32Array(numTotalTriangles);

        let triIndex = 0;
        function processTriangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number) {
            const mx = (ax + bx) >> 1;
            const my = (ay + by) >> 1;

            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
                // triangle doesn't approximate the surface well enough; drill down further
                processTriangle(cx, cy, ax, ay, mx, my);
                processTriangle(bx, by, cx, cy, mx, my);

            } else {
                // add a triangle
                const a = indices[ay * size + ax] - 1;
                const b = indices[by * size + bx] - 1;
                const c = indices[cy * size + cx] - 1;

                vertices[2 * a] = ax;
                vertices[2 * a + 1] = ay;

                vertices[2 * b] = bx;
                vertices[2 * b + 1] = by;

                vertices[2 * c] = cx;
                vertices[2 * c + 1] = cy;
                triangles[triIndex++] = a;
                triangles[triIndex++] = b;
                triangles[triIndex++] = c;
            }
        }
        processTriangle(0, 0, max, max, max, 0);
        processTriangle(max, max, 0, 0, 0, max);

        // Sort skirt indices to create adjacent triangles
        leftSkirtIndices.sort((a, b) => {
            return vertices[2 * a + 1] - vertices[2 * b + 1];
        });

        rightSkirtIndices.sort((a, b) => {
            // Reverse (b - a) to match triangle winding
            return vertices[2 * b + 1] - vertices[2 * a + 1];
        });

        bottomSkirtIndices.sort((a, b) => {
            return vertices[2 * b] - vertices[2 * a];
        });

        topSkirtIndices.sort((a, b) => {
            // Reverse (b - a) to match triangle winding
            return vertices[2 * a] - vertices[2 * b];
        });

        let skirtIndex = numVertices * 2;
        let currIndex, nextIndex, currentSkirt, nextSkirt, skirtLength = 0;

        // Add skirt vertices from index of last mesh vertex
        function constructSkirt(skirt: number[]) {
            skirtLength = skirt.length;
            // Loop through indices in groups of two to generate triangles
            for (var i = 0; i < skirtLength - 1; i++) {
                currIndex = skirt[i];
                nextIndex = skirt[i + 1];
                currentSkirt = skirtIndex / 2;
                nextSkirt = (skirtIndex + 2) / 2;
                vertices[skirtIndex++] = vertices[2 * currIndex];
                vertices[skirtIndex++] = vertices[2 * currIndex + 1];

                triangles[triIndex++] = currIndex;
                triangles[triIndex++] = currentSkirt;
                triangles[triIndex++] = nextIndex;

                triangles[triIndex++] = currentSkirt;
                triangles[triIndex++] = nextSkirt;
                triangles[triIndex++] = nextIndex;
            }
            // Add vertices of last skirt not added above (i < skirtLength - 1)
            vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1]];
            vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1] + 1];
        }

        constructSkirt(leftSkirtIndices);
        constructSkirt(rightSkirtIndices);
        constructSkirt(bottomSkirtIndices);
        constructSkirt(topSkirtIndices);

        // Return vertices and triangles and index into vertices array where skirts start
        return { vertices, triangles, numVerticesWithoutSkirts: numVertices };
    }
}