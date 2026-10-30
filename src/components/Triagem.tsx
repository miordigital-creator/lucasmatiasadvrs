import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { resumirCaso } from "@/lib/triagem.functions";

const WHATS = "https://wa.me/5551992491957";

function Markdown({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {text.split("\n").map((l, i) => {
        const clean = l.replace(/\*\*(.+?)\*\*/g, "$1");
        if (l.startsWith("### ")) return <h4 key={i} className="pt-3 font-display text-lg text-primary">{clean.slice(4)}</h4>;
        if (/^\s*[-*] /.test(l)) return <p key={i} className="pl-4 before:-ml-4 before:mr-2 before:text-accent before:content-['•']">{clean.replace(/^\s*[-*] /, "")}</p>;
        if (!l.trim()) return null;
        return <p key={i}>{clean}</p>;
      })}
    </div>
  );
}

export function Triagem() {
  const resumir = useServerFn(resumirCaso);
  const [area, setArea] = useState<"trabalhista" | "previdenciario" | "nao-sei">("nao-sei");
  const [relato, setRelato] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumo, setResumo] = useState("");
  const [erro, setErro] = useState("");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setResumo("");
    if (relato.trim().length < 30) return setErro("Descreva sua situação com pelo menos 30 caracteres.");
    setLoading(true);
    try {
      const r = await resumir({ data: { area, relato } });
      if (r.ok) setResumo(r.resumo);
      else setErro(r.erro);
    } catch {
      setErro("Não foi possível enviar agora. Fale conosco pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={enviar} className="space-y-5 rounded-2xl border bg-card p-6 shadow-soft">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Seu assunto é</legend>
          <div className="flex flex-wrap gap-2">
            {([["trabalhista", "Trabalhista"], ["previdenciario", "Previdenciário"], ["nao-sei", "Não sei"]] as const).map(([v, l]) => (
              <label key={v} className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition ${area === v ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                <input type="radio" name="area" value={v} checked={area === v} onChange={() => setArea(v)} className="sr-only" />
                {l}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="relato" className="mb-2 block text-sm font-semibold">Conte o que aconteceu</label>
          <textarea id="relato" value={relato} onChange={(e) => setRelato(e.target.value)} rows={8} maxLength={3000}
            placeholder="Ex.: Trabalhei 3 anos numa empresa, fui demitido e não recebi as verbas…"
            className="w-full rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <p className="mt-1 text-xs text-muted-foreground">Não inclua CPF, senhas ou dados bancários. {relato.length}/3000</p>
        </div>
        <button disabled={loading} className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
          {loading ? "Organizando seu relato…" : "Organizar meu relato"}
        </button>
        <p className="text-xs text-muted-foreground">Ferramenta com IA que apenas resume o que você escreveu. Não é aconselhamento jurídico.</p>
      </form>
      <div aria-live="polite" className="rounded-2xl border border-dashed bg-muted/40 p-6">
        {erro && <p role="alert" className="text-sm text-destructive">{erro}</p>}
        {!resumo && !erro && !loading && <p className="text-sm text-muted-foreground">O resumo do seu relato e as formas de contato aparecerão aqui.</p>}
        {loading && <p className="animate-pulse text-sm text-muted-foreground">Lendo seu relato…</p>}
        {resumo && (
          <>
            <Markdown text={resumo} />
            <a href={WHATS} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">Falar no WhatsApp</a>
          </>
        )}
      </div>
    </div>
  );
}
