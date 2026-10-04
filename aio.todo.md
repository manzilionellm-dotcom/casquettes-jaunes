# À compléter (non lisible sur le site — rien n'a été inventé)

- Débits / bitrates : `tech.bitrate` = null (produit = casquette, aucune valeur sur la page)
- Résolution / qualité d'image : `tech.maxResolution` = null
- Nombre de chaînes : `tech.channelCount` = null (pas un service de streaming)
- Appareils / délai d'activation : `tech.devices` et `tech.activationMinutes` = null
- HowTo : aucun tutoriel d'installation (étapes + ancres) sur le site → pas de HowTo généré
- Vidéos : aucune `<video>` ni iframe YouTube/Vimeo → pas de transcription
- Contact (e-mail, téléphone, WhatsApp) : absent de la page → `contact` = null
- Retour : la page visible dit « 14 dagars ångerrätt » et « undersöka kepsen som i en butik », sans adresse de retour, sans coût de retour, sans formulaire. Le JSON-LD existant déclare en plus `ReturnByMail`, `FreeReturn` et `applicableCountry: SE` — non repris dans la FAQ visible, à confirmer par l'éditeur
- Livraison : le texte visible dit « Fri frakt världen över », le `OfferShippingDetails` existant ne liste que `addressCountry: SE`. Non modifié (pas de second Offer). L'éditeur peut étendre la destination s'il veut l'aligner
- `priceValidUntil: 2027-12-31` est déjà dans le JSON-LD ; la page n'affiche pas de date de validité du prix
- Grammage, entretien, pays de fabrication, transporteur, marques de cartes au-delà de « Stripe » : non précisés
- Avis clients / `aggregateRating` : absents, non inventés
- Images : alts rédigés seulement depuis le nom de fichier et le texte déjà présent (vue de face, côté droit, côté gauche, snapback arrière, intérieur). Aucune légende supplémentaire sur la page
