import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Heart } from 'lucide-react';
import { Lesson as LessonType, Question } from '../types';
import { Button } from '../components/Button';
import { useCourse } from '../store';

interface LessonProps {
  lesson: LessonType;
  onComplete: () => void;
  onExit: () => void;
}

export const Lesson: React.FC<LessonProps> = ({ lesson, onComplete, onExit }) => {
  const { loseHeart, addXp, progress, completeLesson } = useCourse();
  const [currentStep, setCurrentStep] = useState(0); // Index for slides + questions combined
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [hearts, setHearts] = useState(progress.hearts);

  const totalSteps = lesson.theory.length + lesson.questions.length;
  const isTheory = currentStep < lesson.theory.length;
  const currentTheory = isTheory ? lesson.theory[currentStep] : null;
  const currentQuestionIndex = currentStep - lesson.theory.length;
  const currentQuestion = !isTheory ? lesson.questions[currentQuestionIndex] : null;

  const progressPercentage = ((currentStep) / totalSteps) * 100;

  useEffect(() => {
    if (hearts === 0) {
      // Game over logic handled in UI below
    }
  }, [hearts]);

  const handleNext = () => {
    if (isTheory) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Moving from feedback to next question
      setFeedback(null);
      setSelectedOption(null);
      setIsChecking(false);
      
      if (currentStep + 1 >= totalSteps) {
        completeLesson(lesson.id);
        onComplete();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleCheck = () => {
    if (selectedOption === null || !currentQuestion) return;

    setIsChecking(true);
    const isCorrect = selectedOption === currentQuestion.correctIndex;

    if (isCorrect) {
      setFeedback('correct');
      addXp(10);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); // Simple ding
      audio.volume = 0.5;
      audio.play().catch(e => {}); // Ignore auto-play errors
    } else {
      setFeedback('wrong');
      loseHeart();
      setHearts(h => h - 1);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'); // Error buzz
      audio.volume = 0.5;
      audio.play().catch(e => {});
    }
  };

  // Game Over Screen
  if (hearts <= 0) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
        <Heart className="text-gray-300 w-24 h-24 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Faltou Fé!</h2>
        <p className="text-gray-500 mb-8">Você ficou sem vidas. Revise o conteúdo e tente novamente.</p>
        <Button onClick={onExit} variant="primary" fullWidth>Sair</Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center px-4 justify-between border-b border-gray-100">
        <button onClick={onExit} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full">
          <X />
        </button>
        <div className="flex-1 mx-4 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-danger font-bold flex items-center">
          <Heart className="w-5 h-5 fill-current mr-1" />
          {hearts}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-40">
        {isTheory && currentTheory && (
          <div className="flex flex-col items-center animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{currentTheory.title}</h2>
            <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-2xl text-lg text-gray-700 leading-relaxed mb-4 shadow-sm">
              {currentTheory.content}
            </div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded">📖 {currentTheory.bibleReference}</span>
            </div>
          </div>
        )}

        {!isTheory && currentQuestion && (
          <div className="flex flex-col animate-in slide-in-from-right duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-8">{currentQuestion.text}</h2>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                let statusClass = "border-2 border-gray-200 hover:bg-gray-50";
                
                // Reveal logic
                if (feedback) {
                  if (index === currentQuestion.correctIndex) {
                    statusClass = "bg-green-100 border-green-500 text-green-700";
                  } else if (index === selectedOption && feedback === 'wrong') {
                    statusClass = "bg-red-100 border-red-500 text-red-700";
                  } else {
                    statusClass = "opacity-50 border-gray-100";
                  }
                } else if (selectedOption === index) {
                  statusClass = "bg-sky-100 border-secondary text-secondaryDark";
                }

                return (
                  <button
                    key={index}
                    disabled={feedback !== null}
                    onClick={() => setSelectedOption(index)}
                    className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${statusClass} flex items-center gap-3`}
                  >
                    <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm
                      ${selectedOption === index ? 'border-current' : 'border-gray-200 text-gray-400'}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Feedback Action Sheet */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-6 border-t border-gray-200 transition-colors duration-300
        ${feedback === 'correct' ? 'bg-green-100 border-green-400' : ''}
        ${feedback === 'wrong' ? 'bg-red-100 border-red-400' : 'bg-white'}
      `}>
        {feedback === 'correct' && (
          <div className="mb-4 flex items-center gap-3 text-green-700 font-bold text-xl animate-in slide-in-from-bottom-2">
            <div className="bg-white p-2 rounded-full"><CheckCircle size={32} /></div>
            <div>
              <p>Correto!</p>
              <p className="text-sm font-normal text-green-800 mt-1">{currentQuestion?.explanation}</p>
            </div>
          </div>
        )}

        {feedback === 'wrong' && (
          <div className="mb-4 flex items-center gap-3 text-red-700 font-bold text-xl animate-in slide-in-from-bottom-2">
            <div className="bg-white p-2 rounded-full"><XCircle size={32} /></div>
            <div>
              <p>Incorreto</p>
              <p className="text-sm font-normal text-red-800 mt-1">{currentQuestion?.explanation}</p>
            </div>
          </div>
        )}

        {isTheory ? (
          <Button variant="primary" fullWidth onClick={handleNext}>
            CONTINUAR
          </Button>
        ) : !feedback ? (
          <Button 
            variant={selectedOption !== null ? 'primary' : 'locked'} 
            fullWidth 
            onClick={handleCheck}
            disabled={selectedOption === null}
          >
            VERIFICAR
          </Button>
        ) : (
          <Button 
            variant={feedback === 'correct' ? 'primary' : 'danger'} 
            fullWidth 
            onClick={handleNext}
          >
            CONTINUAR
          </Button>
        )}
      </div>
    </div>
  );
};