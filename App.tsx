import React, { useState } from 'react';
import { CourseProvider, useCourse } from './store';
import { CURRICULUM } from './data';
import { Home } from './pages/Home';
import { Lesson } from './pages/Lesson';
import { Profile } from './pages/Profile';
import { Ranking } from './pages/Ranking';
import { BottomNav } from './components/BottomNav';
import { Button } from './components/Button';
import { Trophy } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'ranking' | 'profile'>('home');
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { addXp, progress } = useCourse();

  const handleStartLesson = (id: number) => {
    setActiveLessonId(id);
  };

  const handleLessonComplete = () => {
    setActiveLessonId(null);
    setShowCompletionModal(true);
    // XP is added inside the store's completeLesson logic, but let's play sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); // Victory
    audio.volume = 0.5;
    audio.play().catch(e => {});
  };

  const activeLesson = activeLessonId ? CURRICULUM.find(l => l.id === activeLessonId) : null;

  if (activeLesson) {
    return (
      <Lesson 
        lesson={activeLesson} 
        onExit={() => setActiveLessonId(null)}
        onComplete={handleLessonComplete}
      />
    );
  }

  // Completion Modal
  if (showCompletionModal) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
        <div className="mb-8 relative">
           <div className="absolute inset-0 bg-yellow-200 blur-xl opacity-50 rounded-full"></div>
           <Trophy className="w-32 h-32 text-warning fill-current relative z-10 animate-bounce" />
        </div>
        <h1 className="text-3xl font-black text-gray-800 mb-2">Aula Concluída!</h1>
        <p className="text-gray-500 mb-8 font-medium">Você fortaleceu sua fé.</p>
        
        <div className="flex gap-4 w-full max-w-xs mb-8">
           <div className="flex-1 bg-blue-50 border-2 border-blue-100 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-bold uppercase">Pontuação</div>
              <div className="text-2xl font-black text-secondary">70</div>
           </div>
           <div className="flex-1 bg-yellow-50 border-2 border-yellow-100 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-bold uppercase">XP Ganho</div>
              <div className="text-2xl font-black text-warning">+35</div>
           </div>
        </div>

        <Button onClick={() => setShowCompletionModal(false)} variant="primary" fullWidth>
          CONTINUAR
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
      {activeTab === 'home' && <Home onStartLesson={handleStartLesson} />}
      {activeTab === 'ranking' && <Ranking />}
      {activeTab === 'profile' && <Profile />}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}