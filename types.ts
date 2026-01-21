export type Language = 'en' | 'ar';

export type AssessmentStatus = 'new' | 'in-progress' | 'completed';

export enum Role {
  Executive = 'Executive',
  IT = 'IT',
  Operations = 'Operations',
  Analytics = 'Analytics',
  Compliance = 'Compliance'
}

export interface UserInfo {
  name: string;
  email: string;
  organization: string;
  size: string;
  industry: string;
  country: string;
  jobTitle: string;
}

export interface Question {
  id: string;
  domain: string;
  text: {
    en: string;
    ar: string;
  };
  roles: Role[]; // Roles that see this question
}

export interface Answer {
  questionId: string;
  value: number | 'NA' | 'NotSure'; // 1-5, or special
}

export interface Session {
  code: string;
  status: AssessmentStatus;
  language: Language;
  userInfo?: UserInfo;
  role?: Role;
  answers: Answer[];
  createdAt: number;
  completedAt?: number;
}

export interface DomainScore {
  domain: string;
  score: number; // 1-5
  maxScore: number;
}

export interface AssessmentResult {
  overallScore: number;
  maturityLevel: string;
  domainScores: DomainScore[];
}
