import React, { useEffect, useRef } from 'react';
import { BookOpen, Star, Lock, Check } from 'lucide-react';
import { CURRICULUM } from '../data';
import { useCourse } from '../store';

interface HomeProps {
  onStartLesson: (id: number) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartLesson }) => {
  const { getLessonStatus, progress } = useCourse();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current lesson
  useEffect(() => {
    if (scrollRef.current) {
      const activeNode = scrollRef.current.querySelector('.node-active');
      if (activeNode) {
        activeNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, []);

  return (
    <div className="pb-24 pt-4 px-4 bg-gray-50 min-h-screen" ref={scrollRef}>
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50/95 backdrop-blur z-10 py-4 border-b border-gray-200">
        <div className="flex gap-4">
          <div className="flex items-center text-danger font-bold">
            <span className="mr-1">❤️</span> {progress.hearts}
          </div>
          <div className="flex items-center text-warning font-bold">
            <span className="mr-1">⚡</span> {progress.streak}
          </div>
        </div>
        <div className="flex items-center text-secondary font-bold">
          <span className="mr-1">⭐</span> {progress.xp} XP
        </div>
      </div>

      {/* Path */}
      <div className="flex flex-col items-center gap-6 relative">
        {CURRICULUM.map((lesson, index) => {
          const status = getLessonStatus(lesson.id);
          const offset = Math.sin(index) * 40; // Sine wave for path
          
          let bgColor = 'bg-locked';
          let borderColor = 'border-lockedDark';
          let icon = <Lock size={32} className="text-gray-400" />;
          let textColor = 'text-gray-400';

          if (status === 'completed') {
            bgColor = 'bg-warning';
            borderColor = 'border-warningDark';
            icon = <Check size={32} className="text-white" />;
            textColor = 'text-warningDark';
          } else if (status === 'active') {
            bgColor = 'bg-secondary';
            borderColor = 'border-secondaryDark';
            icon = <BookOpen size={32} className="text-white" />;
            textColor = 'text-gray-800';
          }

          if (lesson.type === 'exam') {
            // Special styling for exams
             if (status === 'active') {
               bgColor = 'bg-primary';
               borderColor = 'border-primaryDark';
             }
          }

          return (
            <div 
              key={lesson.id} 
              className={`relative flex flex-col items-center ${status === 'active' ? 'node-active' : ''}`}
              style={{ transform: `translateX(${offset}px)` }}
            >
              {/* Floating Start Label for Active */}
              {status === 'active' && (
                <div className="mb-2 bg-white px-3 py-1 rounded-lg shadow-md border-2 border-gray-100 animate-bounce text-danger font-bold text-xs uppercase">
                  Start
                </div>
              )}

              {/* Node Button */}
              <button
                onClick={() => status !== 'locked' && onStartLesson(lesson.id)}
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center 
                  border-b-4 shadow-lg transition-transform 
                  ${bgColor} ${borderColor}
                  ${status === 'active' ? 'active:scale-95 cursor-pointer ring-4 ring-white' : ''}
                  ${status === 'locked' ? 'cursor-not-allowed opacity-80' : ''}
                `}
              >
                {icon}
              </button>

              {/* Lesson Title Label */}
              <div className={`mt-2 text-center max-w-[150px]`}>
                <h3 className={`font-bold text-sm leading-tight ${textColor}`}>
                  {lesson.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {lesson.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
