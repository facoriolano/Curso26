import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, INITIAL_HEARTS, XP_PER_LESSON, XP_PER_QUESTION, Lesson } from './types';
import { CURRICULUM } from './data';

interface GameState {
  progress: UserProgress;
  addXp: (amount: number) => void;
  loseHeart: () => void;
  completeLesson: (lessonId: number) => void;
  resetHearts: () => void;
  getLessonStatus: (lessonId: number) => 'locked' | 'active' | 'completed';
}

const defaultProgress: UserProgress = {
  xp: 0,
  streak: 1,
  hearts: INITIAL_HEARTS,
  completedLessonIds: [],
  currentLessonId: 1,
  name: "Catequizando"
};

const CourseContext = createContext<GameState | undefined>(undefined);

export const CourseProvider = ({ children }: { children?: ReactNode }) => {
  // Load from localStorage or default
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('crisma_progress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('crisma_progress', JSON.stringify(progress));
  }, [progress]);

  const addXp = (amount: number) => {
    setProgress(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const loseHeart = () => {
    setProgress(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
  };

  const resetHearts = () => {
    setProgress(prev => ({ ...prev, hearts: INITIAL_HEARTS }));
  };

  const completeLesson = (lessonId: number) => {
    setProgress(prev => {
      const isNewCompletion = !prev.completedLessonIds.includes(lessonId);
      const newCompleted = isNewCompletion ? [...prev.completedLessonIds, lessonId] : prev.completedLessonIds;
      
      // Calculate next lesson ID
      const nextId = lessonId + 1;
      const isNextAvailable = CURRICULUM.find(l => l.id === nextId);
      
      return {
        ...prev,
        completedLessonIds: newCompleted,
        currentLessonId: isNextAvailable ? Math.max(prev.currentLessonId, nextId) : prev.currentLessonId,
        xp: isNewCompletion ? prev.xp + XP_PER_LESSON : prev.xp
      };
    });
  };

  const getLessonStatus = (lessonId: number) => {
    if (progress.completedLessonIds.includes(lessonId)) return 'completed';
    if (lessonId === progress.currentLessonId) return 'active';
    return 'locked';
  };

  return (
    <CourseContext.Provider value={{ progress, addXp, loseHeart, completeLesson, resetHearts, getLessonStatus }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourse must be used within a CourseProvider");
  return context;
};