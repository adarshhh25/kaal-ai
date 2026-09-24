import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col w-full">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-gutter-md">
        <div className="w-full max-w-md bg-surface-container-low rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_-4px_rgba(26,20,16,0.06)] border border-outline-variant/20 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-container/20 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center mb-6 shadow-md border-4 border-surface overflow-hidden">
              <span className="material-symbols-outlined text-secondary/80 leading-none" style={{ fontSize: '112px' }}>face</span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm mb-4 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[14px]" data-icon="spa" style={{"fontVariationSettings":"'FILL' 1"}}>spa</span>
              <span>MEMBER</span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1 font-medium tracking-tight">
              {user?.name || 'Sadhak'}
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 font-light">
              {user?.email || 'sadhak@kaal.ai'}
            </p>

            <div className="w-full border-t border-outline-variant/30 pt-8 mt-2">
              <button 
                onClick={handleLogout}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-highest hover:text-error font-label-md text-label-md transition-all duration-200 border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-on-surface-variant font-body-sm text-body-sm max-w-xs mx-auto">
          <p>“You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.”</p>
        </div>
      </main>
    </div>
  );
}
