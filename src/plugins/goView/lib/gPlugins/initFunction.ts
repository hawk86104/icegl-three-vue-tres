/**
 * * 页面初始化就执行的函数
 */
export const initFunction = async () => {
  // 捕获全局错误
  window.addEventListener("unhandledrejection", event => {
    console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  });
}