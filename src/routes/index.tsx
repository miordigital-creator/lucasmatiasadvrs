import { createFileRoute } from "@tanstack/react-router";
import { Triagem } from "@/components/Triagem";

const TITLE = "Lucas Matias Advocacia | Advogado Trabalhista e Previdenciário em Porto Alegre";
const DESC = "Orientação jurídica em Direito do Trabalho e Previdenciário, com atendimento presencial em Porto Alegre e online. Conheça o escritório Lucas Matias Advocacia.";
const WHATS = "https://wa.me/5551992491957";

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

function Index() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="font-display text-xl text-primary">Lucas Matias <span className="text-accent">Advocacia</span></a>
          <nav aria-label="Navegação principal" className="hidden gap-6 text-sm sm:flex">
            <a href="#areas" className="hover:text-primary">Áreas</a>
            <a href="#triagem" className="hover:text-primary">Conte seu caso</a>
            <a href="#contato" className="hover:text-primary">Contato</a>
          </nav>
        </div>
      </header>
      <main id="inicio">
        <section className="bg-hero">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">Porto Alegre · presencial e online</p>
            <h1 className="max-w-3xl font-display text-4xl leading-tight text-primary md:text-6xl">Direito trabalhista e previdenciário com orientação clara e acessível.</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">Advogado trabalhista e previdenciário em Porto Alegre, com atendimento próximo e linguagem simples.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#triagem" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Conte seu caso</a>
              <a href={WHATS} target="_blank" rel="noopener noreferrer" className="rounded-full border border-primary px-6 py-3 font-semibold text-primary">WhatsApp</a>
            </div>
          </div>
        </section>

        <section id="areas" aria-labelledby="areas-t" className="mx-auto max-w-6xl px-5 py-20">
          <h2 id="areas-t" className="font-display text-3xl text-primary md:text-4xl">Áreas de atuação</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border bg-card p-7">
              <h3 className="font-display text-2xl">Direito do Trabalho</h3>
              <p className="mt-3 text-muted-foreground">Orientação sobre direitos trabalhistas: rescisão, verbas, horas extras, vínculo de emprego e outras questões da relação de trabalho.</p>
            </article>
            <article className="rounded-2xl border bg-card p-7">
              <h3 className="font-display text-2xl">Direito Previdenciário</h3>
              <p className="mt-3 text-muted-foreground">Orientação sobre benefícios previdenciários: aposentadorias, auxílios, pensões e pedidos junto ao INSS.</p>
            </article>
          </div>
        </section>

        <section id="triagem" aria-labelledby="triagem-t" className="bg-secondary">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 id="triagem-t" className="font-display text-3xl text-primary md:text-4xl">Conte seu caso</h2>
            <p className="mb-10 mt-3 max-w-2xl text-muted-foreground">Descreva sua situação. Nossa ferramenta organiza seu relato e mostra como falar com o escritório.</p>
            <Triagem />
          </div>
        </section>

        <section id="contato" aria-labelledby="contato-t" className="mx-auto max-w-6xl px-5 py-20">
          <h2 id="contato-t" className="font-display text-3xl text-primary md:text-4xl">Contato</h2>
          <address className="mt-6 space-y-2 not-italic text-muted-foreground">
            <p>Rua Dr. Flores, 323, sala 51 — Porto Alegre/RS</p>
            <p>Segunda a sexta-feira, das 8h às 20h</p>
            <p><a href={WHATS} target="_blank" rel="noopener noreferrer" className="text-primary underline">WhatsApp: +55 51 99249-1957</a></p>
          </address>
        </section>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 py-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Lucas Matias Advocacia</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/matiasadvocaciars/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://share.google/UQiVHLwbqKCf5Lgwa" target="_blank" rel="noopener noreferrer">Perfil no Google</a>
          </div>
        </div>
      </footer>
    </>
  );
}
