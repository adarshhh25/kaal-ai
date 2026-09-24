import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.login({ email, password });
      login(res.data.token, res.data.user);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      

<div className="min-h-screen flex flex-col lg:flex-row w-full relative">

<section className="relative lg:w-5/12 xl:w-1/2 flex flex-col justify-between overflow-hidden bg-primary-container text-surface min-h-[300px] lg:min-h-screen">

<div className="absolute inset-0 z-0">
<img alt="Atmospheric temple reflection at dawn" className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transform scale-105 transition-transform duration-1000 ease-out hover:scale-100" src="https://lh3.googleusercontent.com/aida/AEtjO1VUP-lnHufxoQL1bC3_BbQDPcZjsxa_qef2vv7GwfJO7sIcJYYCDTh6K3YBT_U95hpuS9KuvOEUwg2yaiQjs34srUFwCqaTC0GWi65kxM7zI-A3sOXHb_dQiubWvdj_Hc-CkNMrhCzMouGWaxW9ak2w0ai2VAgG6GyaI68nsYe0PLRgN5-6t67Y8op_FTahhgYXlAOhpTjXW4zVzviXIsIsRF_5wch6VBJe98uDyd5VeMwLfo-rQXvrnH4"/>

<div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/65 to-transparent"></div>
<div className="absolute inset-0 bg-gradient-to-r from-[#0d1322]/80 via-transparent to-[#0d1322]/50"></div>
<div className="absolute inset-0 mandala-pattern pointer-events-none"></div>
</div>

<div className="absolute -top-16 -right-16 w-80 h-80 opacity-15 pointer-events-none text-secondary-fixed">
<svg className="w-full h-full animate-[spin_120s_linear_infinite]" fill="none" stroke="currentColor" stroke-width="0.75" viewBox="0 0 200 200">
<circle cx="100" cy="100" r="90" stroke-dasharray="2 3" />
<circle cx="100" cy="100" r="70" />
<circle cx="100" cy="100" r="50" stroke-dasharray="4 2" />
<circle cx="100" cy="100" r="30" />
<path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" />
<polygon points="100,20 180,100 100,180 20,100" />
<polygon points="100,30 170,100 100,170 30,100" />
</svg>
</div>

<div className="relative z-10 p-space-md lg:p-margin-md flex items-center justify-between">
<div className="flex items-center space-x-space-sm backdrop-blur-md bg-primary-container/40 px-3.5 py-1.5 rounded-full border border-secondary-fixed/20 shadow-sm">
<span className="material-symbols-outlined text-secondary-container text-body-lg" style={{"fontVariationSettings":"'FILL' 1"}}>spa</span>
<span className="text-surface font-label-md text-label-sm uppercase tracking-widest text-xs">Vedic Intelligence</span>
</div>
</div>

<div className="relative z-10 px-space-md lg:px-margin-md py-space-xl max-w-xl">
<div className="inline-flex items-center gap-2 mb-space-sm text-secondary-fixed-dim text-label-sm font-label-sm">
<span className="w-6 h-px bg-secondary-fixed-dim/60"></span>
<span>SADHANA DIGITALIS</span>
</div>
<h1 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-surface tracking-tight text-balance leading-tight drop-shadow-sm mb-space-md">
          Pause. Reflect.<br/>Begin again.
        </h1>
<p className="font-body-lg text-body-lg text-surface-container-high/90 max-w-md font-light leading-relaxed">
          Return to your personal sanctuary for stillness, clarity, and algorithmic alignment with your highest self.
        </p>
</div>

<div className="relative z-10 p-space-md lg:p-margin-md border-t border-surface/10 bg-primary-container/50 backdrop-blur-sm">
<div className="flex items-start space-x-3">
<span className="material-symbols-outlined text-secondary-container text-headline-md mt-0.5" style={{"fontVariationSettings":"'FILL' 1"}}>format_quote</span>
<div>
<p className="font-quote-editorial text-quote-editorial text-surface-bright/95 italic font-light leading-snug">
              “Yoga is the journey of the self, through the self, to the self.”
            </p>
<span className="font-label-sm text-label-sm text-secondary-fixed tracking-wider uppercase block mt-1.5">
              Bhagavad Gita · VI.20
            </span>
</div>
</div>
</div>
</section>

<main className="w-full lg:w-7/12 xl:w-1/2 flex flex-col justify-between bg-surface min-h-screen px-margin sm:px-gutter-lg lg:px-margin-lg py-space-md lg:py-space-lg relative overflow-y-auto">

<header className="w-full flex items-center justify-between py-space-sm border-b border-surface-container pb-space-md">

<Link className="flex items-center space-x-3 group" to="/" title="KAAL AI Home">
<div className="flex flex-col">
<span className="font-headline-md text-headline-md tracking-tight text-on-surface leading-none">KAAL <span className="text-secondary font-light">AI</span></span>
<span className="text-on-surface-variant font-label-sm text-[10px] tracking-widest uppercase">Timeless Clarity</span>
</div>
</Link>

<div className="flex items-center space-x-2 text-body-sm font-body-sm">
<span className="text-on-surface-variant hidden sm:inline">New here?</span>
<Link className="text-secondary hover:text-on-secondary-container font-label-md text-label-md underline underline-offset-4 decoration-secondary/30 hover:decoration-secondary transition-all" to="/register">
            Create account
          </Link>
</div>
</header>

<div className="w-full max-w-md mx-auto my-auto py-space-md">


<div className="flex items-center gap-2 mb-space-sm">
<span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-secondary-fixed/30 border border-secondary/20 text-on-secondary-fixed-variant text-label-sm font-label-sm">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span>SACRED SANCTUARY</span>
</span>
<span className="h-px flex-1 bg-surface-container"></span>
</div>

<div className="mb-space-lg">
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight font-medium">
            Welcome back.
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Return to your space for reflection.
          </p>
</div>

<div className="hidden mb-space-md p-space-sm rounded-xl bg-[#faeae4] border border-[#e5a593] transition-all duration-300" id="error-banner">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-on-tertiary-fixed-variant text-body-lg mt-0.5">error_outline</span>
<div className="flex-1">
<p className="font-label-md text-label-md text-on-tertiary-fixed-variant font-medium">Authentication Notice</p>
<p className="font-body-sm text-body-sm text-on-tertiary-fixed-variant/90 mt-0.5">
                We couldn't sign you in with those details. Please check your email and password.
              </p>
</div>
<button className="text-on-tertiary-fixed-variant hover:opacity-75"  type="button">
<span className="material-symbols-outlined text-body-md">close</span>
</button>
</div>
</div>

<form className="space-y-space-md" id="login-form" noValidate onSubmit={handleLogin}>
{error && (
  <div className="mb-4 p-4 rounded-xl bg-error/10 border border-error/20 text-error font-body-sm flex items-start gap-2">
    <span className="material-symbols-outlined text-[20px]">error</span>
    <span>{error}</span>
  </div>
)}

<div className="space-y-1.5">
<div className="flex justify-between items-center">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="email-input">
                Email address
              </label>
<span className="text-label-sm font-label-sm text-on-surface-variant hidden" id="email-helper-text">Format required</span>
</div>
<div className="relative rounded-xl bg-surface-container-low border border-surface-variant focus-within:border-secondary focus-within:bg-surface-container-lowest transition-all duration-200 input-ambient-glow" id="email-container">
<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
<span className="material-symbols-outlined text-body-lg">mail</span>
</div>
<input autoComplete="email" className="w-full pl-10 pr-3.5 py-3 bg-transparent border-0 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" id="email-input" name="email" placeholder="Enter Your Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</div>
<p className="hidden text-error font-body-sm text-body-sm flex items-center gap-1 mt-1" id="email-error-msg">
<span className="material-symbols-outlined text-[15px]">info</span>
<span>Please enter a valid email address (e.g. name@domain.com).</span>
</p>
</div>

<div className="space-y-1.5">
<div className="flex justify-between items-center">
<label className="block font-label-md text-label-md text-on-surface" htmlFor="password-input">
                Password
              </label>
<Link className="text-body-sm font-body-sm text-secondary hover:text-on-secondary-container transition-colors" to="#reset-password">
                Forgot password?
              </Link>
</div>
<div className="relative rounded-xl bg-surface-container-low border border-surface-variant focus-within:border-secondary focus-within:bg-surface-container-lowest transition-all duration-200 input-ambient-glow" id="password-container">
<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
<span className="material-symbols-outlined text-body-lg">key</span>
</div>
<input autoComplete="current-password" className="w-full pl-10 pr-11 py-3 bg-transparent border-0 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" id="password-input" name="password" placeholder="Enter your password" required type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />

<button aria-label="Toggle password visibility" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors focus:outline-none" id="toggle-password-btn" type="button" onClick={() => setShowPassword(!showPassword)}>
<span className="material-symbols-outlined text-body-lg" id="password-eye-icon">{showPassword ? 'visibility_off' : 'visibility'}</span>
</button>
</div>
<p className="hidden text-error font-body-sm text-body-sm flex items-center gap-1 mt-1" id="password-error-msg">
<span className="material-symbols-outlined text-[15px]">info</span>
<span>Password must be at least 8 characters long.</span>
</p>
</div>



<button disabled={isLoading} className="w-full h-12 bg-primary-container text-surface hover:text-surface-bright rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 border border-secondary-fixed/20 shadow-sm hover:shadow-md hover:scale-[1.008] active:scale-[0.98] transition-all duration-200 group disabled:opacity-50 disabled:pointer-events-none" id="submit-cta" type="submit">

{!isLoading ? (
<span className="inline-flex items-center gap-2" id="cta-normal">
<span>Continue</span>
<span className="material-symbols-outlined text-body-md group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
</span>
) : (
<span className="flex items-center gap-2" id="cta-loading">
<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-surface" fill="none" viewBox="0 0 24 24">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
<path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
</svg>
<span>Signing in...</span>
</span>
)}
</button>


</form>

<div className="mt-space-md text-center">
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Don't have an account? 
            <Link className="text-secondary hover:text-on-secondary-container font-label-md font-medium underline underline-offset-4 decoration-secondary/30 ml-1" to="/register">
              Create your account
            </Link>
</p>
</div>

{/* <div className="mt-space-lg pt-space-md border-t border-surface-container text-center flex items-center justify-center gap-2 text-outline">
<span className="material-symbols-outlined text-body-sm text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>shield</span>
<span className="font-body-sm text-body-sm text-on-surface-variant/80">
            Your reflections are personal to you and quietly encrypted.
          </span>
</div> */}
</div>

<footer className="w-full pt-space-lg pb-space-sm border-t border-surface-container flex flex-col sm:flex-row items-center justify-between text-on-surface-variant text-body-sm font-body-sm gap-2">
<p className="text-[12px] text-outline">
          © 2025 KAAL AI. Ancient wisdom. Modern clarity.
        </p>

</footer>
</main>
</div>



    </>
  );
}
