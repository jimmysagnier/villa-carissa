# Sources Airbnb — 17 octobre 2026

Annonce publique consultée : https://www.airbnb.fr/rooms/14479193

Le texte et les photographies ont été lus depuis la fiche et sa visite photo, sans accès au compte hôte.

## Données retenues

- Villa entière, 8 voyageurs, 4 chambres, 6 lits, 4 salles de bain, 170 m².
- Domaine privé de Samanah, route d’Amizmiz, Marrakech.
- Salle de bain pour chaque chambre ; terrasse de la suite parentale avec vue sur la piscine.
- Piscine privée, jardin sans vis-à-vis, terrasses, salon avec cheminée, salle à manger et cuisine.
- Les parcours et le centre de Marrakech se rejoignent en voiture. Aucun temps de trajet garanti n’est affiché.
- Le système de réchauffement solaire de l’eau décrit dans l’annonce ne justifie pas une promesse de piscine chauffée à température constante. Cette promesse n’est pas utilisée.

## Médias

`photo-tour.json` conserve les URL et catégories effectivement vues dans la visite photo. `media.json` et `src/data/photos.json` donnent les dimensions et la correspondance vers les fichiers locaux.

Les originaux sont conservés localement dans `originals/`, ignoré par Git (environ 158 Mo). Plusieurs fichiers dépassent 5 000 pixels de large. Les variantes WebP de 800, 1600 et 2400 pixels maximum et les films finalisés sont suivis dans `public/assets/`.

Le nouveau hero est réalisé à partir des photos 30, 31, 06, 17 et 33, avec retour à la photo 30 pour la boucle. L’export 1920 × 1080 ne nécessite plus l’agrandissement des images de 1 403 pixels du premier site.

## Avis

Note constatée : 4,53/5, 113 commentaires. Relecture publique le 17 octobre 2026 : dix avis ont été sélectionnés dans la fenêtre des commentaires Airbnb, avec prénom, mois affiché par Airbnb, note et identifiant public de l’avis. `src/data/reviews.json` conserve ces références et les résumés éditoriaux affichés.

Les textes sont des résumés, signalés comme tels, et ne sont pas présentés entre guillemets. Les réserves mentionnées dans les avis retenus (photos, piscine chauffée, climatisation, voiture, ustensiles) restent visibles dans les résumés concernés. Les dix avis comprennent des notes de 4/5 et 5/5 ; ils constituent une sélection et ne remplacent pas la note globale. Il n’y a pas de synchronisation automatique. Le lien public permet de lire tous les commentaires originaux.

## Réservations et calendrier

Les réservations, tarifs et paiements sont exclusivement gérés sur Airbnb. Aucun formulaire local ne collecte de dates ou de demandes de réservation.

L’aide officielle indique qu’un lien iCal doit être exporté depuis le calendrier hôte : https://www.airbnb.fr/help/article/99. Ce lien privé n’est pas fourni dans l’annonce publique. Le choix validé par l’utilisateur est donc le bouton vers Airbnb, sans calendrier local ni synchronisation simulée.


## État après review du 18 octobre

Variantes supplémentaires de 480 pixels dans `public/assets/airbnb/`. Films optimisés après la génération initiale : environ 7,08 Mo desktop et 3,61 Mo mobile, toujours 25 secondes, 30 images/s, 1920 × 1080 et 720 × 1280. Posters AVIF et WebP ; fontes locales WOFF2. Les scripts de génération initiaux ne réappliquent pas automatiquement cette dernière passe d’encodage.
