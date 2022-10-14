// rollup.config.js
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

let plugins = [
  typescript(),
  resolve(),
  commonjs(),
  json(),
]

export default {
  plugins: plugins,
  input: 'src/main.ts',
  external: ['path', 'fs', 'url', 'axios'],
  output: {
    name: 'wda',
    file: 'dist/wda.js',
    format: 'cjs',
    sourcemap: true
  }
}