import { GoogleGenAI } from "@google/genai"
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para o português brasileiro, mantendo o contexto e a formatação original, coloque em paragrafos se for necessário. Se não houver fala, retorne "Sem fala".',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        }
      }
    ],
  });

  if (!response.text) {
    throw new Error("No transcription available");
  }

  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [
      {
        text,
      },
      
    ],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    }
  });

  if (!response.embeddings?.[0].values) {
    throw new Error("No embeddings available");
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(question: string, transcription: string[]) {
  const context = transcription.join("\n\n");

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda à pergunta de forma clara e objetiva em português do brasil.

    contexto:
    ${context}

    Pergunta:
    ${question}

    Intruções:
    - Use apenas informações contidas no contexto fornecido.
    - Se a resposta não puder ser encontrada no contexto, responda "Não possui informações suficientes para responder"
    - Seja Objetivo
    - Matenha um tom educativo e profissional
    - Cite trechos relevantes do contexto apropriado
    - Se for citar o contexto, utilize o termo "Conteudo da aula"
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error("No answer available");
  }

  return response.text;
}