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

Les 44 médias d’origine et les exports WordPress (pages, articles, médiathèque, sitemap) sont archivés dans `source/legacy/`. La galerie présente les 15 photographies distinctes des espaces de la villa ; les autres photographies de voyage et de golf illustrent les pages correspondantes. Les portraits de démonstration de l’ancien thème ne sont pas utilisés.

Deux vidéos de 25 secondes sont montées directement depuis les cinq JPEG originaux de la villa, sans recompression WebP intermédiaire :

- `villa-carissa-film.mp4` : 1920 × 1080, 30 images/s, H.264 CRF 18.
- `villa-carissa-mobile.mp4` : 720 × 1280, 30 images/s, cadrages verticaux dédiés, H.264 CRF 19.

Les zooms sont plus légers, les fondus durent une seconde, et la dernière transition revient au même point de la première photo pour former une boucle continue. Le calcul sur un canevas intermédiaire de plus haute résolution réduit les pas de pixels dans les mouvements lents. Les affiches WebP sont extraites de la première image exacte de chaque vidéo pour éviter un changement de cadrage au démarrage. Les MP4 ont leur index en tête pour commencer la lecture avant le téléchargement complet.

**Limite réelle :** les JPEG d’origine mesurent 1403 × 937 pixels. Le Full HD est un agrandissement, pas une prise de vue native en 1080p ou 4K. Le montage ne crée aucun détail architectural et reste un montage photo, pas une visite filmée.

Le mobile ne charge que son propre fichier. Une image de remplacement est toujours présente et le chargement vidéo est différé jusqu’au script de lecture. Aucune vidéo de fond n’est chargée si la préférence de réduction des animations est active. La lecture s’interrompt lorsque le hero sort de l’écran ou que l’onglet passe en arrière-plan. Le bouton de pause reste disponible. Le film dans la fenêtre de lecture utilise la version horizontale Full HD.

Pour reconstruire les films (Pillow disponible dans l’interpréteur et imageio-ffmpeg dans `.venv`) :

```sh
python3 source/make-film.py
```

## Demandes de séjour

Le choix des dates et des voyageurs sur l’accueil préremplit le contact. Le formulaire ouvre la messagerie du visiteur avec un email préparé ; il ne simule pas un envoi et ne réserve pas de séjour. Aucun stockage ni service d’envoi n’est connecté. Le lien Airbnb d’origine est conservé : `https://www.airbnb.fr/rooms/14479193`.

## À confirmer avant remplacement du site actuel

- Tarif, conditions de réservation et éventuelle solution d’envoi direct du formulaire.
- Actualité des coordonnées de contact et des services repris du site original.
- Mise à jour des mentions légales historiques de 2019, notamment éditeur, hébergeur et données personnelles.
- Anciennes réductions sur les green fees et les Bains de Marrakech : archivées dans les exports, omises de l’interface car non confirmées.
- Domaine définitif, canonicals, sitemap public et redirections HTTP. Le domaine WordPress actuel n’a pas été modifié.

La prévisualisation Sites est privée. `dist/robots.txt` interdit l’indexation de cet aperçu : remplacer ce fichier et ajouter le sitemap lors de la migration sur le domaine public.
