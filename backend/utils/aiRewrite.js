import { GoogleGenAI } from "@google/genai";

const aiRewrite = async (text)=>{
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
Improve the following used-item description to make it clearer, more engaging, and more persuasive—while keeping all of the original details. Do not add anything new or remove any facts; just enhance the language. Output **only** the improved description.

“${text}”
`,
  });
  return response.text;
}

export default aiRewrite;