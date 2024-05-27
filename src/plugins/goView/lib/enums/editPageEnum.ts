// 鼠标点击左右键
export enum MouseEventButton {
  LEFT = 1,
  RIGHT = 2
}

// 页面拖拽键名
export enum DragKeyEnum {
  DRAG_KEY = 'ChartData'
}

// 不同页面保存操作
export enum SavePageEnum {
  CHART = 'SaveChart',
  CHART_TO_PREVIEW = 'ChartToPreview',
  JSON = 'SaveJSON',
  CLOSE = 'close'
}

// 操作枚举
export enum MenuEnum {
  // 移动
  ARROW_UP = 'up',
  ARROW_RIGHT = 'right',
  ARROW_DOWN = 'down',
  ARROW_LEFT = 'left',
  // 删除
  DELETE = 'delete',
  // 复制
  COPY = 'copy',
  // 剪切
  CUT = 'cut',
  // 粘贴
  PARSE = 'parse',
  // 置顶
  TOP = 'top',
  // 置底
  BOTTOM = 'bottom',
  // 上移
  UP = 'up',
  // 下移
  DOWN = 'down',
  // 清空剪贴板
  CLEAR = 'clear',
  // 成组
  GROUP = 'group',
  // 解组
  UN_GROUP = 'unGroup',
  // 后退
  BACK = 'back',
  // 前进
  FORWORD = 'forward',
  // 保存
  SAVE = 'save',
  // 锁定
  LOCK = 'lock',
  // 解除锁定
  UNLOCK = 'unLock',
  // 隐藏
  HIDE = 'hide',
  // 显示
  SHOW = 'show'
}

// Win 键盘枚举
export enum WinKeyboard {
  CTRL = 'ctrl',
  SHIFT = 'shift',
  ALT = ' alt',
  CTRL_SOURCE_KEY = 'control',
  SHIFT_SOURCE_KEY = 'shift',
  ALT_SOURCE_KEY = 'alt',
  SPACE = 'Space'
}

// Mac 键盘枚举
export enum MacKeyboard {
  // 还是用 Command 吧
  CTRL = '⌘',
  SHIFT = '⇧',
  ALT = '⌥',
  CTRL_SOURCE_KEY = '⌘',
  SHIFT_SOURCE_KEY = '⇧',
  ALT_SOURCE_KEY = '⌥',
  SPACE = 'Space'
}
