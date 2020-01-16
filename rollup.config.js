import babel from 'rollup-plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    image(),
    url(),
    svgr(),
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      preferBuiltins: false,
    }),
    commonjs({
      namedExports: {
        'react-is': ['isFragment', 'ForwardRef'],
        'subscriptions-transport-ws': ['SubscriptionClient']
      }
    })
  ]
}
