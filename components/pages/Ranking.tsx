import React from 'react';
import { useCourse } from '../store';
import { Trophy } from 'lucide-react';

export const Ranking: React.FC = () => {
  const { progress } = useCourse();

  // Mock Data
  const leaderboard = [
    { name: "Maria Silva", xp: progress.xp + 450, avatar: "bg-purple-200" },
    { name: "João Pedro", xp: progress.xp + 200, avatar: "bg-green-200" },
    { name: progress.name, xp: progress.xp, avatar: "bg-sky-200", isUser: true },
    { name: "Ana Clara", xp: Math.max(0, progress.xp - 100), avatar: "bg-orange-200" },
    { name: "Lucas F.", xp: Math.max(0, progress.xp - 250), avatar: "bg-red-200" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-secondary p-6 text-center text-white pb-10">
        <h1 className="text-2xl font-bold mb-2">Divisão Diamante</h1>
        <Trophy className="mx-auto w-12 h-12 text-warning fill-current drop-shadow-md" />
      </div>
      
      <div className="px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {leaderboard.map((user, index) => (
            <div 
              key={index}
              className={`flex items-center p-4 border-b border-gray-100 ${user.isUser ? 'bg-sky-50' : ''}`}
            >
              <div className="font-bold text-gray-400 w-8 text-center mr-4">{index + 1}</div>
              <div className={`w-10 h-10 rounded-full ${user.avatar} mr-4`}></div>
              <div className="flex-1">
                <p className={`font-bold ${user.isUser ? 'text-secondary' : 'text-gray-700'}`}>
                  {user.name}
                </p>
                <p className="text-xs text-gray-400">Turma de 2026</p>
              </div>
              <div className="font-bold text-gray-600">{user.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};