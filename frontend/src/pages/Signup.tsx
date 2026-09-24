import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms of Sanctuary.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.register({ name, email, password });
      login(res.data.token, res.data.user);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>



      <main className="min-h-screen flex flex-col lg:flex-row">

        <section className="relative lg:w-5/12 xl:w-1/2 min-h-[300px] lg:min-h-screen bg-primary-container overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">

          <div className="absolute inset-0 z-0">
            <img alt="Atmospheric sacred Indian riverbank at dawn artwork with stone ghat steps, glowing brass diyas, ancient banyan tree, quiet meditative presence in the morning mist" className="w-full h-full object-cover object-center transform scale-105 duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgTQA4kDWXnHkGcQMAPvuI4obee16eI0umCVkU4N6pYSF3G1JSfXpRIPbwmWyoefSKzjUB94WydfR95QCRPvEdWVcrtHZdlOc4ifmLW-3w95agoaX4MMvuu5itcSvZfhqGvqX49akzstjDxKutxYKfcEunM-I2EeTF8UUZAJ8d-QJHTYkkF4n4dN1_uizJF8ElEFzWON_rvQ8z_DfE0wCHPABelrjqyodorHX61oNXyLgEA-54Pges" />

            <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/60 to-primary-container/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container/80 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-radial-at-bottom from-secondary/30 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 bg-surface-container-lowest/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px] animate-diya" data-icon="spa">spa</span>
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-white/90">KAAL AI · VEDIC CLARITY</span>
            </div>
            <span className="hidden sm:inline-flex text-white/60 font-body-sm text-body-sm items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
              Brahmamuhurta
            </span>
          </div>

          <div className="relative z-10 my-10 lg:my-auto max-w-lg">
            <div className="inline-flex items-center gap-2 mb-4 text-secondary-fixed">
              <span className="h-[1px] w-6 bg-secondary-fixed/60"></span>
              <span className="font-label-sm text-label-sm tracking-widest uppercase">The Awakening</span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white font-medium tracking-tight mb-4 leading-tight">
              Begin your journey toward clarity.
            </h1>
            <p className="font-body-lg text-body-lg text-white/85 leading-relaxed font-light">
              Bring what weighs on your mind. Discover timeless perspective for your career, choices, and emotional peace.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/15 text-white/90">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px] mt-0.5" data-icon="lock">lock</span>
                <div>
                  <p className="font-label-md text-label-md text-white">Sacred Privacy</p>
                  <p className="font-body-sm text-body-sm text-white/70">Uncompromised sanctuary for your thoughts.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px] mt-0.5" data-icon="auto_stories">auto_stories</span>
                <div>
                  <p className="font-label-md text-label-md text-white">Living Wisdom</p>
                  <p className="font-body-sm text-body-sm text-white/70">Sutras curated for modern complexity.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/15 backdrop-blur-[2px]">
            <blockquote className="font-quote-editorial text-quote-editorial italic text-white/95 leading-snug">
              “You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.”
            </blockquote>
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed mt-2">
              — Bhagavad Gita 2.47
            </p>
          </div>
        </section>

        <section className="w-full lg:w-7/12 xl:w-1/2 bg-surface flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:px-20 overflow-y-auto">

          <header className="flex items-center justify-between w-full max-w-xl mx-auto mb-8 sm:mb-12 py-space-sm border-b border-surface-container pb-space-md">
            <Link className="group flex items-center gap-3 active:scale-95 transition-transform duration-150" to="/">
              <span className="font-headline-md text-headline-md font-medium tracking-tight text-on-surface">KAAL AI</span>
            </Link>
            <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <span>Already a member?</span>
              <Link className="font-label-md text-label-md text-secondary hover:text-on-secondary-fixed-variant transition-colors underline underline-offset-4 decoration-secondary/30 hover:decoration-secondary" to="/login">
                Sign in
              </Link>
            </div>
          </header>

          <div className="w-full max-w-xl mx-auto my-auto">

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm mb-3.5 border border-outline-variant/30">
                <span className="material-symbols-outlined text-[14px]" data-icon="local_fire_department" style={{ "fontVariationSettings": "'FILL' 1" }}>local_fire_department</span>
                <span>CONTEMPLATIVE SPACE</span>
              </div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-medium tracking-tight">
                Begin your journey.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
                Create a space for reflection and thoughtful guidance.
              </p>
            </div>

            <div className="hidden mb-6 p-4 rounded-xl border transition-all duration-300" id="alert-banner">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5" id="alert-icon"></span>
                <div className="flex-1">
                  <p className="font-label-md text-label-md" id="alert-title"></p>
                  <p className="font-body-sm text-body-sm mt-0.5" id="alert-desc"></p>
                </div>
                <button aria-label="Close notification" className="text-on-surface-variant hover:text-on-surface" type="button">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            <form className="space-y-4 sm:space-y-5" id="registerForm" noValidate onSubmit={handleSignup}>
              {error && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error font-body-sm flex items-start gap-2 mb-4">
                  <span className="material-symbols-outlined text-[20px]">error</span>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="name">
                  Full name
                </label>
                <div className="relative">
                  <input autoComplete="name" className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-on-surface placeholder:text-outline font-body-md text-body-md outline-none" id="name" name="name" placeholder="Enter Your Name" required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-outline text-[20px] pointer-events-none" data-icon="person">person</span>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <input autoComplete="email" className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-on-surface placeholder:text-outline font-body-md text-body-md outline-none" id="email" name="email" placeholder="Enter Your Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-outline text-[20px] pointer-events-none" data-icon="mail">mail</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="password">
                    Password
                  </label>
                  <span className="font-body-sm text-body-sm text-outline">At least 8 characters</span>
                </div>
                <div className="relative">
                  <input autoComplete="new-password" className="w-full px-4 py-3 pr-11 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-on-surface placeholder:text-outline font-body-md text-body-md outline-none" id="password" name="password" placeholder="Enter Your password" required type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button aria-label="Toggle password visibility" className="absolute right-3.5 top-3.5 text-outline hover:text-on-surface transition-colors focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px]" data-icon="visibility" id="pwdToggleIcon">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>


              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="Confirmpassword">
                  Confirm password
                </label>
                <div className="relative">
                  <input autoComplete="new-password" className="w-full px-4 py-3 pr-11 bg-surface-container-low rounded-xl border border-outline-variant/40 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-on-surface placeholder:text-outline font-body-md text-body-md outline-none" id="confirmPassword" name="confirmPassword" placeholder="Confirm Your password" required type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <button aria-label="Toggle password confirmation visibility" className="absolute right-3.5 top-3.5 text-outline hover:text-on-surface transition-colors focus:outline-none" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <span className="material-symbols-outlined text-[20px]" data-icon="visibility" id="confPwdToggleIcon">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input className="mt-1 w-4 h-4 rounded text-primary-container bg-surface-container border-outline-variant focus:ring-secondary/20 focus:ring-offset-0 cursor-pointer" id="terms" required type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <label className="font-body-sm text-body-sm text-on-surface-variant leading-normal cursor-pointer select-none" htmlFor="terms">
                  I agree to the <Link className="text-secondary underline underline-offset-2 hover:text-on-surface" to="/terms">Terms of Sanctuary</Link> and acknowledge the <Link className="text-secondary underline underline-offset-2 hover:text-on-surface" to="/privacy">Sacred Privacy Principles</Link>.
                </label>
              </div>

              <div className="pt-2">
                <button disabled={isLoading} className="w-full bg-primary-container text-on-primary py-3.5 px-6 rounded-xl font-label-md text-label-md hover:bg-black active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 candlelight-floating group relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none" id="submitBtn" type="submit">
                  {!isLoading ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] text-secondary-fixed transition-transform group-hover:scale-110" data-icon="spa" id="btnIcon">spa</span>
                      <span id="btnText">Create Account</span>
                    </>
                  ) : (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-surface" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
                      </svg>
                      <span>Creating...</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-outline-variant/30 text-center">
              {/* <p className="font-body-sm text-body-sm text-outline flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary" data-icon="shield" style={{"fontVariationSettings":"'FILL' 1"}}>shield</span>
            Your reflections are personal to you. No tracking, zero judgment.
          </p> */}
              <div className="mt-4 text-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Already have an account?</span>
                <Link className="font-label-md text-label-md text-secondary hover:text-on-secondary-fixed-variant ml-1 underline underline-offset-4 decoration-secondary/30" to="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          <footer className="w-full max-w-xl mx-auto pt-8 mt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-outline font-body-sm text-body-sm">
            <p>© 2025 KAAL AI. Ancient wisdom. Modern clarity.</p>

          </footer>
        </section>
      </main>



    </>
  );
}
