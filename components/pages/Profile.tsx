import React from 'react';
import { useCourse } from '../store';
import { Trophy, Flame, User } from 'lucide-react';

export const Profile: React.FC = () => {
  const { progress } = useCourse();

  return (
    <div className="p-6 bg-gray-50 min-h-screen pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Perfil</h1>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-sky-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-4">
           {/* Placeholder Avatar */}
           <User size={48} className="text-sky-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{progress.name}</h2>
        <p className="text-gray-400 text-sm">Entrou em 2026</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="text-warning fill-current" />
            <span className="font-bold text-gray-700">Ofensiva</span>
          </div>
          <p className="text-2xl font-black text-gray-800">{progress.streak} dias</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-warning fill-current" />
            <span className="font-bold text-gray-700">Total XP</span>
          </div>
          <p className="text-2xl font-black text-gray-800">{progress.xp}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Estatísticas</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
            <span className="text-gray-600">Aulas completas</span>
            <span className="font-bold text-gray-800">{progress.completedLessonIds.length}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
             <span className="text-gray-600">Próxima aula</span>
             <span className="font-bold text-secondary">Aula {progress.currentLessonId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};