import resolve from '@rollup/plugin-node-resolve';
import { terser, timestamp } from 'rollup-plugin-bundleutils';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  preserveEntrySignatures: 'allow-extension',
  output: {
    dir: 'public/assets/js',
    entryFileNames: 'loader.js',
    chunkFileNames: ({ name }) => `${name.toLowerCase()}.js`,
    format: 'es',
    minifyInternalExports: false
  },
  plugins: [
    resolve({
      browser: true
    }),
    production && terser({
      output: {
        preamble: `// ${timestamp()}`
      },
      keep_classnames: true,
      keep_fnames: true
    })
  ]
};
