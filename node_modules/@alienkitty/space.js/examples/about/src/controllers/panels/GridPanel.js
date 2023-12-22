import { Panel, PanelItem, getKeyByValue } from '@alienkitty/space.js/three';

export class GridPanel extends Panel {
    constructor(helper) {
        super();

        this.helper = helper;

        this.initPanel();
    }

    initPanel() {
        const helper = this.helper;

        const gridOptions = {
            Off: false,
            On: true
        };

        const items = [
            {
                type: 'divider'
            },
            {
                type: 'list',
                list: gridOptions,
                value: getKeyByValue(gridOptions, helper.visible),
                callback: value => {
                    helper.visible = gridOptions[value];
                }
            }
        ];

        items.forEach(data => {
            this.add(new PanelItem(data));
        });
    }
}
