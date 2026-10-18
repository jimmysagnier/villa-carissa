# Déploiement futur · Cloudflare

**Statut : différé à la demande du propriétaire, jusqu’au transfert du nom de domaine.** Ce dépôt ne connecte aucun compte Cloudflare, ne change aucun DNS et ne déploie pas automatiquement le site. Le workflow CI ne fait que valider le code.

## Ce qui est portable aujourd’hui

Le résultat `dist/` est un site statique autonome : HTML, CSS/JS, photos, vidéos, polices et favicon. Pas de secret applicatif, adaptateur Astro, serveur Node de production ou base de données. Après clonage, `npm ci && npm run build` suffit à le produire.

`.openai/hosting.json` décrit l’aperçu Sites existant. Conserver ce fichier pour cet historique ; ne pas le prendre pour une configuration Cloudflare ou y ajouter des credentials. Il n’est pas inclus dans le contenu public `dist/` par Astro.

## Paramètres de départ lorsque le lancement sera demandé

| Paramètre | Valeur de référence |
| --- | --- |
| Dépôt | `jimmysagnier/villa-carissa` |
| Branche de production envisagée | `main` |
| Racine de build | Racine du dépôt |
| Commandes locales reproductibles | `npm ci`, `npm run build` |
| Dossier à publier | `dist` |
| Runtime de build testé | Node 24.13.0 |
| Serveur applicatif / secrets | Aucun |

Un hébergement Cloudflare statique, par exemple Pages, convient à cette sortie. Choisir et vérifier alors la configuration officielle du produit réellement utilisé. Aucun fichier Wrangler ou workflow de déploiement anticipé n’a été ajouté.

## Travail à faire au lancement public

1. Confirmer le domaine canonique définitif et le choix avec/sans `www`. Mettre à jour `site` dans `astro.config.mjs` : les canonical et Open Graph utilisent cette valeur.
2. Connecter le dépôt au service Cloudflare choisi uniquement lorsque le propriétaire le demande. Garder une prévisualisation protégée si nécessaire.
3. Configurer le domaine, HTTPS et la redirection de l’autre variante. Le transfert du domaine à lui seul ne constitue pas une demande de modifier les DNS.
4. Transformer les deux alias historiques en redirections HTTP 301 sur l’hébergement final ; conserver les six routes principales. La route blog supprimée peut rester 404, aucun contenu n’étant à migrer.
5. Lever volontairement `Disallow: /` dans `public/robots.txt` pour la production publique. Ajouter un sitemap du domaine final et son URL au robots. Garder les aperçus hors indexation via la configuration de l’hébergeur plutôt que partager par erreur un robots de production ouvert.
6. Vérifier coordonnées, mentions légales, disponibilités Airbnb et actualité du relevé d’avis avec le propriétaire. Ne pas ajouter d’analytics ou de cookies marketing sans demande.
7. Confirmer les droits de publication des photos tierces. Des fichiers Commons sont crédités et sous leurs licences respectives ; certains médias de clubs et d’établissements n’ont pas d’autorisation de republication confirmée dans les sources. La présence d’une photo dans le dépôt ou sur un site officiel ne constitue pas une licence. Conserver les attributions et remplacer ou autoriser les médias concernés avant diffusion publique du site.
8. Remesurer le domaine public : performance mobile/desktop, cache des médias, canonical, liens, HTTP 301 et 404, affichage sur Safari/iOS. Consulter ensuite les Core Web Vitals terrain lorsqu’il existe assez de données.

## Ne pas confondre les statuts

Le dépôt GitHub contient les sources et les fichiers à construire. Le site hébergé garde son audience actuelle tant qu’aucun changement d’accès n’est demandé. Un push GitHub ne publie pas le site. Les scores de laboratoire enregistrés sur localhost ne décrivent pas les latences du futur hébergement Cloudflare.
