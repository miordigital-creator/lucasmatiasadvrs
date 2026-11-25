import { createFileRoute } from "@tanstack/react-router";
import { Triagem } from "@/components/Triagem";
const logo = { url: "/matias-advocacia-logo.webp" };

const TITLE = "Lucas Matias Advocacia | Advogado Trabalhista e Previdenciário em Porto Alegre";
const DESC = "Orientação jurídica em Direito do Trabalho e Previdenciário, com atendimento presencial em Porto Alegre e online. Conheça o escritório Lucas Matias Advocacia.";
const WHATS = "https://wa.me/5551992491957?text=" + encodeURIComponent("Olá! Vim pelo site e gostaria de agendar um atendimento.");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Lucas Matias Advocacia",
  description: DESC,
  telephone: "+55 51 99249-1957",
  address: { "@type": "PostalAddress", streetAddress: "Rua Dr. Flores, 323, sala 51", addressLocality: "Porto Alegre", addressRegion: "RS", addressCountry: "BR" },
  areaServed: { "@type": "City", name: "Porto Alegre" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" }],
  knowsAbout: ["Direito do Trabalho", "Direito Previdenciário"],
  sameAs: ["https://www.instagram.com/matiasadvocaciars/", "https://share.google/UQiVHLwbqKCf5Lgwa"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function WhatsButton({ children = "Falar no WhatsApp", big = false }: { children?: React.ReactNode; big?: boolean }) {
  return (
    <a href={WHATS} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-whatsapp-foreground shadow-soft transition hover:brightness-110 ${big ? "px-8 py-4 text-lg" : "px-6 py-3"}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2s-1 .3-3.4-.7a11.6 11.6 0 0 1-4.6-4.1c-.4-.5-1-1.6-1-2.6s.6-1.6.8-1.8.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6a8.7 8.7 0 0 0 4 3.5c.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 .9c.3.2.5.2.5.4s.1.7-.3 1.2Z"/></svg>
      {children}
    </a>
  );
}

const etapas = [
  ["Conte seu caso", "Envie uma mensagem pelo WhatsApp ou use o formulário desta página."],
  ["Atendimento", "Conversamos presencialmente em Porto Alegre ou online, como for melhor para você."],
  ["Orientação clara", "Você entende sua situação e os próximos passos, em linguagem simples."],
];

const faq = [
  ["O atendimento pode ser online?", "Sim. Além do atendimento presencial em Porto Alegre, o escritório atende online."],
  ["Qual o horário de atendimento?", "De segunda a sexta-feira, das 8h às 20h."],
  ["Onde fica o escritório?", "Rua Dr. Flores, 323, sala 51, no Centro de Porto Alegre/RS."],
  ["Como agendar?", "Basta enviar uma mensagem pelo WhatsApp +55 51 99249-1957."],
];

function Index() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-navy-foreground/10 bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#inicio" aria-label="Lucas Matias Advocacia, início">
            <img src={logo.url} alt="Matias Advocacia" width={600} height={189} className="h-10 w-auto md:h-12" />
          </a>
          <nav aria-label="Navegação principal" className="hidden gap-7 text-sm text-navy-foreground/80 md:flex">
            <a href="#areas" className="hover:text-gold">Áreas de atuação</a>
            <a href="#como-funciona" className="hover:text-gold">Como funciona</a>
            <a href="#triagem" className="hover:text-gold">Conte seu caso</a>
            <a href="#contato" className="hover:text-gold">Contato</a>
          </nav>
          <a href={WHATS} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-navy">Agendar</a>
        </div>
      </header>

      <main id="inicio">
        <section className="bg-hero text-navy-foreground">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Advogado trabalhista e previdenciário · Porto Alegre</p>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] md:text-6xl">Direito trabalhista e previdenciário com orientação clara e acessível.</h1>
              <p className="mt-6 max-w-xl text-lg text-navy-foreground/75">Problemas no trabalho ou com o INSS? Fale com o escritório e entenda sua situação, com atendimento presencial em Porto Alegre ou online.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <WhatsButton big>Falar com o advogado</WhatsButton>
                <a href="#triagem" className="font-semibold text-gold underline-offset-4 hover:underline">ou descreva seu caso aqui →</a>
              </div>
            </div>
            <ul className="self-end space-y-4 border-l border-gold/40 pl-6 text-sm">
              {[["Presencial e online", "Atendimento no Centro de Porto Alegre ou à distância"], ["Seg a sex, 8h às 20h", "Horário estendido para quem trabalha"], ["Resposta pelo WhatsApp", "Contato direto, sem burocracia"]].map(([t, d]) => (
                <li key={t}><p className="font-display text-xl text-gold">{t}</p><p className="text-navy-foreground/70">{d}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section id="areas" aria-labelledby="areas-t" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Áreas de atuação</p>
          <h2 id="areas-t" className="mt-3 max-w-2xl font-display text-4xl font-semibold text-primary md:text-5xl">Como o escritório pode ajudar você</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-lg border-t-4 border-gold bg-card p-8 shadow-soft">
              <h3 className="font-display text-3xl font-semibold text-primary">Direito do Trabalho</h3>
              <p className="mt-3 text-muted-foreground">Orientação sobre direitos trabalhistas para quem trabalha ou trabalhou em Porto Alegre e região.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Rescisão e verbas rescisórias", "Horas extras e jornada", "Trabalho sem carteira assinada", "Demissão por justa causa"].map((i) => <li key={i} className="before:mr-2 before:text-accent before:content-['—']">{i}</li>)}
              </ul>
            </article>
            <article className="rounded-lg border-t-4 border-gold bg-card p-8 shadow-soft">
              <h3 className="font-display text-3xl font-semibold text-primary">Direito Previdenciário</h3>
              <p className="mt-3 text-muted-foreground">Orientação sobre benefícios previdenciários e pedidos junto ao INSS.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Aposentadorias", "Auxílio por incapacidade", "Pensão por morte", "Benefício negado pelo INSS"].map((i) => <li key={i} className="before:mr-2 before:text-accent before:content-['—']">{i}</li>)}
              </ul>
            </article>
          </div>
          <div className="mt-10 text-center"><WhatsButton>Tirar dúvidas no WhatsApp</WhatsButton></div>
        </section>

        <section id="como-funciona" aria-labelledby="como-t" className="bg-navy text-navy-foreground">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <h2 id="como-t" className="font-display text-4xl font-semibold md:text-5xl">Como funciona o atendimento</h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {etapas.map(([t, d], i) => (
                <li key={t} className="border-t border-gold/40 pt-6">
                  <span className="font-display text-5xl text-gold">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                  <p className="mt-2 text-navy-foreground/70">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="triagem" aria-labelledby="triagem-t" className="bg-secondary">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Primeiro passo</p>
            <h2 id="triagem-t" className="mt-3 font-display text-4xl font-semibold text-primary md:text-5xl">Conte seu caso</h2>
            <p className="mb-10 mt-3 max-w-2xl text-muted-foreground">Descreva sua situação. A ferramenta organiza seu relato para facilitar a conversa com o escritório.</p>
            <Triagem />
          </div>
        </section>

        <section aria-labelledby="faq-t" className="mx-auto max-w-3xl px-5 py-20 md:py-24">
          <h2 id="faq-t" className="font-display text-4xl font-semibold text-primary md:text-5xl">Perguntas frequentes</h2>
          <div className="mt-8 divide-y border-y">
            {faq.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{q}<span className="text-accent transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contato" aria-labelledby="contato-t" className="bg-hero text-navy-foreground">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:py-24">
            <div>
              <h2 id="contato-t" className="font-display text-4xl font-semibold md:text-5xl">Fale com o escritório hoje</h2>
              <p className="mt-4 text-navy-foreground/75">Atendimento presencial em Porto Alegre e online, de segunda a sexta, das 8h às 20h.</p>
              <div className="mt-8"><WhatsButton big>Agendar pelo WhatsApp</WhatsButton></div>
            </div>
            <address className="space-y-4 not-italic text-navy-foreground/80">
              <p><span className="block text-xs uppercase tracking-widest text-gold">Endereço</span>Rua Dr. Flores, 323, sala 51 — Centro, Porto Alegre/RS</p>
              <p><span className="block text-xs uppercase tracking-widest text-gold">WhatsApp</span><a href={WHATS} target="_blank" rel="noopener noreferrer" className="hover:text-gold">+55 51 99249-1957</a></p>
              <p><span className="block text-xs uppercase tracking-widest text-gold">Horário</span>Segunda a sexta-feira, das 8h às 20h</p>
              <p><a href="https://share.google/UQiVHLwbqKCf5Lgwa" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">Ver no Google →</a></p>
            </address>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-navy-foreground/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-navy-foreground/10 px-5 py-8 text-sm">
          <img src={logo.url} alt="" width={600} height={189} loading="lazy" className="h-8 w-auto" />
          <p>© {new Date().getFullYear()} Lucas Matias Advocacia · Porto Alegre/RS</p>
          <a href="https://www.instagram.com/matiasadvocaciars/" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a>
        </div>
      </footer>

      <a href={WHATS} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft transition hover:scale-105">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-current"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2s-1 .3-3.4-.7a11.6 11.6 0 0 1-4.6-4.1c-.4-.5-1-1.6-1-2.6s.6-1.6.8-1.8.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6a8.7 8.7 0 0 0 4 3.5c.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 .9c.3.2.5.2.5.4s.1.7-.3 1.2Z"/></svg>
      </a>
    </>
  );
}
