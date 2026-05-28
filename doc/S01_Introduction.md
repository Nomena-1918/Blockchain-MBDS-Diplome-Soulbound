

# Introduction & Objectifs du module

## Pourquoi étudier la blockchain en 2026 ?

La blockchain est l'une des innovations technologiques les plus discutées de la dernière décennie — mais  aussi l'une des plus mal comprises. Derrière le mot se cachent des concepts cryptographiques précis, une  architecture distribuée rigoureuse, et un modèle économique radicalement différent de celui d'Internet. 

Ce cours n'est pas un cours sur les cryptomonnaies. C'est un cours sur une technologie de registre distribué  qui permet à des parties qui ne se font pas confiance de s'accorder sur un historique commun, sans avoir  besoin d'un tiers de confiance central — ni banque, ni notaire, ni État. 

| ![][image1] Pourquoi c'est important pour vous |
| :---- |
| En 2026, les compétences blockchain sont demandées dans la finance, la logistique, |
| la santé, le secteur public et bien sûr le Web3. Les développeurs Solidity |
| sont parmi les mieux rémunérés du marché. Ce cours vous donne les bases solides |
| pour comprendre, évaluer et construire des systèmes blockchain. |

## Les 4 piliers de la blockchain

Avant d'entrer dans les détails techniques, il est important de comprendre les quatre propriétés  fondamentales qui définissent une blockchain digne de ce nom. 

**Décentralisation** 

Aucun acteur unique ne contrôle le système. Le registre est répliqué sur des centaines voire des milliers de  nœuds indépendants à travers le monde. Si un nœud tombe, le réseau continue de fonctionner normalement. 

**Immutabilité** 

Une donnée écrite sur la blockchain ne peut plus être modifiée ou effacée. Chaque bloc est  cryptographiquement lié au précédent : altérer un bloc invalide toute la chaîne qui suit. C'est cette propriété  qui permet la confiance sans tiers. 

**Transparence** 

Sur une blockchain publique comme Bitcoin ou Ethereum, toutes les transactions sont visibles par tous, en  temps réel. N'importe qui peut vérifier l'historique complet depuis le bloc Genesis. 

**Sécurité cryptographique** 

La blockchain utilise des primitives cryptographiques éprouvées : fonctions de hachage SHA-256, signatures  ECDSA, arbres de Merkle. Ces outils garantissent l'intégrité des données et l'authenticité des transactions. 

## Ce que vous allez apprendre

Ce module est structuré en 5 journées de 2 heures chacune, avec une progression logique : on part des  fondements cryptographiques (Jour 1), on monte vers l'architecture (Jour 2), on compare les deux 

blockchains majeures (Jour 3), on programme des smart contracts (Jour 4), et on construit une application  décentralisée complète (Jour 5). 

| Jour  | Thème central  | Compétence visée  | TP |
| ----- | ----- | ----- | ----- |
| J1  | Fondamentaux & Cryptographie  | Comprendre et implémenter SHA 256, ECDSA, adresses | Hachage Python & PoW |
| J2  | Architecture & Consensus  | Décrire blocs, Merkle, PoW vs PoS  | Mini-blockchain Python |
| J3  | Bitcoin & Ethereum  | Distinguer UTXO / Comptes, Gas,  EVM | MetaMask + Etherscan |
| J4  | Smart Contracts & Solidity  | Écrire, déployer, sécuriser un  contrat | SimpleStorage + ERC-20 |
| J5  | DApps, DeFi, NFTs & Avenir  | Connecter front-end à un contrat  via ethers.js | Mini-DApp ethers.js |

## Modalités d'évaluation détaillées

| Modalité  | Poids  | Quand ?  | Comment ? |
| ----- | ----- | ----- | ----- |
| QCM final  | 50 %  | Fin de la séance  | des questions transversales sur tout le cours |
| Mini-projet GitHub  | 50 %  | J+14 après la fin du   module | Smart contract + DApp + README + vidéo  démo ≤ 3 min |

| ⚠![][image2] À propos du mini-projet |
| :---- |
| Le projet est en groupe de 5\. Il sera vérifié pour détecter les copies directes. |
| L'utilisation d'outils d'IA (GitHub Copilot, Claude, ChatGPT) est autorisée à condition |
| que vous compreniez et puissiez expliquer chaque ligne de code que vous rendez. |

## Compétences attendues en sortie

À la fin de ce module, vous devrez être capable d'accomplir les tâches suivantes de manière autonome. Ces  compétences correspondent à ce que le marché du travail attend d'un développeur junior Web3. 

**Compétences techniques** 

- Expliquer le fonctionnement du hachage SHA-256 et ses 4 propriétés fondamentales.
- Décrire la structure interne d'un bloc Bitcoin (en-tête + corps) et le mécanisme de chaînage.
- Comparer le modèle UTXO (Bitcoin) et le modèle de comptes (Ethereum) avec des exemples concrets.
- Écrire un smart contract Solidity complet avec variables d'état, fonctions, modifiers et events.
- Déployer un contrat sur Sepolia depuis Remix IDE et interagir avec lui via MetaMask.
- Construire une DApp minimale en HTML/JS avec ethers.js qui lit et écrit dans un contrat.

**Compétences analytiques** 

- Lire et interpréter une transaction sur un block explorer (Etherscan).

- Identifier les vulnérabilités classiques dans un smart contract (reentrancy, overflow, tx.origin).
- Évaluer la pertinence d'une solution blockchain pour un cas d'usage donné.

- Distinguer Layer 1, Layer 2 et les différents mécanismes de consensus.

## Prérequis du module

Ce module ne nécessite aucune connaissance préalable en blockchain. En revanche, les prérequis suivants  sont importants pour profiter pleinement des travaux pratiques. 

| Prérequis  | Niveau attendu  | Où l'utilise-t-on ? |
| ----- | ----- | ----- |
| Python de base  | Notions : fonctions,   boucles, listes, dict | TP1 (SHA-256), TP2 (mini-blockchain) |
| JavaScript de base  | Notions : fonctions   async/await, DOM, fetch | TP5 (DApp ethers.js) |
| Git & GitHub  | Créer un repo, commit,  push | Mini-projet (rendu GitHub) |
| Ligne de commande  | Lancer des commandes  Python, Node.js | Tous les TP |
| Algorithmique basique  | Arbres, boucles, hash  maps | J1, J2 (Merkle, hachage) |

| ✓ Aucune connaissance blockchain requise |
| :---- |
| Vous partirez de zéro sur la blockchain. Chaque concept sera introduit progressivement, |
| avec des analogies du monde réel, avant d'être formalisé mathématiquement. |
| Si vous avez déjà entendu parler de Bitcoin ou Ethereum, c'est un plus — mais pas une obligation. |

## Ressources clés à avoir sous la main

Ces ressources sont gratuites et vous serviront pendant et après le cours.

| Ressource  | URL  | Usage dans ce cours |
| ----- | ----- | ----- |
| Remix IDE  | remix.ethereum.org  | J4 et J5 : écriture et déploiement des contrats  Solidity |
| Etherscan Sepolia  | sepolia.etherscan.io  | J3, J4, J5 : explorer les transactions et contrats |
| Blockchain Demo  | andersbrownworth.com/blockchain  | J1, J2 : comprendre visuellement le hachage et  le chaînage |
| Solidity Docs  | docs.soliditylang.org  | J4 : référence complète du langage Solidity |

| Ressource  | URL  | Usage dans ce cours |
| ----- | ----- | ----- |
| OpenZeppelin Docs  | docs.openzeppelin.com  | J4, J5 : contrats sécurisés prêts à l'emploi |
| ethers.js Docs v6  | docs.ethers.org  | J5 : API complète pour interagir avec Ethereum |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>