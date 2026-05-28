

## TP n°4 — Premier smart contract Solidity

Dans ce TP, vous allez écrire vos premiers smart contracts en Solidity, les compiler et les déployer sur le  testnet Sepolia via Remix IDE. Vous créerez d'abord un contrat de stockage simple, puis un token ERC-20  complet. 

| ℹ![][image1] Prérequis |
| :---- |
| MetaMask installé et configuré sur Sepolia (TP3 complété). |
| Solde MetaMask Sepolia ≥ 0.05 SEP (pour les frais de déploiement). |
| remix.ethereum.org ouvert dans Chrome ou Firefox. |

**Partie 1 — SimpleStorage** 

**Comprendre le contrat avant de le coder** 

SimpleStorage est le 'Hello World' des smart contracts. Il stocke une valeur entière et la protège avec un  mécanisme d'accès : seul le déployeur (owner) peut modifier la valeur. Analysons chaque ligne avant de  l'écrire.

| Ligne de code  | Explication détaillée |
| ----- | ----- |
```solidity
| pragma solidity ^0.8.20;  | Spécifie la version minimale du compilateur. Le ^ signifie 'compatible avec 0.8.20  mais pas 0.9.0'. Important pour la reproductibilité. |
| address public owner;  | Déclare une variable d'état de type address. public génère automatiquement un  getter owner() sans frais de gas si appelé directement. |
| uint256 private _valeur;  | Variable privée par convention (préfixe _). private = pas de getter auto, pas  accessible de l'extérieur. |
| event ValeurModifiee(...)  | Déclare un événement. Les events sont émis dans les logs de transaction — gratuits  à lire, vérifiables historiquement. |
| modifier seulOwner()  | Définit un modificateur réutilisable. Le _ représente l'emplacement du corps de la  fonction modifiée. |
| require(cond, msg)  | Vérifie une condition. Si false → revert toute la transaction + message d'erreur.  Remboursement du gas non consommé. |
| constructor()  | S'exécute une seule fois lors du déploiement. msg.sender = adresse qui déploie le  contrat. |
| emit ValeurModifiee(...)  | Émet l'événement dans les logs de la transaction. Utilisé pour notifier les  applications externes. |

```solidity
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
/// @title SimpleStorage — Contrat de stockage sécurisé
/// @author IT University Madagascar
/// @notice Stocke un entier accessible publiquement, modifiable uniquement par le
owner
contract SimpleStorage {
// ── Variables d'état ─────────────────────────────────
uint256 private _valeur; // La valeur stockée (privée)
address public owner; // Le propriétaire du contrat
// ── Événement ────────────────────────────────────────
/// @notice Émis chaque fois que la valeur est modifiée
event ValeurModifiee(address indexed par, uint256 nouvelleValeur);
// ── Modifier ─────────────────────────────────────────
/// @notice Restreint l'accès au owner uniquement
modifier seulOwner() {
require(
msg.sender == owner,
'SimpleStorage: Seul le owner peut appeler cette fonction'
);
_; // Corps de la fonction modifiée
}
// ── Constructeur ──────────────────────────────────────
/// @notice Le déployeur devient automatiquement le owner
constructor() {
owner = msg.sender;
}
// ── Fonctions d'écriture (coûtent du gas) ────────────
/// @notice Modifie la valeur stockée (owner uniquement)
/// @param nouvelleValeur La nouvelle valeur à stocker
function set(uint256 nouvelleValeur) external seulOwner {
_valeur = nouvelleValeur;
emit ValeurModifiee(msg.sender, nouvelleValeur);
}
// ── Fonctions de lecture (gratuites si appel direct) ──
/// @notice Retourne la valeur actuellement stockée
/// @return La valeur stockée
function get() external view returns (uint256) {
return _valeur;
}
}
```

**Déploiement sur Sepolia — étapes détaillées** 

# 

# 

# 

# 

# 

# 

**Interaction avec le contrat** 

Dans la section 'Deployed Contracts' de Remix, vous voyez les fonctions de votre contrat. Les fonctions  bleues sont des lectures (gratuites). Les fonctions oranges sont des écritures (payantes en gas). 

| Action  | Comment  | Résultat attendu |
| ----- | ----- | ----- |
| Lire la valeur initiale  | Cliquer get() (bouton bleu)  | Retourne 0 (valeur par défaut) |
| Écrire une valeur  | Dans set() → saisir 42 → Transact  (orange) → MetaMask → Confirmer | Transaction envoyée → attendre   confirmation |
| Vérifier la modification  | Cliquer get() après confirmation  | Retourne 42 |
| Tester la restriction  | Depuis un AUTRE compte MetaMask  → appeler set(99) | Revert avec le message d'erreur |
| Voir l'événement  | Etherscan → votre tx → Logs  | ValeurModifiee(from=vous, value=42) |

**Partie 2 — Token ERC-20 (MonToken)** 

**Analyse du contrat** 

Nous allons maintenant créer un vrai token ERC-20. C'est le même mécanisme que USDC, DAI, UNI, LINK — tous des contrats ERC-20 déployés sur Ethereum. La différence : les vrais tokens ont été audités et ont des  milliers de lignes, le nôtre sera minimal mais fonctionnel.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
/// @title CourseToken — Token ERC-20 minimal pour le cours Blockchain /// @author IT University Madagascar
contract CourseToken {
// ── Métadonnées du token ──────────────────────────────
string public constant name = 'CourseToken'; // Nom complet
string public constant symbol = 'CRT'; // Ticker (3-5 lettres)
uint8 public constant decimals = 18; // Standard ERC-20
// decimals=18 signifie : 1 CRT = 10^18 unités élémentaires (comme ETH/wei)
// ── État global ───────────────────────────────────────
```

```solidity
 uint256 public totalSupply; 

 address public owner; 

 // ── Soldes : address → uint256 ──────────────────────── 

 mapping(address => uint256) public balanceOf; 

 // ── Autorisations : owner → (spender → montant) ────── 

 // Permet à des contrats tiers (ex: DEX) de dépenser en votre nom  mapping(address => mapping(address => uint256)) public allowance; 

 // ── Événements obligatoires ERC-20 ─────────────────── 

 event Transfer(address indexed from, address indexed to, uint256 value);  event Approval(address indexed owner, address indexed spender, uint256 value); 

 // ── Constructeur ────────────────────────────────────── 

 /// @param supply Nombre de tokens (sans les décimales) 

 /// @dev 1000 CRT → 1000 * 10^18 unités élémentaires 

 constructor(uint256 supply) { 

 owner = msg.sender; 

 totalSupply = supply * (10 ** uint256(decimals)); 

 balanceOf[msg.sender] = totalSupply; // Tous les tokens au déployeur  emit Transfer(address(0), msg.sender, totalSupply); // Événement de mint  } 

 // ── Transfer ───────────────────────────────────────── 

 function transfer(address to, uint256 amount) public returns (bool) {  require(to != address(0), 'CRT: transfert vers adresse nulle');  require(balanceOf[msg.sender] >= amount, 'CRT: solde insuffisant');  balanceOf[msg.sender] -= amount; 

 balanceOf[to] += amount; 

 emit Transfer(msg.sender, to, amount); 

 return true; 

 } 

 // ── Approve ────────────────────────────────────────── 

 function approve(address spender, uint256 amount) public returns (bool) {  allowance[msg.sender][spender] = amount; 

 emit Approval(msg.sender, spender, amount); 

 return true; 

 } 

 // ── TransferFrom ───────────────────────────────────── 

 function transferFrom(address from, address to, uint256 amount) public returns  (bool) { 

 require(allowance[from][msg.sender] >= amount, 'CRT: allowance depassee');  require(balanceOf[from] >= amount, 'CRT: solde insuffisant');  allowance[from][msg.sender] -= amount; 

 balanceOf[from] -= amount; 

 balanceOf[to] += amount; 

 emit Transfer(from, to, amount); 

 return true; 

 } 

}

```

**Déployer CourseToken avec supply=1000** 

# 

# 

| ⚠![][image2] Attention aux décimales |
| :---- |
| 1 CRT \= 10^18 unités élémentaires (comme 1 ETH \= 10^18 wei). |
| Pour envoyer 100 CRT via Remix, le montant doit être : 100000000000000000000 (100 × 10^18). |
| MetaMask gère cette conversion automatiquement dans son interface. |
| ethers.js utilise ethers.parseUnits('100', 18\) pour faire la conversion. |

**Questions d'analyse** 

1\. Pourquoi la transaction de déploiement coûte-t-elle beaucoup plus de gas qu'un simple transfer ? 2\. Que se passe-t-il si vous appelez transfer() avec un montant supérieur à votre solde ? Où est-ce vérifié ? 

3\. Expliquer le mécanisme approve/transferFrom : à quoi sert-il ? Donnez un exemple d'utilisation réelle  (indice : DEX). 

4\. Pourquoi emit Transfer(address(0), msg.sender, totalSupply) dans le constructeur ? Que représente  address(0) ? 

| ✓ TP 4 réussi si... |
| :---- |
| SimpleStorage répond correctement à set() et get() sur Sepolia. |
| CourseToken est déployé et apparaît dans MetaMask avec 1000 CRT. |
| Un transfer() de CRT à un camarade est visible sur sepolia.etherscan.io. |
| Vous pouvez expliquer pourquoi decimals=18 et comment gérer les montants. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>