# Certification Académique Décentralisée — Soulbound Tokens (SBT)

[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.20-blue.svg)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-v6-blueviolet.svg)](https://docs.ethers.org/v6/)
[![IPFS](https://img.shields.io/badge/IPFS-Pinata-green.svg)](https://ipfs.tech/)
[![Network](https://img.shields.io/badge/Network-Sepolia_Testnet-orange.svg)](https://sepolia.etherscan.io/)

Ce dépôt contient le projet de fin de module **MBDS - Blockchain Dev Foundations: Env, Solidity, and DApp Integration** pour l'année universitaire **2025/2026** à l'**IT University Madagascar**. 

L'objectif principal est de concevoir et déployer une solution décentralisée d'émission et de vérification de diplômes académiques infalsifiables et non transférables, appelés **Soulbound Tokens (SBT)** (inspirés de l'EIP-5114).

---

## 📖 Contexte & Problématique

Les diplômes académiques traditionnels sous format papier ou PDF standard sont vulnérables à la falsification et difficiles à vérifier instantanément par des tiers (recruteurs, universités). 

En utilisant les technologies du Web3, ce projet résout ces défis :
1. **Immuabilité** : Le diplôme est ancré à vie sur la blockchain Ethereum (Testnet Sepolia).
2. **Non-transférabilité (Soulbound)** : Une fois émis vers le portefeuille de l'étudiant, le diplôme ne peut plus être transféré ou vendu.
3. **Stockage Décentralisé** : Le document officiel en PDF est stocké sur IPFS (via Pinata) pour assurer sa pérennité sans coût élevé sur la blockchain.
4. **Vérification Instantanée** : N'importe quel recruteur peut insérer l'adresse publique d'un candidat pour vérifier instantanément ses diplômes certifiés sans connexion MetaMask.

---

## 👥 Répartition des Rôles au sein de l'Équipe

Pour mener à bien ce projet d'ici l'échéance de rendu, l'équipe s'est structurée comme suit :

*   **🎓 Nomena (Dev 1 — Smart Contract)** : Rédaction et déploiement du contrat Solidity (ERC-721 modifié pour bloquer les transferts). Il s'assure que la fonction d'émission (`mint`) lie correctement l'adresse publique de l'étudiant et le hash IPFS du diplôme.
*   **🔌 Mahery (Dev 2 — Intégration Web3)** : Gestion de la bibliothèque `ethers.js` dans l'application React. Il s'occupe de la connexion au wallet MetaMask, de la soumission de la transaction d'émission par l'administrateur et de la récupération des données de diplômes en lecture seule.
*   **📦 Ny Avo (Dev 3 — IPFS & Stockage)** : Intégration de l'API d'upload de fichiers vers IPFS (via Pinata) depuis le tableau de bord administrateur afin de retourner de manière sécurisée le CID (hash unique).
*   **🎨 Kanto & Francko (Designers 1 & 2 — Front-end)** : Maquettage de l'interface utilisateur, intégration des pages React sous une charte graphique premium (sombre, moderne, fluide), conception graphique du modèle de diplôme PDF officiel, et réalisation de la vidéo de démonstration.

---

## 🛠️ Spécifications de la DApp React (3 Pages Clés)

L'application front-end est structurée autour de trois espaces distincts :

1.  **🔍 Accueil & Vérification Publique** : 
    *   *Accessibilité* : Libre d'accès, aucun wallet MetaMask requis.
    *   *Fonctionnalité* : Contient une barre de recherche épurée où l'on saisit l'adresse Ethereum de l'étudiant. Si un diplôme existe, elle affiche instantanément le diplôme officiel avec ses métadonnées et un lien sécurisé vers le PDF d'origine sur IPFS.
2.  **🛡️ Tableau de bord Administrateur** : 
    *   *Accessibilité* : Réservé exclusivement à l'administrateur de l'Université (contrôlé par un modifier Solidity `onlyOwner`).
    *   *Fonctionnalité* : Interface de téléversement (drag & drop) du diplôme PDF vers IPFS (via Ny Avo), suivie d'un formulaire pour saisir l'adresse de l'étudiant et émettre le SBT.
3.  **🎓 Mon Espace (Étudiant)** : 
    *   *Accessibilité* : Connexion sécurisée requise via MetaMask.
    *   *Fonctionnalité* : Permet à l'étudiant connecté de visualiser son propre diplôme académique et de copier facilement un lien de partage public pour ses recruteurs.

---

## 📂 Structure du Répertoire

La structure recommandée pour notre dépôt GitHub se présente de la façon suivante :

```text
Blockchain-MBDS-Diplome-Soulbound/
├── README.md          # Présentation globale, répartition et documentation (ce fichier)
├── AGENTS.md          # Guide technique complet et directives de développement pour agents
├── contracts/         # Codes sources Solidity (.sol) des contrats de diplôme SBT
├── scripts/           # Scripts de déploiement Hardhat/Foundry (Sepolia)
├── test/              # Fichiers de tests unitaires (Hardhat/Foundry)
├── front/             # Projet React (généré sous Vite ou Next.js)
│   ├── src/
│   │   ├── components/ # Pages (Accueil/Vérification, Admin, Étudiant)
│   │   ├── utils/      # Logique de téléversement IPFS (via Pinata SDK / API)
│   │   ├── App.tsx     # Cœur de l'application React
│   │   └── config.ts   # Configuration Web3 critique (Adresse du contrat & ABI)
└── screenshots/       # Captures d'écran de l'application et des transactions Sepolia
```

---

## 🎬 Scénario d'Exécution & Gestion IPFS

Voici le scénario utilisateur mis à jour intégrant la gestion essentielle du stockage décentralisé :

### Le scénario complet (avec IPFS) :

1. **Préparation (L'Université)** : L'administrateur téléverse la version PDF du diplôme sur un réseau de stockage décentralisé comme IPFS. IPFS lui retourne un identifiant unique et immuable appelé **hash** ou **CID**.
2. **Émission (L'Université)** : L'administrateur se connecte à l'interface Web3 avec son wallet. Il saisit l'adresse publique de l'étudiant, ses informations, et le fameux hash IPFS, puis déploie le diplôme sur la blockchain.
3. **Réception (L'Étudiant)** : L'étudiant reçoit son diplôme numérique immuable et non-transférable sur son wallet.
4. **Vérification (Le Recruteur)** : Le recruteur se rend sur l'application web, tape l'adresse de l'étudiant, et voit instantanément apparaître le diplôme certifié avec le lien sécurisé vers le PDF original sur IPFS.


---

## 🚀 Guide de Démarrage Rapide (En cours d'initialisation)

*(Ce guide sera complété au fur et à mesure du développement par l'équipe)*

### 1. Cloner le projet
```bash
git clone https://github.com/Nomena-1918/Blockchain-MBDS-Diplome-Soulbound.git
cd Blockchain-MBDS-Diplome-Soulbound
```

### 2. Smart Contracts (Hardhat)
```bash
# Se placer dans le dossier racine ou configurer hardhat
npm install
npx hardhat compile
npx hardhat test
```

### 3. Front-end (React)
```bash
cd front
npm install
npm run dev
```
