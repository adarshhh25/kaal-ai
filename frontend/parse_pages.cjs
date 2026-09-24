const fs = require('fs');

function parseHtmlToJsx(filename, componentName, stateInitCode, handlersCode, stateBindingsMap) {
  let html = fs.readFileSync(filename, 'utf8');

  // Extract everything inside body, but ignore <script>
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) {
    console.log('Failed to extract body for ' + filename);
    process.exit(1);
  }

  let bodyContent = bodyMatch[1];
  
  // Remove all <script> tags
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');

  // JSX replacements
  let mainContent = bodyContent
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/viewbox/gi, 'viewBox')
    .replace(/stroke-width/gi, 'strokeWidth')
    .replace(/stroke-dasharray/gi, 'strokeDasharray')
    .replace(/stroke-linecap/gi, 'strokeLinecap')
    .replace(/stroke-linejoin/gi, 'strokeLinejoin')
    .replace(/onclick=".*?"/gi, '')
    .replace(/onsubmit=".*?"/gi, '')
    .replace(/oninput=".*?"/gi, '')
    .replace(/novalidate=""/gi, 'noValidate')
    .replace(/novalidate/gi, 'noValidate')
    .replace(/checked=""/gi, 'defaultChecked')
    .replace(/checked/gi, 'defaultChecked')
    .replace(/required=""/gi, 'required')
    .replace(/style="(.*?)"/gi, (match, p1) => {
      const parts = p1.split(';').filter(Boolean);
      const obj = {};
      parts.forEach(part => {
        const [key, value] = part.split(':');
        if (key && value) {
          const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          obj[camelKey] = value.trim().replace(/'/g, "'");
        }
      });
      return `style={${JSON.stringify(obj)}}`;
    })
    .replace(/<input([^>]*?)>/g, (match) => {
      if (match.endsWith('/>')) return match;
      return match.replace(/>$/, ' />');
    })
    .replace(/<img([^>]*?)>/g, (match) => {
      if (match.endsWith('/>')) return match;
      return match.replace(/>$/, ' />');
    })
    .replace(/<br([^>]*?)>/g, (match) => {
      if (match.endsWith('/>')) return match;
      return match.replace(/>$/, ' />');
    })
    .replace(/<hr([^>]*?)>/g, (match) => {
      if (match.endsWith('/>')) return match;
      return match.replace(/>$/, ' />');
    })
    .replace(/<circle([^>]*?)><\/circle>/gi, '<circle$1 />')
    .replace(/<path([^>]*?)><\/path>/gi, '<path$1 />')
    .replace(/<polygon([^>]*?)><\/polygon>/gi, '<polygon$1 />');

  // Fix links
  mainContent = mainContent
    .replace(/<a([^>]*?)href="\/(.*?)"([^>]*?)>/g, '<Link$1to="/$2"$3>')
    .replace(/<\/a>/g, '</Link>');

  // Handle state bindings
  for (const [pattern, replacement] of Object.entries(stateBindingsMap || {})) {
    mainContent = mainContent.replace(new RegExp(pattern, 'g'), replacement);
  }

  const reactCode = `import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ${componentName}() {
  ${stateInitCode}

  ${handlersCode}

  return (
    <>
      ${mainContent}
    </>
  );
}
`;

  fs.writeFileSync(`src/pages/${componentName}.tsx`, reactCode);
  console.log(`${componentName}.tsx generated successfully.`);
}

// Generate Home
parseHtmlToJsx(
  'home_screen.html', 
  'Home', 
  ``,
  ``,
  {}
);

// Generate Guidance Workspace
parseHtmlToJsx(
  'guidance_screen.html', 
  'Guidance', 
  `const [question, setQuestion] = useState('');
  const [isReflecting, setIsReflecting] = useState(false);`,
  `const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsReflecting(true);
    setTimeout(() => {
      setIsReflecting(false);
      setQuestion('');
    }, 2000);
  };`,
  {
    '<form([^>]*?)>': '<form$1 onSubmit={handleAsk}>',
    'id="guidance-input"([^>]*?)': 'id="guidance-input"$1value={question} onChange={(e) => setQuestion(e.target.value)}',
    'id="submit-guidance-btn"': 'id="submit-guidance-btn" disabled={isReflecting || !question.trim()}',
    '<!-- Reflection Loading State -->\\s*<div([^>]*?)className="hidden([^>]*?)" id="loading-state"': '<!-- Reflection Loading State -->\\n{isReflecting && <div$1className="flex$2" id="loading-state"',
    '</div>\\s*<!-- Answer Container -->': '</div>}\\n<!-- Answer Container -->'
  }
);
