import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  area: z.enum(["trabalhista", "previdenciario", "nao-sei"]),
  relato: z.string().trim().min(30, "Descreva com pelo menos 30 caracteres.").max(3000),
});

export const resumirCaso = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { resumirRelato } = await import("./triagem.server");
    const areaTxt = { trabalhista: "Trabalhista", previdenciario: "Previdenciário", "nao-sei": "Não sei" }[data.area];
    try {
      return { ok: true as const, resumo: await resumirRelato(`Área indicada pela pessoa: ${areaTxt}\n\nRelato:\n${data.relato}`) };
    } catch (e) {
      return { ok: false as const, erro: e instanceof Error ? e.message : "Erro inesperado." };
    }
  });
