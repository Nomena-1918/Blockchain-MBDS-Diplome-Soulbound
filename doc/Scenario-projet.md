Voici le scénario mis à jour avec la gestion essentielle du stockage décentralisé :

**Le scénario complet (avec IPFS) :**

1. **Préparation (L'Université)** : L'administrateur téléverse la version PDF du diplôme sur un réseau de stockage décentralisé comme IPFS 1\. IPFS lui retourne un identifiant unique et immuable appelé "hash" ou CID.
2. **Émission (L'Université)** : L'administrateur se connecte à votre interface Web3 avec son wallet. Il saisit l'adresse publique de l'étudiant, ses informations, et le fameux hash IPFS, puis déploie le diplôme sur la blockchain.
3. **Réception (L'Étudiant)** : L'étudiant reçoit son diplôme numérique immuable et non-transférable sur son wallet.
4. **Vérification (Le Recruteur)** : Le recruteur se rend sur votre application web, tape l'adresse de l'étudiant, et voit instantanément apparaître le diplôme certifié avec le lien sécurisé vers le PDF original sur IPFS.

**Pages React recommandées pour structurer votre DApp :**

* **Page d'Accueil / Vérification publique** : Accessible à tous sans avoir besoin de MetaMask. Elle contient une barre de recherche pour vérifier l'authenticité d'un diplôme à partir d'une adresse.
* **Tableau de bord Administrateur** : Une page réservée au créateur du contrat (l'université). Elle contient la logique d'upload du PDF vers IPFS et le formulaire pour "minter" (émettre) le SBT.
* **Mon Espace (Étudiant)** : Une page où l'utilisateur connecte son wallet avec ethers.js pour visualiser son propre diplôme et récupérer un lien de partage facile.