/**
 * @author pschroen / https://ufo.ai/
 */

import { Group, MathUtils, Quaternion, Vector3 } from 'three';

import { WebAudio } from '../WebAudio.js';
import { WebAudioParam } from '../WebAudioParam.js';

export class Sound3D extends Group {
    constructor(camera, id, buffer) {
        super();

        if (typeof id !== 'string') {
            buffer = id;
            id = camera;
            camera = null;
        }

        this.context = WebAudio.context;

        if (camera) {
            this.camera = camera;
            this.cameraWorldPosition = new Vector3();
            this.worldPosition = new Vector3();

            this.audioDistance = 0;
            this.audioNearDistance = camera.near;
            this.audioFarDistance = camera.far;

            this.output = this.context.createGain();
            this.output.connect(WebAudio.input);

            this.gain = new WebAudioParam(this, 'output', 'gain', 0);

            this.screenSpacePosition = new Vector3();

            this.stereo = this.context.createStereoPanner();
            this.stereo.connect(this.output);

            this.stereoPan = new WebAudioParam(this, 'stereo', 'pan', 0);

            this.input = this.output;
        } else {
            this.worldPosition = new Vector3();
            this.worldQuaternion = new Quaternion();
            this.worldScale = new Vector3();
            this.worldOrientation = new Vector3();

            this.panner = this.context.createPanner();
            this.panner.panningModel = 'HRTF';
            this.panner.connect(WebAudio.input);

            this.audioPositionX = new WebAudioParam(this, 'panner', 'positionX', 0);
            this.audioPositionY = new WebAudioParam(this, 'panner', 'positionY', 0);
            this.audioPositionZ = new WebAudioParam(this, 'panner', 'positionZ', 0);
            this.audioOrientationX = new WebAudioParam(this, 'panner', 'orientationX', 0);
            this.audioOrientationY = new WebAudioParam(this, 'panner', 'orientationY', 0);
            this.audioOrientationZ = new WebAudioParam(this, 'panner', 'orientationZ', 1);

            this.output = this.panner;
            this.input = this.output;
        }

        if (buffer) {
            this.sound = WebAudio.add(this, id, buffer, true);
        } else {
            this.sound = WebAudio.clone(this, id, MathUtils.generateUUID(), true);
        }
    }

    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);

        if (isNaN(this.matrixWorld.elements[0])) {
            return;
        }

        if (this.camera) {
            this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld);
            this.worldPosition.setFromMatrixPosition(this.matrixWorld);

            this.gain.value = MathUtils.clamp(MathUtils.mapLinear(this.cameraWorldPosition.distanceTo(this.worldPosition) + this.audioDistance, this.audioNearDistance, this.audioFarDistance, 1, 0), 0, 1);

            this.screenSpacePosition.copy(this.worldPosition).project(this.camera);

            this.stereoPan.value = MathUtils.clamp(this.screenSpacePosition.x, -1, 1);
        } else {
            this.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale);
            this.worldOrientation.set(0, 0, 1).applyQuaternion(this.worldQuaternion);

            this.audioPositionX.value = this.worldPosition.x;
            this.audioPositionY.value = this.worldPosition.y;
            this.audioPositionZ.value = this.worldPosition.z;
            this.audioOrientationX.value = this.worldOrientation.x;
            this.audioOrientationY.value = this.worldOrientation.y;
            this.audioOrientationZ.value = this.worldOrientation.z;
        }
    }

    destroy() {
        WebAudio.remove(this.sound.id);
    }
}
