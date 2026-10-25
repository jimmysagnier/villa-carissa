# Architecture et conventions de code

## Runtime et build

Astro **7.4.0**, sortie `static`, `trailingSlash:always`, pages au format répertoire. `build.inlineStylesheets:always` incorpore le CSS dans chaque document pour supprimer un aller-retour critique. Aucun adaptateur serveur, rendu à la demande, framework client ou base de données.

Node de référence 24.13.0, TypeScript 6.0.3 et `@astrojs/check` 0.9.10. Utiliser `npm ci` et conserver le lockfile. Aucun `.env` nécessaire. Les scripts Python sont réservés aux outils et contrôles, pas au build Astro.

## Responsabilités

| Fichier ou dossier | Rôle |
| --- | --- |
| `astro.config.mjs` | Domaine canonique actuel, sortie et alias historiques |
| `src/layouts/BaseLayout.astro` | HTML français, title/description, canonical/Open Graph, fontes, header/footer, import du script |
| `src/pages/` | Routes et composition des sections |
| `Header.astro`, `Footer.astro` | Navigation et coordonnées ; leurs listes sont séparées, penser aux deux |
| `Hero.astro` | Poster prioritaire, vidéo décorative et bouton pause |
| `Photo.astro` | Photos de villa par id depuis photos.json, variantes 480/800/1600 et repli |
| `GolfImage.astro`, `MarrakechImage.astro` | Variantes des lieux, AVIF portrait/desktop sur les heroes et images différées |
| `Dialogs.astro` | Film et lightbox ; inclus uniquement sur la galerie |
| `GuestReviews.astro` | Avis et sources de la sélection |
| `src/data/villa.ts` | URL Airbnb et relevé global des avis |
| `src/data/*.json` | Photos et dimensions, avis, golfs, lieux et références |
| `src/scripts/app.js` | Interactions progressives, sans dépendance client |
| `public/assets/` | Fichiers copiés tels quels dans dist/assets/ |
| `source/` | Archives de provenance et outils de fabrication |

Les six routes principales figurent dans le README et `src/pages/sitemap.xml.ts`. La page 404 est séparée ; ses métadonnées ne créent pas de canonical. Les alias Astro conservent leur repli HTML ; Cloudflare Pages applique leurs redirections HTTP 301 via `public/_redirects`. `astro.config.mjs` définit le domaine canonique `https://villacarissa-samanah.com`. Le robots public autorise l’indexation et référence le sitemap ; `public/_headers` applique `noindex, nofollow` aux adresses Pages uniquement.

## Cascade CSS : point d’attention

Ordre des imports partagés dans `BaseLayout.astro` : `global.css`, `hero.css`, `villa.css`, `refinements.css`, puis `brand.css`. Les pages Golf et Marrakech importent aussi leurs feuilles dédiées. La sortie Vite peut regrouper ces styles : vérifier les styles calculés pour une modification sensible.

`global.css` contient des styles de première version dont certains sélecteurs ne sont plus utilisés. `hero.css` reprend la composition immersive, `villa.css` le descriptif et la mosaïque, `refinements.css` les réglages successifs, les avis et l’accessibilité. `brand.css` définit la signature compacte et le footer final, et surcharge des règles plus anciennes du header.

Ne pas supprimer une règle depuis une simple recherche de nom ou modifier la première occurrence en supposant qu’elle gagne. Éviter l’accumulation de nouveaux overrides quand une règle finale ciblée peut être modifiée. Une consolidation globale de CSS serait un chantier distinct avec comparaison visuelle.

## Interactions et contrats DOM

`app.js` est une IIFE native importée comme module Astro. Les sélecteurs `id`, `data-*`, classes d’état et attributs ARIA sont des contrats avec les composants ; changer un côté implique de vérifier l’autre.

- **Images différées** : `data-deferred-src` et `data-deferred-srcset` sont activés par IntersectionObserver, marge de 500 px. Dimensions conservées pour éviter les déplacements. Repli immédiat si l’API manque, image `noscript` pour le contenu sans JS. Ne pas différer le hero.
- **Menu** : `aria-expanded`, `inert` du nav fermé, voile, arrière-plan inerte lorsque le menu est ouvert, boucle Tab/Shift+Tab, Échap et restitution du focus.
- **Hero** : une seule vidéo sélectionnée selon le breakpoint de 600 px. Source attachée après rendu du poster et chargement initial. Respect de la réduction du mouvement, de l’économie de données, de la visibilité et du choix pause utilisateur.
- **Galerie** : filtres dans le hash, `aria-pressed`, boutons masqués par `hidden`. Dialog natif, index dans la sélection visible, flèches clavier et swipe. Caption et région live mis à jour à chaque photo.
- **Film** : source chargée à l’ouverture, pause à la fermeture. Ne pas ajouter un `src` initial qui téléchargerait le film sur toutes les pages.
- **Avis** : scroll horizontal natif, scroll-snap, précédent/suivant et annonce de position ; pas d’autoplay. Les dimensions sont mesurées dans `ResizeObserver`, après layout, et conservées jusqu’au redimensionnement. Le scroll lit sa position avant toute écriture ; les boutons et le statut sont actualisés dans la prochaine animation frame. Ne pas réintroduire une mesure synchrone après affichage des contrôles.

Les données JSON sont locales au build, sans requête Airbnb à l’exécution. Le site n’a ni formulaire ni calendrier synchronisé, ni stockage local de données visiteurs.

## Conventions pour de nouvelles modifications

Composants Astro avec frontmatter typé et `interface Props`. HTML sémantique, un H1 par page, liens pour naviguer et boutons pour agir. Importer les constantes communes plutôt que recopier les URL de réservation. SVG décoratifs avec `aria-hidden`; texte alternatif utile pour les photos de contenu.

CSS natif, classes lisibles, valeurs cohérentes avec le design system, breakpoints au besoin du composant. Ne pas ajouter une bibliothèque pour une icône ou une interaction simple. Conserver les liens externes en `target="_blank"` avec `rel="noopener noreferrer"` quand c’est le comportement prévu.

Les fichiers existants sont souvent compacts ; ne pas reformater tout le dépôt pour une modification locale. Les nouveaux documents et le workflow utilisent une indentation lisible. Aucun formatter ou linter supplémentaire n’a été imposé à cette livraison.

## Outils optionnels de médias

- `python3 source/import-airbnb-photos.py` : récupération depuis les URL publiques déjà relevées, avec Pillow.
- `python3 source/make-film.py` : montage à partir des originaux ; Pillow et imageio-ffmpeg nécessaires dans un environnement Python séparé.
- `source/marrakech/build-images.py` : préparation WebP avec Pillow et manifeste.

Ces opérations utilisent Internet et/ou les originaux ignorés. Elles ne sont pas nécessaires pour `npm ci && npm run build`. Les encodages finaux ont été optimisés après la génération initiale : ne pas remplacer les MP4 par une nouvelle sortie beaucoup plus lourde sans comparaison de qualité et de poids.

Référence après optimisation du 25 octobre : desktop 1920×1080, 25 s, 30 fps, H.264 sans audio, ~7,08 Mo ; mobile **576×1024, ~25 s, 24 fps, 1 302 678 octets** (contre 3 613 866). Le montage et le cadrage sont conservés. La dernière passe mobile part du MP4 précédent : `ffmpeg -i original.mp4 -an -vf scale=576:1024:flags=lanczos,fps=24 -c:v libx264 -preset slow -crf 31 -pix_fmt yuv420p -movflags +faststart mobile.mp4`. Comparer le résultat à la taille d’affichage avant tout nouvel encodage. Les posters AVIF/WebP et variantes portrait restent prioritaires et inchangés.

Les six fontes WOFF2 locales totalisent **131 344 octets** (contre 156 504). Sous-ensemble FontTools 4.60.2 : latin U+0000–024F, diacritiques U+0300–036F, ponctuation U+2000–206F, devises U+20A0–20CF, symboles U+2100–214F et U+2248, flèches U+2190–21FF, formes U+25A0–25FF, U+FFFD et caractères de toutes les pages générées. Les caractères précédemment pris en charge sur le site et leurs métriques ont été comparés aux fontes précédentes ; aucune perte ni modification d’avance.

`font-logo.woff2` (1 508 octets) contient les glyphes exacts « VILLA CARISSA » de Cormorant Garamond 500, sous l’alias CSS `Carissa Logo`, exclusivement pour `.carissa-name`. Le logo ne dépend ainsi plus du fichier complet de graisse 500. Ne pas utiliser cet alias pour un autre texte sans compléter ses glyphes. Le layout précharge uniquement Cormorant 400, Manrope 400/500 et la signature ; les autres variantes restent découvertes par le CSS. Les fontes normalement transférées sur l’accueil totalisent **106 248 octets** (contre 156 504), la variante complète `font-2.woff2` restant disponible sans être préchargée. Précharger toutes les variantes mettrait les fontes secondaires en concurrence avec le premier écran. Les anciens TTF restent disponibles comme sources. Lors d’un ajout de langue ou de caractères, vérifier la couverture des sous-ensembles.
