// app/api/chat/route.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, ChatSession } from "@google/generative-ai";
import { mahmoudInfo } from '@/lib/chatbot-info';

const MODEL_NAME = "gemini-2.0-flash-lite";
const API_KEY = process.env.GEMINI_API_KEY || "";

// --- ADD THIS LOG ---
console.log("GEMINI_API_KEY loaded in API route:", API_KEY ? "Exists" : "MISSING or empty");

const generationConfig = {
  temperature: 0.7,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const chatSessions = new Map<string, ChatSession>();

function getSystemInstruction() {
  return {
    role: "system",
    parts: [{ text: `
      You are Mahmoud's Portfolio Assistant, a friendly and professional AI. 
      Your goal is to answer visitor questions about Mahmoud Abdrabbou based *only* on the information provided below. 
      If a question is outside this scope, asks for information not listed, or is a general knowledge question, politely state that you can only provide information found in Mahmoud's portfolio, or direct them to the relevant section of the website. 
      Do not invent information. 
      Encourage users to explore the website for more details (e.g., "You can find more details in the Projects section.").
      Keep answers concise. 
      Always be polite and helpful.
      The current year is ${new Date().getFullYear()}.

      --- START OF MAHMOUD'S INFORMATION ---
      ${mahmoudInfo}
      --- END OF MAHMOUD'S INFORMATION ---
    `}]
  };
}

export async function POST(request: Request) {
  // --- ADD THIS LOG ---
  console.log("API Route /api/chat received a POST request.");

  if (!API_KEY) {
    // --- ADD THIS LOG ---
    console.error("API Key is missing in the environment!");
    return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { message, history, sessionId } = await request.json();
    
    // --- ADD THIS LOG ---
    console.log("Received data:", { message, historyLength: history?.length, sessionId });

    if (!message || !sessionId) {
      // --- ADD THIS LOG ---
      console.warn("Missing message or sessionId in request.");
      return new Response(JSON.stringify({ error: "Message or sessionId missing" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    let chat: ChatSession;

    if (chatSessions.has(sessionId)) {
      chat = chatSessions.get(sessionId)!;
      // --- ADD THIS LOG ---
      console.log(`Using existing chat session for ID: ${sessionId}`);
    } else {
      // --- ADD THIS LOG ---
      console.log(`Starting new chat session for ID: ${sessionId}`);
      const formattedHistory = (history || []).map((item: {role: string, content: string}) => ({ // Add default empty array for history
        role: item.role === 'assistant' || item.role === 'bot' || item.role === 'model' ? 'model' : 'user',
        parts: [{ text: item.content }]
      }));

      chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [ // Initial context for the bot
          { role: "user", parts: [{ text: getSystemInstruction().parts[0].text + "\nOkay, I understand my role. What is the first question?"}] },
          { role: "model", parts: [{text: "Great! I'm ready to help visitors learn about Mahmoud. What's the first question?"}]},
          ...formattedHistory
        ],
      });
      chatSessions.set(sessionId, chat);
    }
    
    // --- ADD THIS LOG ---
    console.log(`Sending message to Gemini: "${message}"`);
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();
    // --- ADD THIS LOG ---
    console.log("Received reply from Gemini:", responseText);

    chatSessions.set(sessionId, chat);

    return new Response(JSON.stringify({ reply: responseText }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) { // Type the error for better logging
    // --- MODIFIED LOG ---
    console.error("Error in /api/chat route:", error);
    let errorMessage = "Failed to get response from AI";
    if (error.message) {
      errorMessage += `: ${error.message}`;
    }
    if (error.response && error.response.data) { // For errors from Gemini SDK
        console.error("Gemini API Error details:", error.response.data);
        if(error.response.data.error && error.response.data.error.message) {
            errorMessage = `Gemini API Error: ${error.response.data.error.message}`;
        }
    }
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}