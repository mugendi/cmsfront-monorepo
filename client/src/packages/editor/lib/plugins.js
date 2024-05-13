/**
 * Copyright (c) 2024 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { arrify, isUrl } from '../../../lib/utils';

const scriptin = new ScriptIn();

const pluginsCDN =
  'https://uicdn.toast.com/editor-plugin-{pluginName}/latest/toastui-editor-plugin-{pluginName}.min.js';

const pluginLinks = {
  chart: '',
  codeSyntaxHighlight: '',
  colorSyntax: '',
  tableMergedCell: '',
  uml: '',
};

for (let pluginName in pluginLinks) {
  pluginLinks[pluginName] = pluginsCDN.replace(/\{pluginName\}/g, pluginName);
}

export async function loadPlugins(plugins = []) {
  let links = arrify(plugins)
    .map((name) => pluginLinks[name] || null)
    .filter(isUrl);

  if (links.length) {
    // console.log(links);
    await scriptin
      .load(links)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  return plugins
}
