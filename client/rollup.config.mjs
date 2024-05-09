import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import hmr from 'rollup-plugin-reloadsite';
import styles from 'rollup-plugin-styles';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
import serve from 'rollup-plugin-serve';

import fg from 'fast-glob';

import { fileURLToPath } from 'url';
import path from 'path';
// import config from 'config';

// expose __filename & __dirname usually not supported in the module system
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if production
const production = !process.env.ROLLUP_WATCH;

// fetch all .js files in the src directory
const srcDir = path.join(__dirname, './src');
const globPat = path.join(srcDir, '**/*.js');
const entries = fg.sync([globPat], { ignore: ['**/lib/**', '**/vendor/**'] });

// build each
const script_exports = entries.map((filePath) => {
  let name = path.relative(srcDir, filePath).split('.').shift();

  return {
    input: filePath,
    output: {
      sourcemap: !production,
      name: 'app',
      format: 'iife',
      file: `./build/${name}${production ? '.min' : ''}.js`,
    },

    plugins: [
      // first clear build dir in production
      production && del({ targets: 'build/*' }),

      // replace strings
      replace({
        preventAssignment: true,
        __ENV__: production ? 'production' : 'development',
      }),

      // handle css/sass
      styles(),

      // handle json
      json(),

      // manage modules
      resolve({
        browser: true,
        dedupe: ['svelte'],
        exportConditions: ['svelte'],
      }),
      commonjs(),

      // process svelte
      svelte({
        compilerOptions: {
          // enable run-time checks when not in production
          dev: !production,
          // css: 'injected'
        },

        preprocess: sveltePreprocess({
          replace: [
            [
              /process\.env\.(\w+)/g,
              (_, prop) => JSON.stringify(process.env[prop]),
            ],
          ],
        }),
      }),

      // minify output
      production && terser({ output: { comments: false } }),

      // run server on dev mode
      !production &&
      serve({
        open: true,
        host: 'localhost',
        port: 10001,
        openPage: '/examples/index.html',
      }),

      // hot module reload during
      hmr({
        dirs: ['./public', '../server/www/static'],
        filter: '**/cms-front.js',
      }),
    ],

    // watch
    watch: {
      clearScreen: false,
    },
  };
});

export default script_exports;
