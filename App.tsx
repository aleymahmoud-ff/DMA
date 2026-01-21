import React, { useState, useEffect } from 'react';
import { Landing } from './pages/Landing';
import { CodeEntry } from './pages/CodeEntry';
import { UserInfo } from './pages/UserInfo';
import { RoleSelection } from './pages/RoleSelection';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { LanguageSelector } from './components/LanguageSelector';
import { Language, Session, UserInfo as IUserInfo, Role, Answer, Question, AssessmentResult } from './types';
import { ApiService } from './services/apiService';
import { APP_NAME } from './constants';

enum Step {
  Landing,
  CodeEntry,
  UserInfo,
  RoleSelection,
  Assessment,
  Results
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState<Step>(Step.Landing);
  const [session, setSession] = useState<Session | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Set direction on language change
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleStart = () => setCurrentStep(Step.CodeEntry);

  const handleCodeSuccess = async (sessionData: Session) => {
    setSession(sessionData);
    setLanguage(sessionData.language); // Restore language from session if exists
    
    // Determine next step based on session status
    if (sessionData.status === 'completed') {
      // Logic to load results immediately if completed
      const res = await ApiService.calculateResults(sessionData);
      setResult(res);
      setCurrentStep(Step.Results);
    } else if (sessionData.status === 'in-progress' && sessionData.role) {
      // Resume assessment
      const qs = await ApiService.getQuestions(sessionData.role);
      setQuestions(qs);
      setCurrentStep(Step.Assessment);
    } else {
      // New user
      setCurrentStep(Step.UserInfo);
    }
  };

  const handleUserInfoSubmit = async (info: IUserInfo) => {
    if (!session) return;
    const updatedSession = { ...session, userInfo: info };
    setSession(updatedSession);
    await ApiService.updateSession(updatedSession);
    setCurrentStep(Step.RoleSelection);
  };

  const handleRoleSelect = async (role: Role) => {
    if (!session) return;
    const qs = await ApiService.getQuestions(role);
    setQuestions(qs);
    
    const updatedSession = { ...session, role, status: 'in-progress' as const };
    setSession(updatedSession);
    await ApiService.updateSession(updatedSession);
    
    setCurrentStep(Step.Assessment);
  };

  const handleAnswer = async (answer: Answer) => {
    if (!session) return;
    const updatedAnswers = [...session.answers, answer];
    // Remove duplicates if rewinding (simple override)
    const uniqueAnswers = updatedAnswers.filter((a, index, self) => 
        index === self.findIndex((t) => (
            t.questionId === a.questionId
        ))
    );
    // Actually we want to replace the old answer if it exists
    const answerMap = new Map(session.answers.map(a => [a.questionId, a]));
    answerMap.set(answer.questionId, answer);
    const finalAnswers = Array.from(answerMap.values());

    const updatedSession = { ...session, answers: finalAnswers };
    setSession(updatedSession);
    await ApiService.updateSession(updatedSession);
  };

  const handleComplete = async () => {
    if (!session) return;
    const updatedSession = { ...session, status: 'completed' as const, completedAt: Date.now() };
    setSession(updatedSession);
    await ApiService.updateSession(updatedSession);

    const res = await ApiService.calculateResults(updatedSession);
    setResult(res);
    setCurrentStep(Step.Results);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-all">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-brand-700 flex items-center gap-2">
            <span>{APP_NAME}</span>
          </div>
          <div className="flex items-center gap-4">
             {currentStep !== Step.Landing && (
               <LanguageSelector current={language} onChange={setLanguage} />
             )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:p-0 print:w-full">
        {currentStep === Step.Landing && (
          <div className="absolute top-4 right-4">
             <LanguageSelector current={language} onChange={setLanguage} />
          </div>
        )}
        
        {currentStep === Step.Landing && <Landing language={language} onStart={handleStart} />}
        {currentStep === Step.CodeEntry && <CodeEntry language={language} onSuccess={handleCodeSuccess} />}
        {currentStep === Step.UserInfo && <UserInfo language={language} onSubmit={handleUserInfoSubmit} />}
        {currentStep === Step.RoleSelection && <RoleSelection language={language} onSelect={handleRoleSelect} />}
        {currentStep === Step.Assessment && session && (
          <Assessment 
            language={language} 
            questions={questions} 
            initialAnswers={session.answers}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
          />
        )}
        {currentStep === Step.Results && result && (
          <Results 
            language={language} 
            result={result} 
            userInfo={session?.userInfo}
            role={session?.role}
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 no-print">
         <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
           &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
         </div>
      </footer>
    </div>
  );
};

export default App;
