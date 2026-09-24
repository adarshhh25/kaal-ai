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

  const reactCode = `import React, { useState } from 'react';
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

parseHtmlToJsx(
  'signup_screen.html', 
  'Signup', 
  `const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();`,
  `const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/guidance');
    }, 1500);
  };`,
  {
    '<form([^>]*?)>': '<form$1 onSubmit={handleSignup}>',
    'id="submit-cta"': 'id="submit-cta" disabled={isLoading}',
    '<span([^>]*?)id="cta-normal"([^>]*?)>': '{!isLoading && <span$1id="cta-normal"$2>',
    '</span>\\s*<!-- Loading State Content -->': '</span>}\\n<!-- Loading State Content -->',
    '<span([^>]*?)id="cta-loading"([^>]*?)className="hidden([^>]*?)"': '{isLoading && <span$1id="cta-loading"$2className="flex$3"',
    '</span>\\s*</button>': '</span>}\\n</button>'
  }
);
