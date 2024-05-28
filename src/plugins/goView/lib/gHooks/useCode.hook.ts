import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'

// * code 展示
export const useCode = () => {
  hljs.registerLanguage('json', json)
  hljs.registerLanguage('typescript', typescript)
  return hljs
}
