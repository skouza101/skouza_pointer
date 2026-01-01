import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExplanation = async (topic: string, context?: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the concept of "${topic}" in C programming clearly and concisely for a student. ${context ? `Context: ${context}` : ''} Keep it under 150 words. Use Markdown for formatting.`,
      config: {
        systemInstruction: "You are an expert Computer Science professor who specializes in teaching C programming to beginners. You use simple language and clear examples.",
        temperature: 0.7,
      }
    });
    return response.text || "Sorry, I couldn't generate an explanation at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the AI tutor.";
  }
};

export const chatWithTutor = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
      config: {
        systemInstruction: "You are a friendly and helpful C programming tutor. You specialize in explaining pointers, memory management, and low-level concepts. Keep answers helpful, encouraging, and relatively brief.",
      }
    });
    
    const response = await chat.sendMessage({ message });
    return response.text || "I'm thinking...";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I seem to be having trouble connecting to my knowledge base.";
  }
};