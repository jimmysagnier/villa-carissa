# Performance mobile · 25 octobre 2026

Version publique : commit `985b0c9`, déploiement Cloudflare Pages `cfcd59c8-fb71-4ac9-a9a9-d8a860ef478e`. Les contrôles GitHub et le déploiement ont réussi.

## Corrections

- Film mobile : 3 613 866 → 1 302 678 octets, **−64 %**. H.264, 576×1024, 24 fps, montage et cadrages conservés, durée d’environ 25 secondes. Comparaison de scènes à 390 px ; vidéo, autoplay, pause/reprise et sélection mobile/desktop conservés. Le poster prioritaire est inchangé.
- Polices : sous-ensembles latins conservant tous les caractères précédemment couverts sur les pages générées et leurs métriques. Signature « VILLA CARISSA » : mêmes glyphes Cormorant 500 dans un fichier dédié de **1 508 octets**, sans changement de dimensions mesuré. Les fontes normalement téléchargées passent de 156 504 à 106 248 octets, **−32 %**. Seules les variantes du premier écran sont préchargées.
- Avis : suppression de la mesure géométrique synchrone après affichage des commandes. Dimensions mises en cache par `ResizeObserver`, lectures groupées avant les écritures et mise à jour des commandes dans la prochaine frame. Le statut n’est réécrit que lorsqu’il change.

## Mesures publiques finales

Lighthouse **13.5.0**, Chrome headless, profil mobile par défaut avec simulation 4G lente, cache navigateur neuf à chaque audit. Trois audits successifs du même code sur `https://villacarissa-samanah.com/` ; mesures ponctuelles de laboratoire.

| Mesure | Mobile 1 | Mobile 2 | Mobile 3 | Médiane |
| --- | ---: | ---: | ---: | ---: |
| Performance | 92 | 97 | 98 | **97** |
| LCP | 2,80 s | 2,47 s | 2,30 s | **2,47 s** |
| Speed Index | 4,38 s | 1,12 s | 1,25 s | **1,25 s** |
| TBT | 0 ms | 0 ms | 0 ms | **0 ms** |
| CLS | 0 | 0 | 0 | **0** |
| Transfert initial | 1 491 Kio | 1 491 Kio | 1 491 Kio | **1 491 Kio** |

Accessibilité, bonnes pratiques et SEO : **100** sur les trois audits. Les diagnostics de recalcul forcé et de charge réseau excessive passent sur les trois mesures. La mesure publique réalisée avant modification transférait environ 3 690 Kio : réduction observée d’environ **60 %**. Son score de 99 et son LCP de 2,17 s ne constituent pas une moyenne de référence : le score et le LCP ne progressent pas systématiquement à chaque exécution, contrairement au gain de poids vérifié.

Contrôle public desktop final : performance **100**, accessibilité **100**, bonnes pratiques **100**, SEO **100**, LCP **0,8 s**, TBT **0 ms**, CLS **0**.

## Contrôles et limites

`npm run check` : aucune erreur, aucun avertissement. Build, liens locaux et `git diff --check` réussis. Six pages contrôlées en mobile, sans débordement ni image chargée en erreur. Accueil contrôlé en 360/390, 768/820, 1366/1440 px et paysage 800×360 / 1024×768. Dimensions du H1 et du logo identiques à la référence mobile. Avis : déplacement, limites, désactivation des boutons, redimensionnement entre une et deux cartes visibles, statut et retour arrière. Menu : fermeture Échap et restitution du focus. Vidéo : pause/reprise et dimensions mobiles vérifiées.

Le script Cloudflare `email-decode.min.js`, environ 1 Ko, reste géré par Cloudflare. Il sert à l’obfuscation de l’adresse email et est différé. L’avertissement de cache de la capture estime une économie de 0 Kio ; ce réglage n’a pas été modifié. L’arborescence réseau reste un diagnostic informatif : les petits scripts et les polices secondaires peuvent encore y apparaître ; ajouter des préconnexions vers le même domaine n’apporterait pas de bénéfice.

Le premier des trois tests dépasse encore le seuil de LCP de 2,5 s. Cette médiane de laboratoire ne certifie pas les Core Web Vitals terrain, notamment l’INP ; les données utilisateurs et Safari/iOS physique restent à vérifier. Les rapports complets JSON/HTML, les captures et `summary-final.json` sont conservés localement dans `audit-2026-10-25/`, hors du site public et du dépôt.
