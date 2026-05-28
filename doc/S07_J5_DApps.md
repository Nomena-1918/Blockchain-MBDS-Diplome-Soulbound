

# Jour 5 — DApps, DeFi, NFTs & Avenir

Ce dernier cours connecte tous les concepts précédents et vous donne une vision d'ensemble de  l'écosystème blockchain en 2026 : les applications décentralisées, la finance décentralisée, les NFTs, les  solutions de scalabilité et la régulation. 

| ℹ![][image1] Objectifs du Jour 5 |
| :---- |
| Décrire les 5 couches d'architecture d'une DApp. |
| Expliquer les mécanismes DeFi : AMM, prêts collatéralisés, stablecoins. |
| Distinguer ERC-721, ERC-1155 et Soulbound Tokens. |
| Expliquer le trilemme blockchain et comment L2 le contourne. |
| Identifier les cadres réglementaires MiCA et nLPD applicables. |

## Architecture d'une DApp

**Qu'est-ce qu'une DApp ?** 

Une DApp (Decentralized Application) est une application dont la logique métier critique est exécutée par  des smart contracts sur la blockchain, plutôt que sur des serveurs centralisés. L'interface utilisateur peut être  classique (React, HTML), mais le backend est décentralisé. 

La différence avec une application web traditionnelle : dans une app web, le backend est contrôlé par une  entreprise qui peut modifier les règles, censurer des utilisateurs ou fermer le service. Dans une DApp, les  règles sont encodées dans un smart contract immuable que personne ne contrôle. 

**Les 5 couches d'une DApp**

| Couche  | Technologie  | Rôle  | Exemple concret |
| ----- | ----- | ----- | ----- |
| Utilisateur / Wallet  | MetaMask,   WalletConnect,   Coinbase Wallet | Signe les transactions, gère les clés  privées | L'utilisateur clique   'Envoyer' →   MetaMask signe la tx |
| Front-end  | React/Next.js +   ethers.js ou viem | Interface utilisateur, communication  avec la blockchain | Le site web que   l'utilisateur voit |
| Smart Contracts  | Solidity, Hardhat,   OpenZeppelin | Logique métier immuable sur   Ethereum | Le code qui gère les  règles du protocole |
| Stockage décentralisé  | IPFS, Arweave  | Fichiers volumineux (images, vidéos,  JSON) | Les métadonnées et  images des NFTs |
| Blockchain L1/L2  | Ethereum, Optimism,  Arbitrum, zkSync | Settlement final et consensus  | Enregistrement   définitif des états |

| ▶![][image2] Exemple : une DApp de vote décentralisé |
| :---- |
| Front-end : site React qui affiche les propositions et un bouton Voter. |
| Wallet : MetaMask signe la transaction vote(propositionId). |
| Smart Contract : le contrat vérifie que l'adresse n'a pas déjà voté, |

|  enregistre le vote et émet un event VoteEnregistre. |
| :---- |
| Blockchain : la transaction est incluse dans un bloc Ethereum. |
| Résultat : le vote est immuable et vérifiable par n'importe qui. |

## DeFi — Finance Décentralisée

**Qu'est-ce que la DeFi ?** 

La DeFi désigne l'ensemble des protocoles financiers construits sur des blockchains publiques, accessibles à  tous, sans KYC, sans intermédiaire. En 2026, plus de 100 milliards de dollars sont immobilisés dans des  protocoles DeFi (TVL — Total Value Locked). 

**Les DEX et les AMM** 

Un DEX (Decentralized Exchange) est un exchange fonctionnant via des smart contracts. Contrairement à un  exchange centralisé (Binance, Coinbase), un DEX ne détient pas vos fonds — vous gardez vos clés privées. Le  modèle dominant est l'AMM (Automated Market Maker). 

**AMM — Automated Market Maker** 

Algorithme de pricing qui détermine automatiquement le prix d'un actif en fonction des réserves dans un pool  de liquidité. Le modèle le plus simple (Uniswap v2) utilise la formule x · y \= k, où x et y sont les réserves des  deux tokens et k est une constante. 

| ▶![][image3] Comment fonctionne un swap Uniswap ? |
| :---- |
| Pool ETH/USDC : 100 ETH + 300 000 USDC. Constante k \= 100 × 300 000 \= 30 000 000\. |
| Alice veut acheter 1 ETH avec des USDC. |
| Après le swap : 99 ETH dans le pool. Pour maintenir k : y_nouveau \= 30 000 000 / 99 ≈ 303 030 USDC. |
| Alice doit fournir : 303 030 - 300 000 \= 3 030 USDC pour 1 ETH. |
| Plus on achète, plus le prix augmente (slippage) — propriété fondamentale de l'AMM. |

**Prêts DeFi — Aave, Compound** 

Les protocoles de prêt DeFi permettent d'emprunter des actifs crypto en déposant un collatéral (sur collatéralisation). Il n'y a pas de vérification de crédit — le collatéral garantit mathématiquement le prêt.

| Étape  | Description |
| ----- | ----- |
| 1\. Dépôt de collatéral  | Alice dépose 1 ETH (\~3 000$) comme collatéral dans Aave |
| 2\. Calcul du LTV  | Loan-to-Value ratio : Aave permet d'emprunter jusqu'à 80% de la valeur du  collatéral |
| 3\. Emprunt  | Alice emprunte 2 000 USDC (67% du collatéral — sous le LTV max) |
| 4\. Utilisation  | Alice utilise les 2 000 USDC pour d'autres investissements |
| 5\. Remboursement  | Alice rembourse 2 000 USDC + intérêts → récupère son ETH |

| Étape  | Description |
| ----- | ----- |
| 6\. Liquidation  | Si la valeur d'ETH chute et le ratio atteint la limite : le collatéral est vendu  automatiquement |

**Stablecoins — types et mécanismes** 

| Type  | Exemple  | Mécanisme  | Risque principal |
| ----- | ----- | ----- | ----- |
| Fiat collatéralisé  | USDC, USDT  | Chaque token est garanti par 1$ en  banque | Centralisé — dépend  de la banque et de   l'émetteur |
| Crypto collatéralisé  | DAI  | Sur-collatéralisé en ETH/WBTC — 150% de garantie | Liquidation si ETH   chute brutalement |
| Algorithmique  | FRAX (hybride)  | Partiellement garanti,   partiellement algorithmique | Risque de spirale   mortelle (cf.   Terra/LUNA 2022\) |

## NFTs — Non-Fungible Tokens

**Fongible vs Non-Fongible** 

Un bien est fongible si chaque unité est identique et interchangeable. Un euro est fongible — peu importe  quel billet de 10€ vous utilisez. Un NFT est non-fongible — chaque token a un identifiant unique (tokenId) et  des propriétés qui le distinguent des autres. 

**ERC-721 — Le standard NFT** 

L'ERC-721 (2018) est le premier standard pour les tokens non-fongibles. Chaque tokenId est unique, non divisible, et appartient à une et une seule adresse. Le contrat maintient un mapping tokenId → owner. 

| Fonction ERC-721  | Signature  | Description |
| ----- | ----- | ----- |
| ownerOf(tokenId)  | (uint256) view returns (address)  | Qui possède ce NFT ? |
| transferFrom(from, to,   tokenId) | (address, address, uint256)  | Transférer un NFT |
| approve(to, tokenId)  | (address, uint256)  | Autoriser un tiers à transférer ce NFT |
| tokenURI(tokenId)  | (uint256) view returns (string)  | URL des métadonnées JSON (image,  attributs) |

**ERC-1155 — Multi-token** 

L'ERC-1155 (2019) permet de gérer plusieurs types de tokens (fongibles et non-fongibles) dans un seul  contrat. C'est le standard dominant dans le gaming — un même contrat peut gérer l'épée légendaire unique  (NFT) et les pièces d'or (fungible).

**Soulbound Tokens (EIP-5114)** 

Proposé par Vitalik Buterin en 2022, un Soulbound Token (SBT) est un NFT non-transférable, lié à une  adresse pour toujours. Il représente des attributs d'identité non-cessibles : diplômes, certifications, badges  de contribution, dossier médical. 

| ▶![][image4] Cas d'usage : diplôme académique Soulbound |
| :---- |
| IT University Madagascar déploie un contrat SBT. |
| À la fin du cours, le contrat mint un SBT pour l'adresse de chaque étudiant. |
| Le SBT contient : nom, date, note, hash IPFS du diplôme PDF. |
| N'importe qui peut vérifier l'authenticité via Etherscan — instantanément, sans frais. |
| Le diplômé ne peut pas le revendre ni le transférer — il lui appartient pour toujours. |

## Scalabilité — Le trilemme blockchain

**Définition du trilemme** 

Le trilemme blockchain (concept popularisé par Vitalik Buterin) stipule qu'une blockchain ne peut  simultanément maximiser que 2 des 3 propriétés suivantes. 

| Propriété  | Définition  | Exemple de blockchain qui la favorise |
| ----- | ----- | ----- |
| Décentralisation  | Aucun acteur ne contrôle le réseau — grande  dispersion des nœuds | Bitcoin (70 000 nœuds), Ethereum (\~600  000 validateurs) |
| Sécurité  | Résistance aux attaques — impossible de  modifier l'historique | Bitcoin PoW, Ethereum PoS avec   slashing |
| Scalabilité  | Haute capacité transactionnelle —  nombreuses TPS à faible coût | Solana (\~65 000 TPS) mais moins  décentralisé |

Ethereum choisit décentralisation + sécurité au détriment de la scalabilité (\~15–30 TPS Layer 1 contre \~65  000 pour Solana). La solution : déporter la scalabilité vers le Layer 2, tout en héritant la sécurité du Layer 1\. 

**Solutions Layer 2**

| Solution  | Exemples  | Mécanisme de sécurité  | Finalité  | TPS   approx. |
| ----- | ----- | ----- | ----- | ----- |
| Optimistic Rollups  | Optimism, Arbitrum  | Fraud proof : 7 jours pour contester  une fraude | \~7 jours pour le  mainnet | \~2 000–4   000 |
| ZK-Rollups  | zkSync Era, StarkNet,  Polygon zkEVM | Preuve zk-SNARK/STARK vérifiée  mathématiquement | Quelques heures  | \~2 000–20   000 |
| State Channels  | Lightning (Bitcoin)  | Règlement final on-chain quand le  canal se ferme | Instantané  | Très élevé |
| Validium  | ImmutableX, StarkEx  | ZK proofs mais données stockées off chain | Très rapide  | \~9 000+ |

**Différence clé : Optimistic vs ZK-Rollups** 

Les Optimistic Rollups supposent par défaut que toutes les transactions sont valides (optimisme) et  permettent à quiconque de soumettre une preuve de fraude pendant une fenêtre de 7 jours. Les ZK-Rollups  soumettent mathématiquement une preuve cryptographique que toutes les transactions sont valides — pas  besoin de fenêtre de contestation. 

| ![][image5] Quel L2 choisir en 2026 pour votre projet ? |
| :---- |
| Déploiement simple, large adoption : Arbitrum One ou Optimism (EVM identique à Ethereum). |
| Performance maximale : zkSync Era (compatibilité EVM presque complète). |
| Gaming / NFTs : ImmutableX (Validium, frais quasi nuls). |
| Toujours vérifier la compatibilité de votre stack (ethers.js, Hardhat) avec le L2 cible. |

## Régulation et enjeux sociétaux

**MiCA — Le cadre européen** 

Le règlement MiCA (Markets in Crypto-Assets), entré en vigueur en 2024, est le premier cadre réglementaire  complet pour les crypto-actifs dans l'Union Européenne. Il s'applique aux émetteurs de tokens, aux  exchanges centralisés (CEX) et aux prestataires de services crypto. 

| Catégorie MiCA  | Ce qui est régulé  | Obligations principales |
| ----- | ----- | ----- |
| Stablecoins (ART/EMT)  | Tokens référencés à un actif ou à  une monnaie électronique | Réserves, liquidité, plafonds d'émission |
| Exchanges (CASP)  | Plateformes d'échange centralisées  | Licence, fonds propres, protection des clients |
| Émetteurs de tokens  | ICOs, token sales publics  | Livre blanc, responsabilité civile |
| DeFi  | Exempté provisoirement — en  cours d'évaluation | À surveiller — extension possible en 2026–2027 |

**nLPD — La loi suisse sur la protection des données** 

La nouvelle Loi fédérale sur la Protection des Données (nLPD), entrée en vigueur en septembre 2023 en  Suisse, s'applique aux projets blockchain qui collectent ou traitent des données personnelles identifiables  (PII). Sur une blockchain publique, l'immuabilité entre en tension directe avec le droit à l'effacement du  RGPD/nLPD. 

| ⚠![][image6] Tension nLPD / Blockchain |
| :---- |
| Problème : une blockchain publique est immuable — impossible d'effacer une donnée. |
| Solution 1 : ne stocker que des hashes on-chain, données réelles off-chain (IPFS + chiffrement). |
| Solution 2 : utiliser une blockchain privée ou permissionnée (Hyperledger Fabric). |
| Solution 3 : technologies de preuve à divulgation nulle (ZK proofs) pour la confidentialité. |

**Enjeux environnementaux**

| Blockchain  | Mécanisme  | Consommation estimée  2026 | Comparaison |
| ----- | ----- | ----- | ----- |
| Bitcoin  | PoW  | \~120 TWh/an  | \~Argentine ou Pays-Bas entier |
| Ethereum  | PoS (post-Merge   2022\) | \~0.01 TWh/an  | Soit −99,95% vs l'ancien Ethereum  PoW |
| Solana  | PoH + PoS  | Très faible  | Négligeable |
| Réseaux L2  | Héritent du L1  | Fraction du L1  | Optimisation supplémentaire |

## Résumé global du module

| Jour  | Concept clé  | Ce que vous savez faire maintenant |
| ----- | ----- | ----- |
| J1  | Cryptographie  | Expliquer SHA-256, ECDSA, dériver une adresse |
| J2  | Architecture  | Décrire un bloc, un arbre de Merkle, PoW vs PoS |
| J3  | BTC & ETH  | Distinguer UTXO/Comptes, calculer des frais gas |
| J4  | Solidity  | Écrire, déployer et sécuriser un smart contract ERC-20 |
| J5  | DApps & Avenir  | Connecter un front-end ethers.js à un contrat Sepolia |
| Projet  | Intégration  | Smart contract + DApp + GitHub + démo vidéo |

| ![][image7] La suite logique après ce module |
| :---- |
| Cyfrin Updraft (updraft.cyfrin.io) — cours Solidity avancé + Foundry, gratuit. |
| Speed Run Ethereum (speedrunethereum.com) — challenges pratiques progressifs. |
| Contribute à un projet open-source : OpenZeppelin, Hardhat, ethers.js. |
| Préparer la certification Ethereum Developer de l'Ethereum Foundation. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABK0lEQVR4XqXM3UvCUBjH8fNn7a/otoSSsLcLI5qIZUWRrHwDa9CLBdUJoqg2ugicEGRREhSBMKPQ8Cb/ie1se+o5a7OEMNjgc3F4ft+RodFZYSF/qKNN5YZtq7d/wvvcxrmOQmJWIHFZaSp3r4DU6ltP3ha7YHFi65KlTx8ArX6pNT6Alp85fHu3btiR6XWVze9XwHUNhsnAtm0Of1Q4u+fw1tlVADsSzR2zRFEDV4nHPz/LsrjHegtS9Op7pwF2weJx6YCJ8gV4DNP8FTuOw9UabVje0/wddiSyWGST+RPwGIbpB/X3NqSpxkVznQ3CjoSTMptYocBJFJ5eWlA4KnP49m9dsCP9YqY5srQDrt1/cLfYBYtD4ZgwPCXpaHBmjfUyEMvqqG8sKXwCLRIziOpoAXYAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABK0lEQVR4XqXM3UvCUBjH8fNn7a/otoSSsLcLI5qIZUWRrHwDa9CLBdUJoqg2ugicEGRREhSBMKPQ8Cb/ie1se+o5a7OEMNjgc3F4ft+RodFZYSF/qKNN5YZtq7d/wvvcxrmOQmJWIHFZaSp3r4DU6ltP3ha7YHFi65KlTx8ArX6pNT6Alp85fHu3btiR6XWVze9XwHUNhsnAtm0Of1Q4u+fw1tlVADsSzR2zRFEDV4nHPz/LsrjHegtS9Op7pwF2weJx6YCJ8gV4DNP8FTuOw9UabVje0/wddiSyWGST+RPwGIbpB/X3NqSpxkVznQ3CjoSTMptYocBJFJ5eWlA4KnP49m9dsCP9YqY5srQDrt1/cLfYBYtD4ZgwPCXpaHBmjfUyEMvqqG8sKXwCLRIziOpoAXYAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABK0lEQVR4XqXM3UvCUBjH8fNn7a/otoSSsLcLI5qIZUWRrHwDa9CLBdUJoqg2ugicEGRREhSBMKPQ8Cb/ie1se+o5a7OEMNjgc3F4ft+RodFZYSF/qKNN5YZtq7d/wvvcxrmOQmJWIHFZaSp3r4DU6ltP3ha7YHFi65KlTx8ArX6pNT6Alp85fHu3btiR6XWVze9XwHUNhsnAtm0Of1Q4u+fw1tlVADsSzR2zRFEDV4nHPz/LsrjHegtS9Op7pwF2weJx6YCJ8gV4DNP8FTuOw9UabVje0/wddiSyWGST+RPwGIbpB/X3NqSpxkVznQ3CjoSTMptYocBJFJ5eWlA4KnP49m9dsCP9YqY5srQDrt1/cLfYBYtD4ZgwPCXpaHBmjfUyEMvqqG8sKXwCLRIziOpoAXYAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>