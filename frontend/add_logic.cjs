const fs = require('fs');

function addLoginLogic() {
  let content = fs.readFileSync('src/pages/Login.tsx', 'utf8');

  // Add imports
  content = content.replace(
    `import { Link } from 'react-router-dom';`,
    `import { Link, useNavigate, useLocation } from 'react-router-dom';\nimport { useState } from 'react';\nimport { useAuth } from '../context/AuthContext';\nimport { authApi } from '../services/api';`
  );

  // Add state & handlers
  content = content.replace(
    `export default function Login() {`,
    `export default function Login() {\n  const [email, setEmail] = useState('sadhak@kaal.ai');\n  const [password, setPassword] = useState('vedic-wisdom-2025');\n  const [showPassword, setShowPassword] = useState(false);\n  const [isLoading, setIsLoading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n  const { login } = useAuth();\n  const navigate = useNavigate();\n  const location = useLocation();\n\n  const handleLogin = async (e: React.FormEvent) => {\n    e.preventDefault();\n    setIsLoading(true);\n    setError(null);\n    try {\n      const res = await authApi.login({ email, password });\n      login(res.token, res.user);\n      const from = location.state?.from?.pathname || '/guidance';\n      navigate(from, { replace: true });\n    } catch (err: any) {\n      setError(err.message || 'Login failed');\n    } finally {\n      setIsLoading(false);\n    }\n  };\n`
  );

  // Form replacements
  content = content.replace(/<form\b[^>]*>/, '<form className="space-y-space-md" onSubmit={handleLogin}>');
  
  // Replace inputs
  content = content.replace(
    /id="email-input"[^>]*\/>/g,
    `id="email-input" name="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3.5 py-3 bg-transparent border-0 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" autoComplete="email" />`
  );
  
  content = content.replace(
    /id="password-input"[^>]*\/>/g,
    `id="password-input" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-11 py-3 bg-transparent border-0 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" autoComplete="current-password" />`
  );

  // Password eye toggle
  content = content.replace(
    /<button[^>]*id="toggle-password-btn"[^>]*>/g,
    `<button type="button" aria-label="Toggle password visibility" id="toggle-password-btn" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors focus:outline-none" onClick={() => setShowPassword(!showPassword)}>`
  );
  
  content = content.replace(
    /<span[^>]*id="password-eye-icon"[^>]*>visibility<\/span>/g,
    `<span className="material-symbols-outlined text-body-lg" id="password-eye-icon">{showPassword ? 'visibility_off' : 'visibility'}</span>`
  );

  // Submit button
  content = content.replace(
    /<button[^>]*id="submit-cta"[^>]*>/g,
    `<button type="submit" id="submit-cta" disabled={isLoading} className="w-full h-12 bg-primary-container text-surface hover:text-surface-bright rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 border border-secondary-fixed/20 shadow-sm hover:shadow-md hover:scale-[1.008] active:scale-[0.98] transition-all duration-200 group">`
  );

  // Loading state (normal vs loading)
  content = content.replace(
    /<span[^>]*id="cta-normal"[^>]*>/g,
    `{!isLoading && <span className="inline-flex items-center gap-2" id="cta-normal">`
  );
  content = content.replace(
    /<\/span>(\s*<!-- Loading State Content -->)/g,
    `</span>}$1`
  );
  content = content.replace(
    /<span[^>]*id="cta-loading"[^>]*>/g,
    `{isLoading && <span className="flex items-center gap-2" id="cta-loading">`
  );
  content = content.replace(
    /<\/span>(\s*<\/button>)/g,
    `</span>}$1`
  );

  // Error banner
  content = content.replace(
    /<div[^>]*id="error-banner"[^>]*>([\s\S]*?)We couldn't sign you in with those details. Please check your email and password.([\s\S]*?)<\/div>\s*<!-- Authentication Form -->/g,
    `{error && (
      <div id="error-banner" className="mb-space-md p-space-sm rounded-xl bg-[#faeae4] border border-[#e5a593] transition-all duration-300">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-body-lg mt-0.5">error_outline</span>
          <div className="flex-1">
            <p className="font-label-md text-label-md text-on-tertiary-fixed-variant font-medium">Authentication Notice</p>
            <p className="font-body-sm text-body-sm text-on-tertiary-fixed-variant/90 mt-0.5">{error}</p>
          </div>
          <button type="button" className="text-on-tertiary-fixed-variant hover:opacity-75" onClick={() => setError(null)}>
            <span className="material-symbols-outlined text-body-md">close</span>
          </button>
        </div>
      </div>
    )}
    <!-- Authentication Form -->`
  );
  
  // Interactive demonstrator: hide it
  content = content.replace(
    /<!-- Interactive State Demonstrator Bar -->([\s\S]*?)<!-- Sacred Sanctuary Badge -->/g,
    `<!-- Sacred Sanctuary Badge -->`
  );

  fs.writeFileSync('src/pages/Login.tsx', content);
  console.log('Login logic injected');
}

function addSignupLogic() {
  let content = fs.readFileSync('src/pages/Signup.tsx', 'utf8');

  // Add imports
  content = content.replace(
    `import { Link } from 'react-router-dom';`,
    `import { Link, useNavigate } from 'react-router-dom';\nimport { useState } from 'react';\nimport { useAuth } from '../context/AuthContext';\nimport { authApi } from '../services/api';`
  );

  // Add state & handlers
  content = content.replace(
    `export default function Signup() {`,
    `export default function Signup() {\n  const [name, setName] = useState('');\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [showPassword, setShowPassword] = useState(false);\n  const [isLoading, setIsLoading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n  const { login } = useAuth();\n  const navigate = useNavigate();\n\n  const handleSignup = async (e: React.FormEvent) => {\n    e.preventDefault();\n    setIsLoading(true);\n    setError(null);\n    try {\n      const res = await authApi.register({ name, email, password });\n      login(res.token, res.user);\n      navigate('/guidance', { replace: true });\n    } catch (err: any) {\n      setError(err.message || 'Registration failed');\n    } finally {\n      setIsLoading(false);\n    }\n  };\n`
  );

  // Form replacements
  content = content.replace(/<form\b[^>]*>/, '<form className="space-y-space-md" onSubmit={handleSignup}>');
  
  // Replace inputs
  content = content.replace(
    /id="name-input"[^>]*\/>/g,
    `id="name-input" name="name" type="text" placeholder="Your chosen name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-3.5 py-3 bg-transparent border-0 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" autoComplete="name" />`
  );

  content = content.replace(
    /id="email-input"[^>]*\/>/g,
    `id="email-input" name="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3.5 py-3 bg-transparent border-0 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" autoComplete="email" />`
  );
  
  content = content.replace(
    /id="password-input"[^>]*\/>/g,
    `id="password-input" name="password" type={showPassword ? "text" : "password"} placeholder="Create a secure password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-11 py-3 bg-transparent border-0 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" autoComplete="new-password" />`
  );

  // Password eye toggle
  content = content.replace(
    /<button[^>]*id="toggle-password-btn"[^>]*>/g,
    `<button type="button" aria-label="Toggle password visibility" id="toggle-password-btn" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors focus:outline-none" onClick={() => setShowPassword(!showPassword)}>`
  );
  
  content = content.replace(
    /<span[^>]*id="password-eye-icon"[^>]*>visibility<\/span>/g,
    `<span className="material-symbols-outlined text-body-lg" id="password-eye-icon">{showPassword ? 'visibility_off' : 'visibility'}</span>`
  );

  // Submit button
  content = content.replace(
    /<button[^>]*id="submit-cta"[^>]*>/g,
    `<button type="submit" id="submit-cta" disabled={isLoading} className="w-full h-12 bg-primary-container text-surface hover:text-surface-bright rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 border border-secondary-fixed/20 shadow-sm hover:shadow-md hover:scale-[1.008] active:scale-[0.98] transition-all duration-200 group mt-2">`
  );

  // Loading state (normal vs loading)
  content = content.replace(
    /<span[^>]*id="cta-normal"[^>]*>/g,
    `{!isLoading && <span className="inline-flex items-center gap-2" id="cta-normal">`
  );
  content = content.replace(
    /<\/span>(\s*<!-- Loading State Content -->)/g,
    `</span>}$1`
  );
  content = content.replace(
    /<span[^>]*id="cta-loading"[^>]*>/g,
    `{isLoading && <span className="flex items-center gap-2" id="cta-loading">`
  );
  content = content.replace(
    /<\/span>(\s*<\/button>)/g,
    `</span>}$1`
  );

  // Error banner
  content = content.replace(
    /<div[^>]*id="error-banner"[^>]*>([\s\S]*?)There was a problem creating your space. Please check the details and try again.([\s\S]*?)<\/div>\s*<!-- Registration Form -->/g,
    `{error && (
      <div id="error-banner" className="mb-space-md p-space-sm rounded-xl bg-[#faeae4] border border-[#e5a593] transition-all duration-300">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-body-lg mt-0.5">error_outline</span>
          <div className="flex-1">
            <p className="font-label-md text-label-md text-on-tertiary-fixed-variant font-medium">Creation Notice</p>
            <p className="font-body-sm text-body-sm text-on-tertiary-fixed-variant/90 mt-0.5">{error}</p>
          </div>
          <button type="button" className="text-on-tertiary-fixed-variant hover:opacity-75" onClick={() => setError(null)}>
            <span className="material-symbols-outlined text-body-md">close</span>
          </button>
        </div>
      </div>
    )}
    <!-- Registration Form -->`
  );
  
  // Interactive demonstrator: hide it
  content = content.replace(
    /<!-- Interactive State Demonstrator Bar -->([\s\S]*?)<!-- Sacred Sanctuary Badge -->/g,
    `<!-- Sacred Sanctuary Badge -->`
  );

  fs.writeFileSync('src/pages/Signup.tsx', content);
  console.log('Signup logic injected');
}

addLoginLogic();
addSignupLogic();
