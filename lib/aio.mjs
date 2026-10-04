// Équivalent statique de lib/aio.ts (pas de layout.tsx : le site est du HTML servi tel quel).
// Source unique : aio.config.json. Le Product/Offer existant est conservé ; on ajoute une seule FAQPage.
import fs from "node:fs";

export function loadConfig() {
  return JSON.parse(fs.readFileSync(new URL("../aio.config.json", import.meta.url), "utf8"));
}

export function faqFor(config = loadConfig()) {
  const lang = config.defaultLang;
  return config.i18n[lang].faq;
}

/** Graphe Schema.org : nœuds déjà publiés + une FAQPage. Jamais de second Product ni de HowTo. */
export function buildJsonLd(config = loadConfig()) {
  const url = config.siteUrl.replace(/\/$/, "");
  const lang = config.defaultLang;
  const graph = (config.preservedGraph || []).filter((n) => n["@type"] !== "FAQPage" && n["@type"] !== "HowTo");
  const faq = {
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    inLanguage: lang,
    mainEntity: faqFor(config).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return { "@context": "https://schema.org", "@graph": [...graph, faq] };
}

/** Sérialisation sûre pour <script type="application/ld+json"> */
export function jsonLdString(config = loadConfig()) {
  return JSON.stringify(buildJsonLd(config)).replace(/</g, "\\u003c");
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** h3 question + p immédiat (40–60 mots), visible sans JS. */
export function faqHtml(config = loadConfig()) {
  return faqFor(config)
    .map(
      (f) =>
        `  <div class="faq-item">\n    <h3>${escapeHtml(f.q)}</h3>\n    <p>${escapeHtml(f.a)}</p>\n  </div>`
    )
    .join("\n");
}
