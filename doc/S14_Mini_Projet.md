

# Mini-Projet Final

Faire un groupe de 5.Rendu dans 14 jours après la fin du module. 

| ℹ![][image1] Livrables attendus |
| :---- |
| Un repository GitHub public (lien à soumettre). |
| L'adresse du contrat déployé sur sepolia.etherscan.io. |
| Une vidéo de démonstration ≤ 3 minutes (Loom, YouTube non-listé) OU présentation orale. |

## Sujets proposés

| \#  | Sujet  | Description |
| ----- | ----- | ----- |
| 1  | Vote décentralisé  | Propositions on-chain, vote une fois par adresse, clôture automatique par  deadline. |
| 2  | Token ERC-20 avec vesting  | Tokens débloqués linéairement sur N mois. Whitelist, cliff, révocation. |
| 3  | Mini NFT Marketplace  | Mint ERC-721, listing prix ETH, achat (ETH→NFT), galerie front. |
| 4  | Loterie on-chain  | Achat ticket ETH, tirage (block.prevrandao ou VRF mock), distribution prix. |
| 5  | Diplôme Soulbound (EIP 5114\) | NFT non-transférable \= diplôme académique. Seul l'owner émet. |
| 6  | Crowdfunding on-chain  | Objectif ETH + deadline. Si atteint → owner retire. Sinon → remboursement  auto. |

## Critères d'évaluation

| Critère  | Points /20  | Attendus |
| ----- | ----- | ----- |
| Conception du contrat  | 5 / 20  | Architecture claire, bonnes pratiques Solidity, logique métier  correcte |
| Sécurité  | 4 / 20  | Modifiers, require avec messages, pattern CEI, gestion des erreurs |
| Front-end fonctionnel  | 4 / 20  | Connexion MetaMask, lecture/écriture contrat, UX lisible, gestion  d'erreurs |
| README & Repository  | 3 / 20  | Description, instructions, adresse contrat Sepolia, captures d'écran |
| Démo  | 4 / 20  | Clarté de la démonstration, explication des choix techniques |

| ![][image2] Points bonus |
| :---- |
| Tests unitaires avec Hardhat ou Foundry. |
| Déploiement front sur GitHub Pages (URL publique dans le README). |
| Documentation NatSpec dans le contrat (/// @param, @return…). |
| Utilisation d'OpenZeppelin (ERC20, ERC721, Ownable, AccessControl…). |
| Intégration Chainlink VRF (pour la loterie) ou Price Feed. |

## Structure GitHub recommandée

```text
mon-projet-blockchain/
├── README.md            # Description, adresse contrat, lien démo, captures
├── contracts/           # Le code Solidity de votre diplôme SBT
│   └── MonContrat.sol   # Smart contract Solidity principal
├── test/                # Tests unitaires (bonus — Hardhat ou Foundry)
├── scripts/             # Scripts de déploiement (bonus)
├── front/
│   ├── index.html
│   └── app.js           # Logique ethers.js
└── screenshots/         # Captures DApp + Etherscan + MetaMask
```

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAA/klEQVR4Xp3SP2vCQBzG8XtteQHOBooOUlwcarDa6iAKqWAEEcF/SGkpaBzEUmmlUxQVB0mHChqKcCD4Km448xwqOaggGT7Lw/fHLUdCt2klXzUp1PoTVv8H9lzrnYKqFRXyWBvQ/mzDhblz2bFB7+/oofHJCr0F9+paK2G13Us7oCfxyoBlni3u9dSZCe2vH2kH9CRmmCzZGPGT+/qID6e/wtj+O+8n6P0dRfVX5j6JZ8/KpiXYzk7aAT2JZJssZnS5V+ntW1iuqbQDehJKV1lUf+FeevtDmNgbaQf0JKgVaSTb4tdyfwT1d6SGNSV8V6BwkyqzS9SEQSHg/tUDcI3REXC2hUEAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABO0lEQVR4Xp3NTUsCURQG4Ju/pD/Qrm2/Ijdhm6BNUEotWgSFYExDUW1FK6WoJBPUXGihFkzIUBZmMbvGgb5wGp1wpMn5ON2RabhDOxfPXZz7vuegdHgCkbLRSW8puZCzXGcXc1eJaW/5cAqRUPNmySHdr4z/iBem1hXgj9rMm9aczA1WEqtBh/IcKRnqK5i6atNA//6ADp6Ldzhjw0/I0RXirKG+gaEpffgk6Oo7KI09lswhqUY7ZG7L3/uq4u0vNgF6Mgsyt+knc4OV2o8bhHWPwu8wvTYLfa0KKHyUwX8eMoekB8qlVV/zKY0EWDqYVKd9nzUKkVDlfNelfBYe5W7zpoV/ujTLucgYU4ghEsokD1xSx/HhTCphWoqFLJwexUbSJ/uINFiJpoL/zAdmaUtgbmZ7NbQ8hCHSL7vzsqQCpyo7AAAAAElFTkSuQmCC>