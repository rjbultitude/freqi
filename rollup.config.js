import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/freqi.ts',
  plugins: [
    typescript()
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
