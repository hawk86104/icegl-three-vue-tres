import * as THREE from 'three'
import Experience from '../Experience.js'
import cubeVertexShader from '../Shaders/Cube/vertex.glsl'
import cubeFragmentShader from '../Shaders/Cube/fragment.glsl'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import gsap from "gsap";

import { BufferGeometry, MathUtils } from "three";
import { uniform, skinning, PointsNodeMaterial } from 'three/nodes';

import simVertex from '../Shaders/Particles/simulation.vert';
import simFragment from '../Shaders/Particles/simulation.frag';
import particlesVertex from '../Shaders/Particles/particles.vert';
import particlesFragment from '../Shaders/Particles/particles.frag';

import horseParticlesVertex from '../Shaders/Particles/horseParticles.vert';
import horseParticlesFragment from '../Shaders/Particles/horseParticles.frag';

import FBO from "../Utils/FBO.js";

export default class Page {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.timeline = this.experience.timeline;
        this.isMobile = this.experience.isMobile
        this.cursor = this.experience.cursor

        this.sectionCount = document.querySelectorAll('.section').length - 1
        this.range = 1.0 / parseFloat(this.sectionCount)
        this.objectDistance = 100000;
        this.scrollY = window.scrollY
        this.normalizedScrollY = this.scrollY / (document.body.offsetHeight - window.innerHeight);
        this.currentSection = 0


        this.smoothScroll = document.querySelector('.smooth');
        this.scrollTarget = 0
        this.normalizedTargetScrollY = 0

        document.getElementById('fake-scroll').addEventListener('scroll', (e) => {
            this.scroll()
        });

        document.getElementById('fake-scroll').addEventListener('wheel', (e) => {
            this.scrollDeltaY = e.deltaY
        });

        this.setFBOParticles()
    }

    makeTexture (g) {

        let vertAmount = g.attributes.position.count;
        let texWidth = Math.ceil(Math.sqrt(vertAmount));
        let texHeight = Math.ceil(vertAmount / texWidth);

        let data = new Float32Array(texWidth * texHeight * 4);

        function shuffleArrayByThree (array) {
            const groupLength = 3;

            let numGroups = Math.floor(array.length / groupLength);

            for (let i = numGroups - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                for (let k = 0; k < groupLength; k++) {
                    let temp = array[i * groupLength + k];
                    array[i * groupLength + k] = array[j * groupLength + k];
                    array[j * groupLength + k] = temp;
                }
            }

            return array;
        }


        shuffleArrayByThree(g.attributes.position.array);

        for (let i = 0; i < vertAmount; i++) {
            //let f = Math.floor(Math.random() * (randomTemp.length / 3) );

            const x = g.attributes.position.array[i * 3 + 0];
            const y = g.attributes.position.array[i * 3 + 1];
            const z = g.attributes.position.array[i * 3 + 2];
            const w = 0

            //randomTemp.splice(f * 3, 3);

            data[i * 4 + 0] = x;
            data[i * 4 + 1] = y;
            data[i * 4 + 2] = z;
            data[i * 4 + 3] = w;
        }

        let dataTexture = new THREE.DataTexture(data, texWidth, texHeight, THREE.RGBAFormat, THREE.FloatType);
        dataTexture.needsUpdate = true;

        return dataTexture;
    }

    setFBOParticles () {
        // width and height of FBO
        const width = 256;
        const height = 256;

        function parseMesh (g) {
            var vertices = g.vertices;
            var total = vertices.length;
            var size = parseInt(Math.sqrt(total * 4) + .5);
            var data = new Float32Array(size * size * 4);
            for (var i = 0; i < total; i++) {
                data[i * 3] = vertices[i].x;
                data[i * 3 + 1] = vertices[i].y;
                data[i * 3 + 2] = vertices[i].z;
            }
            return data;
        }

        //returns an array of random 3D coordinates
        function getRandomData (width, height, size) {
            var len = width * height * 4;
            var data = new Float32Array(len);
            //while( len-- )data[len] = ( Math.random() -.5 ) * size ;
            for (let i = 0; i < len; i++) {
                data[i * 3 + 0] = (Math.random() - 0.5) * size
                data[i * 3 + 1] = (Math.random() - 0.5) * size
                data[i * 3 + 2] = (Math.random() - 0.5) * size
            }

            return data;
        }

        this.boyGeometry = this.resources.items.boyModel.scene.children[0].geometry
        this.boyGeometry.scale(2.2, 2.2, 2.2)
        this.boyGeometry.translate(-1, -2.5, 0)
        this.boyGeometry.rotateY(-Math.PI / 2)
        this.boyGeometry.rotateZ(Math.PI / 3)

        this.e2Geometry = this.resources.items.e2Model.scene.children[0].geometry;
        this.e2Geometry.scale(4, 4, 4)
        this.e2Geometry.rotateY(-Math.PI / 6)


        // this.horseGeometry = this.resources.items.horseModel.scene.children[0].geometry.clone()
        // this.horseGeometry.scale(0.01, 0.01, 0.01)




        //populate a Float32Array of random positions
        //var data = getRandomData( width, height, 256 );

        this.oniGeometry = this.resources.items.oniModel.scene.children[0].geometry;
        this.oniGeometry.scale(0.3, 0.3, 0.3)
        this.oniGeometry.translate(0, -7, 0)


        //convertes it to a FloatTexture
        //var positions = new THREE.DataTexture( data, width, height, THREE.RGBAFormat, THREE.FloatType );
        //positions.needsUpdate = true;


        this.treeGeometry = this.resources.items.treeModel.scene.children[1].geometry
        this.treeGeometry.scale(0.007, 0.007, 0.007)
        this.treeGeometry.translate(0, -1, 0)


        var uTextureA = this.makeTexture(this.boyGeometry);

        var data = getRandomData(width, height, 30);
        var positions = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
        positions.needsUpdate = true;
        // var uTextureA = positions;
        var uTextureB = this.makeTexture(this.oniGeometry);
        var uTextureC = this.makeTexture(this.e2Geometry);
        var uTextureD = positions;
        var uTextureE = this.makeTexture(this.treeGeometry);

        //simulation shader used to update the particles' positions
        this.simMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTextureA: { type: "t", value: uTextureA },
                uTextureB: { type: "t", value: uTextureB },
                uTextureC: { type: "t", value: uTextureC },
                uTextureD: { type: "t", value: uTextureD },
                uTextureE: { type: "t", value: uTextureE },
                uTime: { value: 0 },
                uScroll: { value: this.normalizedScrollY },
                uTreePos: { value: new THREE.Vector3() },
            },
            defines:
            {
                uTotalModels: parseFloat(this.sectionCount).toFixed(2),
            },
            vertexShader: simVertex,
            fragmentShader: simFragment
        });

        //render shader to display the particles on screen
        //the 'positions' uniform will be set after the FBO.update() call
        this.renderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uPositions: { value: null },
                uSize: { value: 12 },
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uScroll: { value: this.normalizedScrollY },
            },
            defines:
            {
                uTotalModels: parseFloat(this.sectionCount).toFixed(2),
                uRange: this.range,
            },
            vertexShader: particlesVertex,
            fragmentShader: particlesFragment,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        // Initialize the FBO
        this.fbo = new FBO(width, height, this.renderer, this.simMaterial, this.renderMaterial);

        // Add the particles to the scene
        this.scene.add(this.fbo.particles);


        this.resource = this.resources.items.horseModel
        this.horseMesh = this.resources.items.horseModel.scene

        this.horseMesh.scale.set(0.01, 0.01, 0.01)

        const pointsMaterial = new THREE.PointsMaterial({
            size: 4,
            sizeAttenuation: false,
        });

        this.horsePointsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uPositions: { value: null },
                uSize: { value: 2 },
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uScroll: { value: this.normalizedScrollY },
            },
            defines:
            {
                uTotalModels: parseFloat(this.sectionCount).toFixed(2),
                uRange: this.range,
            },
            vertexShader: horseParticlesVertex,
            fragmentShader: horseParticlesFragment,
            transparent: true,
            depthWrite: false,
            //type: 'PointsMaterial',
            //blending: THREE.AdditiveBlending
        });


        this.fg = this.horseMesh.children[0].geometry

        this.aE2Geometry = new Float32Array(this.fg.attributes.position.array.length);

        for (let i = 0; i < this.fg.attributes.position.array.length; i++) {
            this.aE2Geometry[i + 0] = this.e2Geometry.attributes.position.array[i + 0];
            this.aE2Geometry[i + 1] = this.e2Geometry.attributes.position.array[i + 1];
            this.aE2Geometry[i + 2] = this.e2Geometry.attributes.position.array[i + 2];
        }

        this.fg.setAttribute('aE2Geometry', new THREE.BufferAttribute(this.aE2Geometry, `3`));


        const points = new THREE.Points(this.fg, this.horsePointsMaterial);
        points.morphTargetInfluences = this.horseMesh.children[0].morphTargetInfluences;
        points.morphTargetDictionary = this.horseMesh.children[0].morphTargetDictionary;

        //points.scale.set(1, 1, 1)
        //points.rotateY(Math.PI / 2)

        this.horseMesh.rotateY(Math.PI / 2)

        this.setAnimation()

        // this.scene.add(this.horseMesh)
        this.scene.add(points)

        this.treeMesh = this.resources.items.treeModel.scene
        this.treeMesh.children[1].material.visible = false
        this.treeMesh.scale.set(0.007, 0.007, 0.007)
        this.treeMesh.position.set(0, this.objectDistance, 0)

        this.scene.add(this.treeMesh)

    }

    resize () {
        this.fbo.resize(this.sizes.width, this.sizes.height);
        this.renderMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
        this.horsePointsMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }

    scroll () {
        this.scrollY = document.getElementById('fake-scroll').scrollTop

        //next center section
        if (!this.isMobile) {
            this.centerPrevSection = (Math.floor(this.scrollY / window.innerHeight)) * window.innerHeight
            this.centerNextSection = (Math.floor(this.scrollY / window.innerHeight) + 1) * window.innerHeight

            if (this.scrollY + 100 > this.centerNextSection) {
                this.scrollY = this.centerNextSection
            }

            if (this.scrollY - 100 < this.centerPrevSection) {
                this.scrollY = this.centerPrevSection
            }
        }

        this.normalizedScrollY = this.scrollY / (this.sectionCount * window.innerHeight);
        this.normalizedScrollY = Math.min(this.normalizedScrollY, 1.0)
    }

    scrollSet () {
        const lambda = this.isMobile ? 9 : 3
        this.normalizedTargetScrollY = MathUtils.damp(this.normalizedTargetScrollY, this.normalizedScrollY, lambda, this.time.delta);
        this.objectDistance = this.normalizedTargetScrollY / this.range

        this.simMaterial.uniforms.uScroll.value = this.normalizedTargetScrollY
        this.horsePointsMaterial.uniforms.uScroll.value = this.normalizedTargetScrollY
        this.renderMaterial.uniforms.uScroll.value = this.normalizedTargetScrollY

        this.scrollTarget = MathUtils.damp(this.scrollTarget, this.scrollY, lambda, this.time.delta);

        const newSection = Math.round(this.scrollTarget / this.sizes.height)

        if (newSection !== this.currentSection) {
            this.currentSection = newSection
        }


        this.smoothScroll.style.webkitTransform = 'translate3d(0px, -' + this.scrollTarget + 'px, 0px)';
        this.smoothScroll.style.mozTransform = 'translate3d(0px, -' + this.scrollTarget + 'px, 0px)';
        this.smoothScroll.style.transform = 'translate3d(0px, -' + this.scrollTarget + 'px, 0px)';
    }

    setAnimation () {
        this.animation = {}

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.horseMesh)

        // Actions
        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.open = this.animation.mixer.clipAction(this.resource.animations[0])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }
    }

    setDebug () {
        // Debug
        if (this.debug.active) {
            // this.debugFolder = this.debug.gui.addFolder('Cube')
            // this.debugFolder.open()
        }
    }

    update () {
        if (this.animation)
            this.animation.mixer.update(this.time.delta)

        this.simMaterial.uniforms.uTime.value = this.time.elapsed
        this.renderMaterial.uniforms.uTime.value = this.time.elapsed
        this.horsePointsMaterial.uniforms.uTime.value = this.time.elapsed

        //this.fbo.particles.rotateY(this.time.delta * 0.1)

        this.scrollSet()

        this.fbo.update();

        const speed = 2;
        const section = this.sectionCount * 2;
        const displacement = -1;
        this.treeMesh.position.y = (displacement - section * 4) + this.objectDistance * this.sectionCount * speed
        this.simMaterial.uniforms.uTreePos.value = this.treeMesh.position

        this.treeMesh.rotateY(-this.time.delta * 0.1)

        this.camera.position.x += (this.cursor.x * 0.5 - this.camera.position.x) * 5 * this.time.delta
        this.camera.position.y += (- this.cursor.y * 0.5 - this.camera.position.y) * 5 * this.time.delta
    }
}
