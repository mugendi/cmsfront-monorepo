/**
 * Copyright (c) 2024 Anthony Mugendi
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import showdown from 'showdown';

export async function HTMLToMarkdown(htmlText = '') {
  if (!htmlText) return '';

  const converter = new showdown.Converter();
  const markdown = converter.makeMarkdown(htmlText);
//   console.log(markdown);
  return markdown;
}
