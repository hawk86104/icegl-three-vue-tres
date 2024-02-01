/**
 * @author pschroen / https://ufo.ai/
 */

import { Group, Quaternion, Vector3 } from 'three';

import { WebAudio } from '../WebAudio.js';
import { WebAudioParam } from '../WebAudioParam.js';

export class WebAudio3D extends Group {
    constructor() {
        super();

        this.context = WebAudio.context;

        this.worldPosition = new Vector3();
        this.worldQuaternion = new Quaternion();
        this.worldScale = new Vector3();
        this.worldOrientation = new Vector3();

        this.listener = this.context.listener;

        this.audioPositionX = new WebAudioParam(this, 'listener', 'positionX', 0);
        this.audioPositionY = new WebAudioParam(this, 'listener', 'positionY', 0);
        this.audioPositionZ = new WebAudioParam(this, 'listener', 'positionZ', 0);
        this.audioForwardX = new WebAudioParam(this, 'listener', 'forwardX', 0);
        this.audioForwardY = new WebAudioParam(this, 'listener', 'forwardY', 0);
        this.audioForwardZ = new WebAudioParam(this, 'listener', 'forwardZ', -1);
        this.audioUpX = new WebAudioParam(this, 'listener', 'upX', 0);
        this.audioUpY = new WebAudioParam(this, 'listener', 'upY', 1);
        this.audioUpZ = new WebAudioParam(this, 'listener', 'upZ', 0);
    }

    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);

        this.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale);
        this.worldOrientation.set(0, 0, -1).applyQuaternion(this.worldQuaternion);

        this.audioPositionX.value = this.worldPosition.x;
        this.audioPositionY.value = this.worldPosition.y;
        this.audioPositionZ.value = this.worldPosition.z;
        this.audioForwardX.value = this.worldOrientation.x;
        this.audioForwardY.value = this.worldOrientation.y;
        this.audioForwardZ.value = this.worldOrientation.z;
        this.audioUpX.value = this.up.x;
        this.audioUpY.value = this.up.y;
        this.audioUpZ.value = this.up.z;
    }
}
