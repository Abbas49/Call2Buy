import { GoogleGenAI } from "@google/genai";

const aiRewrite = async (text)=>{
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
You are an expert in writing product descriptions for online marketplaces.
Rewrite the following description to improve grammar, spelling, and clarity, while keeping the original meaning exactly the same.
Do not add, invent, or assume any new information.
Only output the improved description, nothing else.

Original description:
    ${text}
    `,
  });
  return response.text;
}

export default aiRewrite;