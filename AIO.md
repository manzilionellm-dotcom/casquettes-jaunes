# AIO (Sprint) — source unique : aio.config.json

Site statique (HTML), pas Next.js. Il n'y a pas de `app/layout.tsx` : le JSON-LD et la FAQ sont injectés dans `index.html` par `scripts/aio-render.mjs` (`lib/aio.mjs`, équivalent de `lib/aio.ts`).

- `npm run aio:llms` régénère `llms.txt` à la racine, à côté de `robots.txt` (servi en `/llms.txt`). Pas de dossier `public/` : avec le preset Vercel « Other », un dossier `public/` remplacerait la racine et `index.html` ne serait plus déployé.
- `npm run build` régénère `llms.txt` et le HTML (FAQ + JSON-LD).
- `npm start` sert la racine sur le port 3000, puis `node scripts/aio-check.mjs http://localhost:3000/` (aussi `--json`) : preuve sur HTML brut (Citation Hooks 40–60 mots, JSON-LD parsable, alt, transcription vidéo, `/llms.txt`).
- Les h3 de la FAQ + `<p>` sont dans le HTML statique, jamais masqués. Le Product/Offer déjà présent n'est pas dupliqué. Pas de HowTo : aucun tutoriel d'installation sur le site.

Vercel : `vercel.json` force le preset Other, sans commande d'install ni de build, sortie `.`, pour que l'ajout de `package.json` ne lance pas un build Node.
