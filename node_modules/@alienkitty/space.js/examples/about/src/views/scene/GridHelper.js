import { BufferGeometry, Color, Float32BufferAttribute, LineBasicMaterial, LineSegments } from 'three';

export class GridHelper extends LineSegments {
    constructor(size = 10, divisions = 10, color = 0x888888) {
        color = new Color(color);

        const step = size / divisions;
        const halfSize = size / 2;

        const vertices = [];
        const colors = [];

        for (let i = 0, j = 0, k = -halfSize; i <= divisions + 1; i++, k += step) {
            for (let l = -halfSize; l <= divisions + 1 - halfSize; l++) {
                vertices.push(-0.5625 + l, 0, k - 0.5, -0.4375 + l, 0, k - 0.5);
                vertices.push(-0.5 + l, 0, k - 0.5625, -0.5 + l, 0, k - 0.4375);

                color.toArray(colors, j); j += 3;
                color.toArray(colors, j); j += 3;
                color.toArray(colors, j); j += 3;
                color.toArray(colors, j); j += 3;
            }
        }

        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

        const material = new LineBasicMaterial({ vertexColors: true, toneMapped: false });

        super(geometry, material);
    }
}
