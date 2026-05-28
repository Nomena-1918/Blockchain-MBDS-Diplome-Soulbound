**GitHub: [https://github.com/Nomena-1918/Blockchain-MBDS-Diplome-Soulbound](https://github.com/Nomena-1918/Blockchain-MBDS-Diplome-Soulbound)**

# Répartition des Rôles

* **Dev 1 - Nomena (Smart Contract) :** Rédige le contrat Solidity (ERC-721 modifié) pour bloquer les transferts et s'assure que la fonction d'émission accepte le hash IPFS.
* **Dev 2 - Mahery (Intégration Web3) :** Gère `ethers.js` dans React pour connecter MetaMask, exécuter l'émission (mint) par l'admin et lire les données du contrat.
* **Dev 3 - Ny Avo (IPFS) :** Intègre l'API d'upload du PDF vers IPFS (ex: via Pinata) depuis le tableau de bord admin.
* **Designers 1 & 2 - Kanto & Francko (Front-end) :** Maquettent les 3 pages (Accueil, Admin, Étudiant) avec la structure React, conçoivent le design du PDF officiel, et montent la vidéo de démonstration de 3 minutes.

# Étapes Pas-à-Pas (Objectif Samedi Soir)

* **Étape 1 : Les Fondations (Jeudi)**
    * *Designers :* Création du design du diplôme et des maquettes de l'application.
    * *Dev 1 :* Code le smart contract avec la logique non-transférable.
    * *Dev 3 :* Prépare le script d'upload IPFS.
    * *Designers 1 & 2***:** Initialise le projet React
* **Étape 2 : Déploiement et Câblage (Jeudi - Vendredi)**
    * *Dev 1 :* Compile et déploie le contrat finalisé sur le testnet Sepolia.
    * *Dev 3 :* Finalise le tableau de bord Admin pour que l'upload IPFS retourne bien le CID (hash).
    * *Dev 2 :* Connecte l'interface React au contrat pour lier le bouton d'émission et la barre de recherche publique.
* **Étape 3 : Finalisation (Vendredi - Samedi)**
    * *Toute l'équipe :* Tests de l'application de bout en bout sur Sepolia.
    * *Designers :* Enregistrement et montage de la démo vidéo.
    * *Devs :* Rédaction du `README.md` avec captures d'écran et liens Etherscan.

**Structure Projet:**

[**Blockchain-MBDS-Diplome-Soulbound**](https://github.com/Nomena-1918/Blockchain-MBDS-Diplome-Soulbound)/  
├── README.md          \# Description, répartition des tâches, liens (démo, Etherscan)  
├── contracts/         \# Le code Solidity de votre diplôme SBT  
├── scripts/           \# Les scripts pour déployer le contrat  
├── test/              \# Les tests unitaires de votre contrat  
├── front/             \# Votre projet React (ex: initié avec Vite ou Next.js)  
│   ├── src/  
│   │   ├── components/\# Vos pages (Accueil, Admin, Étudiant)  
│   │   ├── utils/     \# La logique d'upload vers IPFS (Dev 3\)  
│   │   ├── App.tsx    \# Le cœur de l'interface  
│   │   └── config.ts  \# Fichier critique pour ethers.js (ABI et adresse)  
└── screenshots/       \# Captures d'écran pour agrémenter le README  
