
import React from 'react';
import { Home, Zap, BarChart2, MousePointer2 } from 'lucide-react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
  onSimulate: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, setActiveScreen, onSimulate }) => {
  return (
    <div className="min-h-screen max-w-md mx-auto relative flex flex-col pb-24 overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#CCFF00] rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-[#0A1128] fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight">Velocity</span>
        </div>
        <button 
          onClick={onSimulate}
          className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
        >
          <MousePointer2 size={20} className="text-[#CCFF00]" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-6 overflow-y-auto">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] glass rounded-[32px] p-2 flex items-center justify-around z-50">
        <NavItem 
          icon={<Home size={22} />} 
          label="Home" 
          active={activeScreen === 'home'} 
          onClick={() => setActiveScreen('home')} 
        />
        <NavItem 
          icon={<Zap size={22} />} 
          label="Leaks" 
          active={activeScreen === 'habits'} 
          onClick={() => setActiveScreen('habits')} 
        />
        <NavItem 
          icon={<BarChart2 size={22} />} 
          label="Velocity" 
          active={activeScreen === 'analytics'} 
          onClick={() => setActiveScreen('analytics')} 
        />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 ${
      active ? 'bg-[#CCFF00] text-[#0A1128]' : 'text-white/40 hover:text-white/70'
    }`}
  >
    {icon}
    <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${active ? 'opacity-100' : 'opacity-0'}`}>
      {/* label */}
    </span>
  </button>
);

export default Layout;
