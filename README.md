# Villa Carissa

Première refonte premium, indépendante de WordPress. Site statique en HTML, CSS et JavaScript, sans dépendance applicative. Les photos et polices sont servies localement.

## Développer

```sh
npm run build
npm run check
npm run dev
```

L’aperçu se trouve sur http://localhost:4173. Le code de génération des pages est dans `source/build.py`, les styles et interactions dans `dist/assets/`. Le dossier `dist/` est directement déployable sur un hébergement statique. Python 3 est requis pour les scripts locaux ; aucune exécution Python n’est nécessaire sur l’hébergement.

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

Les 44 médias d’origine et les exports WordPress (pages, articles, médiathèque, sitemap) sont archivés dans `source/legacy/`. La galerie présente les 15 photographies distinctes des espaces de la villa ; les autres photographies de voyage et de golf illustrent les pages correspondantes. Les portraits de démonstration de l’ancien thème ne sont pas utilisés.

Le hero est une vidéo MP4 de 21,8 secondes, montée à partir de cinq photographies réelles de la villa, avec zooms lents et fondus. Il s’agit d’un montage photo, pas d’une visite filmée. Une image de remplacement est toujours présente ; le mouvement automatique est désactivé lorsque le navigateur demande une réduction des animations. Le fichier `source/make-film.py` reproduit le montage avec Pillow et imageio-ffmpeg installés localement.

## Demandes de séjour

Le choix des dates et des voyageurs sur l’accueil préremplit le contact. Le formulaire ouvre la messagerie du visiteur avec un email préparé ; il ne simule pas un envoi et ne réserve pas de séjour. Aucun stockage ni service d’envoi n’est connecté. Le lien Airbnb d’origine est conservé : `https://www.airbnb.fr/rooms/14479193`.

## À confirmer avant remplacement du site actuel

- Tarif, conditions de réservation et éventuelle solution d’envoi direct du formulaire.
- Actualité des coordonnées de contact et des services repris du site original.
- Mise à jour des mentions légales historiques de 2019, notamment éditeur, hébergeur et données personnelles.
- Anciennes réductions sur les green fees et les Bains de Marrakech : archivées dans les exports, omises de l’interface car non confirmées.
- Domaine définitif, canonicals, sitemap public et redirections HTTP. Le domaine WordPress actuel n’a pas été modifié.

La prévisualisation Sites est privée. `dist/robots.txt` interdit l’indexation de cet aperçu : remplacer ce fichier et ajouter le sitemap lors de la migration sur le domaine public.
