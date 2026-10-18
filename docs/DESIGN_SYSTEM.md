# Design system · Villa Carissa

État validé le 18 octobre 2026. Ce document décrit le site existant ; il ne propose pas une nouvelle direction graphique. Les valeurs structurées sont dans [design-tokens.json](design-tokens.json). Elles restent documentaires : les styles de `src/styles/` pilotent le rendu.

## Direction visuelle

Une villa à Marrakech, au cœur d’un golf : photographie généreuse, composition éditoriale, titres serif, fonds crème, verts végétaux et accents bronze. L’élégance repose sur les proportions et les espaces, les traits fins et les photos authentiques. Préserver la sobriété des contrôles et du footer ; éviter les cartes arrondies systématiques, les effets brillants et les décorations supplémentaires.

## Palette

| Usage | Valeur | Source |
| --- | --- | --- |
| Papier, fond principal | `#f7f6f0` | `--paper`, global.css |
| Crème, surface secondaire | `#efeee5` | `--cream` |
| Encre, texte et CTA sombre | `#303c30` | `--ink` |
| Texte secondaire | `#606757` | `--muted` |
| Filets et séparateurs | `#d9dccf` | `--line` |
| Olive, états de boutons | `#646d47` | `--olive` |
| Bronze, labels et notes | `#78623e` | composants et styles éditoriaux |
| Bronze du logo | `#806039` | brand.css |
| Fond footer | `#eeeee5` | brand.css |
| Focus sur fond clair | `#a2683f` | global.css |
| Focus sur fond sombre | `#f1d69c` | refinements.css |

Les panneaux et photographies possèdent des nuances et dégradés propres à chaque section. Réutiliser leurs règles existantes plutôt qu’un remplacement global de toutes les couleurs proches. Un texte clair sur photographie demande un voile suffisant pour rester lisible sur chaque cadrage.

## Typographie

| Élément | Police et taille |
| --- | --- |
| Lecture, légendes, menu, CTA, avis | Manrope, **19 px** |
| Titres généraux | Cormorant Garamond, poids 400, tailles fluides |
| H2 de base | `clamp(42px, 4.6vw, 70px)` |
| H3 de base | 32 px, variantes selon section |
| Hero accueil desktop | `clamp(45px, 4.6vw, 72px)` ; 78 px au-delà de 1600 px |
| Hero accueil mobile ≤700 px | `clamp(35px, 9.2vw, 54px)` |
| Contact H1 | Manrope, `clamp(28px, 3.2vw, 46px)`, interligne 1.35 |
| Footer navigation et coordonnées | Manrope 14 px, interligne 1.65 |
| Footer mentions et crédit | Manrope 12 px, interligne 1.65 |

Interligne de lecture de base : **1.8** ; certains textes éditoriaux utilisent 2 à 2.05. Titres : interligne proche de 1.04, approche légèrement resserrée. Labels en capitales avec approche discrète, ajustée sur mobile pour éviter les débordements.

La signature graphique du logo constitue une exception au 19 px : header nom 28 px, localisation 10 px ; mobile 19/7 px, variante très compacte ≤360 px. Footer nom 26 px. Ne pas appliquer une règle universelle `font-size:19px` aux éléments du logo.

Six fontes WOFF2 locales : Cormorant italic 400, normal 400/500 ; Manrope normal 400/500/600. Déclarations dans `src/styles/fonts.css`, incorporées dans le document par `BaseLayout.astro`, avec `font-display:swap`.

## Composition et responsive

- Hero d’accueil : largeur entière, `100svh`, photo de repli et vidéo couvrante. Header superposé, logo au centre, menu à gauche, réservation à droite. Le header final mesure 112 px sur ordinateur et 88 px à ≤700 px.
- Sections : largeurs éditoriales variables (base `.section` 1340 px), grandes respirations verticales. Espacements usuels : 8/12/18/24/25/32/40/45/55/65/80/100/112 px. Ce sont des valeurs observées, pas une grille de tokens déjà uniformisée.
- Mosaïque : grille asymétrique de douze colonnes sur grand écran ; « Dormir » occupe une grande tuile verticale. Six colonnes à ≤1000 px, deux à ≤600 px. Ne pas transformer ces photos en une grille uniforme de cartes.
- Golf et Marrakech : hero photographique immersif, séquences éditoriales, contrastes entre surfaces claires et sections sombres. Photos et panneaux forment une composition commune.
- Footer : compact, trois colonnes puis deux à ≤1100 px, une à ≤700 px. Les liens du menu de footer forment deux colonnes sur mobile.
- Les breakpoints sont locaux : 600/700/800/900/1000/1050/1100/1200/1600 px selon les composants. Vérifier toutes les règles concernées avant modification, ne pas chercher une unique coupure globale inexistante.

## Composants et états

| Élément | Référence | Contrat |
| --- | --- | --- |
| Logo | `BrandLogo.astro` | SVG monochrome, couleur courante, id unique par instance |
| CTA plein | `.button` | Rectangle à angles droits, filet 1 px, Manrope 19 px ; sombre puis olive au survol |
| CTA sur hero | `.glass` | Transparent, filet clair, devient papier/encre au survol |
| Lien éditorial | `.text-link` | Trait fin sous le texte, espace avec pictogramme |
| Balle de golf | `GolfBall.astro` | Sur CTA classiques et menu principal, pas dans le footer |
| Photo cliquable | `ExploreIcon.astro` | Petit + aux traits fins ; pas de balle ni de gros cercle |
| Faits de la villa | `VillaDescription` / `VillaIcon` | Surface, lit, bain, voyageurs ; quatre faits, deux colonnes sur mobile |
| Mosaïque | `VillaMosaic.astro` | Photo, voile, titre et libellé ; lien vers filtre de galerie |
| Avis | `GuestReviews.astro` | Défilement natif, sans autoplay ; notes, auteur/date, résumés explicites |
| Galerie | page + `Dialogs.astro` | Filtres à `aria-pressed`, fenêtre native, navigation et annonce photo |
| Pause hero | `.hero-motion` | Commande discrète de 44 × 44 px, libellé pause/reprise |

Les liens naviguent ; les boutons changent un état. Garder les SVG décoratifs hors de l’arbre accessible. Ne pas remplacer un nom accessible complet par un `aria-label` qui omet le texte visible.

## Mouvement, focus et qualité photo

Zooms photo légers et transitions courtes ; pas de nouveau carrousel automatique. Conserver les exceptions `prefers-reduced-motion`, la pause de la vidéo hors écran et en onglet masqué, ainsi que le choix explicite de l’utilisateur.

Focus visible à contour 2 px et décalage 5 px. Sur les sections sombres, contour clair. Ne pas masquer les contours pour l’esthétique. Menu ouvert : arrière-plan `inert`, focus contenu dans les commandes du menu, Échap ferme et restitue le focus.

Les `sizes` doivent correspondre à la surface réelle **et au recadrage `object-fit:cover`** : une grande tuile verticale peut demander une photo plus large qu’attendu. Les héros Golf et Marrakech ont des sources AVIF portrait dédiées. Ne pas diminuer la qualité perçue pour gagner artificiellement un point Lighthouse.

## Réutiliser sans faire dériver le style

Avant de créer un nouveau composant, chercher un modèle existant. Pour une modification de couleur ou de taille, inspecter la cascade décrite dans [ARCHITECTURE.md](ARCHITECTURE.md). Une extraction de tokens actifs serait une refactorisation distincte, à vérifier visuellement ; elle n’a pas été faite lors de cette livraison documentaire.
