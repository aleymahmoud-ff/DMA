import { GoogleGenAI } from "@google/genai";
import { AssessmentResult, UserInfo, Role } from '../types';

// NOTE: In a real production app, you should not expose API keys on the client.
// This should be proxied through a backend.
// For this demo structure, we assume process.env.API_KEY is available.
const API_KEY = process.env.API_KEY || '';

export const GeminiService = {
  generateRecommendations: async (
    result: AssessmentResult, 
    userInfo: UserInfo, 
    role: Role,
    language: 'en' | 'ar'
  ): Promise<string> => {
    if (!API_KEY) {
      console.warn("Gemini API Key missing");
      return language === 'en' 
        ? "AI Recommendations unavailable (Missing API Key)." 
        : "توصيات الذكاء الاصطناعي غير متاحة (مفتاح API مفقود).";
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      const domainSummary = result.domainScores
        .map(d => `${d.domain}: ${d.score}/5`)
        .join(', ');

      const prompt = `
        You are an expert Data Maturity Consultant.
        
        Analyze the following assessment results for a client:
        - Organization: ${userInfo.organization} (${userInfo.industry}, ${userInfo.size})
        - Role of Assessor: ${role}
        - Overall Score: ${result.overallScore} (${result.maturityLevel})
        - Domain Scores: ${domainSummary}
        
        Please provide a structured executive summary and 3 specific, actionable recommendations prioritized by impact.
        Focus on moving from their current level (${result.maturityLevel}) to the next level.
        
        Output Language: ${language === 'ar' ? 'Arabic' : 'English'}
        Format: Markdown (headers, bullet points).
        Tone: Professional, encouraging, and strategic.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      return response.text || (language === 'en' ? "No recommendations generated." : "لم يتم إنشاء توصيات.");
    } catch (error) {
      console.error("Gemini Error:", error);
      return language === 'en' 
        ? "Error generating recommendations. Please try again later." 
        : "حدث خطأ أثناء إنشاء التوصيات. يرجى المحاولة مرة أخرى لاحقاً.";
    }
  }
};
