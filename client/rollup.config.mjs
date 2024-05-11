import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import hmr from 'rollup-plugin-reloadsite';
import styles from 'rollup-plugin-styles';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
import serve from 'rollup-plugin-serve';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import _ from 'lodash';

import fg from 'fast-glob';
import path from 'path';

// import config from 'config';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// console.log({require});
import { fileURLToPath } from 'url';
// expose __filename & __dirname usually not supported in the module system
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if production
const production = !process.env.ROLLUP_WATCH;

// fetch all .js files in the src directory
const srcDir = path.join(__dirname, './src');
const globPat = path.join(srcDir, '**/index.js');
const entries = fg.sync([globPat], { ignore: ['**/lib/**', '**/vendor/**'] });

// build each
const script_exports = entries.map((filePath) => {
  let relPath = path.relative(srcDir, filePath);

  let dirName = path.basename(path.dirname(relPath));
  let name = _.camelCase(dirName);
  relPath = path.dirname(path.dirname(relPath));
  let file = path.join('./build', relPath, name + '.js');

  // return
  console.log({name, file});

  let config = {
    input: filePath,

    // external:['mdsvex'],

    output: {
      sourcemap: !production,
      name: _.camelCase(['cmsFront', name]),
      format: 'iife',
      file,
      // globals: {
      //   mdsvex,
      // },
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
      nodePolyfills(),

      resolve({
        browser: true,
        dedupe: ['svelte'],
        exportConditions: ['svelte'],
      }),

      commonjs({ transformMixedEsModules: true }),

      // // process svelte
      svelte({
        // these are the defaults. If you want to add more extensions, see https://mdsvex.pngwn.io/docs#extensions
        extensions: ['.svelte', '.svx'],
      }),

      // minify output
      production && terser({ output: { comments: false } }),

      // hot module reload during
      hmr({
        dirs: ['./build'],
        filter: '**/*.js',
      }),
    ],

    // watch
    watch: {
      clearScreen: false,
    },
  };

  if (name == 'cmsFront' && !production) {
    config.plugins.push(
      serve({
        open: true,
        host: 'localhost',
        port: 10001,
        openPage: '/examples/index.html',
      })
    );
  }

  return config;
});

export default script_exports;
