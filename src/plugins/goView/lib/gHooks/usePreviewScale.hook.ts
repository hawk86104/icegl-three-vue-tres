import throttle from 'lodash/throttle'

// 拆出来是为了更好的分离单独复用

// * 屏幕缩放适配（两边留白）
export const usePreviewFitScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {
  // * 画布尺寸（px）
  const baseWidth = width
  const baseHeight = height

  // * 默认缩放值
  const scale = {
    width: 1,
    height: 1,
  }

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // 当前屏幕宽高比
    const currentRate = parseFloat(
      (window.innerWidth / window.innerHeight).toFixed(5)
    )
    if (scaleDom) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5))
        scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5))
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      } else {
        // 表示更高
        scale.height = parseFloat(((window.innerWidth / baseProportion) / baseHeight).toFixed(5))
        scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5))
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      }
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * 卸载监听
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}

// *  X轴撑满，Y轴滚动条
export const usePreviewScrollYScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {
  // * 画布尺寸（px）
  const baseWidth = width
  const baseHeight = height

  // * 默认缩放值
  const scale = {
    width: 1,
    height: 1,
  }

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    if (scaleDom) {
      scale.height = parseFloat(((window.innerWidth / baseProportion) / baseHeight).toFixed(5))
      scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5))
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * 卸载监听
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}

// *  Y轴撑满，X轴滚动条
export const usePreviewScrollXScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {
  // * 画布尺寸（px）
  const baseWidth = width
  const baseHeight = height

  // * 默认缩放值
  const scale = {
    height: 1,
    width: 1,
  }

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    if (scaleDom) {
      scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5))
      scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5))
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * 卸载监听
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}

// * 变形内容，宽高铺满
export const usePreviewFullScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {

  // * 默认缩放值
  const scale = {
    width: 1,
    height: 1,
  }

  const calcRate = () => {
    if (scaleDom) {
      scale.width = parseFloat((window.innerWidth / width).toFixed(5))
      scale.height = parseFloat((window.innerHeight / height).toFixed(5))
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * 卸载监听
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}