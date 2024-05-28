/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 11:33:03
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 14:44:06
 */
// import { listen } from 'dom-helpers'
// import throttle from 'lodash/throttle'

let prevMoveXValue = [0, 0]
let prevMoveYValue = [0, 0]

// 拖拽处理
export const dragCanvas = (e: MouseEvent) => {
  const previewBoxDom = document.querySelector('.go-preview') as HTMLElement
  if (!previewBoxDom || previewBoxDom.style.position !== 'absolute') return
  if (!window.$KeyboardActive?.space) return

  e.preventDefault()
  e.stopPropagation()
  // @ts-ignore
  document.activeElement?.blur()
  const startX = e.screenX
  const startY = e.screenY

  // const listenMousemove = listen(
  //   window,
  //   'mousemove',
  //   throttle((moveEvent: MouseEvent) => {
  //     const nx = moveEvent.screenX - startX
  //     const ny = moveEvent.screenY - startY

  //     const [prevMoveX1, prevMoveX2] = prevMoveXValue
  //     const [prevMoveY1, prevMoveY2] = prevMoveYValue

  //     prevMoveXValue = [prevMoveX2, nx]
  //     prevMoveYValue = [prevMoveY2, ny]

  //     // 去除小数部分
  //     if (previewBoxDom) {
  //       const oldLeft = previewBoxDom.style.left ? Number(previewBoxDom.style.left.split('px')[0]) : 0
  //       const oldTop = previewBoxDom.style.top ? Number(previewBoxDom.style.top.split('px')[0]) : 0
  //       previewBoxDom.style.left =
  //         oldLeft +
  //         (prevMoveX2 > prevMoveX1 ? Math.abs(prevMoveX2 - prevMoveX1) : -Math.abs(prevMoveX2 - prevMoveX1)) +
  //         'px'
  //       previewBoxDom.style.top =
  //         oldTop +
  //         (prevMoveY2 > prevMoveY1 ? Math.abs(prevMoveY2 - prevMoveY1) : -Math.abs(prevMoveY2 - prevMoveY1)) +
  //         'px'
  //     }
  //   }, 20)
  // )

  // const listenMouseup = listen(window, 'mouseup', () => {
  //   prevMoveXValue = [0, 0]
  //   prevMoveYValue = [0, 0]
  //   listenMousemove()
  //   listenMouseup()
  // })
}
