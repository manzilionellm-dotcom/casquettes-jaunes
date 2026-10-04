#!/usr/bin/env node
// Génère llms.txt depuis aio.config.json (source unique).
// Site statique : robots.txt est à la racine du dépôt, donc llms.txt est écrit à côté
// (servi en /llms.txt). Pas de dossier public/ : Vercel prendrait public/ comme racine
// et ne déploierait plus index.html.
import fs from "node:fs";

const c = JSON.parse(fs.readFileSync(new URL("../aio.config.json", import.meta.url), "utf8"));
const L = c.defaultLang;
const i = c.i18n[L];
const lines = [];
lines.push(`# ${c.siteName}`, "", `> ${i.description}`, "");
lines.push("## Produkt", "");
for (const line of i.services) lines.push(`- ${line}`);
lines.push("", "## Priser", "");
for (const line of i.prices) lines.push(`- ${line}`);
lines.push("", "## Tekniska egenskaper", "");
const t = c.tech;
lines.push(`- Material: ${t.material ?? "inte angivet på sidan"}`);
lines.push(`- Färg: ${t.color ?? "inte angivet på sidan"}`);
lines.push(`- Storlek: ${t.size ?? "inte angivet på sidan"}`);
lines.push(`- Frakt: ${t.shipping ?? "inte angivet på sidan"}`);
lines.push(`- Upplösning / bildkvalitet: ${t.maxResolution ?? "inte angivet på sidan"}`);
lines.push(`- Enheter: ${t.devices ? t.devices.join(", ") : "inte angivet på sidan"}`);
lines.push(`- Aktivering: ${t.activationMinutes ?? "inte angivet på sidan"}`);
lines.push(`- Debit / bitrate: ${t.bitrate ?? "inte angivet på sidan"}`);
lines.push(`- Antal kanaler: ${t.channelCount ?? "inte angivet på sidan"}`);
if (Array.isArray(t.notes)) for (const line of t.notes) lines.push(`- ${line}`);
lines.push("", `## Vanliga frågor (${i.faq.length})`, "");
i.faq.forEach((f) => lines.push(`### ${f.q}`, "", f.a, ""));
const out = new URL("../llms.txt", import.meta.url);
fs.writeFileSync(out, lines.join("\n").trimEnd() + "\n");
console.log("llms.txt écrit à côté de robots.txt (" + i.faq.length + " Q/R)");
