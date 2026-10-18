# Villa Carissa · Samanah, Marrakech

Site vitrine d’une villa privée à Marrakech, au cœur du domaine de Samanah. **Astro 7.4.0**, TypeScript, CSS et JavaScript natif, rendu entièrement statique. Aucun WordPress, CMS, serveur applicatif ou secret n’est nécessaire au développement et au build.

Design et contenu validés au **18 octobre 2026**. Réservations exclusivement sur [Airbnb](https://www.airbnb.fr/rooms/14479193).

## Reprendre le projet

Prérequis : **Node.js 24.13.0** (version de référence dans `.nvmrc`), npm et Python 3 pour le contrôle des liens. La contrainte du projet est Node ≥ 22.22.0. Aucune variable d’environnement requise.

```sh
git clone https://github.com/jimmysagnier/villa-carissa.git
cd villa-carissa
nvm use # si nvm est installé ; sinon utiliser directement Node 24.13.0
npm ci
npm run dev
```

Ouvrir [http://127.0.0.1:4173](http://127.0.0.1:4173). Depuis un clone existant : `git pull --ff-only`, puis `npm ci` si le lockfile a changé.

```sh
npm run check       # Types et diagnostics Astro
npm run build       # Produit dist/
npm run check:links # Après build : routes, médias et liens locaux
npm run preview     # Build de production sur le port 4173
```

Ne pas lancer `dev` et `preview` simultanément sur le même port. Les photos, vidéos et polices nécessaires sont incluses ; aucun téléchargement de médias n’est nécessaire au build. Les originaux haute définition ignorés ne sont pas requis.

## Documentation

| Document | Usage |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Point d’entrée pour les autres IA et les développeurs |
| [Design system](docs/DESIGN_SYSTEM.md) | Palette, typographie, mise en page, composants et états |
| [Tokens](docs/design-tokens.json) | Référence structurée des valeurs actuelles |
| [Style éditorial](docs/CONTENT_STYLE.md) | Ton, faits, textes imposés et décisions de contenu |
| [Architecture et code](docs/ARCHITECTURE.md) | Fichiers, cascade CSS, interactions et données |
| [Contribuer et vérifier](docs/CONTRIBUTING.md) | Processus de modification et contrôles |
| [Déploiement futur](docs/DEPLOYMENT.md) | Préparation Cloudflare ; aucune intégration activée |
| [État de la review](docs/REVIEW_2026-10-18.md) | Mesures, limites et améliorations restantes |

Pour une autre IA : commencer par `AGENTS.md`, puis lire le guide correspondant à la modification. Le dépôt suffit à reprendre le site sans retrouver l’historique de conversation.

## Structure

```text
src/components/       Composants Astro et pictogrammes SVG
src/data/             Photos, avis, golfs, lieux et constantes Airbnb
src/layouts/          Document HTML commun et métadonnées
src/pages/            Six pages principales et page 404
src/scripts/app.js    Menu, médias, galerie et avis
src/styles/           CSS existant et ajustements finaux
public/assets/        Médias optimisés et polices locales
source/               Provenance, archives WordPress et outils médias
docs/                 Documentation de reprise et design system
.github/workflows/    Validation uniquement, aucun déploiement
```

## Pages et adresses

| Page | URL |
| --- | --- |
| Accueil | `/` |
| Galerie | `/toutes-les-photos/` |
| Golf | `/voyage-golfique-a-marrakech/` |
| Que faire à Marrakech | `/location-de-villa-a-marrakech/` |
| Contact | `/contact/` |
| Mentions légales | `/mentions-legales/` |

Alias conservés dans Astro : `/voyage-golfique-maroc/` → Golf et `/villa-carissa-a-samanah/` → Accueil. L’archive vide **Blog & actualités** (`/category/uncategorized/`) a été supprimée à la demande du propriétaire.

Ancres de filtres de galerie : `#salon`, `#chambre`, `#exterieur`, `#repas`, `#bain`, `#golf`.

## Médias et avis

34 photographies actuelles Airbnb, deux montages de 25 secondes, images de Samanah et de Marrakech. Provenances dans `source/airbnb/`, `source/golf-page/` et `source/marrakech/`. Originaux, caches et planches de sélection exclus de Git. Les scripts médias sont optionnels et ne reproduisent pas à eux seuls toutes les optimisations finales de la review.

Les dix avis affichés sont des résumés éditoriaux attribués et datés, issus d’un relevé du 17 octobre 2026. Aucun calendrier ni avis n’est synchronisé automatiquement.

Les médias tiers conservent leurs droits et crédits : ce dépôt ne leur attribue aucune licence supplémentaire. Voir les manifestes et le guide de déploiement.

## État de livraison

L’aperçu Sites existant reste privé. `.openai/hosting.json` identifie cet hébergement ; il n’est pas nécessaire au build ni au futur déploiement Cloudflare et ne contient aucun secret requis.

**Cloudflare attend le transfert du domaine. Aucun déploiement automatique n’est configuré.** `public/robots.txt` bloque volontairement l’indexation de l’aperçu. Le domaine canonique et ce blocage seront à revoir au lancement public, pas avant.
