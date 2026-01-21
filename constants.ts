import { Question, Role } from './types';

export const APP_NAME = "Data Maturity Assessment";

export const TRANSLATIONS = {
  en: {
    welcome: "Welcome to the Data Maturity Assessment",
    subtitle: "Evaluate your organization's data capabilities and receive AI-powered recommendations.",
    start: "Start Assessment",
    enterCode: "Enter Assessment Code",
    codePlaceholder: "e.g., DMA-2024",
    validate: "Validate Code",
    invalidCode: "Invalid code. Please try again.",
    loading: "Loading...",
    personalInfo: "Your Information",
    roleSelection: "Select Your Role",
    next: "Next",
    submit: "Submit",
    back: "Back",
    na: "N/A",
    notSure: "Not Sure",
    results: "Assessment Results",
    overallScore: "Overall Maturity Score",
    recommendations: "AI Recommendations",
    generateAi: "Generate AI Insights",
    downloadPdf: "Download / Print Report",
    questionsRemaining: "questions remaining",
    resume: "Resume Assessment",
    completed: "Assessment Completed",
    viewResults: "View Results",
    domain: "Domain",
    score: "Score",
    maturityLevels: {
      optimized: "Optimized",
      advanced: "Advanced",
      defined: "Defined",
      developing: "Developing",
      initial: "Initial"
    },
    roles: {
      [Role.Executive]: "Executive / Leadership",
      [Role.IT]: "IT / Engineering",
      [Role.Operations]: "Operations",
      [Role.Analytics]: "Data & Analytics",
      [Role.Compliance]: "Legal & Compliance"
    }
  },
  ar: {
    welcome: "مرحباً بكم في تقييم نضج البيانات",
    subtitle: "قيّم قدرات بيانات مؤسستك واحصل على توصيات مدعومة بالذكاء الاصطناعي.",
    start: "بدء التقييم",
    enterCode: "أدخل كود التقييم",
    codePlaceholder: "مثال: DMA-2024",
    validate: "تحقق من الكود",
    invalidCode: "كود غير صحيح. حاول مرة أخرى.",
    loading: "جاري التحميل...",
    personalInfo: "معلوماتك الشخصية",
    roleSelection: "اختر دورك الوظيفي",
    next: "التالي",
    submit: "إرسال",
    back: "رجوع",
    na: "غير منطبق",
    notSure: "غير متأكد",
    results: "نتائج التقييم",
    overallScore: "درجة النضج العامة",
    recommendations: "توصيات الذكاء الاصطناعي",
    generateAi: "توليد رؤى الذكاء الاصطناعي",
    downloadPdf: "تحميل / طباعة التقرير",
    questionsRemaining: "أسئلة متبقية",
    resume: "استكمال التقييم",
    completed: "تم اكتمال التقييم",
    viewResults: "عرض النتائج",
    domain: "المجال",
    score: "الدرجة",
    maturityLevels: {
      optimized: "محسن (Optimized)",
      advanced: "متقدم (Advanced)",
      defined: "محدد (Defined)",
      developing: "نامي (Developing)",
      initial: "أولي (Initial)"
    },
    roles: {
      [Role.Executive]: "تنفيذي / قيادة",
      [Role.IT]: "تكنولوجيا المعلومات / هندسة",
      [Role.Operations]: "العمليات",
      [Role.Analytics]: "البيانات والتحليلات",
      [Role.Compliance]: "القانون والامتثال"
    }
  }
};

export const DOMAINS = [
  "Governance",
  "Architecture",
  "Security",
  "Quality",
  "Analytics",
  "Culture"
];

// Sample questions (Subset for brevity, but functional)
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    domain: "Governance",
    text: { en: "Is there a formal data governance strategy in place?", ar: "هل توجد استراتيجية رسمية لحوكمة البيانات؟" },
    roles: [Role.Executive, Role.Compliance, Role.IT, Role.Analytics]
  },
  {
    id: "q2",
    domain: "Governance",
    text: { en: "Are data owners and stewards clearly defined?", ar: "هل تم تحديد مالكي ومشرفي البيانات بوضوح؟" },
    roles: [Role.Executive, Role.IT, Role.Operations]
  },
  {
    id: "q3",
    domain: "Architecture",
    text: { en: "Does the organization use a centralized data warehouse or lake?", ar: "هل تستخدم المنظمة مستودع بيانات مركزي أو بحيرة بيانات؟" },
    roles: [Role.IT, Role.Analytics, Role.Operations]
  },
  {
    id: "q4",
    domain: "Security",
    text: { en: "Are data access controls automated and role-based?", ar: "هل ضوابط الوصول للبيانات مؤتمتة وتعتمد على الأدوار؟" },
    roles: [Role.IT, Role.Compliance, Role.Executive]
  },
  {
    id: "q5",
    domain: "Quality",
    text: { en: "Is data quality measured and reported regularly?", ar: "هل يتم قياس جودة البيانات والإبلاغ عنها بانتظام؟" },
    roles: [Role.Analytics, Role.Operations, Role.IT]
  },
  {
    id: "q6",
    domain: "Analytics",
    text: { en: "Are decisions consistently driven by data rather than intuition?", ar: "هل القرارات تعتمد باستمرار على البيانات بدلاً من الحدس؟" },
    roles: [Role.Executive, Role.Analytics, Role.Operations]
  },
  {
    id: "q7",
    domain: "Culture",
    text: { en: "Does leadership actively promote data literacy?", ar: "هل تشجع القيادة بنشاط محو الأمية البياناتية؟" },
    roles: [Role.Executive, Role.Analytics, Role.IT, Role.Operations, Role.Compliance]
  },
   {
    id: "q8",
    domain: "Architecture",
    text: { en: "Is there documentation for data lineage and flows?", ar: "هل توجد وثائق لتسلسل البيانات وتدفقاتها؟" },
    roles: [Role.IT, Role.Compliance]
  },
  {
    id: "q9",
    domain: "Analytics",
    text: { en: "Do we use predictive or prescriptive analytics models?", ar: "هل نستخدم نماذج تحليلية تنبؤية أو توجيهية؟" },
    roles: [Role.Analytics, Role.IT, Role.Executive]
  }
];
