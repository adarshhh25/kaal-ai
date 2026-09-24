import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {}

export default function Header({}: HeaderProps = {}) {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="flex-shrink-0 flex items-center justify-between px-gutter-md md:px-margin-md h-16 w-full bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30 dark:border-outline/20 relative z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Main App Nav Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low text-on-surface border border-outline-variant/30 hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>



          <Link className="font-headline-md text-headline-md font-medium tracking-tight text-on-surface dark:text-on-surface flex items-center gap-1.5 ml-1 sm:ml-0" to="/">
            <span className="hidden sm:inline">KAAL AI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-black dark:text-black font-medium text-label-md font-label-md hover:text-black/80 dark:hover:text-black/80 transition-colors duration-200" to="/">Home</Link>
          <Link className="text-black dark:text-black font-medium text-label-md font-label-md hover:text-black/80 dark:hover:text-black/80 transition-colors duration-200" to="/guidance">Chat</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors shadow-sm border border-outline-variant/30" to="/profile" title="Profile">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </Link>
          ) : (
            <Link className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-on-primary text-label-md font-label-md shadow-sm hover:opacity-90 active:scale-95 transition-all duration-150" to="/login">
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 bg-surface-container-lowest h-full flex flex-col shadow-2xl animate-fade-in">
            <div className="px-gutter-md h-16 border-b border-outline-variant/30 flex items-center justify-between">
              <span className="font-headline-md font-medium text-on-surface">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex flex-col p-6 gap-6 font-label-lg text-label-lg text-on-surface">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-secondary transition-colors">
                Home
              </Link>
              <Link to="/guidance" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-secondary transition-colors">
                Guidance
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
