# Space.js

[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]
[![DeepScan][deepscan]][deepscan-url]
[![Discord][discord]][discord-url]

This library is part of two sibling libraries, [Space.js](https://github.com/alienkitty/space.js) for UI, Panel components, Tween, Web Audio, loaders, utilities, and [Alien.js](https://github.com/alienkitty/alien.js) for 3D utilities, materials, shaders and physics.

<p>
    <img src="https://github.com/alienkitty/space.js/raw/main/space.js.png" alt="Space.js">
</p>

### Usage

Space.js is divided into two entry points depending on your use case.

The main entry point without any dependencies is for the UI components, loaders and utilities.

```sh
npm i @alienkitty/space.js
```

```js
import { ... } from '@alienkitty/space.js';
```

For example the UI and Panel components:

```js
import { Panel, PanelItem, UI } from '@alienkitty/space.js';
```

[Tween](https://github.com/alienkitty/alien.js/wiki/Tween) animation engine:

```js
import { ticker, tween } from '@alienkitty/space.js';

ticker.start();

const data = {
    radius: 0
};

tween(data, { radius: 24, spring: 1.2, damping: 0.4 }, 1000, 'easeOutElastic', null, () => {
    console.log(data.radius);
});
```

Web Audio engine:

```js
import { BufferLoader, WebAudio } from '@alienkitty/space.js';

const bufferLoader = new BufferLoader();
await bufferLoader.loadAllAsync(['assets/sounds/gong.mp3']);
WebAudio.init({ sampleRate: 48000 });
WebAudio.load(bufferLoader.files);

const gong = WebAudio.get('gong');
gong.gain.set(0.5);

document.addEventListener('pointerdown', () => {
    gong.play();
});
```

Audio stream support:

```js
import { WebAudio } from '@alienkitty/space.js';

WebAudio.init({ sampleRate: 48000 });

// Shoutcast streams append a semicolon (;) to the URL
WebAudio.load({ protonradio: 'https://shoutcast.protonradio.com/;' });

const protonradio = WebAudio.get('protonradio');
protonradio.gain.set(1);

document.addEventListener('pointerdown', () => {
    protonradio.play();
});
```

And the `@alienkitty/space.js/three` entry point for [three.js](https://github.com/mrdoob/three.js) UI components, loaders and utilities.

```sh
npm i three @alienkitty/space.js
```

```js
import { EnvironmentTextureLoader } from '@alienkitty/space.js/three';

// ...
const environmentLoader = new EnvironmentTextureLoader(renderer);
environmentLoader.load('assets/textures/env/jewelry_black_contrast.jpg', texture => {
    scene.environment = texture;
});
```

### Examples

#### ui

[logo](https://space.js.org/examples/logo.html) (interface)  
[progress](https://space.js.org/examples/progress_canvas.html) (canvas)  
[progress](https://space.js.org/examples/progress.html) (svg)  
[progress indeterminate](https://space.js.org/examples/progress_indeterminate.html) (svg)  
[close](https://space.js.org/examples/close.html) (svg)  
[tween](https://space.js.org/examples/tween.html) (svg)  
[magnetic](https://space.js.org/examples/magnetic.html) (component, svg)  
[styles](https://space.js.org/examples/styles.html)  
[fps](https://space.js.org/examples/fps.html)  
[fps panel](https://space.js.org/examples/fps_panel.html)  
[panel](https://space.js.org/examples/panel.html) (standalone)  
[ufo](https://ufo.ai/) (2d scene, smooth scroll with skew effect)  

#### 3d

[materials](https://space.js.org/examples/three/3d_materials.html)  
[materials instancing](https://space.js.org/examples/three/3d_materials_instancing.html) ([debug](https://space.js.org/examples/three/3d_materials_instancing.html?3&debug))  
[materials instancing](https://space.js.org/examples/three/3d_materials_instancing_modified.html) (custom, [debug](https://space.js.org/examples/three/3d_materials_instancing_modified.html?3&debug))  
[lights](https://space.js.org/examples/three/3d_lights.html)  

#### audio

[gong](https://space.js.org/examples/audio_gong.html)  
[stream](https://space.js.org/examples/audio_stream.html)  
[rhythm](https://space.js.org/examples/audio_rhythm.html)  

#### thread

[canvas](https://space.js.org/examples/thread_canvas.html) (noise)  

### Getting started

Clone this repository and run the examples:

```sh
git clone https://github.com/alienkitty/space.js
cd space.js
npx servez
```

### ESLint

```sh
npm i -D eslint eslint-plugin-html
npx eslint src
npx eslint examples/about/src
npx eslint examples/three/*.html
npx eslint examples/*.html
```

### Roadmap

#### v1.0

* [x] Initial release based on the UI components from [Multiuser Blocks](https://multiuser-blocks.glitch.me/)

#### v1.1

* [x] Three.js material UI
* [x] Three.js light UI
* [x] Three.js UI keyboard support

#### v1.2

* [x] Three.js UI multiple select
* [ ] Material texture drag and drop
* [ ] Material texture thumbnails

#### v1.3

* [ ] GLTF drag and drop
* [ ] Load/save scene

#### v1.4

* [ ] Move objects
* [ ] Change camera perspective

#### v1.5

* [ ] OGL version
* [ ] Documentation

#### v1.6

* [ ] WebXR version

### Resources

* [Tween](https://github.com/alienkitty/alien.js/wiki/Tween)
* [Changelog](https://github.com/alienkitty/space.js/releases)

### See also

* [Alien.js](https://github.com/alienkitty/alien.js)
* [Three.js](https://github.com/mrdoob/three.js)
* [OGL](https://github.com/oframe/ogl)


[npm]: https://img.shields.io/npm/v/@alienkitty/space.js
[npm-url]: https://www.npmjs.com/package/@alienkitty/space.js
[npm-downloads]: https://img.shields.io/npm/dw/@alienkitty/space.js
[npmtrends-url]: https://www.npmtrends.com/@alienkitty/space.js
[deepscan]: https://deepscan.io/api/teams/20020/projects/23997/branches/734568/badge/grade.svg
[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=20020&pid=23997&bid=734568
[discord]: https://img.shields.io/discord/773739853913260032
[discord-url]: https://discord.gg/9rSkAzB7PM
