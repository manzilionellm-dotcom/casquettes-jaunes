#!/usr/bin/env node
// Injecte le JSON-LD (graphe existant + FAQPage) et la FAQ SSR dans index.html.
import fs from "node:fs";
import { jsonLdString, faqHtml } from "../lib/aio.mjs";

const path = new URL("../index.html", import.meta.url);
let html = fs.readFileSync(path, "utf8");

const scriptRe = /<script type="application\/ld\+json" id="aio-jsonld">[\s\S]*?<\/script>/;
if (!scriptRe.test(html)) {
  console.error("index.html : balise <script id=\"aio-jsonld\"> introuvable");
  process.exit(1);
}
html = html.replace(
  scriptRe,
  `<script type="application/ld+json" id="aio-jsonld">\n${jsonLdString()}\n</script>`
);

const faqRe = /<!-- aio-faq:start -->[\s\S]*?<!-- aio-faq:end -->/;
if (!faqRe.test(html)) {
  console.error("index.html : marqueurs aio-faq introuvables");
  process.exit(1);
}
html = html.replace(faqRe, `<!-- aio-faq:start -->\n${faqHtml()}\n  <!-- aio-faq:end -->`);

fs.writeFileSync(path, html);
console.log("index.html : JSON-LD + FAQ SSR mis à jour");
