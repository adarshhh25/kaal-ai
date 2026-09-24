const fs = require('fs');
const pages = ['Login.tsx', 'Signup.tsx', 'Home.tsx', 'Guidance.tsx'];

pages.forEach(page => {
  let content = fs.readFileSync('src/pages/' + page, 'utf8');
  content = content.replace(/rows="(\d+)"/g, 'rows={$1}');
  fs.writeFileSync('src/pages/' + page, content);
});
console.log('Fixed rows attributes.');
