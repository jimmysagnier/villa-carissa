# Contribuer et vérifier

## Une modification ciblée

Lire `AGENTS.md`, puis la documentation et le code concernés. Le rendu actuel est approuvé ; ne pas profiter d’un correctif pour lancer une refonte. Garder les médias et les crédits, les routes et le comportement Airbnb.

Créer une branche pour un changement futur, travailler dans les sources, puis expliquer le résultat et sa validation. Ne pas éditer `dist/`. Ne pas installer de dépendance si le code natif existant répond au besoin.

## Contrôles avant livraison

```sh
npm ci
npm run check
npm run build
npm run check:links
git diff --check
```

`check:links` dépend d’un build réussi et de Python 3. Il contrôle les documents HTML, la présence d’un H1, les ressources et chemins locaux et les six pages d’origine. Il ne vérifie pas exhaustivement les ancres, les srcset ni la disponibilité des sites externes : vérifier séparément ce qu’on modifie.

Le workflow GitHub Actions exécute installation verrouillée, contrôle Astro, build et contrôle des liens sur les pushs vers main et les pull requests. Il ne publie rien et ne contient aucun accès Cloudflare.

Pour des documents seuls, vérifier les liens relatifs, les chemins cités, la validité du JSON et l’absence de contradiction avec le code. Pas besoin d’ajouter des tests qui ne feraient que recopier les textes.

## Vérification visuelle selon la portée

Servir le build avec `npm run preview`, puis inspecter les pages réellement touchées. Tailles de référence : mobile 360×800 et 390×844, tablette 768×1024 et 820×1180, laptop 1366×900, desktop 1440×900. Pour un hero ou header : ajouter le paysage 800×360 ou 1024×768. Contrôler aussi le reflow à 320 px si la taille du texte ou du menu change.

Vérifier absence de débordement horizontal, texte lisible à 19 px, qualité des photos recadrées, chargement des sections après défilement, header/footer et contraste. Une photo présente dans le réseau mais floue ou mal cadrée reste un problème visuel.

Selon les composants modifiés :

- Menu : ouvrir, Tab/Shift+Tab, fermeture Échap/voile/lien, focus rendu au bouton.
- Galerie : filtres et hash, bonne sélection visible, ouverture, précédent/suivant, Échap, caption, retour du focus.
- Hero : bonne vidéo mobile/desktop, poster, pause/reprise, réduction du mouvement, onglet masqué et scroll hors écran.
- Avis : scroll tactile/clavier, boutons désactivés aux limites, libellé de position.
- Contact : liens et boutons Airbnb, email/téléphone, aucun ancien formulaire.

Les audits précédents utilisent Chromium et des dimensions simulées. Ne pas les présenter comme une validation Safari/iPhone physique ou par lecteur d’écran.

## Performance et accessibilité

Comparer dans les mêmes conditions et sur le build de production, sans désactiver artificiellement des fonctionnalités pour augmenter un score. Garder les rapports hors de `public/`. Un audit Lighthouse ponctuel varie ; noter version, profil, date, URL et mesures. Les données terrain sont distinctes.

La base du 18 octobre est dans `REVIEW_2026-10-18.md`. Les performances mobiles 94–99 ont été acceptées par le propriétaire. Ne pas poursuivre une optimisation intrusive à chaque petite demande ; la stabilité du rendu reste une contrainte.

## Git

Commits explicites, petits diffs vérifiables, aucune réécriture d’historique ou push forcé sans demande. `package-lock.json` accompagne tout changement de dépendance. Ne pas utiliser `git add -f` pour les originaux ignorés, caches, secrets ou journaux.

Aucune convention de licence générale n’a été ajoutée au code et aux médias : ne pas appliquer automatiquement une licence permissive aux photos de tiers.
