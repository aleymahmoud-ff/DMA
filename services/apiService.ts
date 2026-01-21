import { Session, Answer, UserInfo, Role, AssessmentStatus, Question, AssessmentResult, DomainScore } from '../types';
import { QUESTIONS, DOMAINS } from '../constants';

const SESSION_KEY_PREFIX = 'dma_session_';

// Mock delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  
  validateCode: async (code: string): Promise<Session> => {
    await delay(600); // Simulate network
    const key = `${SESSION_KEY_PREFIX}${code}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      return JSON.parse(stored) as Session;
    }

    // If not found, create a "new" session placeholder (not saved yet until explicitly started)
    return {
      code,
      status: 'new',
      language: 'en', // default
      answers: [],
      createdAt: Date.now()
    };
  },

  createSession: async (session: Session): Promise<void> => {
    await delay(300);
    const key = `${SESSION_KEY_PREFIX}${session.code}`;
    localStorage.setItem(key, JSON.stringify(session));
  },

  updateSession: async (session: Session): Promise<void> => {
     // No delay for rapid updates
    const key = `${SESSION_KEY_PREFIX}${session.code}`;
    localStorage.setItem(key, JSON.stringify(session));
  },

  getQuestions: async (role: Role): Promise<Question[]> => {
    await delay(400);
    return QUESTIONS.filter(q => q.roles.includes(role));
  },

  calculateResults: async (session: Session): Promise<AssessmentResult> => {
    await delay(800);
    // Group answers by domain
    const domainScores: Record<string, { total: number; count: number }> = {};
    
    // Initialize domains
    DOMAINS.forEach(d => {
      domainScores[d] = { total: 0, count: 0 };
    });

    // Populate scores
    session.answers.forEach(ans => {
      if (ans.value === 'NA' || ans.value === 'NotSure') return;
      
      const question = QUESTIONS.find(q => q.id === ans.questionId);
      if (question && domainScores[question.domain]) {
        domainScores[question.domain].total += (ans.value as number);
        domainScores[question.domain].count += 1;
      }
    });

    const finalDomainScores: DomainScore[] = DOMAINS.map(d => {
      const { total, count } = domainScores[d];
      return {
        domain: d,
        score: count > 0 ? parseFloat((total / count).toFixed(2)) : 0,
        maxScore: 5
      };
    });

    // Calculate overall weighted average
    const overallTotal = finalDomainScores.reduce((acc, curr) => acc + curr.score, 0);
    const overallCount = finalDomainScores.filter(d => d.score > 0).length || 1;
    const overallScore = parseFloat((overallTotal / overallCount).toFixed(2));

    let maturityLevel = "Initial";
    if (overallScore >= 4.3) maturityLevel = "Optimized";
    else if (overallScore >= 3.5) maturityLevel = "Advanced";
    else if (overallScore >= 2.7) maturityLevel = "Defined";
    else if (overallScore >= 1.9) maturityLevel = "Developing";

    return {
      overallScore,
      maturityLevel,
      domainScores: finalDomainScores
    };
  }
};
