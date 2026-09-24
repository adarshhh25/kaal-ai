const fs = require('fs');
let html = fs.readFileSync('login_screen.html', 'utf8');

// Extract the main container
let mainContentMatch = html.match(/<div class="min-h-screen[\s\S]*?<!-- Inline Vanilla Script/);
if (!mainContentMatch) {
  console.log('Failed to extract main content');
  process.exit(1);
}

let mainContent = mainContentMatch[0].replace('<!-- Inline Vanilla Script', '');

// JSX replacements
mainContent = mainContent
  .replace(/class=/g, 'className=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/viewbox/g, 'viewBox')
  .replace(/stroke-width/g, 'strokeWidth')
  .replace(/stroke-dasharray/g, 'strokeDasharray')
  .replace(/onclick=".*?"/g, '')
  .replace(/onsubmit=".*?"/g, '')
  .replace(/novalidate=""/g, 'noValidate')
  .replace(/checked=""/g, 'defaultChecked')
  .replace(/required=""/g, 'required')
  .replace(/style="(.*?)"/g, (match, p1) => {
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
  .replace(/<circle([^>]*?)><\/circle>/g, '<circle$1 />')
  .replace(/<path([^>]*?)><\/path>/g, '<path$1 />')
  .replace(/<polygon([^>]*?)><\/polygon>/g, '<polygon$1 />');

const reactCode = `import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('sadhak@kaal.ai');
  const [password, setPassword] = useState('vedic-wisdom-2025');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/guidance');
    }, 1500);
  };

  return (
    ${mainContent}
  );
}
`;

// Fix links and inputs
let finalCode = reactCode
  .replace(/<a([^>]*?)href="\/(.*?)"([^>]*?)>/g, '<Link$1to="/$2"$3>')
  .replace(/<\/a>/g, '</Link>')
  // Handle state bindings
  .replace(/id="email-input"([^>]*?)value="sadhak@kaal.ai"/g, 'id="email-input"$1value={email} onChange={(e) => setEmail(e.target.value)}')
  .replace(/id="password-input"([^>]*?)value="vedic-wisdom-2025"/g, 'id="password-input"$1value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"}')
  // Setup button states
  .replace(/<form([^>]*?)>/, '<form$1 onSubmit={handleLogin}>')
  .replace(/<button([^>]*?)id="toggle-password-btn"([^>]*?)>/, '<button$1id="toggle-password-btn"$2 onClick={() => setShowPassword(!showPassword)}>')
  .replace(/<span([^>]*?)id="password-eye-icon"([^>]*?)>visibility<\/span>/, '<span$1id="password-eye-icon"$2>{showPassword ? "visibility_off" : "visibility"}</span>')
  .replace(/id="submit-cta"/, 'id="submit-cta" disabled={isLoading}')
  .replace(/<span([^>]*?)id="cta-normal"([^>]*?)>/, '{!isLoading && <span$1id="cta-normal"$2>')
  .replace(/<\/span>\s*<!-- Loading State Content -->/, '</span>}\\n<!-- Loading State Content -->')
  .replace(/<span([^>]*?)id="cta-loading"([^>]*?)className="hidden([^>]*?)"/, '{isLoading && <span$1id="cta-loading"$2className="flex$3"')
  .replace(/<\/span>\s*<\/button>/, '</span>}\\n</button>');

fs.writeFileSync('src/pages/Login.tsx', finalCode);
console.log('Login.tsx generated successfully.');
