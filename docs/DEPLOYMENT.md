# Déploiement · Cloudflare Pages

**État au 19 octobre 2026 : projet Pages créé, GitHub connecté et premier déploiement réussi.**

- Projet : `villa-carissa` ; URL : https://villa-carissa.pages.dev/
- Source : `jimmysagnier/villa-carissa`, branche `main`.
- Preset Astro, commande `npm run build`, sortie `dist`, racine du dépôt.
- Node 24.13.0 détecté depuis `.nvmrc` dans les journaux du premier build.
- Premier déploiement : `a8b49db0-7d7c-489f-8c68-4cca577eace7`, commit `780bd92c73ad9c435bacb5bbcc23101a9ee51338`.
- Liaison GitHub limitée au dépôt `villa-carissa`. Les futurs pushs sur `main` déclenchent les déploiements Pages.
- Aucun domaine personnalisé raccordé lors de cette opération ; aucune modification de DNS ou de messagerie. L’ancien aperçu Sites garde ses accès.

Les six pages ont été ouvertes dans le navigateur sur Pages. Le test HTTP automatisé depuis l’environnement d’exécution a renvoyé 403, tandis que le navigateur charge correctement les pages ; aucune modification de sécurité n’a été faite pour contourner ce comportement.

Le workflow GitHub Actions ne fait que valider le code. La publication automatique est assurée séparément par la liaison Git native de Cloudflare.

## Ce qui est portable aujourd’hui

Le résultat `dist/` est un site statique autonome : HTML, CSS/JS, photos, vidéos, polices et favicon. Pas de secret applicatif, adaptateur Astro, serveur Node de production ou base de données. Après clonage, `npm ci && npm run build` suffit à le produire.

`.openai/hosting.json` décrit l’aperçu Sites existant. Conserver ce fichier pour cet historique ; ne pas le prendre pour une configuration Cloudflare ou y ajouter des credentials. Il n’est pas inclus dans le contenu public `dist/` par Astro.

## Paramètres Pages actuels

| Paramètre | Valeur de référence |
| --- | --- |
| Dépôt | `jimmysagnier/villa-carissa` |
| Branche de production | `main` |
| Racine de build | Racine du dépôt |
| Commandes locales reproductibles | `npm ci`, `npm run build` |
| Dossier à publier | `dist` |
| Runtime de build testé | Node 24.13.0 |
| Serveur applicatif / secrets | Aucun |

L’export statique fonctionne directement sur Pages. Aucun adaptateur Astro Cloudflare, fichier Wrangler, secret applicatif ou workflow GitHub de déploiement n’a été nécessaire.

## Travail à faire au lancement public

1. Confirmer le domaine canonique définitif et le choix avec/sans `www`. Mettre à jour `site` dans `astro.config.mjs` : les canonical et Open Graph utilisent cette valeur.
2. La connexion Git est déjà faite : utiliser ce projet Pages et son onglet Domaines personnalisés pour raccorder le domaine lorsque le propriétaire le demande. Ne pas recréer le projet.
3. Configurer le domaine, HTTPS et la redirection de l’autre variante. Le transfert du domaine à lui seul ne constitue pas une demande de modifier les DNS.
4. Transformer les deux alias historiques en redirections HTTP 301 sur l’hébergement final ; conserver les six routes principales. La route blog supprimée peut rester 404, aucun contenu n’étant à migrer.
5. Lever volontairement `Disallow: /` dans `public/robots.txt` pour la production publique. Ajouter un sitemap du domaine final et son URL au robots. Garder les aperçus hors indexation via la configuration de l’hébergeur plutôt que partager par erreur un robots de production ouvert.
6. Vérifier coordonnées, mentions légales, disponibilités Airbnb et actualité du relevé d’avis avec le propriétaire. Ne pas ajouter d’analytics ou de cookies marketing sans demande.
7. Confirmer les droits de publication des photos tierces. Des fichiers Commons sont crédités et sous leurs licences respectives ; certains médias de clubs et d’établissements n’ont pas d’autorisation de republication confirmée dans les sources. La présence d’une photo dans le dépôt ou sur un site officiel ne constitue pas une licence. Conserver les attributions et remplacer ou autoriser les médias concernés avant diffusion publique du site.
8. Remesurer le domaine public : performance mobile/desktop, cache des médias, canonical, liens, HTTP 301 et 404, affichage sur Safari/iOS. Consulter ensuite les Core Web Vitals terrain lorsqu’il existe assez de données.

## Ne pas confondre les statuts

Le dépôt GitHub contient les sources. Un push vers `main` publie désormais automatiquement sur Pages. Un commit documentaire peut utiliser le préfixe `[CF-Pages-Skip]` pour éviter un build Pages ; ce préfixe ne remplace pas les contrôles GitHub Actions.

L’URL `pages.dev` est accessible publiquement, avec indexation bloquée par `robots.txt` ; ce fichier n’est pas un contrôle d’accès. L’ancien aperçu Sites reste privé et indépendant. Le domaine définitif et les emails ne sont pas modifiés par un push GitHub.

Les scores de laboratoire enregistrés sur localhost ne décrivent pas les latences du nouvel hébergement Cloudflare. Une nouvelle mesure sur le domaine final reste à effectuer.
