import React from 'react';
import { Home, Trophy, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'ranking' | 'profile';
  onTabChange: (tab: 'home' | 'ranking' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItemClass = (isActive: boolean) => 
    `flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${isActive ? 'text-secondary border-2 border-blue-100 bg-blue-50' : 'text-gray-400 hover:bg-gray-100'}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 px-6 flex justify-between items-center z-50 max-w-lg mx-auto w-full">
      <button onClick={() => onTabChange('home')} className={navItemClass(activeTab === 'home')}>
        <Home size={28} strokeWidth={2.5} />
        <span className="text-xs font-bold mt-1 uppercase">Aulas</span>
      </button>
      <button onClick={() => onTabChange('ranking')} className={navItemClass(activeTab === 'ranking')}>
        <Trophy size={28} strokeWidth={2.5} />
        <span className="text-xs font-bold mt-1 uppercase">Ranking</span>
      </button>
      <button onClick={() => onTabChange('profile')} className={navItemClass(activeTab === 'profile')}>
        <User size={28} strokeWidth={2.5} />
        <span className="text-xs font-bold mt-1 uppercase">Perfil</span>
      </button>
    </div>
  );
};
