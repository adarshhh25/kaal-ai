const fs = require('fs');

const svgCamelCase = ['viewBox', 'strokeWidth', 'strokeDasharray', 'strokeLinecap', 'strokeLinejoin', 'fillRule', 'clipRule'];

function htmlToJsx(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let content = bodyMatch[1];

  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  content = content.replace(/class=/g, 'className=');
  content = content.replace(/for=/g, 'htmlFor=');
  content = content.replace(/onclick=".*?"/gi, '');
  content = content.replace(/onsubmit=".*?"/gi, '');
  content = content.replace(/oninput=".*?"/gi, '');
  content = content.replace(/novalidate=""/gi, 'noValidate');
  content = content.replace(/novalidate/gi, 'noValidate');
  content = content.replace(/checked=""/gi, 'defaultChecked');
  content = content.replace(/checked/gi, 'defaultChecked');
  content = content.replace(/required=""/gi, 'required');

  svgCamelCase.forEach(attr => {
    const regex = new RegExp(attr.toLowerCase(), 'gi');
    content = content.replace(regex, attr);
  });

  content = content.replace(/style="(.*?)"/gi, (match, p1) => {
    const parts = p1.split(';').filter(Boolean);
    const obj = {};
    parts.forEach(part => {
      let [key, ...vals] = part.split(':');
      if (key && vals.length > 0) {
        const val = vals.join(':').trim();
        const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        obj[camelKey] = val.replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1');
      }
    });
    return 'style={' + JSON.stringify(obj) + '}';
  });

  const voidTags = ['input', 'img', 'br', 'hr', 'path', 'circle', 'polygon'];
  voidTags.forEach(tag => {
    const regex = new RegExp('<' + tag + '([^>]*?)(?<!\/)>', 'gi');
    content = content.replace(regex, '<' + tag + '$1 />');
    content = content.replace(new RegExp('<\/' + tag + '>', 'gi'), '');
  });
  
  content = content.replace(/<a([^>]*?)href="\/(.*?)"([^>]*?)>/g, '<Link$1to="/$2"$3>')
  content = content.replace(/<\/a>/g, '</Link>');
  // Actually, wait, replacing </a> globally will mismatch `<a href="#..."> ... </a>` since I only replaced absolute routes!
  // I will replace all `<a` to `<Link to` for simplicity, and let them be links even if it's hash.
  content = content.replace(/<a([^>]*?)href="(.*?)"([^>]*?)>/g, '<Link$1to="$2"$3>');
  // No need to replace </a>, it will just replace all </a> globally
  // Wait, I just replaced ALL <a with <Link, so I MUST replace all </a> with </Link>.

  return content;
}

const pages = [
  { file: 'home_screen.html', comp: 'Home' },
  { file: 'login_screen.html', comp: 'Login' },
  { file: 'signup_screen.html', comp: 'Signup' },
  { file: 'guidance_screen.html', comp: 'Guidance' },
];

pages.forEach(page => {
  const html = fs.readFileSync(page.file, 'utf8');
  let jsx = htmlToJsx(html);
  
  const compCode = `import React from 'react';
import { Link } from 'react-router-dom';

export default function ${page.comp}() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;

  fs.writeFileSync('src/pages/' + page.comp + '.tsx', compCode);
  console.log(page.comp + ' generated');
});
