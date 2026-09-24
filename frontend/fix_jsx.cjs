const fs = require('fs');
const pages = ['Login.tsx', 'Signup.tsx', 'Home.tsx', 'Guidance.tsx'];

pages.forEach(page => {
  let content = fs.readFileSync('src/pages/' + page, 'utf8');
  content = content.replace(/autocomplete=/g, 'autoComplete=');
  content = content.replace(/defaultdefaultChecked/g, 'defaultChecked');
  content = content.replace(/tabindex="([^"]+)"/g, 'tabIndex={$1}');
  content = content.replace(/import React from 'react';\n/, '');
  fs.writeFileSync('src/pages/' + page, content);
});
console.log('JSX TS errors fixed.');
