import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const RUN_ID = "X-Lovable-AIG-Run-ID";

function runIdFetch() {
  let runId: string | undefined;
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (runId && !headers.has(RUN_ID)) headers.set(RUN_ID, runId);
    const res = await fetch(input, { ...init, headers });
    runId ??= res.headers.get(RUN_ID)?.trim() || undefined;
    return res;
  };
}

export const INSTRUCOES = `Você é um assistente de triagem do escritório Lucas Matias Advocacia (Porto Alegre/RS), que atua em Direito do Trabalho e Direito Previdenciário.
Sua tarefa: organizar o relato de um potencial cliente para facilitar o primeiro contato com o escritório.
REGRAS OBRIGATÓRIAS:
- NUNCA ofereça aconselhamento jurídico, opinião sobre chances, prazos, valores, direitos ou estratégias. Não diga o que a pessoa "tem direito" nem o que "deve fazer" juridicamente.
- Não invente fatos. Use apenas o que foi relatado.
- Escreva em português do Brasil, linguagem simples e acolhedora.
Responda em Markdown com exatamente estas seções:
### Resumo do seu relato
(3 a 5 tópicos curtos com os fatos informados)
### Área provável
(Direito do Trabalho, Direito Previdenciário, ambos, ou "fora das áreas de atuação do escritório")
### Informações úteis para levar ao atendimento
(lista de documentos ou dados que podem ser úteis, de forma genérica, sem análise jurídica)
### Como falar com o escritório
- WhatsApp: +55 51 99249-1957 (segunda a sexta, das 8h às 20h)
- Atendimento presencial: Rua Dr. Flores, 323, sala 51, Porto Alegre/RS — ou online
Termine com: "Este resumo não é aconselhamento jurídico. A análise do seu caso será feita por um advogado no atendimento."`;

export async function resumirRelato(relato: string) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("Serviço de IA não configurado.");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch(),
  });
  let falha: unknown;
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: INSTRUCOES,
    messages: [{ role: "user", content: relato }],
    maxRetries: 0,
    onError: ({ error }) => {
      falha = error;
    },
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  const texto = await result.text;
  if (falha || !texto.trim()) {
    const status = (falha as { statusCode?: number })?.statusCode;
    if (status === 429) throw new Error("Muitas solicitações no momento. Tente novamente em instantes.");
    if (status === 402 || status === 403) throw new Error("O resumo automático está indisponível no momento. Fale conosco pelo WhatsApp.");
    throw new Error("Não foi possível gerar o resumo agora. Fale conosco pelo WhatsApp.");
  }
  return texto;
}
