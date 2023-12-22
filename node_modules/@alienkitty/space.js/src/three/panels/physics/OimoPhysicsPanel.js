/**
 * @author pschroen / https://ufo.ai/
 */

import { Point3D } from '../../ui/Point3D.js';
import { Panel } from '../../../panels/Panel.js';
import { PanelItem } from '../../../panels/PanelItem.js';

export class OimoPhysicsPanel extends Panel {
    constructor(mesh) {
        super();

        this.mesh = mesh;

        this.initPanel();
    }

    initPanel() {
        let object = this.mesh;

        if (object.parent && object.parent.isGroup) {
            object = object.parent;
        }

        const { physics } = Point3D;

        const angularVelocity = physics.getAngularVelocity(object);

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'slider',
                label: 'Gravity',
                min: -1,
                max: 1,
                step: 0.01,
                value: physics.getGravityScale(object),
                callback: value => {
                    physics.setGravityScale(object, value);
                }
            },
            {
                type: 'slider',
                label: 'Rotate X',
                min: 0,
                max: 16,
                step: 1,
                value: angularVelocity.x,
                callback: value => {
                    angularVelocity.setX(value);
                    physics.setAngularVelocity(object, angularVelocity);
                }
            },
            {
                type: 'slider',
                label: 'Rotate Y',
                min: 0,
                max: 16,
                step: 1,
                value: angularVelocity.y,
                callback: value => {
                    angularVelocity.setY(value);
                    physics.setAngularVelocity(object, angularVelocity);
                }
            },
            {
                type: 'slider',
                label: 'Rotate Z',
                min: 0,
                max: 16,
                step: 1,
                value: angularVelocity.z,
                callback: value => {
                    angularVelocity.setZ(value);
                    physics.setAngularVelocity(object, angularVelocity);
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
