/**
 * Copyright (c) 2024 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import '../css/form.css';
import App from './Main.svelte';
const PREFIX = 'toastui-editor-';

function createToolbarItemOption(divContainer, i18n) {
  return {
    name: 'ai',
    tooltip: 'AI',
    className: 'toolbar-icon icon-ai',
    popup: {
      className: `${PREFIX}popup-ai`,
      body: divContainer,
      style: { width: 'auto' },
    },
  };
}

export default function AI(context, options) {
  const { eventEmitter, i18n } = context;
  const container = document.createElement('div');

  // Attach component via Svelte
  new App({ target: container, props: { eventEmitter } });
  const toolbarItem = createToolbarItemOption(container, i18n);

  return {
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 10,
        item: toolbarItem,
      },
    ],
    markdownCommands: {
      aiPrompt: (payload, state, dispatch) => {
        setContent(context.instance, payload);
        return true;
      },
    },
    wysiwygCommands: {
      aiPrompt: (payload, state, dispatch) => {
        setContent(context.instance, payload);
        return true;
      },
    },
  };
}

function setContent(editor, payload) {
  editor.moveCursorToEnd(true);
  editor.insertText('\n\n' + payload + '\n\n');
}
