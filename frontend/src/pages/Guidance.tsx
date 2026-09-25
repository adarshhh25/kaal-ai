import { useState, useRef, useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { guidanceApi } from '../services/api';
import Header from '../components/Header';

interface GuidanceResponse {
  reflection: string;
  wisdom: string;
  application: string;
  nextStep: string;
}

interface GuidanceRecord {
  id: string;
  question: string;
  response: GuidanceResponse;
  createdAt: string;
}

export default function Guidance() {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState<GuidanceRecord[]>([]);
  const [activeGuidance, setActiveGuidance] = useState<GuidanceRecord | null>(null);
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
    }
  }, [isAuthenticated]);

  const loadHistory = async () => {
    try {
      const res = await guidanceApi.list();
      setHistory(res.data || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  // Auto scroll to bottom when a guidance is active
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeGuidance, isLoading]);

  // Prevent background scrolling on mobile when history sidebar is open
  useEffect(() => {
    if (isMobileHistoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileHistoryOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isAuthenticated) {
      alert("Please log in to seek guidance.");
      return;
    }

    const questionToAsk = input;
    setInput('');
    setIsLoading(true);
    setActiveGuidance(null); // Clear active to show a loading state for the new question

    try {
      const res = await guidanceApi.ask({ question: questionToAsk });
      const newGuidance = res.data;
      
      // Update history and set active
      setHistory(prev => [newGuidance, ...prev]);
      setActiveGuidance(newGuidance);
    } catch (err) {
      console.error('Failed to ask guidance:', err);
      alert('Failed to get guidance. Please try again.');
      setInput(questionToAsk); // restore input
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setActiveGuidance(null);
    setInput('');
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this guidance?')) return;
    
    try {
      await guidanceApi.delete(id);
      setHistory(prev => prev.filter(item => item.id !== id));
      if (activeGuidance?.id === id) {
        setActiveGuidance(null);
      }
    } catch (err) {
      console.error('Failed to delete guidance:', err);
      alert('Failed to delete guidance. Please try again.');
    }
  };

  // Function to render the structured response beautifully
  const renderResponse = (response: GuidanceResponse) => {
    return (
      <div className="space-y-4">
        <div>
          <span className="text-secondary font-label-sm tracking-widest uppercase block mb-1">Reflection</span>
          <p className="text-on-surface">{response.reflection}</p>
        </div>
        <div>
          <span className="text-secondary font-label-sm tracking-widest uppercase block mb-1">Wisdom</span>
          <p className="text-on-surface italic border-l-2 border-secondary/40 pl-3 py-1">{response.wisdom}</p>
        </div>
        <div>
          <span className="text-secondary font-label-sm tracking-widest uppercase block mb-1">Application</span>
          <p className="text-on-surface">{response.application}</p>
        </div>
        <div>
          <span className="text-secondary font-label-sm tracking-widest uppercase block mb-1">Next Step</span>
          <p className="text-on-surface font-medium">{response.nextStep}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-surface overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main App Layout: Sidebar + Chat */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar (History) - Desktop static, Mobile sliding */}
        <aside className={`fixed md:relative top-16 bottom-0 md:inset-y-0 left-0 z-40 w-64 md:w-[280px] bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileHistoryOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
          <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between gap-2">
            <button 
              onClick={() => {
                startNewChat();
                setIsMobileHistoryOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors border border-outline-variant/40"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="whitespace-nowrap">New Guidance</span>
            </button>
            <button 
              onClick={() => setIsMobileHistoryOpen(false)} 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors shrink-0"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-2">
            <h3 className="text-[10px] font-label-sm text-outline tracking-widest uppercase mb-2 px-2 pt-2">Past Inquiries</h3>
            
            {!isAuthenticated ? (
              <p className="px-2 text-xs text-on-surface-variant italic">Log in to view history.</p>
            ) : history.length === 0 ? (
              <p className="px-2 text-xs text-on-surface-variant italic">No guidance sought yet.</p>
            ) : (
              <div className="space-y-1">
                {history.map(item => (
                  <div key={item.id} className="relative group flex items-center">
                    <button 
                      onClick={() => {
                        setActiveGuidance(item);
                        setIsMobileHistoryOpen(false); // Close on mobile after selection
                      }}
                      className={`w-full text-left px-3 py-2.5 pr-10 rounded-lg text-body-sm font-body-sm truncate transition-colors border z-0 ${
                        activeGuidance?.id === item.id 
                          ? 'bg-surface-container-low text-on-surface border-outline-variant/30'
                          : 'hover:bg-surface-container-low text-on-surface-variant border-transparent'
                      }`}
                    >
                      {item.question}
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, item.id)}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-error transition-opacity z-10 ${
                        activeGuidance?.id === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 hover:opacity-100'
                      }`}
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Right Chat Area */}
        {/* Overlay for mobile history */}
        {isMobileHistoryOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden animate-fade-in"
            onClick={() => setIsMobileHistoryOpen(false)}
          ></div>
        )}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Mobile History Toggle Bar */}
          <div className="md:hidden flex items-center px-4 py-2.5 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 sticky top-0 z-20">
            <button 
              onClick={() => setIsMobileHistoryOpen(true)}
              className="flex items-center gap-1.5 text-secondary hover:text-secondary-fixed transition-colors text-label-sm font-label-sm uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              History
            </button>
          </div>

          <main className="flex-1 overflow-y-auto px-gutter-md py-6 custom-scrollbar">
            <div className="max-w-3xl mx-auto space-y-6 flex flex-col min-h-full">
              
              {!activeGuidance && !isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-80 mt-10 md:mt-0">
                  <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-secondary text-3xl" data-weight="fill">spa</span>
                  </div>
                  <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-medium text-on-surface tracking-tight">
                    Seek Your Guidance
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
                    Share a confusion, career decision, emotional struggle, or personal crossroad to receive Vedic clarity.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 pt-6 max-w-lg">
                    {["I'm uncertain about my career direction...", "I feel overwhelmed and cannot find calm...", "I need clarity on a difficult relationship..."].map((seed, i) => (
                      <button 
                        key={i}
                        onClick={() => setInput(seed)}
                        className="px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/30 hover:border-secondary hover:bg-surface-container text-on-surface-variant font-body-sm text-body-sm transition-all duration-150 active:scale-95 text-left"
                      >
                        {seed}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Display Active Guidance */}
              {activeGuidance && (
                <>
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="px-5 py-4 max-w-[85%] md:max-w-[75%] rounded-2xl font-body-lg text-body-lg whitespace-pre-wrap leading-relaxed shadow-sm bg-surface-container text-on-surface border border-outline-variant/20 rounded-tr-sm">
                      {activeGuidance.question}
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3 mt-1 shrink-0 border border-secondary/20">
                      <span className="material-symbols-outlined text-secondary text-[16px]">spa</span>
                    </div>
                    <div className="px-5 py-4 max-w-[85%] md:max-w-[75%] rounded-2xl font-body-lg text-body-lg leading-relaxed shadow-sm bg-surface-container-lowest text-on-surface border border-secondary/20 rounded-tl-sm candlelight-shadow">
                      {renderResponse(activeGuidance.response)}
                    </div>
                  </div>
                </>
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3 mt-1 shrink-0 border border-secondary/20">
                    <span className="material-symbols-outlined text-secondary text-[16px]">spa</span>
                  </div>
                  <div className="px-5 py-4 max-w-[85%] rounded-2xl bg-surface-container-lowest text-on-surface border border-secondary/20 rounded-tl-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary/40 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-secondary/60 animate-pulse delay-75"></span>
                    <span className="w-2 h-2 rounded-full bg-secondary/80 animate-pulse delay-150"></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </main>

          {/* Chat Input */}
          <div className="flex-shrink-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 px-gutter-md py-4 sm:py-6">
            <div className="max-w-3xl mx-auto">
              <form 
                onSubmit={handleSubmit}
                className="flex items-end gap-2 p-1.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 focus-within:border-secondary/50 focus-within:ring-2 focus-within:ring-secondary/15 transition-all shadow-sm"
              >
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Speak honestly without judgment..."
                  className="flex-1 max-h-32 min-h-[44px] bg-transparent border-0 px-3 py-2.5 font-body-sm sm:font-body-md text-body-sm sm:text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none resize-none custom-scrollbar"
                  rows={1}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="mb-0.5 mr-0.5 shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-on-primary hover:bg-black disabled:opacity-50 disabled:bg-surface-container-highest disabled:text-outline transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[11px] text-outline font-body-sm">
                  Kaal AI reads intention, not grammar. Responses are for reflection, not professional advice.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
