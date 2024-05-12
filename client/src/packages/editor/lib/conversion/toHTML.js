/**
 * Copyright (c) 2024 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import showdown from 'showdown';

export async function markdownToHTML(markdownText) {
    if (!markdownText) return '';

  let converter = new showdown.Converter();
  let html = converter.makeHtml(markdownText);

  return html
}
