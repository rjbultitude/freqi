import typescript from 'rollup-plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: './src/freqi.ts',
  plugins: [
    typescript(),
    json(),
  ],
  output: [{
    file: './lib/freqi.js',
    format: 'umd',
    name: 'freqi'
  }, {
    file: './lib/freqi.mjs',
    format: 'es',
    name: 'freqi'
  }]
};
