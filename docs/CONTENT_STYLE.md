# Style éditorial et faits de référence

## Positionnement et ton

Villa privée à Marrakech, au cœur de Samanah. Écrire en français, avec vouvoiement, dans un ton calme et précis. Des phrases concrètes, une évocation des lieux et des usages, sans superlatifs accumulés ni promesses de service non vérifiées. Titres courts ; descriptions utiles à la préparation du séjour. Respecter les accents et employer des espaces insécables avant les signes de ponctuation doubles lorsque nécessaire.

L’inspiration premium se traduit par la composition et la photographie. Ne pas transformer la villa en hôtel, palais ou établissement classé.

## Faits à préserver

- 170 m², 4 chambres, 4 salles de bain, jusqu’à 8 voyageurs.
- Domaine de Samanah, route d’Amizmiz, Marrakech, Maroc.
- Piscine privée, jardin, terrasses, salon avec cheminée, salle à manger, cuisine. La documentation Airbnb mentionne six lits ; ne pas convertir cela en six chambres.
- Le père du propriétaire du site possède la villa, mais la famille n’y a jamais vécu. Aucune « maison de famille », aucun souvenir familial inventé.
- Ni accès gratuit au golf ni temps de trajet garanti. Le club-house et les lieux de Marrakech se rejoignent en voiture.
- Ne pas promettre une température de piscine constante : l’annonce décrit un dispositif solaire, pas une garantie de chauffage.

Source principale : `source/airbnb/README.md` et les références associées. Si la capacité ou les prestations changent, demander une donnée propriétaire ou vérifier une source actuelle avant de modifier toutes les occurrences.

## Réservation et avis

Les réservations, disponibilités, tarifs, conditions et paiements sont sur Airbnb, annonce `14479193`. Utiliser `src/data/villa.ts`. Aucun prix ni calendrier reconstitué depuis une page publique. Aucun faux formulaire local.

Dix avis sélectionnés dans `src/data/reviews.json` : prénoms, dates, notes et références publiques conservés. Textes présentés comme des **résumés éditoriaux**, sans guillemets de citation. Garder les réserves des voyageurs. Relevé global : 4,53/5, 113 avis, 17 octobre 2026 ; cette date doit rester visible. Ne pas annoncer « en direct » ni faire passer la sélection pour l’ensemble des avis.

## Textes et décisions imposés

- H1 Contact : **VOTRE PROCHAIN SÉJOUR À MARRAKECH**. L’ancien « À bientôt, à la Villa Carissa » a été retiré.
- Menu principal sans numérotation 01/02/03.
- Footer : « Site réalisé par Jim Sagnier depuis mon canapé convertible 🙂 ». Le nom pointe vers `https://jimsagnier.com/`, dans un nouvel onglet, avec `rel="noopener noreferrer"`.
- Éditeur et directeur de publication : Jimmy Sagnier. Hébergement annoncé : Cloudflare. Conserver la nuance sur les cookies techniques de l’aperçu privé ; le code du site n’ajoute pas de tracking ou cookies publicitaires.
- Page Blog & actualités supprimée volontairement.

## Golf et Marrakech

Samanah : parcours Nicklaus de 18 trous, par 72. Morocco Champions, du 30 janvier au 1er février 2020 : première étape du PGA Tour Champions sur le continent africain. Joueurs cités : Tom Lehman, John Daly, Bernhard Langer, Fred Funk, Jerry Kelly, Miguel Ángel Jiménez et **Sandy Lyle**. Ne pas réutiliser l’abréviation incomplète « Sandy ».

L’académie et les douze autres golfs sont documentés dans `source/golf-page/README.md` et `src/data/golf-courses.json`. Les photos de joueurs ne sont pas présentées comme des archives authentifiées du tournoi.

Le carnet Marrakech comporte quinze idées dans `src/data/marrakech-places.json`. Préserver les précisions : Koutoubia vue de l’extérieur, Agafay désert de pierres, Essaouira excursion distincte de Marrakech. Ne pas inventer d’horaires, de tarifs, de partenariats, de conciergerie ou d’accès privilégiés.

## Images et crédits

Images authentiques de la villa ou des lieux. Ne pas générer une architecture ou une prestation inexistante. Les photos Commons ont leurs auteurs, licences et pages de provenance ; conserver les crédits affichés. Les médias des sites officiels ne sont pas automatiquement libres de droits. Les manifestes sont des références de provenance, pas des autorisations de republication.
