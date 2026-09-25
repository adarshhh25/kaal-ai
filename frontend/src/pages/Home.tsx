import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';

export default function Home() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  
  return (
    <>
      <Header />

      <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-20 pb-16 px-gutter-md md:px-margin-lg overflow-hidden">

<div className="absolute inset-0 z-0">
<div className="w-full h-full bg-cover bg-center md:bg-bottom scale-105 transform duration-1000 ease-out" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCFo29lTMW12UvWkCRWUyNtH1VuC9btkzyYDKeTie6NibOtB2o3EBVspTDOTfAu9AwdzuviCPalaExUrEapMJh6mwMp70053Dg4oO-WsLow0mDJwOgd7opNpGEOEH-kFScn993DRI_z0Ex3CF4L0ZHcjAPm5-oorkEiHLW6NXde6VkpCeEPIqVFtzfO-g-_iIXskehTRhM-Fl5oKCr5YEGFk93M0RlwxHKxNu0J3eou1wbEnE84adG')"}}></div>

<div className="absolute inset-0 bg-gradient-to-b from-[#0D1322]/90 via-[#0D1322]/65 to-[#fbf9f6]"></div>
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,155,72,0.18)_0%,rgba(13,19,34,0)_70%)]"></div>
</div>

<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none animate-breathe"></div>

<div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">

<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/40 shadow-xs mb-6">
<span className="material-symbols-outlined text-secondary text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>spa</span>
<span className="text-label-sm font-label-sm text-secondary tracking-widest uppercase">Ancient wisdom. Modern clarity.</span>
</div>

<h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-on-tertiary drop-shadow-sm font-medium tracking-tight mb-4 text-balance">
        Bring what is on your mind. <br className="hidden sm:inline"/>
<span className="italic font-normal text-secondary-fixed">Find a clearer way forward.</span>
</h1>

<p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-surface-container-low/90 max-w-xl mb-9 leading-relaxed font-light">
        A contemplative space inspired by timeless Gita principles, guiding modern dilemmas with stillness and clarity.
      </p>

<div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
<Link className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-label-md text-label-md shadow-[0_4px_20px_-2px_rgba(26,20,16,0.1)] active:scale-95 transition-all duration-150 group border border-outline-variant/30" to="/guidance">
<span className="material-symbols-outlined text-secondary text-[18px]">local_fire_department</span>
<span>Seek Guidance</span>
<span className="material-symbols-outlined text-outline group-hover:translate-x-0.5 transition-transform text-[16px]">arrow_forward</span>
</Link>
</div>

<div className="mt-12 flex items-center gap-3 text-surface-container-high/70 text-body-sm font-body-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
<span>Completely anonymous • Quiet sanctuary • Zero judgment</span>
</div>
</div>
</section>

<section className="py-space-xl px-gutter-md md:px-margin-lg max-w-6xl mx-auto" id="guidance">
<div className="text-center max-w-xl mx-auto mb-12">
<span className="text-label-sm font-label-sm text-secondary uppercase tracking-widest block mb-2">The Path of Stillness</span>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-medium mb-3">
        Pause. Reflect. Move Forward.
      </h2>
<p className="text-body-md font-body-md text-on-surface-variant">
        Three intentional moments to transition from mental noise into sacred, grounded direction.
      </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div 
  onClick={() => setActiveCard(1)}
  className={`cursor-pointer group relative p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:shadow-md transition-all duration-300 flex flex-col justify-between border ${activeCard === 1 ? 'border-secondary/50 ring-1 ring-secondary/20' : 'border-outline-variant/30 hover:border-outline-variant/50'}`}
>
{activeCard === 1 && (
  <div className="absolute -top-3 right-6 bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase animate-fade-in">
    Safe Space
  </div>
)}
<div>
<div className="flex items-center justify-between mb-6">
<span className={`font-headline-md text-headline-md font-normal transition-colors ${activeCard === 1 ? 'text-secondary' : 'text-secondary/40'}`}>01</span>
<div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeCard === 1 ? 'bg-secondary-fixed/40 text-secondary' : 'bg-surface-container-low text-on-surface group-hover:bg-secondary-fixed/20'}`}>
<span className="material-symbols-outlined text-[20px]">edit_note</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2.5">
            Share what's on your mind
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Bring career uncertainty, fear, relationships, or heavy decisions into a safe, patient space without restraint.
          </p>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center text-body-sm font-body-sm text-secondary">
<span className="material-symbols-outlined text-[16px] mr-1.5">self_improvement</span>
<span>Unburden your thought stream</span>
</div>
</div>

<div 
  onClick={() => setActiveCard(2)}
  className={`cursor-pointer group relative p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:shadow-md transition-all duration-300 flex flex-col justify-between border ${activeCard === 2 ? 'border-secondary/50 ring-1 ring-secondary/20' : 'border-outline-variant/30 hover:border-outline-variant/50'}`}
>
{activeCard === 2 && (
  <div className="absolute -top-3 right-6 bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase animate-fade-in">
    Vedic Synthesis
  </div>
)}
<div>
<div className="flex items-center justify-between mb-6">
<span className={`font-headline-md text-headline-md font-normal transition-colors ${activeCard === 2 ? 'text-secondary' : 'text-secondary/40'}`}>02</span>
<div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeCard === 2 ? 'bg-secondary-fixed/40 text-secondary' : 'bg-surface-container-low text-on-surface group-hover:bg-secondary-fixed/20'}`}>
<span className="material-symbols-outlined text-[20px]">auto_stories</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2.5">
            Receive thoughtful guidance
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Timeless Gita principles translated into modern psychological clarity, stripped of esoteric complexity.
          </p>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center text-body-sm font-body-sm text-secondary">
<span className="material-symbols-outlined text-[16px] mr-1.5">local_fire_department</span>
<span>Ancient intellect for modern dilemmas</span>
</div>
</div>

<div 
  onClick={() => setActiveCard(3)}
  className={`cursor-pointer group relative p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:shadow-md transition-all duration-300 flex flex-col justify-between border ${activeCard === 3 ? 'border-secondary/50 ring-1 ring-secondary/20' : 'border-outline-variant/30 hover:border-outline-variant/50'}`}
>
{activeCard === 3 && (
  <div className="absolute -top-3 right-6 bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase animate-fade-in">
    Actionable
  </div>
)}
<div>
<div className="flex items-center justify-between mb-6">
<span className={`font-headline-md text-headline-md font-normal transition-colors ${activeCard === 3 ? 'text-secondary' : 'text-secondary/40'}`}>03</span>
<div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeCard === 3 ? 'bg-secondary-fixed/40 text-secondary' : 'bg-surface-container-low text-on-surface group-hover:bg-secondary-fixed/20'}`}>
<span className="material-symbols-outlined text-[20px]">footprint</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2.5">
            Take your next step
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Receive clear, grounded, actionable direction for immediate practice—tangible steps you can apply in minutes.
          </p>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center text-body-sm font-body-sm text-secondary">
<span className="material-symbols-outlined text-[16px] mr-1.5">task_alt</span>
<span>Action without attachment</span>
</div>
</div>
</div>
</section>

<section className="py-space-xl bg-surface-container-low/60 border-y border-outline-variant/30" id="themes">
<div className="max-w-6xl mx-auto px-gutter-md md:px-margin-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
<div>
<span className="text-label-sm font-label-sm text-secondary uppercase tracking-widest block mb-2">Contemporary Dilemmas</span>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-medium">
            Gita Wisdom, Reimagined for Today
          </h2>
</div>
<p className="text-body-md font-body-md text-on-surface-variant max-w-md mt-2 md:mt-0">
          The internal battlefield of Kurukshetra is mirrored in our everyday work, relationships, and modern anxieties.
        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-6 gap-4">

<div className="md:col-span-4 p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:border-secondary/40 transition-colors">
<div className="flex items-center gap-2 mb-3 text-secondary">
<span className="material-symbols-outlined text-[20px]">trending_flat</span>
<span className="text-label-sm font-label-sm uppercase tracking-wider">Karmanye Vadhikaraste</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2">Career Uncertainty & Impostor Syndrome</h3>
<p className="text-body-md font-body-md text-on-surface-variant mb-4">
            "Focus completely on your effort; free yourself from obsession with outcomes." Learn to execute high-stakes professional work without paralyzing fear of failure.
          </p>
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-body-sm font-body-sm text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span>Nishkama Karma in Modern Tech & Corporate Life</span>
</div>
</div>

<div className="md:col-span-2 p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:border-secondary/40 transition-colors flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 mb-3 text-secondary">
<span className="material-symbols-outlined text-[20px]">air</span>
<span className="text-label-sm font-label-sm uppercase tracking-wider">Sthitaprajna</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2">Fear of Failure & Anxiety</h3>
<p className="text-body-md font-body-md text-on-surface-variant">
              Cultivating the undisturbed mind—becoming like the deep ocean that absorbs all turbulent rivers without overflowing.
            </p>
</div>
<span className="text-body-sm font-body-sm text-secondary mt-4 block">Quiet presence amidst chaos →</span>
</div>

<div className="md:col-span-2 p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:border-secondary/40 transition-colors">
<div className="flex items-center gap-2 mb-3 text-secondary">
<span className="material-symbols-outlined text-[20px]">diversity_3</span>
<span className="text-label-sm font-label-sm uppercase tracking-wider">Samadarshana</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2">Relationships & Boundaries</h3>
<p className="text-body-md font-body-md text-on-surface-variant">
            Seeing oneness with empathy while holding steady emotional boundaries without resentment or guilt.
          </p>
</div>

<div className="md:col-span-2 p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:border-secondary/40 transition-colors">
<div className="flex items-center gap-2 mb-3 text-secondary">
<span className="material-symbols-outlined text-[20px]">psychology_alt</span>
<span className="text-label-sm font-label-sm uppercase tracking-wider">Buddhi Yoga</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2">Difficult Decisions</h3>
<p className="text-body-md font-body-md text-on-surface-variant">
            Harnessing the serene clarity of higher discernment (Buddhi) instead of reacting to impulsive fears.
          </p>
</div>

<div className="md:col-span-2 p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(26,20,16,0.04)] hover:border-secondary/40 transition-colors">
<div className="flex items-center gap-2 mb-3 text-secondary">
<span className="material-symbols-outlined text-[20px]">bedtime</span>
<span className="text-label-sm font-label-sm uppercase tracking-wider">Yukta Vihara</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-medium mb-2">Stress & Burnout</h3>
<p className="text-body-md font-body-md text-on-surface-variant">
            Reclaiming the sacred rhythm of pause, restorative discipline, and genuine spiritual recharge.
          </p>
</div>
</div>
</div>
</section>


<section className="py-space-xl px-gutter-md md:px-margin-lg text-center bg-surface-container-lowest" id="reflection">
<div className="max-w-2xl mx-auto">
<div className="w-8 h-px bg-secondary/40 mx-auto mb-6"></div>
<blockquote className="font-quote-editorial text-quote-editorial md:text-[24px] text-on-surface leading-relaxed mb-4">
        "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."
      </blockquote>
<cite className="text-label-md font-label-md text-secondary tracking-widest block not-italic">
        — BHAGAVAD GITA 2.47
      </cite>
<div className="w-8 h-px bg-secondary/40 mx-auto mt-6"></div>
</div>
</section>

<footer className="w-full py-space-xl px-gutter-md md:px-margin-lg flex flex-col items-center justify-center gap-space-md text-center max-w-7xl mx-auto bg-surface-container-low dark:bg-surface-container-high border-t border-outline-variant/40 dark:border-outline/20">
<div className="flex items-center gap-2">
<span className="font-headline-md text-headline-md text-on-surface dark:text-on-surface font-medium">KAAL AI</span>
</div>

<div className="flex flex-wrap items-center justify-center gap-6 my-2">
<Link className="text-on-surface-variant dark:text-outline text-body-sm font-body-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" to="#">Sutras</Link>
<Link className="text-on-surface-variant dark:text-outline text-body-sm font-body-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" to="#">Philosophy</Link>
<Link className="text-on-surface-variant dark:text-outline text-body-sm font-body-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" to="#">Meditation</Link>
<Link className="text-on-surface-variant dark:text-outline text-body-sm font-body-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" to="#">Privacy</Link>
<Link className="text-on-surface-variant dark:text-outline text-body-sm font-body-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" to="#">Terms</Link>
</div>
<p className="text-body-sm font-body-sm text-outline">
      © 2025 KAAL AI. Ancient wisdom. Modern clarity.
    </p>
</footer>

    </>
  );
}

