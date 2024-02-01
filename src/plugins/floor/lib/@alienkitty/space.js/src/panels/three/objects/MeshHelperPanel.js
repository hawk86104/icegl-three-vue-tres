/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../../ui/three/Point3D.js';
import { Panel } from '../../Panel.js';
import { PanelItem } from '../../PanelItem.js';
import { NormalsHelperOptions, TangentsHelperOptions, UVHelperOptions } from '../Options.js';

import { getKeyByValue } from '../../../utils/Utils.js';

export class MeshHelperPanel extends Panel {
    constructor(mesh) {
        super();

        this.mesh = mesh;

        this.initPanel();
    }

    initPanel() {
        const mesh = this.mesh;
        const point = Point3D.getPoint(mesh);

        // Defaults
        if (!mesh.userData.normals) {
            mesh.userData.normals = false;
        }

        if (!mesh.userData.tangents) {
            mesh.userData.tangents = false;
        }

        if (!mesh.userData.uv) {
            mesh.userData.uv = false;
        }

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: NormalsHelperOptions,
                value: getKeyByValue(NormalsHelperOptions, mesh.userData.normals),
                callback: value => {
                    mesh.userData.normals = NormalsHelperOptions[value];
                    point.toggleNormalsHelper(mesh.userData.normals);
                }
            }
        ];

        if (mesh.geometry.index) {
            items.push(
                {
                    type: 'list',
                    list: TangentsHelperOptions,
                    value: getKeyByValue(TangentsHelperOptions, mesh.userData.tangents),
                    callback: value => {
                        mesh.userData.tangents = TangentsHelperOptions[value];
                        point.toggleTangentsHelper(mesh.userData.tangents);
                    }
                }
            );
        }

        if (Point3D.uvHelper) {
            items.push(
                {
                    type: 'list',
                    list: UVHelperOptions,
                    value: getKeyByValue(UVHelperOptions, mesh.userData.uv),
                    callback: value => {
                        mesh.userData.uv = UVHelperOptions[value];
                        point.toggleUVHelper(mesh.userData.uv);
                    }
                }
                // TODO: Texture thumbnails
            );
        }

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
