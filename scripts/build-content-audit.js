/**
 * Extract text, images, and internal links from all HTML pages.
 * Output: content-audit.xlsx with 3 sheets (Text, Images, Links).
 * Columns: Page, Location, Text, Update
 * Run from repo root: node scripts/build-content-audit.js
 * Requires: npm install xlsx (or run from directory with xlsx)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXCLUDE = new Set(['test.html', 'image-review-debug.html']);

function getHtmlFiles() {
  const names = fs.readdirSync(ROOT).filter((n) => n.endsWith('.html') && !EXCLUDE.has(n));
  return names.sort();
}

function stripInner(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function getTextEntries(html, pageName) {
  const entries = [];
  const clean = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  const comments = [];
  let m;
  const commentRe = /<!--\s*(.*?)\s*-->/gs;
  while ((m = commentRe.exec(clean)) !== null) comments.push({ pos: m.index, text: (m[1] || '').trim().slice(0, 80) });
  function locationForPos(pos) {
    let section = 'Body';
    for (const c of comments) if (c.pos < pos && c.text) section = c.text;
    return section;
  }
  const tagNames = ['title', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'li', 'label', 'figcaption', 'td', 'th'];
  const seen = new Set();
  for (const tag of tagNames) {
    const tagRe = new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)</' + tag + '>', 'gi');
    while ((m = tagRe.exec(clean)) !== null) {
      const inner = stripInner(m[1]);
      if (!inner || inner.length < 2) continue;
      const key = pageName + '\n' + inner.slice(0, 500);
      if (seen.has(key)) continue;
      seen.add(key);
      const loc = tag === 'title' ? 'Title' : locationForPos(m.index);
      entries.push({ Page: pageName, Location: loc, Text: inner.slice(0, 32000), Update: '' });
    }
  }
  return entries;
}

function getImageEntries(html, pageName) {
  const entries = [];
  const imgRe = /<img[^>]+>/gi;
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    const tag = m[0];
    const src = tag.match(/src=["']([^"']+)["']/i);
    const alt = tag.match(/alt=["']([^"']*)["']/i);
    const srcVal = src ? src[1] : '';
    const altVal = alt ? alt[1] : '';
    let location = 'Image';
    if (/logo/i.test(srcVal) || /logo/i.test(altVal)) location = 'Logo';
    else if (/banner|hero/i.test(srcVal)) location = 'Banner';
    entries.push({
      Page: pageName,
      Location: location,
      Text: `src=${srcVal} | alt=${altVal}`.slice(0, 32000),
      Update: ''
    });
  }
  return entries;
}

function getLinkEntries(html, pageName) {
  const entries = [];
  const linkRe = /<a\s[^>]*href=["']([^"']*\.html[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = linkRe.exec(html)) !== null) {
    const href = m[1].trim();
    if (/^https?:\/\//i.test(href) && !/mythic/i.test(href)) continue;
    const linkText = stripInner(m[2]);
    const location = !linkText ? 'Nav' : 'Link';
    entries.push({
      Page: pageName,
      Location: location,
      Text: `href=${href} | text=${linkText}`.slice(0, 32000),
      Update: ''
    });
  }
  return entries;
}

function main() {
  const files = getHtmlFiles();
  const allText = [];
  const allImages = [];
  const allLinks = [];
  for (const name of files) {
    const filePath = path.join(ROOT, name);
    let html;
    try {
      html = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      console.error('Skip', name, e.message);
      continue;
    }
    allText.push(...getTextEntries(html, name));
    allImages.push(...getImageEntries(html, name));
    allLinks.push(...getLinkEntries(html, name));
  }
  const cols = ['Page', 'Location', 'Text', 'Update'];
  let XLSX;
  try {
    XLSX = require('xlsx');
  } catch (e) {
    console.error('Install xlsx for .xlsx output: npm install xlsx');
    writeCsv(path.join(ROOT, 'content-audit-text.csv'), cols, allText);
    writeCsv(path.join(ROOT, 'content-audit-images.csv'), cols, allImages);
    writeCsv(path.join(ROOT, 'content-audit-links.csv'), cols, allLinks);
    return;
  }
  const wb = XLSX.utils.book_new();
  const wsText = XLSX.utils.json_to_sheet(allText, { header: cols });
  const wsImages = XLSX.utils.json_to_sheet(allImages, { header: cols });
  const wsLinks = XLSX.utils.json_to_sheet(allLinks, { header: cols });
  XLSX.utils.book_append_sheet(wb, wsText, 'Text');
  XLSX.utils.book_append_sheet(wb, wsImages, 'Images');
  XLSX.utils.book_append_sheet(wb, wsLinks, 'Links');
  const outPath = path.join(ROOT, 'content-audit.xlsx');
  XLSX.writeFile(wb, outPath);
  console.log('Wrote', outPath, '- Text:', allText.length, 'Images:', allImages.length, 'Links:', allLinks.length);
}

function writeCsv(filePath, cols, rows) {
  const escape = (v) => {
    const s = String(v == null ? '' : v);
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const line = (r) => cols.map((c) => escape(r[c])).join(',');
  const content = '\uFEFF' + cols.join(',') + '\n' + rows.map(line).join('\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Wrote', filePath);
}

main();
