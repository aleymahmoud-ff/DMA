import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, Question, Answer } from '../types';
import { ProgressBar } from '../components/ProgressBar';

interface Props {
  language: Language;
  questions: Question[];
  initialAnswers: Answer[];
  onAnswer: (answer: Answer) => void;
  onComplete: () => void;
}

export const Assessment: React.FC<Props> = ({ language, questions, initialAnswers, onAnswer, onComplete }) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  
  // Calculate current index based on answered questions
  const answeredIds = new Set(initialAnswers.map(a => a.questionId));
  const firstUnansweredIndex = questions.findIndex(q => !answeredIds.has(q.id));
  
  // If all answered, we are technically at the end, but logic handles resume.
  const [currentIndex, setCurrentIndex] = useState(firstUnansweredIndex >= 0 ? firstUnansweredIndex : questions.length - 1);
  const [selectedOption, setSelectedOption] = useState<number | 'NA' | 'NotSure' | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = currentIndex;

  const handleNext = () => {
    if (selectedOption === null) return;

    onAnswer({
      questionId: currentQuestion.id,
      value: selectedOption
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      // Ideally load previous answer, simplified here
      setSelectedOption(null);
    }
  };
  
  // Scale options 1-5
  const options = [1, 2, 3, 4, 5];

  if (!currentQuestion) return <div>{t.loading}</div>;

  return (
    <div className={`max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100 ${isRtl ? 'font-arabic' : ''}`}>
      <div className="flex justify-between items-center mb-4 text-sm text-slate-500">
        <span>{t.domain}: <span className="font-semibold text-brand-600">{currentQuestion.domain}</span></span>
        <span>{questions.length - currentIndex} {t.questionsRemaining}</span>
      </div>

      <ProgressBar current={progress} total={questions.length} />

      <h3 className="text-xl font-medium text-slate-900 mb-8 min-h-[5rem] leading-relaxed">
        {currentQuestion.text[language]}
      </h3>

      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>{isRtl ? 'لا أوافق بشدة' : 'Strongly Disagree'}</span>
          <span>{isRtl ? 'أوافق بشدة' : 'Strongly Agree'}</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {options.map((val) => (
            <button
              key={val}
              onClick={() => setSelectedOption(val)}
              className={`h-12 rounded-lg border font-bold transition-all ${
                selectedOption === val 
                  ? 'bg-brand-600 border-brand-600 text-white shadow-md' 
                  : 'border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50'
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 mt-4">
           <button
            onClick={() => setSelectedOption('NotSure')}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
              selectedOption === 'NotSure'
                ? 'bg-slate-700 text-white border-slate-700'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {t.notSure}
          </button>
           <button
            onClick={() => setSelectedOption('NA')}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
              selectedOption === 'NA'
                ? 'bg-slate-700 text-white border-slate-700'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {t.na}
          </button>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-slate-100">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`px-6 py-2 rounded-lg font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 ${isRtl ? 'order-last' : ''}`}
        >
          {t.back}
        </button>
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`px-8 py-2 bg-brand-600 text-white rounded-lg font-medium shadow-sm hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed ${isRtl ? 'order-first' : ''}`}
        >
          {currentIndex === questions.length - 1 ? t.submit : t.next}
        </button>
      </div>
    </div>
  );
};
