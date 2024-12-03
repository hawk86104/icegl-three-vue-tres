import * as THREE$1 from 'three'

class ParticleStateProgressType {

    static Time = new ParticleStateProgressType('Time')
    static Sequence = new ParticleStateProgressType('Sequence')

    constructor(name) {
        this.name = name
    }
}

class ParticleState {

    constructor() {
        this.init()
    }

    init() {
        this.progressType = ParticleStateProgressType.Time
        this.lifetime = 1.0
        this.age = 0.0
        this.sequenceElement = new THREE$1.Vector4()
        this.position = new THREE$1.Vector3()
        this.velocity = new THREE$1.Vector3()
        this.acceleration = new THREE$1.Vector3()
        this.normal = new THREE$1.Vector3()
        this.rotation = 0.0
        this.rotationalSpeed = 0.0
        this.size = new THREE$1.Vector2()
        this.color = new THREE$1.Color()
        this.alpha = 1.0
        this.initialSize = new THREE$1.Vector2()
        this.initialColor = new THREE$1.Color()
        this.initialAlpha = 1.0
    }

    setAll(progressType, lifetime, age, sequenceElement, position, velocity, acceleration,
           normal, rotation, rotationalSpeed, size, color, alpha, initialSize, initialColor, initialAlpha) {
        this.progressType = progressType
        this.lifetime = lifetime
        this.age = age
        this.sequenceElement.copy(sequenceElement)
        this.position.copy(position)
        this.velocity.copy(velocity)
        this.acceleration.copy(acceleration)
        this.normal.copy(normal)
        this.rotation = rotation
        this.rotationalSpeed = rotationalSpeed
        this.size = size
        this.color.copy(color)
        this.alpha = alpha
        this.initialSize.copy(initialSize)
        this.initialColor.copy(initialColor)
        this.initialAlpha = initialAlpha
    }

    copyTo(dest) {
        dest.setAll(this.progressType, this.lifetime, this.age, this.sequenceElement, this.position,
                    this.velocity, this.acceleration, this.normal, this.rotation, this.rotationalSpeed,
                    this.size, this.color, this.alpha, this.initialSize, this.initialColor, this.initialAlpha)
    }

    copy(src) {
        this.setAll(src.progressType, src.lifetime, src.age, src.sequenceElement, src.position,
                    src.velocity, src.acceleration, src.normal, src.rotation, src.rotationalSpeed,
                    src.size, src.color, src.alpha, src.initialSize, src.initialColor, src.initialAlpha)
    }
}

class ParticleStateArray {

    constructor() {
        this.particleCount = 0
        this.activeParticleCount = 0
        this.particleStates = []
    }

    init(particleCount) {
        this.setParticleCount(particleCount)
    }

    setParticleCount(particleCount) {
        if (this.particleCount != particleCount) {
            this.dispose()
            this.allocate(particleCount)
        }
        this.particleCount = particleCount
    }

    setActiveParticleCount(activeParticleCount) {
        this.activeParticleCount = activeParticleCount
    }

    allocate(particleCount) {
        this.particleStates = []
        this.particleCount = particleCount
        for (let i = 0; i < particleCount; i++) this.particleStates[i] = new ParticleState()
    }

    dispose() {
    }

    getParticleCount() {
        return this.particleCount
    }

    flushParticleStateToBuffers() {
    }

    copyState(srcIndex, destIndex) {
        if (srcIndex >= this.particleCount) {
            throw new Error('ParticleStateArray::copyState() -> "srcIndex" is out of range.')
        }
        if (destIndex >= this.particleCount) {
            throw new Error('ParticleStateArray::copyState() -> "destIndex" is out of range.')
        }

        const srcParticleState = this.particleStates[srcIndex]
        const destParticleState = this.particleStates[destIndex]

        srcParticleState.copyTo(destParticleState)
    }

    setState(index, state) {
        if (index >= this.particleCount) {
            throw new Error('ParticleStateArray::setState() -> "index" is out of range.')
        }
        return this.particleStates[index].copy(state)
    }

    getState(index) {
        if (index >= this.particleCount) {
            throw new Error('ParticleStateArray::getState() -> "index" is out of range.')
        }
        return this.particleStates[index]
    }

    computeBoundingBox = function() {

        const tempPos = new THREE$1.Vector3()

        return function(outBox = new THREE$1.Box3(), positionTransform = null) {
            const min = outBox.min
            const max = outBox.max
            for (let i = 0; i < this.activeParticleCount; i++) {
                const particleState = this.getState(i)
                let pos = particleState.position
                if (positionTransform) {
                    tempPos.copy(pos)
                    tempPos.applyMatrix4(positionTransform)
                    pos = tempPos
                }
                const maxExtent = Math.max(particleState.size.x, particleState.size.y)
                const lowerX = pos.x - maxExtent
                const upperX = pos.x + maxExtent
                const lowerY = pos.y - maxExtent
                const upperY = pos.y + maxExtent
                const lowerZ = pos.z - maxExtent
                const upperZ = pos.z + maxExtent
                if (i == 0 || pos.x < min.x) min.x = lowerX
                if (i == 0 || pos.x > max.x) max.x = upperX
                if (i == 0 || pos.y < min.y) min.y = lowerY
                if (i == 0 || pos.y > max.y) max.y = upperY
                if (i == 0 || pos.z < min.z) min.z = lowerZ
                if (i == 0 || pos.z > max.z) max.z = upperZ
            }
            return outBox
        }

    }()

    computeBoundingSphere = function() {

        const tempCenter = new THREE$1.Vector3()
        const tempVector = new THREE$1.Vector3()
        const tempPos = new THREE$1.Vector3()

        return function(outSphere = new THREE$1.Sphere(), positionTransform = null) {
            let radius = 0
            for (let i = 0; i < this.activeParticleCount; i++) {
                const particleState = this.getState(i)
                let pos = particleState.position
                if (positionTransform) {
                    tempPos.copy(pos)
                    tempPos.applyMatrix4(positionTransform)
                    pos = tempPos
                }
                const maxExtent = Math.max(particleState.size.x, particleState.size.y)
                if (i == 0) {
                    tempCenter.copy(pos)
                    radius = maxExtent
                } else {
                    tempVector.copy(pos).sub(tempCenter)
                    const distFromCenter = tempVector.length() + maxExtent
                    if (distFromCenter > radius) {
                        const diff = distFromCenter - radius
                        const adjustDiff = diff / 2
                        tempVector.normalize().multiplyScalar(adjustDiff)
                        tempCenter.add(tempVector)
                        radius += adjustDiff
                    }
                }
            }
            outSphere.center.copy(tempCenter)
            outSphere.radius = radius

            return outSphere
        }

    }()
}

class ParticleSequence {

    constructor(start, length, id = 0) {
        this.start = start
        this.length = length
        this.id = id
    }

}

class ParticleSequenceGroup {

    constructor() {
        this.sequences = {}
        this.ids = []
    }

    addSequence(start, length, id) {
        if (this.hasID(id)) {
            throw new Error('ParticleSequenceGroup::addParticleSequence -> Tried to add sequence with duplicate ID.')
        }

        const sequence = new ParticleSequence(start, length, id)
        this.sequences[id] = sequence
        this.ids.push(id)
        return sequence
    }

    getSequence(id) {
        if (!this.hasID(id)) {
            throw new Error('ParticleSequenceGroup::getSequence -> Invalid ID.')
        }
        return this.sequences[id]
    }

    getSequenceIDs() {
        return this.ids
    }

    hasID(id) {
        if (!this.sequences[id]) return false
        return true
    }

}

class ParticleStateInitializer {

    constructor() {
    }

    initializeState(state) {
        state.initialColor.set(1.0, 1.0, 1.0)
        state.initialSize.set(1.0, 1.0)
        state.initialAlpha = 1.0
        state.progressType = ParticleStateProgressType.Time
        state.lifetime = 0.0
        state.age = 0.0
        state.sequenceElement.set(0, 0, 0, 0)
        state.position.set(0.0, 0.0, 0.0)
        state.velocity.set(0.0, 0.0, 0.0)
        state.acceleration.set(0.0, 0.0, 0.0)
        state.normal.set(0.0, 0.0, 1.0)
        state.rotation = 0.0
        state.rotationalSpeed = 0.0
        state.size.copy(state.initialSize)
        state.color.copy(state.initialColor)
        state.alpha = 1.0
    }

}

class BaseParticleStateInitializer extends ParticleStateInitializer {

    constructor() {
        super()
    }

    initializeState(state) {
        super.initializeState(state)
    }

}

class ParticleStateOperator {

    constructor() {
    }

    updateState() {
    }

}

class BaseParticleStateOperator extends ParticleStateOperator {

    constructor() {
        super()
        this.timeScaledVelocity = new THREE$1.Vector3()
        this.timeScaledAcceleration = new THREE$1.Vector3()
        this.stateAcceleration = new THREE$1.Vector3()
        this.stateVelocity = new THREE$1.Vector3()
    }

    updateState(state, timeDelta) {
        super.updateState(state, timeDelta)
        this.stateAcceleration.copy(state.acceleration)
        this.timeScaledAcceleration.copy(this.stateAcceleration)
        this.timeScaledAcceleration.multiplyScalar(timeDelta)
        state.velocity.add(this.timeScaledAcceleration)

        this.stateVelocity.copy(state.velocity)
        this.timeScaledVelocity.copy(this.stateVelocity)
        this.timeScaledVelocity.multiplyScalar(timeDelta)

        state.position.add(this.timeScaledVelocity)

        state.age = state.age + timeDelta

        state.rotation = state.rotation + timeDelta * state.rotationalSpeed
        return true
    }

}

class Utils {

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max)
    }

    static currentTime() {
        return performance.now() / 1000
    }
}

class ComponentContainer {

        constructor() {
            this.components = []
        }

        addComponent(component) {
            this.components.push(component)
        }

        update(currentTime, timeDelta) {
            for (const component of this.components) {
                component.update(currentTime, timeDelta)
            }
        }

        getComponent(index) {
            if (index >= this.components.length) {
                throw new Error('ComponentContainer::getComponent() -> "index" is out of range.')
            }
            return this.components[index]
        }
}

class ParticleSystemState {

    static NotStarted = new ParticleSystemState('NotStarted')
    static Running = new ParticleSystemState('Running')
    static Paused = new ParticleSystemState('Paused')
    static Done = new ParticleSystemState('Done')

    constructor(name) {
      this.name = name
    }

}

class ParticleSystem {

    constructor(owner, particleSystemRenderer) {
        this.owner = owner
        this.owner.visible = false
        this.visible = true
        this.particleSystemRenderer = particleSystemRenderer
        this.initialized = false
        this.maximumActiveParticles = 0
        this.activeParticleCount = 0
        this.simulateInWorldSpace = true
        this.emitterInitialized = false
        this.particleEmitter = null
        this.componentContainer = new ComponentContainer()
        this.particleStateInitializers = []
        this.particleStateOperators = []
        this.particleStates = null
        this.systemState = ParticleSystemState.NotStarted
        this.particleSequences = new ParticleSequenceGroup()
        this.onUpdateCallback = null
        this.transformInitialDirectionInWorldSpace = true
        this.boundingBox = new THREE$1.Box3()
        this.boundingSphere = new THREE$1.Sphere()
    }

    init(maximumActiveParticles) {
        if (!this.initialized) {
            this.maximumActiveParticles = maximumActiveParticles
            if (this.particleSystemRenderer) {
                this.particleSystemRenderer.setOwner(this.owner)
                this.particleSystemRenderer.init(this.maximumActiveParticles, this.simulateInWorldSpace)
                this.particleSystemRenderer.setSimulateInWorldSpace(this.simulateInWorldSpace)
                this.particleStates = this.particleSystemRenderer.getParticleStateArray()
            } else {
                this.particleStates = new ParticleStateArray()
                this.particleStates.init(this.maximumActiveParticles)
            }
            this.addParticleStateInitializer(new BaseParticleStateInitializer())
            this.addParticleStateOperator(new BaseParticleStateOperator())
            this.initialized = true
        } else {
            throw new Error('ParticleSystem::init() -> trying to intialize more than once.')
        }
    }

    getVisible() {
        return this.visible
    }

    setVisibile(visible) {
        return this.visible = visible
    }

    onUpdate(callback) {
        this.onUpdateCallback = callback
    }

    update(currentTime, timeDelta) {
        if (this.systemState == ParticleSystemState.Running) {
            this.owner.updateWorldMatrix(true)
            currentTime = (currentTime == undefined || currentTime == null) ? Utils.currentTime() : currentTime
            timeDelta = (timeDelta == undefined || timeDelta == null) ? currentTime - this.lastUpdateTime : timeDelta
            if (this.emitterInitialized && this.systemState == ParticleSystemState.Running) {
                const particlesToEmit = this.particleEmitter.update(timeDelta)
                if (particlesToEmit > 0) this.activateParticles(particlesToEmit)
                this.advanceActiveParticles(timeDelta)
                if (this.onUpdateCallback) this.onUpdateCallback(this.activeParticleCount)

                // TODO: Be more efficient about re-computing bounds
                this.updateBounds()
            }
            this.componentContainer.update(currentTime, timeDelta)
            this.lastUpdateTime = currentTime
        }
    }

    render(threeRenderer, camera) {
        if (this.getVisible() && this.particleSystemRenderer) {
            const saveAutoClear = threeRenderer.autoClear
            threeRenderer.autoClear = false
            this.owner.visible = true
            this.owner.matrixWorldNeedsUpdate = true
            this.particleSystemRenderer.render(this.owner, threeRenderer, camera)
            this.owner.visible = false
            threeRenderer.autoClear = saveAutoClear
        }
    }

    start() {
        if (this.systemState == ParticleSystemState.NotStarted || this.systemState == ParticleSystemState.Paused) {
            this.systemState = ParticleSystemState.Running
            this.startTime = Utils.currentTime()
            this.lastUpdateTime = this.startTime
        } else {
            // TODO: Decide how to handle this case
        }
    }

    pause() {
        if (this.systemState == ParticleSystemState.Running) {
            this.systemState = ParticleSystemState.Paused
        }
    }

    stop() {

    }

    getSystemState() {
        return this.systemState
    }

    setEmitter(emitter) {
        this.particleEmitter = emitter
        this.particleEmitter.maximumActiveParticles = this.maximumActiveParticles
        this.emitterInitialized = true
        return this.particleEmitter
    }

    addComponent(component) {
        this.componentContainer.addComponent(component)
    }

    getComponent(index) {
        return this.componentContainer.getComponent(index)
    }

    addParticleStateInitializer(initializer) {
        this.particleStateInitializers.push(initializer)
        return initializer
    }

    getParticleStateInitializerCount() {
        return this.particleStateInitializers.length
    }

    getParticleStateInitializer(index) {
        if (index >= this.particleStateInitializers.length) {
            throw new Error('ParticleSystem::getParticleStateInitializer() -> "index" is out of range.')
        }
        return this.particleStateInitializers[index]
    }

    addParticleStateOperator(operator) {
        this.particleStateOperators.push(operator)
        return operator
    }

    getParticleStateOperatorCount() {
        return this.particleStateOperators.length
    }

    getParticleStateOperator(index) {
        if (index >= this.particleStateOperators.length) {
            throw new Error('ParticleSystem::getParticleStateOperator() -> "index" is out of range.')
        }
        return this.particleStateOperators[index]
    }

    getMaximumActiveParticles() {
        return this.maximumActiveParticles
    }

    getActiveParticleCount() {
        return this.activeParticleCount
    }

    getParticleState(index) {
        if (index >= this.activeParticleCount) {
            throw new Error('ParticleSystem::getParticleState() -> "index" is out of range.')
        }
        return this.particleStates.getState(index)
    }

    getParticleStates() {
        return this.particleStates
    }

    getParticleSystemRenderer() {
        return this.particleSystemRenderer
    }

    getSimulateInWorldSpace() {
        return this.simulateInWorldSpace
    }

    setSimulateInWorldSpace(simulateInWorldSpace) {
        this.simulateInWorldSpace = simulateInWorldSpace
        if (this.particleSystemRenderer) {
            this.particleSystemRenderer.setSimulateInWorldSpace(this.simulateInWorldSpace)
        }
    }

    setTransformInitialDirectionInWorldSpace(transformInitialDirectionInWorldSpace) {
        this.transformInitialDirectionInWorldSpace = transformInitialDirectionInWorldSpace
    }

    addParticleSequence(start, length, id = 0) {
        this.particleSequences.addSequence(start, length, id)
    }

    getParticleSequences() {
        return this.particleSequences
    }

    getEmitter() {
        return this.particleEmitter
    }

    updateBounds = function() {

        const tempMatrix4 = new THREE$1.Matrix4()

        return function() {
            let positionTransform = null
            if (this.transformInitialDirectionInWorldSpace) {
                positionTransform = tempMatrix4
                positionTransform.copy(this.owner.matrixWorld).invert()
            }
            if (this.particleSystemRenderer.calculatingBoundingSphereFromBox()) {
                this.particleStates.computeBoundingBox(this.boundingBox, positionTransform)
                this.particleSystemRenderer.setBoundingBox(this.boundingBox)
            } else {
                this.particleStates.computeBoundingSphere(this.boundingSphere, positionTransform)
                this.particleSystemRenderer.setBoundingSphere(this.boundingSphere)
            }
        }

    }()

    activateParticles(particleCount) {
        if (this.systemState == ParticleSystemState.Running) {
            const newActiveParticleCount = Utils.clamp(this.activeParticleCount + particleCount,
                                                    0, this.maximumActiveParticles)
            for (let i = this.activeParticleCount; i < newActiveParticleCount; i++) {
                this.activateParticle(i)
            }
            this.activeParticleCount = newActiveParticleCount
            this.particleStates.setActiveParticleCount(this.activeParticleCount)
        }
    }

    activateParticle(index) {
        if (this.systemState == ParticleSystemState.Running) {
            const particleState = this.particleStates.getState(index)
            particleState.age = 0.0
            for (let i = 0; i < this.particleStateInitializers.length; i++) {
                const particleStateInitializer = this.particleStateInitializers[i]
                particleStateInitializer.initializeState(particleState)
            }
            if (this.simulateInWorldSpace) {
                particleState.position.applyMatrix4(this.owner.matrixWorld)
                const vLength = particleState.velocity.length()
                if (this.transformInitialDirectionInWorldSpace) {
                    particleState.velocity.transformDirection(this.owner.matrixWorld).multiplyScalar(vLength)
                    const aLength = particleState.acceleration.length()
                    particleState.acceleration.transformDirection(this.owner.matrixWorld).multiplyScalar(aLength)
                }
            }
            this.particleStates.flushParticleStateToBuffers(index)
        }
    }

    advanceActiveParticles(timeDelta) {
        if (this.systemState == ParticleSystemState.Running) {
            let i = 0
            while (i < this.activeParticleCount) {
                const particleIsActive = this.advanceActiveParticle(i, timeDelta)
                if (!particleIsActive) {
                    if (i < this.activeParticleCount - 1) {
                        this.copyParticleInArray(this.activeParticleCount - 1, i)
                    }
                    this.activeParticleCount--
                    continue
                }
                i++
            }
            this.particleStates.setActiveParticleCount(this.activeParticleCount)
        }
    }

    advanceActiveParticle(index, timeDelta) {
        if (this.systemState == ParticleSystemState.Running) {
            const particleState = this.particleStates.getState(index)
            for (let i = 0; i < this.particleStateOperators.length; i++) {
                const particleStateOperator = this.particleStateOperators[i]
                const stillAlive = particleStateOperator.updateState(particleState, timeDelta)
                const particleLifeTime = particleState.lifetime
                if (!stillAlive || particleLifeTime != 0.0 && particleState.age >= particleLifeTime) {
                    return false
                }
            }
            this.particleStates.flushParticleStateToBuffers(index)
            return true
        }
        return false
    }

    copyParticleInArray(srcIndex, destIndex) {
        this.particleStates.copyState(srcIndex, destIndex)
        this.particleStates.flushParticleStateToBuffers(destIndex)
    }

    static fromJSON(json, jsonTypeStore, threeRenderer) {

        const traverseJSON = (node, onVisit, visited) => {
            visited = visited || {}
            onVisit(node)
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    const val = node[key]
                    if (typeof val === 'object') {
                        traverseJSON(val, onVisit, visited)
                    }
                }
            }
        }

        traverseJSON(json, (node) => {
            if (node.type) {
                node.type = jsonTypeStore.parseTypeString(node.type)
            }
        })

        const maxParticleCount = json.maxParticleCount
        const simulateInWorldSpace = json.simulateInWorldSpace

        const rendererJSON = json.renderer
        const renderer = rendererJSON.type.fromJSON(rendererJSON.params)

        const rootObject = new THREE$1.Object3D()
        const particleSystem = new ParticleSystem(rootObject, renderer, threeRenderer)
        particleSystem.init(maxParticleCount)
        particleSystem.setSimulateInWorldSpace(simulateInWorldSpace)

        const emitterJSON = json.emitter
        const emitter = emitterJSON.type.fromJSON(emitterJSON.params)
        particleSystem.setEmitter(emitter)

        if (json.sequences) {
            for (const sequenceJSON of json.sequences) {
                particleSystem.addParticleSequence(sequenceJSON.start, sequenceJSON.length, sequenceJSON.id)
            }
        }

        if (json.initializers) {
            for (const initializerJSON of json.initializers) {
                particleSystem.addParticleStateInitializer(initializerJSON.type.fromJSON(particleSystem, initializerJSON.params))
            }
        }

        if (json.operators) {
            for (const operatorJSON of json.operators) {
                const operator =
                    particleSystem.addParticleStateOperator(operatorJSON.type.fromJSON(particleSystem, operatorJSON.params))
                if (operatorJSON.elements) {
                    operator.addElementsFromParameters(operatorJSON.elements)
                }
            }
        }

        return [particleSystem, rootObject]
    }

    toJSON(jsonTypeStore) {
        const particleSystemRenderer = this.getParticleSystemRenderer()
        const particleSystemEmitter = this.getEmitter()

        const particleSequenceGroup = this.getParticleSequences()
        const sequences = particleSequenceGroup.getSequenceIDs().map((sequenceID) => {
            const sequence = particleSequenceGroup.getSequence(sequenceID)
            return {
                'id': sequenceID,
                'start': sequence.start,
                'length': sequence.length
            }
        })

        const initializers = []
        const initializerCount = this.getParticleStateInitializerCount()
        for (let i = 0; i < initializerCount; i++) {
            const initializer = this.getParticleStateInitializer(i)
            if (initializer.constructor !== BaseParticleStateInitializer) {
                initializers.push({
                    'type': jsonTypeStore.getTypePath(initializer.constructor),
                    'params': initializer.toJSON(jsonTypeStore)
                })
            }
        }

        const operators = []
        const operatorCount = this.getParticleStateOperatorCount()
        for (let i = 0; i < operatorCount; i++) {
            const operator = this.getParticleStateOperator(i)
            if (operator.constructor !== BaseParticleStateOperator) {
                const json = operator.toJSON(jsonTypeStore)
                const params = json.params || json
                const elements = json.params ? json.elements : null
                const operatorJSON = {
                    'type': jsonTypeStore.getTypePath(operator.constructor),
                    'params': params
                }
                if (elements) {
                    operatorJSON.elements = elements
                }
                operators.push(operatorJSON)
            }
        }

        const json = {
            'maxParticleCount': this.getMaximumActiveParticles(),
            'simulateInWorldSpace': this.getSimulateInWorldSpace(),
            'renderer': {
                'type': jsonTypeStore.getTypePath(particleSystemRenderer.constructor),
                'params': particleSystemRenderer.toJSON()
            },
            'emitter': {
                'type': jsonTypeStore.getTypePath(particleSystemEmitter.constructor),
                'params': particleSystemEmitter.toJSON()
            },
            'sequences': sequences,
            'initializers': initializers,
            'operators': operators
        }

        return json
    }
}

class Manager {

    constructor() {
        this.particleSystems = []
        this.startupTime = performance.now() / 1000
        this.lastUpdateTime = this.startupTime
        this.componentContainer = new ComponentContainer()
    }

    update() {
        const currentTime = Utils.currentTime()
        const timeDelta = currentTime - this.lastUpdateTime
        for (const particleSystem of this.particleSystems) {
            particleSystem.update(currentTime, timeDelta)
        }
        this.componentContainer.update(currentTime, timeDelta)
        this.lastUpdateTime = currentTime
    }

    render(threeRenderer, camera) {
        for (const particleSystem of this.particleSystems) {
            particleSystem.render(threeRenderer, camera)
        }
    }

    addParticleSystem(particleSystem) {
        this.particleSystems.push(particleSystem)
    }

    addComponent(component) {
        this.componentContainer.addComponent(component)
    }

    getComponent(index) {
        return this.componentContainer.getComponent(index)
    }

}

class Renderer {

    constructor() {
        this.initialized = false
        this.particleCount = 0
        this.owner = null
        this.simulateInWorldSpace = false
    }

    setSimulateInWorldSpace(simulateInWorldSpace) {
        this.simulateInWorldSpace = simulateInWorldSpace
    }

    getParticleStateArray() {
    }

    setOwner(owner) {
        this.owner = owner
    }

    init(particleCount) {
        this.particleCount = particleCount
        if (!this.initialized) {
            this.initialized = true
            return true
        } 
            throw new Error('Renderer::init() -> trying to intialize more than once.')
        
    }

    render() {
    }

}

class ParticleStateAttributeArray extends ParticleStateArray {

    constructor() {
        super()
        this.geometry = null
        this.progressTypes = null
        this.lifetimes = null
        this.ages = null
        this.sequenceElements = null
        this.positions = null
        this.velocities = null
        this.accelerations = null
        this.normals = null
        this.rotations = null
        this.rotationalSpeeds = null
        this.sizes = null
        this.colors = null
        this.initialSizes = null
        this.initialColors = null
        this.instanced = false
        this.verticesPerParticle = 6
    }

    init(particleCount, instanced = false) {
        this.instanced = instanced
        if (this.instanced) {
            this.verticesPerParticle = 1
        } else {
            this.verticesPerParticle = 6
        }
        super.init(particleCount)
        this.allocate(particleCount)
    }

    setParticleCount(particleCount) {
        super.setParticleCount(particleCount)
    }

    setActiveParticleCount(activeParticleCount) {
        super.setActiveParticleCount(activeParticleCount)
        if (activeParticleCount > 0) {
            if (this.instanced) {
                this.geometry.instanceCount = activeParticleCount
            } else {
                this.geometry.setDrawRange(0, this.verticesPerParticle * activeParticleCount)
            }
        } else {
            if (this.instanced) {
                this.geometry.instanceCount = 0
            } else {
                this.geometry.setDrawRange(0, 0)
            }
        }
    }

    flushParticleStateToBuffers(index) {
        if (index >= this.particleCount) {
            throw new Error('ParticleStateAttributeArray::flushParticleStateToBuffers() -> "index" is out of range.')
        }
        const particleState = this.getState(index)

        const offset = index * this.verticesPerParticle

        for (let i = 0; i < this.verticesPerParticle; i++) {
            this.lifetimes.setX(offset + i, particleState.lifetime)
            this.lifetimes.needsUpdate = true

            this.ages.setX(offset + i, particleState.age)
            this.ages.needsUpdate = true

            this.sequenceElements.setXYZW(offset + i, particleState.sequenceElement.x, particleState.sequenceElement.y,
                                                      particleState.sequenceElement.z, particleState.sequenceElement.w)
            this.sequenceElements.needsUpdate = true

            this.positions.setXYZ(offset + i, particleState.position.x,
                                  particleState.position.y, particleState.position.z)
            this.positions.needsUpdate = true

            this.velocities.setXYZ(offset + i, particleState.velocity.x,
                                   particleState.velocity.y, particleState.velocity.z)
            this.velocities.needsUpdate = true

            this.accelerations.setXYZ(offset + i, particleState.acceleration.x,
                                      particleState.acceleration.y, particleState.acceleration.z)
            this.accelerations.needsUpdate = true

            this.normals.setXYZ(offset + i, particleState.normal.x, particleState.normal.y, particleState.normal.z)
            this.normals.needsUpdate = true

            this.rotations.setX(offset + i, particleState.rotation)
            this.rotations.needsUpdate = true

            this.rotationalSpeeds.setX(offset + i, particleState.rotationalSpeed)
            this.rotationalSpeeds.needsUpdate = true

            this.sizes.setXY(offset + i, particleState.size.x, particleState.size.y)
            this.sizes.needsUpdate = true

            this.colors.setXYZ(offset + i, particleState.color.r, particleState.color.g, particleState.color.b)
            this.colors.needsUpdate = true

            this.alphas.setX(offset + i, particleState.alpha)
            this.alphas.needsUpdate = true

            this.initialSizes.setXY(offset + i, particleState.initialSize.x, particleState.initialSize.y)
            this.initialSizes.needsUpdate = true

            this.initialAlphas.setX(offset + i, particleState.initialAlpha)
            this.initialAlphas.needsUpdate = true
        }
    }

    copyState(srcIndex, destIndex) {
        super.copyState(srcIndex, destIndex)
        this.flushParticleStateToBuffers(destIndex)
    }

    setState(index, state) {
        if (index >= this.particleCount) {
            throw new Error('ParticleStateAttributeArray::setState() -> "index" is out of range.')
        }
        super.setState(index, state)
        this.flushParticleStateToBuffers(index)
    }

    getPositions() {
        return this.positions
    }

    getSizes() {
        return this.sizes
    }

    getRotations() {
        return this.rotations
    }

    getSequenceElements() {
        return this.sequenceElements
    }

    getColors() {
        return this.colors
    }

    getGeometry() {
        return this.geometry
    }

    allocate(particleCount) {
        super.allocate(particleCount)

        const createAttributeBuffer = (bufferArray, componentCount) => {
            if (this.instanced) {
                return new THREE$1.InstancedBufferAttribute(bufferArray, componentCount)
            } 
                return new THREE$1.BufferAttribute(bufferArray, componentCount)
            
        }

        const vertexCount = this.verticesPerParticle * this.particleCount

        if (this.instanced) {
            const baseGeometry = new THREE$1.BufferGeometry()

            const basePositionsArray = new Float32Array(18)
            this.basePositions = new THREE$1.BufferAttribute(basePositionsArray, 3)
            baseGeometry.setAttribute('position', this.basePositions)
            this.basePositions.needsUpdate = true
            this.basePositions.setXYZ(0, -1.0, 1.0, 0.0)
            this.basePositions.setXYZ(1, -1.0, -1.0, 0.0)
            this.basePositions.setXYZ(2, 1.0, 1.0, 0.0)
            this.basePositions.setXYZ(3, -1.0, -1.0, 0.0)
            this.basePositions.setXYZ(4, 1.0, -1.0, 0.0)
            this.basePositions.setXYZ(5, 1.0, 1.0, 0.0)

            const baseUVsArray = new Float32Array(12)
            this.baseUVs = new THREE$1.BufferAttribute(baseUVsArray, 2)
            baseGeometry.setAttribute('baseUV', this.baseUVs)
            this.baseUVs.needsUpdate = true
            this.baseUVs.setXY(0, 0.0, 1.0)
            this.baseUVs.setXY(1, 0.0, 0.0)
            this.baseUVs.setXY(2, 1.0, 1.0)
            this.baseUVs.setXY(3, 0.0, 0.0)
            this.baseUVs.setXY(4, 1.0, 0.0)
            this.baseUVs.setXY(5, 1.0, 1.0)

            const customIndexesArray = new Float32Array(6)
            this.customIndexes = new THREE$1.BufferAttribute(customIndexesArray, 1)
            baseGeometry.setAttribute('customIndex', this.customIndexes)
            this.customIndexes.needsUpdate = true

            this.customIndexes.setX(0, 0)
            this.customIndexes.setX(1, 1)
            this.customIndexes.setX(2, 3)
            this.customIndexes.setX(3, 1)
            this.customIndexes.setX(4, 2)
            this.customIndexes.setX(5, 3)

            this.geometry = new THREE$1.InstancedBufferGeometry().copy(baseGeometry)
            this.geometry.instanceCount = 0
        } else {
            this.geometry = new THREE$1.BufferGeometry()

            const customIndexesArray = new Float32Array(vertexCount)
            this.customIndexes = new THREE$1.BufferAttribute(customIndexesArray, 1)
            this.geometry.setAttribute('customIndex', this.customIndexes)
            this.customIndexes.needsUpdate = true

            for (let p = 0; p < this.particleCount; p++) {
                const offset = p * this.verticesPerParticle
                this.customIndexes.setX(offset, 0)
                this.customIndexes.setX(offset + 1, 1)
                this.customIndexes.setX(offset + 2, 3)
                this.customIndexes.setX(offset + 3, 1)
                this.customIndexes.setX(offset + 4, 2)
                this.customIndexes.setX(offset + 5, 3)
            }
        }

        const lifetimesArray = new Float32Array(vertexCount)
        const agesArray = new Float32Array(vertexCount)
        const sequenceElementsArray = new Float32Array(vertexCount * 4)
        const positionsArray = new Float32Array(vertexCount * 3)
        const velocitiesArray = new Float32Array(vertexCount * 3)
        const accelerationsArray = new Float32Array(vertexCount * 3)
        const normalsArray = new Float32Array(vertexCount * 3)
        const rotationsArray = new Float32Array(vertexCount)
        const rotationalSpeedsArray = new Float32Array(vertexCount)
        const sizesArray = new Float32Array(vertexCount * 2)
        const colorsArray = new Float32Array(vertexCount * 3)
        const alphasArray = new Float32Array(vertexCount)
        const initialSizesArray = new Float32Array(vertexCount * 2)
        const initialColorsArray = new Float32Array(vertexCount * 3)
        const initialAlphasArray = new Float32Array(vertexCount)

        this.positions = createAttributeBuffer(positionsArray, 3)
        this.positions.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('particlePosition', this.positions)

        this.lifetimes = createAttributeBuffer(lifetimesArray, 1)
        this.lifetimes.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('lifetime', this.lifetimes)

        this.ages = createAttributeBuffer(agesArray, 1)
        this.ages.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('age', this.ages)

        this.sequenceElements = createAttributeBuffer(sequenceElementsArray, 4)
        this.sequenceElements.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('sequenceElement', this.sequenceElements)

        this.velocities = createAttributeBuffer(velocitiesArray, 3)
        this.velocities.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('velocity', this.velocities)

        this.accelerations = createAttributeBuffer(accelerationsArray, 3)
        this.accelerations.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('acceleration', this.accelerations)

        this.normals = createAttributeBuffer(normalsArray, 3)
        this.normals.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('normal', this.normals)

        this.rotations = createAttributeBuffer(rotationsArray, 1)
        this.rotations.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('rotation', this.rotations)

        this.rotationalSpeeds = createAttributeBuffer(rotationalSpeedsArray, 1)
        this.rotationalSpeeds.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('rotationalSpeed', this.rotationalSpeeds)

        this.sizes = createAttributeBuffer(sizesArray, 2)
        this.sizes.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('size', this.sizes)

        this.colors = createAttributeBuffer(colorsArray, 3)
        this.colors.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('color', this.colors)

        this.alphas = createAttributeBuffer(alphasArray, 1)
        this.alphas.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('alpha', this.alphas)

        this.initialSizes = createAttributeBuffer(initialSizesArray, 2)
        this.initialSizes.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('initialSize', this.initialSizes)

        this.initialColors = createAttributeBuffer(initialColorsArray, 3)
        this.initialColors.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('initialColor', this.initialColors)

        this.initialAlphas = createAttributeBuffer(initialAlphasArray, 1)
        this.initialAlphas.setUsage(THREE$1.DynamicDrawUsage)
        this.geometry.setAttribute('initialAlpha', this.initialAlphas)

    }

    dispose() {
        super.dispose()
        if (this.geometry) {
            this.geometry.dispose()
            this.geometry = null
        }
    }
}

class FrameSetDescriptor {

    constructor(length, x, y, width, height) {
        this.length = length
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

};

class Atlas {

    constructor(texture, texturePath) {
        this.texture = texture
        this.texturePath = texturePath
        this.frameSets = []
    }

    getTexture() {
        return this.texture
    }

    getTexturePath() {
        return this.texturePath
    }

    getFrameSetCount() {
        return this.frameSets.length
    }

    addFrameSet(length, x, y, width, height) {
        this.frameSets.push(new FrameSetDescriptor(length, x, y, width, height))
    }

    getFrameSet(index) {
        if (index >= this.frameSets.length) {
            throw new Error('Atlas::getFrameSet -> "index" is out of range.')
        }
        return this.frameSets[index]
    }

}

class AnimatedSpriteRenderer extends Renderer {

    constructor(instanced, atlas, interpolateAtlasFrames = false,
                blending = THREE$1.NormalBlending, calculateBoundingSphereFromBox = true, renderOrder) {
        super()
        this.instanced = instanced
        this.particleStateArray = null
        this.material = null
        this.mesh = null
        this.atlas = atlas
        this.interpolateAtlasFrames = interpolateAtlasFrames
        this.blending = blending
        this.boundingBox = new THREE$1.Box3()
        this.boundingSphere = new THREE$1.Sphere()
        this.calculateBoundingSphereFromBox = calculateBoundingSphereFromBox
        this.renderOrder = renderOrder
    }

    setOwner(owner) {
        super.setOwner(owner)
    }

    getParticleStateArray() {
        return this.particleStateArray
    }

    setSimulateInWorldSpace(simulateInWorldSpace) {
        super.setSimulateInWorldSpace(simulateInWorldSpace)
        if (this.material) {
            this.material.uniforms.simulateInWorldSpace.value = simulateInWorldSpace ? 1 : 0
            this.material.uniformsNeedUpdate = true
        }
    }

    calculatingBoundingSphereFromBox() {
        return this.calculateBoundingSphereFromBox
    }

    setBoundingBox(boundingBox) {
        this.boundingBox.copy(boundingBox)
        if (this.mesh) {
            this.updateMeshBounds()
        }
    }

    setBoundingSphere(boundingSphere) {
        this.boundingSphere.copy(boundingSphere)
        if (this.mesh) {
            this.updateMeshBounds()
        }
    }

    render(owner, threeRenderer, camera) {
        threeRenderer.render(owner, camera)
    }

    updateMeshBounds = function() {

        const tempCenter = new THREE$1.Vector3()

        return function() {

            const geometry = this.particleStateArray.getGeometry()

            if (this.calculateBoundingSphereFromBox) {
                if (!geometry.boundingBox) geometry.boundingBox = new THREE$1.Box3()
                geometry.boundingBox.copy(this.boundingBox)
                if (!geometry.boundingSphere) {
                    geometry.boundingSphere = new THREE$1.Sphere()
                }
                tempCenter.x = (this.boundingBox.min.x + this.boundingBox.max.x) / 2.0
                tempCenter.y = (this.boundingBox.min.y + this.boundingBox.max.y) / 2.0
                tempCenter.z = (this.boundingBox.min.z + this.boundingBox.max.z) / 2.0
                const extentX = this.boundingBox.max.x - tempCenter.x
                const extentY = this.boundingBox.max.y - tempCenter.y
                const extentZ = this.boundingBox.max.z - tempCenter.z
                const maxExtent = Math.max(Math.max(extentX, extentY), extentZ)
                geometry.boundingSphere.center.copy(tempCenter)
                geometry.boundingSphere.radius = Math.sqrt(2 * maxExtent * maxExtent)
            } else {
                if (!geometry.boundingSphere) geometry.boundingSphere = new THREE$1.Sphere()
                geometry.boundingSphere.copy(this.boundingSphere)
            }
        }

    }()

    init(particleCount) {
        if (super.init(particleCount)) {
            this.particleStateArray = new ParticleStateAttributeArray()
            this.particleStateArray.init(particleCount, this.instanced)
            this.material = this.createMaterial(null, null, null, true, false)
            this.material.blending = this.blending
            this.mesh = new THREE$1.Mesh(this.particleStateArray.getGeometry(), this.material)
            this.mesh.frustumCulled = true
            if (this.renderOrder !== undefined) this.mesh.renderOrder = this.renderOrder
            this.updateMeshBounds()
            this.owner.add(this.mesh)
        }
    }

    dispose() {
        this.particleStateArray.dispose()
    }

    createMaterial(vertexShader, fragmentShader, customUniforms, useWebGL2, useLogarithmicDepth) {

        const shaderAtlas = [...Array(16).keys()].map(i => new THREE$1.Vector4())
        if (this.atlas) {
            for (let i = 0; i < this.atlas.getFrameSetCount(); i++) {
                const frameSet = this.atlas.getFrameSet(i)
                shaderAtlas[i] = new THREE$1.Vector4(frameSet.x, frameSet.y, frameSet.width, frameSet.height)
            }
        }

        const atlasTexture = this.atlas ? this.atlas.getTexture() : null
        const interpolateAtlasFrames = this.interpolateAtlasFrames
        const simulateInWorldSpace = this.simulateInWorldSpace
        const instanced = this.instanced ? 1 : 0

        const baseUniforms = {
            'atlasFrameSet': {
                'type': 'v4v',
                'value': shaderAtlas
            },
            'atlasTexture': {
                'type': 't',
                'value': atlasTexture
            },
            'interpolateAtlasFrames': {
                'value': interpolateAtlasFrames
            },
            'uvOffset': {
                'type': 'v2',
                'value': new THREE$1.Vector2()
            },
            'simulateInWorldSpace': {
                'value': simulateInWorldSpace
            },
            'instanced': {
                'value': instanced
            }
        }

        customUniforms = customUniforms || {}
        Object.assign(customUniforms, baseUniforms)

        vertexShader = vertexShader || AnimatedSpriteRenderer.Shader.getVertexShader(useLogarithmicDepth)
        fragmentShader = fragmentShader ||
                         AnimatedSpriteRenderer.Shader.getFragmentShader(useWebGL2, useLogarithmicDepth)

        return new THREE$1.ShaderMaterial({
            uniforms: customUniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            alphaTest: 1.0,
            blending: THREE$1.NormalBlending,
            blendDstAlpha: THREE$1.OneMinusSrcAlphaFactor,
            blendSrcAlpha: THREE$1.SrcAlphaFactor,
            depthTest: true,
            depthWrite: false
        } )

    }

    static Shader = {

        get VertexVars() {
            return [
                'const int MAX_ATLAS_FRAME_SETS = 16; \n',
                'uniform vec4 atlasFrameSet[MAX_ATLAS_FRAME_SETS]; \n',
                'uniform int interpolateAtlasFrames; \n',
                'uniform int simulateInWorldSpace; \n',
                'uniform int instanced; \n',
                'attribute vec2 baseUV;\n',
                'attribute float customIndex;\n',
                'attribute vec4 particlePosition;\n',
                'attribute float rotation;\n',
                'attribute vec2 size;\n',
                'attribute vec4 sequenceElement;\n',
                'attribute vec3 color;\n',
                'attribute float alpha;\n',
                'varying vec2 vUV1;\n',
                'varying vec2 vUV2;\n',
                'varying vec3 vFragColor;\n',
                'varying float vFragAlpha;\n',
                'varying float vSequenceElementT; \n',
            ].join('\n')
        },

        get FragmentVars() {
            return [
                'uniform int interpolateAtlasFrames; \n',
                'uniform sampler2D atlasTexture;\n',
                'uniform vec2 uvOffset;\n',
                'varying vec2 vUV1;\n',
                'varying vec2 vUV2;\n',
                'varying vec3 vFragColor;\n',
                'varying float vFragAlpha;\n',
                'varying float vSequenceElementT;\n',
            ].join('\n')
        },

        getVertexShader(useLogarithmicDepth) {
            let shader = [
                '#include <common>',
                this.VertexVars,
            ].join('\n')

            if (useLogarithmicDepth) shader += '  \n #include <logdepthbuf_pars_vertex> \n'

            shader += [

                'void getUV(in int sequenceElement, in int sequenceNumber, in vec4 atlasFrames, out vec2 uv) { \n',
                '   float atlasFrameWidth = atlasFrames.z; \n',
                '   float atlasFrameHeight = atlasFrames.w; \n',
                '   float atlasFrameX = atlasFrames.x; \n',
                '   float atlasFrameY = atlasFrames.y; \n',
                '   int firstRowSections = int((1.0 - atlasFrameX) / atlasFrameWidth); \n',
                '   int maxRowSections = int(1.0 / atlasFrameWidth); \n',

                '   float firstRowX = atlasFrameX + atlasFrameWidth * float(sequenceElement); \n',
                '   float firstRowY = 1.0 - (atlasFrameY + atlasFrameHeight); \n',

                '   int nRowSequenceElement = sequenceElement - firstRowSections; \n',
                '   float SNOverHS = float(nRowSequenceElement) / float(maxRowSections);\n',
                '   int nRowYTile = int(SNOverHS);\n',
                '   int nRowXTile = int((SNOverHS - float(nRowYTile)) * float(maxRowSections));\n',
                '   float nRowX = float(nRowXTile) * atlasFrameWidth;\n',
                '   float nRowY = 1.0 - ((float(nRowYTile) + 1.0) * (atlasFrameHeight) + atlasFrameY + atlasFrameHeight);\n',

                '   float nRow = step(float(firstRowSections), float(sequenceElement)); \n',
                '   uv.x = nRow * nRowX + (1.0 - nRow) * firstRowX; \n',
                '   uv.y = nRow * nRowY + (1.0 - nRow) * firstRowY; \n',
                '} \n',

                'void main()\n',
                '{\n',

                '   const vec2 right = vec2(1.0, 0.0);\n',
                '   const vec2 up = vec2(0.0, 1.0);\n',
                '   const vec2 left = vec2(-1.0, 0.0);\n',
                '   const vec2 down = vec2(0.0, -1.0);\n',

                '   const vec2 uRight = vec2(1.0, 1.0);\n',
                '   const vec2 uLeft = vec2(-1.0, 1.0);\n',
                '   const vec2 dLeft = vec2(-1.0, -1.0);\n',
                '   const vec2 dRight = vec2(1.0, -1.0);\n',

                '   vec4 viewPosition; \n',
                '   if (simulateInWorldSpace == 1) { \n',
                '       viewPosition = viewMatrix * particlePosition;\n',
                '   } else { \n',
                '       viewPosition = viewMatrix * modelMatrix * particlePosition;\n',
                '   } \n',
                '   float sequenceElementF = sequenceElement.x;\n',
                '   int sequenceNumber = int(sequenceElement.y);\n',
                '   int sequenceStart = int(sequenceElement.z);\n',
                '   int sequenceLength = int(sequenceElement.w);\n',
                '   vec4 atlasFrames = atlasFrameSet[sequenceNumber]; \n',

                '   vec2 uv1; \n',
                '   vec2 uv2; \n',
                '   vSequenceElementT = sequenceElementF - float(int(sequenceElementF)); \n',
                '   int firstSequenceElement = int(sequenceElementF); \n',
                '   int secondSequenceElement = clamp(firstSequenceElement + 1, sequenceStart, sequenceStart + sequenceLength - 1); \n',
                '   getUV(firstSequenceElement, sequenceNumber, atlasFrames, uv1); \n',
                '   if (interpolateAtlasFrames == 1 && firstSequenceElement != secondSequenceElement) { \n ',
                '       getUV(secondSequenceElement, sequenceNumber, atlasFrames, uv2); \n',
                '   } \n',
                '   float atlasFrameWidth = atlasFrames.z; \n',
                '   float atlasFrameHeight = atlasFrames.w; \n',

                '   float rotMag = rotation; \n',
                '   mat2 rotMat = mat2(cos(rotMag), -sin(rotMag), sin(rotMag), cos(rotMag)) * mat2(size.x, 0.0, 0.0, size.y);\n',

                '   float rightSide; \n',
                '   float upperSide; \n',

                '   if (instanced != 1) { \n',
                '       rightSide = step(2.0, customIndex); \n',
                '       vec2 upperSideStep = step(vec2(customIndex, 3.0), vec2(0.0, customIndex));\n',
                '       upperSide = upperSideStep.x + upperSideStep.y;\n',
                '   }  else { \n',
                '       rightSide = baseUV.x; \n',
                '       upperSide = baseUV.y; \n',
                '   } \n',

                '   float uvXOffset = atlasFrameWidth * rightSide; \n',
                '   float uvYOffset = atlasFrameHeight * upperSide; \n',

                '   vec2 rotVec; \n',

                '   if (instanced != 1) { \n',
                '       vec4 rotVecStep = step(vec4(customIndex, customIndex, 3.0, 2.0), vec4(0.0, 1.0, customIndex, customIndex)); \n',
                '       float uLeftV = rotVecStep.x; \n',
                '       float dLeftV = rotVecStep.y - rotVecStep.x; \n',
                '       float uRightV = rotVecStep.z; \n',
                '       float dRightV = rotVecStep.w - rotVecStep.z; \n',
                '       rotVec = uLeft * uLeftV + dLeft * dLeftV + dRight * dRightV + uRight * uRightV; \n',
                '   }  else { \n',
                '       rotVec = position.xy; \n ',
                '   } \n',

                '   gl_Position = projectionMatrix * (vec4(rotMat * rotVec, 0.0, 0.0) + viewPosition);\n',
                '   vUV1 = vec2(uv1.x + uvXOffset, uv1.y + uvYOffset);\n',
                '   vUV2 = vec2(uv2.x + uvXOffset, uv2.y + uvYOffset);\n',
                '   vFragColor = color; \n',
                '   vFragAlpha = alpha; \n',

            ].join('\n')

            if (useLogarithmicDepth) shader += '   \n  #include <logdepthbuf_vertex> \n'

            shader += '} \n'

            return shader
        },

        getFragmentShader(useWebGL2, useLogarithmicDepth) {

            let shader =`#include <common> \n${  this.FragmentVars  }\n`

            if (useLogarithmicDepth) shader += '  \n #include <logdepthbuf_pars_fragment> \n'

            shader += 'void main() { \n'

            if (useLogarithmicDepth) shader += '    \n  #include <logdepthbuf_fragment> \n'

            if (useWebGL2) {
                shader += [
                    '   vec4 color1 = texture(atlasTexture, vUV1 + uvOffset) * vec4(vFragColor, 1.0);\n',
                    '   vec4 color2 = color1; \n',
                    '   if (interpolateAtlasFrames == 1) color2 = texture(atlasTexture, vUV2 + uvOffset) * vec4(vFragColor, 1.0);\n',
                    '   gl_FragColor = mix(color1, color2, vSequenceElementT);\n',
                    '   gl_FragColor.a *= vFragAlpha; \n'
                ].join('\n')
            } else {
                shader += [
                    '   vec4 color1 = texture2D(atlasTexture, vUV1 + uvOffset) * vec4(vFragColor, 1.0);\n',
                    '   vec4 color2 = color1; \n',
                    '   if (interpolateAtlasFrames == 1) color2 = texture(atlasTexture, vUV2 + uvOffset) * vec4(vFragColor, 1.0);\n',
                    '   gl_FragColor = mix(color1, color2, vSequenceElementT);\n',
                    '   gl_FragColor.a *= vFragAlpha; \n'
                ].join('\n')
            }

            shader += '}\n'

            return shader
        }
    }

    static fromJSON(params) {
        const atlasJSON = params.atlas
        const atlasTexture = new THREE$1.TextureLoader().load(atlasJSON.texturePath)
        const atlas = new Atlas(atlasTexture, atlasJSON.texturePath)
        const framesets = atlasJSON.framesets
        for (const frameset of framesets) {
            atlas.addFrameSet(frameset.length, frameset.x, frameset.y, frameset.width, frameset.height)
        }
        const renderer = new AnimatedSpriteRenderer(params.instanced, atlas, atlasJSON.interpolateFrames)
        if (params.blending == 'Additive') {
            renderer.blending = THREE$1.AdditiveBlending
        } else {
            renderer.blending = THREE$1.NormalBlending
        }
        return renderer
    }

    toJSON(texturePathGenerator) {

        const defaultTexturePathGenerator = (atlas) => {
            if (atlas.texturePath) return atlas.texturePath
            const texture = atlas.getTexture()
            const textureSource = texture.source
            if (textureSource) {
                const textureData = textureSource.data
                if (textureData) {
                    const baseURI = textureData.baseURI
                    const currentSrc = textureData.currentSrc
                    const baseURISubStrLoc = currentSrc.indexOf(baseURI)
                    if (baseURISubStrLoc >= 0) {
                        return currentSrc.substr(baseURI.length, currentSrc.length - baseURI.length)
                    } 
                        return currentSrc
                    
                }
            }
        }

        texturePathGenerator = texturePathGenerator || defaultTexturePathGenerator

        const frameSets = []
        for (let i = 0; i < this.atlas.getFrameSetCount(); i++) {
            const frameSet = this.atlas.getFrameSet(i)
            frameSets.push(frameSet)
        }

        let blending = 'Normal'
        if (this.material.blending === THREE$1.AdditiveBlending) {
            blending = 'Additive'
        }

        const json = {
            'instanced': this.instanced,
            'blending': blending,
            'atlas': {
                'interpolateFrames': this.interpolateAtlasFrames,
                'texturePath': texturePathGenerator(this.atlas),
                'framesets': frameSets
            }
        }

        return json
    }
}

class ParticleEmitter {

    constructor() {
        this.emissionRelativeStartTime = 0.0
        this.emissionDuration = 0.0
        this.emitCount = 0
        this.age = 0.0
        this.timeActive = 0.0
        this.activeCount = 0
        this.maximumActiveParticles = 0
    }

    update(timeDelta) {
        this.internalUpdate(timeDelta)
        return 0
    }

    internalUpdate(timeDelta) {
        this.age += timeDelta
        this.timeActive = Math.max(this.age - this.emissionRelativeStartTime, 0.0)
        return this.age >= this.emissionRelativeStartTime &&
                (this.emissionDuration == 0.0 || (this.timeActive <= emissionDuration))
    }

    updateEmitCount(count) {
        this.emitCount += count
    }

}

class ContinuousParticleEmitter extends ParticleEmitter {

    constructor() {
        super()
        this.emissionMinimum = 0
        this.emissionMaximum = 0
    }

}

class ConstantParticleEmitter extends ContinuousParticleEmitter {

    constructor(emissionRate = 0.0) {
        super()
        this.emissionRate = emissionRate
    }

    update(timeDelta) {
        if (this.internalUpdate(timeDelta)) {
            const toEmitThisFrame = this.emissionRate * this.timeActive - this.emitCount
            if (toEmitThisFrame >= 1.0) {
                const iToEmitThisFrame = Math.floor(toEmitThisFrame)
                this.updateEmitCount(iToEmitThisFrame)
                return iToEmitThisFrame
            }
        }
        return 0
    }

    static fromJSON(params) {
        const emitter = new ConstantParticleEmitter()
        emitter.emissionRate = params.emissionRate || 0.0
        return emitter
    }

    toJSON() {
        return {
            'emissionRate': this.emissionRate
        }
    }
}

class BuiltinType {

    static Default = new BuiltinType('Default')
    static Vector2 = new BuiltinType('Vector2')
    static Vector3 = new BuiltinType('Vector3')
    static Vector4 = new BuiltinType('Vector4')
    static Color = new BuiltinType('Color')

    constructor(name) {
        this.name = name
    }

    static getTypeID(type) {
        let typeID = BuiltinType.Default
        if (type === THREE$1.Vector2) {
            typeID = BuiltinType.Vector2
        } else if (type === THREE$1.Vector3) {
            typeID = BuiltinType.Vector3
        } else if (type === THREE$1.Vector4) {
            typeID = BuiltinType.Vector4
        } else if (type === THREE$1.Color) {
            typeID = BuiltinType.Color
        }
        return typeID
    }

    static loadJSONParameter(param, type) {
        switch (type) {
            case THREE$1.Vector2:
                return new THREE$1.Vector2().fromArray(param)
            case THREE$1.Vector3:
                return new THREE$1.Vector3().fromArray(param)
            case THREE$1.Vector4:
                return new THREE$1.Vector4().fromArray(param)
            case THREE$1.Color:
                return new THREE$1.Color().fromArray(param)
        }

        return param
    }
}

class Generator {

    constructor(outType) {
        this.outType = outType
        this.outTypeID = BuiltinType.getTypeID(outType)
    }

}

class RandomGenerator extends Generator {

    constructor(outType, range, offset, uniformRange, uniformOffset, normalize) {
        super(outType)
        this.range = range
        this.offset = offset
        this.uniformRange = uniformRange
        this.uniformOffset = uniformOffset
        this.normalize = normalize
    }

    generate(out) {
        const uniformRange = Math.random() * this.uniformRange
        switch (this.outTypeID) {
            case BuiltinType.Default:
                out = Math.random() * this.range + this.offset
                if (this.normalize) out = out < 0 ? -1.0 : 1.0
            break
            case BuiltinType.Vector2:
                out.set(this.generateForElement(uniformRange, 'x'),
                        this.generateForElement(uniformRange, 'y'))
            break
            case BuiltinType.Vector3:
                out.set(this.generateForElement(uniformRange, 'x'),
                        this.generateForElement(uniformRange, 'y'),
                        this.generateForElement(uniformRange, 'z'))
            break
            case BuiltinType.Vector4:
                out.set(this.generateForElement(uniformRange, 'x'),
                        this.generateForElement(uniformRange, 'y'),
                        this.generateForElement(uniformRange, 'z'),
                        this.generateForElement(uniformRange, 'w'))
            break
        }

        if (this.normalize) out.normalize()
        return out
    }

    generateForElement(uniformRange, e) {
        return uniformRange + Math.random() * this.range[e] + this.offset[e] + this.uniformOffset
    }

    clone() {
        const clone = new RandomGenerator(this.outType, this.range, this.offset, this.uniformRange,
                                          this.uniformOffset, this.normalize)
        return clone
    }

    static getParameterJSON(param) {
        if (param instanceof THREE$1.Vector2 || param instanceof THREE$1.Vector3 ||
            param instanceof THREE$1.Vector4 || param instanceof THREE$1.Color) return param.toArray()
        return param
    }

    static fromJSON(params) {
        return new RandomGenerator(params.type,
                                   BuiltinType.loadJSONParameter(params.range, params.type),
                                   BuiltinType.loadJSONParameter(params.offset, params.type),
                                   params.uniformRange || 0.0, params.uniformOffset || 0.0, params.normalize)
    }

    toJSON(jsonTypeStore) {
        const params = {
            'range': RandomGenerator.getParameterJSON(this.range),
            'offset': RandomGenerator.getParameterJSON(this.offset),
            'uniformRange': this.uniformRange,
            'uniformOffset': this.uniformOffset
        }
        const type = jsonTypeStore.getTypePath(this.range.constructor)
        if (type !== undefined && type !== null) {
            params.type = type
        }
        return {
            'type': jsonTypeStore.getTypePath(RandomGenerator),
            'params': params
        }
    }
}

class LifetimeInitializer extends ParticleStateInitializer {

    constructor(range, offset, uniformRange, uniformOffset, normalize) {
        super()
        this.range = range
        this.offset = offset
        this.uniformRange = uniformRange
        this.uniformOffset = uniformOffset
        this.normalize = normalize
        this.generator = new RandomGenerator(0, this.range, this.offset, this.uniformRange, this.uniformOffset, this.normalize)
    }

    initializeState(state) {
        state.lifetime = this.generator.generate()
    }

    static fromJSON(particleSystem, params) {
        return new LifetimeInitializer(params.range, params.offset, params.uniformRange, params.uniformOffset, params.normalize)
    }

    toJSON() {
        return {
            'range': this.range,
            'offset': this.offset,
            'uniformRange': this.uniformRange,
            'uniformOffset': this.uniformOffset,
            'normalize': this.normalize
        }
    }
}

class RotationInitializer extends ParticleStateInitializer {

    constructor(generator) {
        super()
        this.generator = generator.clone()
    }

    initializeState(state) {
        state.rotation = this.generator.generate(state.rotation)
    }

    static fromJSON(particleSystem, params) {
        const generator = params.generator.type.fromJSON(params.generator.params)
        return new RotationInitializer(generator)
    }

    toJSON(typeStore) {
        return {
            'generator': this.generator.toJSON(typeStore)
        }
    }
}

class RotationalSpeedInitializer extends ParticleStateInitializer {

    constructor(range, offset, uniformRange, uniformOffset, normalize) {
        super()
        this.range = range
        this.offset = offset
        this.uniformRange = uniformRange
        this.uniformOffset = uniformOffset
        this.normalize = normalize
        this.generator = new RandomGenerator(0, this.range, this.offset, this.uniformRange, this.uniformOffset, this.normalize)
    }

    initializeState(state) {
        state.rotationalSpeed = this.generator.generate()
    }

    static fromJSON(particleSystem, params) {
        return new RotationalSpeedInitializer(params.range, params.offset, params.uniformRange, params.uniformOffset, params.normalize)
    }

    toJSON() {
        return {
            'range': this.range,
            'offset': this.offset,
            'uniformRange': this.uniformRange,
            'uniformOffset': this.uniformOffset,
            'normalize': this.normalize
        }
    }
}

class BoxPositionInitializer extends ParticleStateInitializer {

    constructor(range, offset) {
        super()
        this.randomGenerator = new RandomGenerator(THREE$1.Vector3, range, offset, 0.0, 0.0, false)
    }

    initializeState(state) {
        this.randomGenerator.generate(state.position)
    }

    static fromJSON(particleSystem, params) {
        return new BoxPositionInitializer(new THREE$1.Vector3().fromArray(params.range),
                                          new THREE$1.Vector3().fromArray(params.offset))
    }

    toJSON() {
        return {
            'range': this.randomGenerator.range.toArray(),
            'offset': this.randomGenerator.offset.toArray()
        }
    }
}

class SizeInitializer extends ParticleStateInitializer {

    constructor(generator) {
        super()
        this.generator = generator.clone()
    }

    initializeState(state) {
        this.generator.generate(state.size)
        state.initialSize.copy(state.size)
    }

    static fromJSON(particleSystem, params) {
        const generator = params.generator.type.fromJSON(params.generator.params)
        return new SizeInitializer(generator)
    }

    toJSON(typeStore) {
        return {
            'generator': this.generator.toJSON(typeStore)
        }
    }
}

class RandomVelocityInitializer extends ParticleStateInitializer {

    constructor(directionRange, directionOffset, speedRange, speedOffset, normalizeDirection = true) {
        super()
        this.directionGenerator = new RandomGenerator(THREE$1.Vector3, directionRange, directionOffset, 0.0, 0.0, true)
        this.speedGenerator = new RandomGenerator(0, speedRange, speedOffset, 0.0, 0.0, false)
        this.normalizeDirection = normalizeDirection
    }

    initializeState(state) {
        this.directionGenerator.generate(state.velocity)
        if (this.normalizeDirection) state.velocity.normalize()
        state.velocity.multiplyScalar(this.speedGenerator.generate())
    }

    static fromJSON(particleSystem, params) {
        return new RandomVelocityInitializer(new THREE$1.Vector3().fromArray(params.range),
                                             new THREE$1.Vector3().fromArray(params.offset),
                                             params.speedRange, params.speedOffset)
    }

    toJSON() {
        return {
            'range': this.directionGenerator.range.toArray(),
            'offset': this.directionGenerator.offset.toArray(),
            'speedRange': this.speedGenerator.range,
            'speedOffset': this.speedGenerator.offset
        }
    }
}

class SequenceInitializer extends ParticleStateInitializer {

    constructor(particleSequences, reverse = false) {
        super()
        this.setParticleSequences(particleSequences)
        this.reverse = reverse
    }

    setParticleSequences(particleSequences) {
        this.particleSequences = particleSequences
    }

    initializeState(state) {
        const sequenceIDs = this.particleSequences.getSequenceIDs()
        const r = sequenceIDs.length * Math.random()
        const ir = Math.floor(r)
        const sequenceID = sequenceIDs[ir]
        const sequence = this.particleSequences.getSequence(sequenceID)
        const sequenceElement = state.sequenceElement
        if (this.reverse) sequenceElement.x = sequence.length - 1
        else sequenceElement.x = sequence.start
        sequenceElement.y = sequence.id
        sequenceElement.z = sequence.start
        sequenceElement.w = sequence.length
        state.progressType = ParticleStateProgressType.Sequence
    }

    static fromJSON(particleSystem, params) {
        return new SequenceInitializer(particleSystem.getParticleSequences(), params.reverse)
    }

    toJSON() {
        return {
            'reverse': this.reverse
        }
    }
}

class SequenceOperator extends ParticleStateOperator {

    constructor(particleSequences, speed, loop = false, reverse = false) {
        super()
        this.particleSequences = particleSequences
        this.speed = speed
        this.loop = loop
        this.reverse = reverse
    }

   updateState(state, timeDelta) {
        const sequenceElement = state.sequenceElement
        const activeSequence = this.particleSequences.getSequence(sequenceElement.y)
        const tdOverS = timeDelta / this.speed
        if (this.reverse) {
            sequenceElement.x -= tdOverS
            if (sequenceElement.x < activeSequence.start) {
                sequenceElement.x = activeSequence.start + activeSequence.length
                if (!this.loop) return false
            }
        } else {
            sequenceElement.x += tdOverS
            if (sequenceElement.x >= activeSequence.start + activeSequence.length) {
                sequenceElement.x = activeSequence.start
                if (!this.loop) return false
            }
        }
        return true
    }

    static fromJSON(particleSystem, params) {
        return new SequenceOperator(particleSystem.getParticleSequences(), params.speed, params.loop, params.reverse)
    }

    toJSON() {
        return {
            'speed': this.speed,
            'loop': this.loop,
            'reverse': this.reverse
        }
    }

}

class ContinuousArray {

    constructor(ElementType, interpolator) {
        this.elements = []
        this.tValues = []
        this.elementTypeID = BuiltinType.getTypeID(ElementType)
        if (interpolator) {
            this.interpolator = interpolator
        } else {
            this.interpolator = this.getInterpolatorForTypeID(this.elementTypeID)
        }
    }

    * [Symbol.iterator]() {
        let index = 0
        while (index < this.getElementCount()) {
            yield {
                'element': this.elements[index],
                'tValue': this.tValues[index]
            }
            index++
        }
    }

    getElementCount() {
        return this.elements.length
    }

    getElement(index) {
        if (index >= this.getElementCount()) {
            throw new Error('ContinuousArray::getElement() -> "index" is out of bounds.')
        }
        return this.elements[index]
    }

    getTValue(index) {
        if (index >= this.getElementCount()) {
            throw new Error('ContinuousArray::getTValue() -> "index" is out of bounds.')
        }
        return this.tValues[index]
    }

    addElement(element, tValue) {
        this.elements.push(element)
        this.tValues.push(tValue)
    }

    getInterpolatedElement(t, out) {
        return this.interpolator(t, this.elements, this.tValues, out)
    }

    getInterpolatorForTypeID = function() {

        const iResult = {
            'lowerIndex': 0,
            'upperIndex': 0,
            'localT': 0.0
        }
        const upper2 = new THREE$1.Vector2()
        const upper3 = new THREE$1.Vector3()
        const upper4 = new THREE$1.Vector4()
        const upperC = new THREE$1.Color()

        const getVectorBasedInterpolator = (upperVector) => (tValue, elements, tValues, out) => {
                ContinuousArray.getInterpolationValuesForTValue(tValues, tValue, iResult)
                upperVector.copy(elements[iResult.upperIndex]).multiplyScalar(iResult.localT)
                out.copy(elements[iResult.lowerIndex]).multiplyScalar((1.0 - iResult.localT)).add(upperVector)

            }

        return function(typeID) {
            switch (typeID) {
                case BuiltinType.Default:
                    return (tValue, elements, tValues) => {
                        ContinuousArray.getInterpolationValuesForTValue(tValues, tValue, iResult)
                        return (1.0 - iResult.localT) * elements[iResult.lowerIndex] +
                                iResult.localT * elements[iResult.upperIndex]
                    }
                case BuiltinType.Vector2:
                    return getVectorBasedInterpolator(upper2)
                case BuiltinType.Vector3:
                    return getVectorBasedInterpolator(upper3)
                case BuiltinType.Vector4:
                    return getVectorBasedInterpolator(upper4)
                case BuiltinType.Color:
                    return getVectorBasedInterpolator(upperC)
            }
        }

    }()

    static getInterpolationValuesForTValue(tValues, t, iResult) {
        const tValueCount = tValues.length
        if (tValueCount === 0) {
            iResult.lowerIndex = -1
            iResult.upperIndex = -1
            iResult.localT = -1.0
            return
        }
        let tValue = 0.0
        let lowerIndex = -1
        let upperIndex = 0
        for (let i = 0; i < tValueCount; i++) {
            tValue = tValues[i]
            if (tValue > t) break
            lowerIndex++
            upperIndex++
        }
        iResult.lowerIndex = Utils.clamp(lowerIndex, 0, tValueCount - 1)
        iResult.upperIndex = Utils.clamp(upperIndex, 0, tValueCount - 1)
        const lowerTValue = tValues[lowerIndex]
        const upperTValue = tValues[upperIndex]
        iResult.localT = (t - lowerTValue) / (upperTValue - lowerTValue)
    }

}

class InterpolatorOperator extends ParticleStateOperator {

    constructor(ElementType, relativeToInitialValue = false) {
        super()
        this.relativeToInitialValue = relativeToInitialValue
        this.interpolationElements = new ContinuousArray(ElementType)
    }

    addElement(element, tValue) {
        this.interpolationElements.addElement(element, tValue)
    }

    addElements(elementTValuePairs) {
        for (const pair of elementTValuePairs) {
            this.interpolationElements.addElement(pair[0], pair[1])
        }
    }

    addElementsFromElementClassAndParameters(ElementClass, elementParametersTValuePairs) {
        for (const pair of elementParametersTValuePairs) {
            const [...args] = pair[0]
            this.interpolationElements.addElement(new ElementClass(...args), pair[1])
        }
    }

    getInterpolatedValue(state, out) {
        let t = 0
        switch (state.progressType) {
            case ParticleStateProgressType.Time:
            {
                const lifetime = state.lifetime
                if (lifetime != 0.0) {
                    t = state.age / state.lifetime
                } else {
                    t = state.age
                }
            }
            break
            case ParticleStateProgressType.Sequence:
                t = state.sequenceElement.x / state.sequenceElement.w
            break
        }
        return this.interpolationElements.getInterpolatedElement(t, out)
    }

}

class OpacityInterpolatorOperator extends InterpolatorOperator {

    constructor(relativeToInitialValue = false) {
        super(0, relativeToInitialValue)
    }

    addElementsFromParameters(elementParametersTValuePairs) {
        super.addElements(elementParametersTValuePairs)
    }

    updateState(state) {
        if (this.relativeToInitialValue) {
            state.alpha = state.initialAlpha * this.getInterpolatedValue(state, state.alpha)
        } else {
            state.alpha = this.getInterpolatedValue(state, state.alpha)
        }
        return true
    }


    static fromJSON(particleSystem, params) {
        return new OpacityInterpolatorOperator(params.relativeToInitialValue)
    }

    toJSON() {
        const params = {
            'relativeToInitialValue': this.relativeToInitialValue
        }
        const elements = [...this.interpolationElements].map((element) => [element.element, element.tValue])
        return {
            'params': params,
            'elements': elements
        }
    }

}

class SizeInterpolatorOperator extends InterpolatorOperator {

    constructor(relativeToInitialValue = false) {
        super(THREE$1.Vector2, relativeToInitialValue)
    }

    addElementsFromParameters(elementParametersTValuePairs) {
        super.addElementsFromElementClassAndParameters(THREE$1.Vector2, elementParametersTValuePairs)
    }

    updateState = function() {

        const tempSize = new THREE$1.Vector2()

        return function(state) {
            this.getInterpolatedValue(state, tempSize)
            if (this.relativeToInitialValue) {
                state.size.set(state.initialSize.x * tempSize.x,
                               state.initialSize.y * tempSize.y)
            } else {
                state.size.copy(tempSize)
            }
            return true
        }

    }()

    static fromJSON(particleSystem, params) {
        return new SizeInterpolatorOperator(params.relativeToInitialValue)
    }

    toJSON() {
        const params = {
            'relativeToInitialValue': this.relativeToInitialValue
        }
        const elements = [...this.interpolationElements].map((element) => [element.element.toArray(), element.tValue])
        return {
            'params': params,
            'elements': elements
        }
    }

}

class ColorInterpolatorOperator extends InterpolatorOperator {

    constructor(relativeToInitialValue = false) {
        super(THREE$1.Color, relativeToInitialValue)
    }

    addElementsFromParameters(elementParametersTValuePairs) {
        super.addElementsFromElementClassAndParameters(THREE$1.Color, elementParametersTValuePairs)
    }

    updateState = function() {

        const tempColor = new THREE$1.Color()

        return function(state) {
            this.getInterpolatedValue(state, tempColor)
            if (this.relativeToInitialValue) {
                state.color.setRGB(state.initialColor.r * tempColor.r,
                                   state.initialColor.g * tempColor.g,
                                   state.initialColor.b * tempColor.b)
            } else {
                state.color.copy(tempColor)
            }
            return true
        }

    }()

    static fromJSON(particleSystem, params) {
        return new ColorInterpolatorOperator(params.relativeToInitialValue)
    }

    toJSON() {
        const params = {
            'relativeToInitialValue': this.relativeToInitialValue
        }
        const elements = [...this.interpolationElements].map((element) => [element.element.toArray(), element.tValue])
        return {
            'params': params,
            'elements': elements
        }
    }
}

class AccelerationOperator extends ParticleStateOperator {

    constructor(generator) {
        super()
        this.generator = generator.clone()
    }

    addElementsFromParameters(elementParametersTValuePairs) {
        super.addElementsFromElementClassAndParameters(THREE.Vector3, elementParametersTValuePairs)
    }

    updateState(state) {
        this.generator.generate(state.acceleration)
        return true
    }

    static fromJSON(particleSystem, params) {
        const generator = params.generator.type.fromJSON(params.generator.params)
        return new AccelerationOperator(generator)
    }

    toJSON(typeStore) {
        return {
            'generator': this.generator.toJSON(typeStore)
        }
    }
}

class SphereRandomGenerator extends Generator {

    constructor(rangeTheta, offsetTheta, rangePhi, offsetPhi, rangeRadius, offsetRadius,
                scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ) {
        super(THREE$1.Vector3)
        this.rangeTheta = rangeTheta
        this.offsetTheta = offsetTheta
        this.rangePhi = rangePhi
        this.offsetPhi = offsetPhi
        this.rangeRadius = rangeRadius
        this.offsetRadius = offsetRadius

        this.scaleX = scaleX
        this.scaleY = scaleY
        this.scaleZ = scaleZ

        this.offsetX = offsetX
        this.offsetY = offsetY
        this.offsetZ = offsetZ

        this.tempUp = new THREE$1.Vector3().set(0.0, 1.0, 0.0)
    }

    generate(out) {
        this.tempUp.set(0.0, 1.0, 0.0)
        const theta = Math.random() * this.rangeTheta + this.offsetTheta
        const phi = Math.random() * this.rangePhi + this.offsetPhi
        const thetaX = Math.cos(theta)
        const thetaY = Math.sin(theta)
        const phiX = Math.cos(phi)
        const phiY = Math.sin(phi)

        out.set(thetaX, 0.0, -thetaY)
        out.multiplyScalar(phiX)
        this.tempUp.multiplyScalar(phiY)
        out.add(this.tempUp)

        out.normalize()

        const radius = Math.random() * this.rangeRadius + this.offsetRadius
        out.multiplyScalar(radius)

        out.x *= this.scaleX
        out.y *= this.scaleY
        out.z *= this.scaleZ

        out.x += this.offsetX
        out.y += this.offsetY
        out.z += this.offsetZ
    }

    clone() {
        const clone = new SphereRandomGenerator(this.rangeTheta, this.offsetTheta, this.rangePhi, this.offsetPhi,
                                                this.rangeRadius, this.offsetRadius, this.scaleX, this.scaleY,
                                                this.scaleZ, this.offsetX, this.offsetY, this.offsetZ)
        return clone
    }

    static fromJSON(params) {
        return new SphereRandomGenerator(params.rangeTheta, params.offsetTheta, params.rangePhi, params.offsetPhi,
                                         params.rangeRadius, params.offsetRadius, params.scaleX, params.scaleY,
                                         params.scaleZ, params.offsetX, params.offsetY, params.offsetZ)
    }

    toJSON(jsonTypeStore) {
        return {
            'type': jsonTypeStore.getTypePath(SphereRandomGenerator),
            'params': {
                'rangeTheta': this.rangeTheta,
                'offsetTheta': this.offsetTheta,
                'rangePhi': this.rangePhi,
                'offsetPhi': this.offsetPhi,
                'rangeRadius': this.rangeRadius,
                'offsetRadius': this.offsetRadius,
                'scaleX': this.scaleX,
                'scaleY': this.scaleY,
                'scaleZ': this.scaleZ,
                'offsetX': this.offsetX,
                'offsetY': this.offsetY,
                'offsetZ': this.offsetZ
            }
        }
    }

}

class Component {

    constructor() {
    }

}

class FlickerLight extends Component {

    constructor(parent, intensity, intensityFlux, color, distance, decay, shadows = undefined) {
        super()
        this.owner = null
        this.light = null
        this.lastUpdateTime = performance.now() / 1000
        this.lastIntensityFlickerTime = this.lastUpdateTime
        this.lastPositionFlickerTime = this.lastUpdateTime
        this.lastIntensityAdjuster = 1.0
        this.nextIntensityAdjuster = 1.0
        this.lastPositionAdjuster = new THREE$1.Vector3()
        this.positionAdjuster = new THREE$1.Vector3()
        this.intensity = 1.0
        this.intensityFlux = 2
        this.parent = parent

        this.init(parent, intensity, intensityFlux, color, distance, decay, shadows)
    }

    init(parent, intensity, intensityFlux, color, distance, decay, shadows = undefined) {
        this.owner = new THREE$1.Object3D()
        parent.add(this.owner)

        color = color || new THREE$1.Color()
        distance = distance || 0
        if (decay == null || decay == undefined) decay = 2.0
        const shadowsEnabled = !!shadows

        this.light = new THREE$1.PointLight(0xffffff, 2, 0, 1)
        this.light.color.copy(color)
        this.light.distance = distance
        this.light.decay = decay
        this.light.castShadow = shadowsEnabled
        if (shadowsEnabled) {
            this.light.shadow.mapSize.width = shadows.mapSize || 512
            this.light.shadow.mapSize.height = shadows.mapSize || 512
            this.light.shadow.camera.near = shadows.cameraNear || 0.5
            this.light.shadow.camera.far = shadows.cameraFar || 500
            this.light.shadow.bias = shadows.bias || 0.0001
            this.light.shadow.radius = shadows.edgeRadius || 1
        }

        this.owner.add(this.light)
        this.intensity = intensity
        this.intensityFlux = intensityFlux

        return this.light
    }
    dispose () {
        // this.owner.dispose()
        this.parent.remove(this.owner)
    }

    getLight() {
        return this.light
    }

    setIntensity(intensity) {
        this.intensity = intensity
    }

    update(time) {

        const elapsedTimeSinceLastIntensityFlicker = time - this.lastIntensityFlickerTime
        const flickerIntensityIntervalsPerSecond = 8.0
        const flickerIntensityIntervalLength = 1.0 / flickerIntensityIntervalsPerSecond
        const perUpdateIntervalIntensityFluxRange = this.intensityFlux
        const intensityFactorRangeLowerBound = 0.25
        const intensityFactorRangeUpperBound = 1.5

        if (elapsedTimeSinceLastIntensityFlicker > flickerIntensityIntervalLength) {
            this.lastIntensityFlickerTime = time

            const intensityDiff = (Math.random() - 0.5) * 2.0 *
                                   perUpdateIntervalIntensityFluxRange * flickerIntensityIntervalLength

            let intensityAdjuster = 1.0 + intensityDiff
            const diff = (intensityAdjuster - this.lastIntensityAdjuster)
            intensityAdjuster = this.lastIntensityAdjuster + diff

            this.lastIntensityAdjuster = this.nextIntensityAdjuster
            this.nextIntensityAdjuster = Utils.clamp(intensityAdjuster,
                                                     intensityFactorRangeLowerBound, intensityFactorRangeUpperBound)

        } else {
            const elapsedFlickerIntensityT = elapsedTimeSinceLastIntensityFlicker / flickerIntensityIntervalLength
            const intensityAdjuster = (1.0 - elapsedFlickerIntensityT) * this.lastIntensityAdjuster +
                                      elapsedFlickerIntensityT * this.nextIntensityAdjuster
            this.light.intensity = intensityAdjuster * this.intensity
        }

        const elapsedTimeSinceLastPositionFlicker = time - this.lastPositionFlickerTime
        const flickerPositionIntervalsPerSecond = 16.0
        const flickerPositionIntervalLength = 1.0 / flickerPositionIntervalsPerSecond

        if (elapsedTimeSinceLastPositionFlicker > flickerPositionIntervalLength) {
            this.lastPositionFlickerTime = time

            const deltaTime = time - this.lastUpdateTime
            this.positionAdjuster.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            this.positionAdjuster.multiplyScalar(deltaTime)

            this.positionAdjuster.add(this.lastPositionAdjuster)
            this.positionAdjuster.multiplyScalar(0.5)

            this.owner.position.copy(this.positionAdjuster)

            this.lastPositionAdjuster.copy(this.positionAdjuster)
            this.lastUpdateTime = time
        }
    }
}

class JSONTypeStore {

    constructor() {
        this.jsonTypes = {
            'default': {}
        }
        this.jsonTypeNames = {}
        this.typeIDGen = 0
    }

    addType(typeName, type) {
        this.addTypeToNamespace('default', typeName, type)
    }

    addTypeToNamespace(namespace, typeName, type) {
        if (!this.jsonTypes[namespace]) {
            throw new Error('JSONTypeStore::addTypeToNamespace() -> namespace does not exist')
        }
        if (this.jsonTypes[namespace][typeName]) {
            throw new Error('JSONTypeStore::addTypeToNamespace() -> typeName already exists')
        }

        if (this.checkAndAddTypeName(type, typeName, namespace)) {
            this.jsonTypes[namespace][typeName] = type
        }
    }

    addNamespace(namespace, namespaceObject) {
        if (this.jsonTypes[namespace]) {
            throw new Error('JSONTypeStore::addNamespace() -> namespace already exists')
        }
        this.jsonTypes[namespace] = namespaceObject
        for (const typeName in namespaceObject) {
            if (!namespaceObject.hasOwnProperty || namespaceObject.hasOwnProperty(typeName)) {
                const type = namespaceObject[typeName]
                this.checkAndAddTypeName(type, typeName, namespace)
            }
        }
    }

    checkAndAddTypeName(type, typeName, namespace) {
        if (typeof type === 'function') {
            const typeID = this.typeIDGen++
            type.___photonsTypeID = typeID
            this.jsonTypeNames[typeID] = {
                'namespace': namespace,
                'typeName': typeName
            }
        }
    }

    getType(namespace, typeName) {
        if (!this.jsonTypes[namespace]) {
            throw new Error('JSONTypeStore::getType() -> namespace does not exist')
        }
        if (!this.jsonTypes[namespace][typeName]) {
            throw new Error('JSONTypeStore::getType() -> typeName does not exist')
        }

        return this.jsonTypes[namespace][typeName]
    }

    getTypeNames(type) {
        return this.jsonTypeNames[type.___photonsTypeID]
    }

    getTypePath(type) {
        const typeNames = this.getTypeNames(type)
        if (typeNames) {
            return `${typeNames.namespace}.${typeNames.typeName}`
        } 
            return undefined
        
    }

    parseNamespaceAndTypename(typeStr) {
        const components = typeStr.split('.')
        const namespace = components[0]
        components.splice(0, 1)
        const typeName = components.join('.')
        return {
            'namespace': namespace,
            'typeName': typeName
        }
    }

    parseTypeString(typeStr) {
        const {namespace, typeName} = this.parseNamespaceAndTypename(typeStr)
        return this.getType(namespace, typeName)
    }

}

export { AccelerationOperator, AnimatedSpriteRenderer, Atlas, BaseParticleStateInitializer, BaseParticleStateOperator, BoxPositionInitializer, ColorInterpolatorOperator, ConstantParticleEmitter, FlickerLight, JSONTypeStore, LifetimeInitializer, Manager, OpacityInterpolatorOperator, ParticleStateArray, ParticleSystem, ParticleSystemState, RandomGenerator, RandomVelocityInitializer, Renderer, RotationInitializer, RotationalSpeedInitializer, SequenceInitializer, SequenceOperator, SizeInitializer, SizeInterpolatorOperator, SphereRandomGenerator }
//# sourceMappingURL=photons.module.js.map
