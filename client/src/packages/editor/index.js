/**
 * Copyright (c) 2024 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import '@toast-ui/editor/toastui-editor.css';
import { Editor as TuiEditor } from '@toast-ui/editor';
import { loadPlugins } from './lib/plugins';
import { Eev } from '../../lib/events';

export default class Editor {
  constructor(opts = {}) {
    let defaultOpts = {
      editor: {
        el: document.querySelector('#editor'),
        previewStyle: 'vertical',
        height: '400px',
        initialValue: '',
        theme: 'dark',
        initialEditType: 'markdown',
        previewStyle: 'tab',
        usageStatistics: false,
        plugins: [],
      },
    };

    // console.log(defaultOpts);
    this.opts = Object.assign(defaultOpts, opts);
  }

  async init() {
    try {
      let self = this;
      let emitter = new Eev();

      // load any plugins needed
      if (self.opts.editor.plugins.length > 0) {
        await loadPlugins(self.opts.editor.plugins);
      }

      // init editor
      const editor = new TuiEditor(self.opts.editor);

      // when content changes
      editor.on('change', function (ev) {
        emitter.emit('editor:change', {
          html: editor.getHTML(),
          markdown: editor.getMarkdown(),
        });
      });

      return { editor, emitter };
    } catch (error) {
      throw error;
    }
  }
}

// //
// new Editor({})
//   .init()
//   .then(({ editor, emitter }) => {
//     emitter.on('editor:change', console.log);
//     // console.log(resp);
//   })
//   .catch(console.error);
