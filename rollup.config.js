import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: !production
  },
  plugins: [
    resolve(),
    commonjs(),
    production && terser(),
    sass({
      output: 'dist/bundle.css',
      processor: css => postcss([autoprefixer])
        .process(css)
        .then(result => result.css)
    })
  ]
};
