/**
 * @author pschroen / https://ufo.ai/
 */

import {
    AddOperation,
    BackSide,
    ClampToEdgeWrapping,
    DoubleSide,
    FrontSide,
    MirroredRepeatWrapping,
    MixOperation,
    MultiplyOperation,
    RepeatWrapping
} from 'three';

export const VisibleOptions = {
    Off: false,
    Visible: true
};

export const SideOptions = {
    Front: FrontSide,
    Back: BackSide,
    Double: DoubleSide
};

export const FlatShadingOptions = {
    Off: false,
    Flat: true
};

export const WireframeOptions = {
    Off: false,
    Wire: true
};

export const CombineOptions = {
    Multiply: MultiplyOperation,
    Mix: MixOperation,
    Add: AddOperation
};

export const WrapOptions = {
    Repeat: RepeatWrapping,
    Clamp: ClampToEdgeWrapping,
    Mirror: MirroredRepeatWrapping
};

export const HelperOptions = {
    Off: false,
    Helper: true
};

export const NormalsHelperOptions = {
    Off: false,
    Normals: true
};

export const TangentsHelperOptions = {
    Off: false,
    Tangents: true
};

export const UVHelperOptions = {
    Off: false,
    UV: true
};
