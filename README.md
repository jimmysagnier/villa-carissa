# Villa Carissa

Site de la Villa Carissa, développé avec **Astro 7.4.0** (dernière version stable du registre npm vérifiée lors de cette refonte). Rendu statique, sans dépendance à WordPress. Les photos, vidéos et polices sont servies localement.

## Développer

```sh
npm ci
npm run dev
npm run check
npm run build
npm run check:links
npm run preview
```

Node.js >= 22.22.0 est requis. L’aperçu se trouve sur http://127.0.0.1:4173. Les routes sont dans `src/pages/`, les composants partagés dans `src/components/`, la structure HTML dans `src/layouts/BaseLayout.astro`, les styles dans `src/styles/` et les interactions dans `src/scripts/app.js`. Les médias sont dans `public/assets/`. Le dossier généré `dist/` est directement déployable sur un hébergement statique et ne doit pas être édité. Python 3 sert uniquement à la vérification des liens et à la production des vidéos ; il n’intervient plus dans la construction du site.

Le hero occupe 100 % de la hauteur visible du navigateur. Logo centré, menu latéral et réservation sont superposés aux images. La composition reprend les principes du hero du Palais Les Orchidées sans reprendre ses médias ni sa classification hôtelière.

## Pages préservées

| Page d’origine | Adresse conservée |
| --- | --- |
| Accueil | `/` |
| Toutes les photos | `/toutes-les-photos` |
| Le golf de Samanah | `/voyage-golfique-a-marrakech` |
| Que faire à Marrakech | `/location-de-villa-a-marrakech` |
| Contact | `/contact` |
| Mentions légales | `/mentions-legales` |
| Archive blog liée depuis le pied de page, sans article d’origine | `/category/uncategorized` |

Les anciennes ancres de galerie `#salon`, `#chambre` et `#exterieur` activent les filtres correspondants. Les liens historiques `/voyage-golfique-maroc` et `/villa-carissa-a-samanah` disposent d’une redirection HTML. Pour le domaine final, les convertir en redirections HTTP 301 avec la configuration de l’hébergeur.

## Photos et montage

Les médias et textes de l’ancien WordPress restent archivés dans `source/legacy/`. Le site présente désormais les **34 photographies de l’annonce Airbnb**, réparties par pièce. Les sources et dimensions figurent dans `src/data/photos.json`, l’audit dans `source/airbnb/README.md`. Les originaux sont conservés localement dans `source/airbnb/originals/` (ignoré par Git). Des WebP responsives de 800, 1600 et 2400 pixels maximum sont incluses dans `public/assets/airbnb/`.

Deux vidéos de 25 secondes sont montées directement depuis cinq JPEG haute définition de l’annonce :

- `villa-carissa-film.mp4` : 1920 × 1080, 30 images/s, H.264 CRF 20, débit plafonné à 6 Mbit/s.
- `villa-carissa-mobile.mp4` : 720 × 1280, 30 images/s, cadrages verticaux dédiés, H.264 CRF 21, débit plafonné à 2,5 Mbit/s.

Les sources de ces plans dépassent 5 000 pixels de large : le nouvel export Full HD est obtenu par réduction, contrairement au premier montage réalisé à partir des photos de 1 403 pixels de l’ancien site. Le film reste un montage photographique, sans détail architectural généré. Zooms lents, fondus d’une seconde et retour au premier plan assurent une boucle continue. Les affiches WebP sont extraites de la première image exacte de chaque film.

Seul le fichier adapté au mobile ou à l’ordinateur est chargé. La préférence de réduction des animations empêche le chargement automatique. La lecture s’interrompt hors écran et dans les onglets en arrière-plan ; un bouton permet de la mettre en pause.

Pour récupérer les originaux depuis les seules URL déjà relevées et reconstruire les vidéos (Pillow et imageio-ffmpeg requis) :

```sh
python3 source/import-airbnb-photos.py
python3 source/make-film.py
```

## Descriptif et mosaïque

Le hero est suivi du descriptif vérifié avec l’annonce, puis de six tuiles photo : Dormir, Extérieur, Salon, Piscine, À table et Bains. Chaque tuile ouvre la galerie filtrée. Les anciennes ancres restent accessibles ; de nouvelles catégories `#repas`, `#bain` et `#golf` complètent la visite.

Deux courts extraits d’avis récents, attribués et datés, remplacent l’ancien avis de 2019. La note de 4,53/5 et les 113 avis sont un relevé du 17 octobre 2026, indiqué comme tel, avec un lien vers l’ensemble des commentaires. Aucun avis n’est présenté comme synchronisé.

## Réservation exclusivement sur Airbnb

Tous les appels à réserver ouvrent `https://www.airbnb.fr/rooms/14479193`. Le formulaire de séjour et le choix local de dates ont été supprimés. La page Contact est conservée et renvoie aux disponibilités et à la messagerie hôte sur Airbnb.

Le lien d’export iCal n’étant pas accessible depuis l’annonce publique, aucun calendrier local n’est affiché. Un éventuel affichage ultérieur nécessiterait le lien d’export du compte hôte et une synchronisation côté serveur ; même dans ce cas les tarifs, règles de séjour et réservations resteraient gérés par Airbnb.

## À confirmer avant remplacement du site actuel

- Vérifier les tarifs et conditions directement sur Airbnb. Aucune solution de réservation directe n’est prévue.
- Actualité des coordonnées de contact conservées depuis le site original.
- Mise à jour des mentions légales historiques de 2019, notamment éditeur, hébergeur et données personnelles.
- Anciennes réductions sur les green fees et les Bains de Marrakech : archivées dans les exports, omises de l’interface car non confirmées.
- Domaine définitif, canonicals, sitemap public et redirections HTTP. Le domaine WordPress actuel n’a pas été modifié.

La prévisualisation Sites est privée. `dist/robots.txt` interdit l’indexation de cet aperçu : remplacer ce fichier et ajouter le sitemap lors de la migration sur le domaine public.
