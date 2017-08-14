import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import gasEntryGenerator from 'gas-entry-generator'

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: 'node_modules/**'
    }),
    gas(),
    uglify({ie8: true}, minify)
  ]
}

function gas(option = {}) {
  return {
    name: 'gas',
    transformBundle(code) {
      return {
        code: gasify(code)
      }
    }
  }
}

function gasify(code) {
  const entries = gasEntryGenerator(code)
  return `var global = this;${entries}${code}`
}