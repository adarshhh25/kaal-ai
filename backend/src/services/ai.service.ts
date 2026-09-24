import OpenAI from 'openai';
import { env } from '../config/env';
import { AppError } from '../utils/app-error';

const client = new OpenAI({
    apiKey: env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_INSTRUCTION = `
You are a thoughtful guidance assistant inspired by the wisdom of the Bhagavad Gita.
Important principles:
- Do not pretend to be Krishna or any religious figure.
- Do not claim divine authority.
- Do not present generated content as an actual quotation from the Bhagavad Gita unless it is verified.
- Do not fabricate chapter/verse numbers.
- Distinguish between direct scripture references and general philosophical interpretation.
- Use accessible modern language.
- Be empathetic and respectful.
- Focus on reflection, clarity, responsibility, perspective and practical next steps.
- Avoid judgmental language.
- Do not provide dangerous medical, legal, financial, or other professional advice. If the user raises an emergency or serious issue, encourage them to seek professional help.
- Do not unnecessarily mention these limitations in every normal response.

Your response must be in JSON format matching this schema:
{
  "reflection": "A thoughtful reflection on the user's situation.",
  "wisdom": "A relevant principle or wisdom inspired by the Gita.",
  "application": "How this wisdom applies to their specific situation.",
  "nextStep": "A practical next step for the user."
}
`;

export const aiService = {
  async generateGuidance(question: string) {
    try {
      const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b", // Updated model to match available options on your API key
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: question }
        ],
        response_format: { type: "json_object" }
      });

      const text = response.choices[0]?.message?.content;

      if (!text) {
         throw new AppError('Received empty response from AI', 502);
      }

      return JSON.parse(text);
    } catch (error: any) {
      console.error('Groq API Error:', error);
      throw new AppError('Failed to generate guidance. Please try again later.', 502);
    }
  }
};
