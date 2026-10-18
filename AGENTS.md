# Instructions de reprise · Villa Carissa

Lire avant toute modification. Ce fichier s’applique à tout le dépôt, pour les humains et les assistants IA.

## Intention et état validé

Site premium de location de Villa Carissa, à Marrakech au cœur de Samanah. Le propriétaire a validé le rendu le 18 octobre 2026 : **préserver le design actuel** et limiter chaque intervention à la demande reçue. Ne pas entreprendre une nouvelle refonte ou une migration de framework par défaut.

Astro 7.4.0, sortie statique, TypeScript, CSS et JavaScript natif. Versions verrouillées par `package-lock.json`. Aucun besoin de React, Tailwind, CMS ou backend pour les fonctionnalités présentes.

## Documents à consulter

- `README.md` : installation et carte du dépôt.
- `docs/DESIGN_SYSTEM.md` et `docs/design-tokens.json` : règles visuelles.
- `docs/CONTENT_STYLE.md` : faits, ton et décisions éditoriales.
- `docs/ARCHITECTURE.md` : structure et contraintes techniques.
- `docs/CONTRIBUTING.md` : contrôles avant livraison.
- `docs/DEPLOYMENT.md` : lancement Cloudflare différé.
- `docs/REVIEW_2026-10-18.md` : référence mesurée et limites connues.

Le code de `src/` est la source de vérité du rendu. Les tokens JSON documentent les valeurs ; ils ne sont pas une seconde feuille de style active. Pour une évolution explicitement validée, modifier code et documentation correspondante.

## Contraintes produit

- Villa de 170 m², 4 chambres, 4 salles de bain, jusqu’à 8 voyageurs. La famille propriétaire n’y a jamais vécu : ne pas écrire « maison de famille » ni inventer de souvenirs.
- Réserver exclusivement sur Airbnb, annonce `14479193`. Utiliser les constantes de `src/data/villa.ts`. Aucun formulaire de réservation, calendrier simulé, paiement local ou collecte de données.
- Conserver les six routes principales, leurs alias et les ancres de galerie. L’archive Blog & actualités a été supprimée volontairement.
- Aucun ajout de tracking, de cookies marketing, d’analytics ou de bandeau de consentement sans demande correspondante.
- Ne pas inventer prix, disponibilités, prestations, accès au golf, temps de trajet, notes ou avis.

## Contraintes visuelles et d’accessibilité

- Texte courant, légendes et CTA à **19 px**. Exceptions validées : footer (14 px navigation/coordonnées, 12 px mentions) et signature graphique du logo.
- Cormorant Garamond pour les titres, Manrope pour la lecture ; polices locales WOFF2.
- Palette crème, vert profond, olive et bronze. Ne pas changer globalement la palette pour une demande locale.
- Logo golfeur compact `BrandLogo.astro`, favicon dérivée du même symbole. Fournir un `id` distinct à chaque instance pour le masque SVG.
- Balles de golf sur les CTA classiques ; `ExploreIcon` fin sur les photos cliquables ; aucune balle dans le footer.
- Hero d’accueil plein écran avec montage de vraies photos. Ne pas rétablir le bandeau inférieur supprimé. Conserver la petite commande accessible pause/reprise.
- Ne pas retirer `inert`, les libellés, états ARIA, focus visible, annonces de galerie ou replis `noscript` pour gagner des points de performance.
- Respecter `prefers-reduced-motion`. Images de hero prioritaires, images inférieures chargées à l’approche de leur section ; dimensions et `sizes` corrects.

## Façon de travailler

1. Lire les composants et leurs styles, y compris les surcharges finales. La cascade contient des règles historiques : la première déclaration trouvée n’est pas nécessairement la valeur affichée.
2. Modifier les sources, jamais `dist/`, `node_modules/` ou `.astro/`.
3. Préserver les conventions locales, sans reformater tout le dépôt ni ajouter une dépendance sans besoin réel.
4. Pour une modification du site : `npm run check`, puis `npm run build`, puis `npm run check:links`.
5. Vérifier les formats et interactions touchés, selon `docs/CONTRIBUTING.md`. Pour une modification documentaire seule, contrôler les liens et la cohérence sans multiplier les tests d’interface.
6. Rapporter les changements, les vérifications et les limites. Ne pas annoncer une conformité WCAG ou des Core Web Vitals terrain à partir d’un seul score Lighthouse.

## Git et publication

GitHub est la destination de reprise du code. Commits ciblés ; ne pas forcer un push ni réécrire l’historique sans demande. Ne jamais committer de secrets, `.env`, caches, logs, captures de session ou originaux ignorés.

**L’intégration Cloudflare attend le transfert du domaine.** Ne pas créer de projet Cloudflare, connecter GitHub, changer les DNS, lever le blocage d’indexation ou déployer automatiquement pour une simple modification de code. Attendre une demande explicite de lancement. Préserver les accès de l’aperçu privé existant si cet hébergement est utilisé.
