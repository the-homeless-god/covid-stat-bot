import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'

const mode = process.env.NODE_ENV

export default {
  input: 'sources/index.ts',
  output: {
    sourcemap: true,
    name: 'app',
    format: 'cjs',
    file: 'build/index.js',
  },
  plugins: [
    replace({
      'process.browser': false,
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    resolve(),
    commonjs(),
    typescript(),

    babel({
      extensions: ['.js', '.ts', '.mjs', '.html', '.svelte'],
      runtimeHelpers: true,
      exclude: ['node_modules/@babel/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead',
          },
        ],
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
      ],
    }),
  ],
  external: Object.keys(pkg.dependencies).concat(
    require('module').builtinModules || Object.keys(process.binding('natives')),
  ),
}
