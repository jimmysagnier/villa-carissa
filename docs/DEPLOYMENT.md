# Déploiement · Cloudflare Pages

**État au 25 octobre 2026 : site public lancé sur https://villacarissa-samanah.com/.**

## Domaine public

- Domaine canonique sans `www` : `https://villacarissa-samanah.com/`.
- Domaines racine et `www` : **Actif / SSL activé** dans Pages, vérifiés le 25 octobre.
- Déploiement du lancement : `06abe068-98fe-4cb0-b712-cdb1dc7f9c4e`, commit `835597416b937ecdf234073b2c32f302f6015d36`.
- Les anciens A `217.160.0.129` et AAAA `2001:8d8:100f:f000::2dc` de `@` et `www` ont été remplacés par deux CNAME proxysés vers `villa-carissa.pages.dev`, via l’assistant Pages.
- Messagerie conservée : MX `mx00.ionos.fr` et `mx01.ionos.fr`, priorité 10, SPF IONOS, DMARC, autodiscover et domainconnect inchangés. Aucune migration email effectuée.
- Règle de zone **WWW vers domaine principal** : `https://www.villacarissa-samanah.com/*` → `https://villacarissa-samanah.com/${1}`, HTTP 301, conservation de la chaîne de requête activée. Vérification navigateur depuis HTTPS et HTTP sur `/contact/?verification=…` : arrivée sur le chemin et les paramètres du domaine canonique en HTTPS.
- `astro.config.mjs` définit le domaine public pour les canonical et Open Graph. Le robots autorise l’indexation et référence `/sitemap.xml`, généré sans dépendance par `src/pages/sitemap.xml.ts` pour les six pages principales.
- `public/_headers` applique `X-Robots-Tag: noindex, nofollow` à `villa-carissa.pages.dev` et aux sous-domaines de déploiement. Le domaine public ne correspond pas à ces règles. L’ancien aperçu Sites et ses accès restent indépendants.
- `public/_redirects` applique les HTTP 301 des deux alias historiques, avec et sans slash ; les replis HTML Astro sont conservés.

Validation du lancement : `npm run check` sans erreur ni avertissement, build et `check:links` réussis, validation GitHub Actions réussie. Vérification locale des six canonical/Open Graph, du XML du sitemap et des fichiers Pages. Les six pages publiques, les deux alias, le robots, le sitemap et la page introuvable ont été ouverts dans le navigateur. Aucune image ayant une source n’était en erreur lors du contrôle ; la galerie contient un élément image vide destiné à sa visionneuse.

Les requêtes HTTP automatisées depuis le terminal renvoient toujours 403, comme le 19 octobre ; la navigation HTTPS fonctionne dans le navigateur. Les règles 301 sont vérifiées dans Cloudflare et par l’URL d’arrivée du navigateur ; pas de relevé automatisé des en-têtes HTTP publics ni de nouvelle mesure Lighthouse/terrain pendant ce raccordement. Les mesures de performance du 18 octobre restent la référence de laboratoire.

## Historique du raccordement Git, 19 octobre 2026

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

## Suivi du site public

Le raccordement du domaine, le HTTPS, les redirections et la configuration d’indexation ont été effectués à la demande du propriétaire le 25 octobre. Conserver les six routes principales ; la route blog supprimée reste introuvable, aucun contenu n’étant à migrer.

Pour les prochaines publications, utiliser le même projet Pages et la branche `main`. Maintenir la liste du sitemap lors d’un ajout ou retrait de page. Ne pas ajouter d’analytics ou de cookies marketing sans demande. Coordonnées, mentions légales, prestations et avis conservent les contenus validés le 18 octobre ; le relevé d’avis n’est pas synchronisé avec Airbnb.

Le point documentaire sur les médias tiers reste ouvert : les fichiers Commons sont crédités sous leurs licences respectives ; certaines photos de clubs et d’établissements n’ont pas d’autorisation de republication confirmée dans les sources. Ce raccordement n’a pas modifié les médias ni établi de nouvelles licences.

Une nouvelle mesure de performance sur le domaine public, les vérifications Safari/iOS et les Core Web Vitals terrain restent à effectuer séparément lorsqu’il existe assez de données.

## Ne pas confondre les statuts

Le dépôt GitHub contient les sources. Un push vers `main` publie désormais automatiquement sur Pages. Un commit documentaire peut utiliser le préfixe `[CF-Pages-Skip]` pour éviter un build Pages ; ce préfixe ne remplace pas les contrôles GitHub Actions.

L’URL `pages.dev` est accessible publiquement, avec indexation exclue via `X-Robots-Tag` ; ce réglage n’est pas un contrôle d’accès. Le domaine public autorise l’indexation. L’ancien aperçu Sites reste privé et indépendant. Les DNS et les emails ne sont pas modifiés par un push GitHub.

Les scores de laboratoire enregistrés sur localhost ne décrivent pas les latences du nouvel hébergement Cloudflare. Une nouvelle mesure sur le domaine final reste à effectuer.
