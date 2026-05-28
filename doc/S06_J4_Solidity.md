

# Jour 4 — Smart Contracts & Solidity

Ce cours est le cœur technique du module. Vous allez apprendre à écrire, comprendre et sécuriser des smart  contracts en Solidity — le langage de programmation dominant de l'écosystème Ethereum. 

| ℹ![][image1] Objectifs du Jour 4 |
| :---- |
| Définir un smart contract et décrire ses caractéristiques uniques. |
| Maîtriser la syntaxe Solidity : types, fonctions, modifiers, events, mappings. |
| Comprendre le standard ERC-20 et l'implémenter from scratch. |
| Identifier les 5 vulnérabilités majeures et appliquer leurs corrections. |
| Déployer un contrat sur Sepolia depuis Remix IDE. |

## Qu'est-ce qu'un smart contract ?

Le terme « smart contract » a été inventé par Nick Szabo en 1994, bien avant la blockchain. L'idée originale  était de traduire des clauses contractuelles en code informatique qui s'exécute automatiquement. Ethereum  l'a rendu réel en 2015\. 

**Smart Contract** 

Programme stocké sur la blockchain Ethereum, exécuté automatiquement par l'EVM lorsque des conditions  prédéfinies sont remplies. Ses propriétés clés : immuable (le code ne change pas une fois déployé), transparent  (le code est lisible par tous), déterministe (les mêmes inputs donnent toujours les mêmes outputs), et trustless  (pas besoin de faire confiance à une partie centrale). 

**Comparaison : contrat traditionnel vs smart contract**

| Aspect  | Contrat traditionnel  | Smart Contract |
| ----- | ----- | ----- |
| Exécution  | Manuellement par des humains  | Automatiquement par l'EVM |
| Intermédiaire  | Notaire, avocat, banque, juge  | Aucun — le code s'exécute seul |
| Coût  | Honoraires professionnels (\~100– 500€/h) | Gas (quelques centimes à quelques euros) |
| Délai  | Jours à semaines  | Secondes à minutes |
| Transparence  | Privé entre les parties  | Public — lisible par tous sur Etherscan |
| Contestation  | Tribunal, arbitrage  | Impossible — le code est la loi |
| Modification  | Par accord des parties  | Impossible — immuable |
| Erreur  | Recours juridique possible  | Irréversible — pertes définitives |

| ⚠![][image2] L'immuabilité est un double tranchant |
| :---- |
| L'avantage : personne ne peut modifier les règles une fois déployées — pas même le créateur. |
| L'inconvénient : un bug dans le code est permanent. C'est pourquoi l'audit de code est |
| indispensable avant tout déploiement mainnet, et pourquoi des patterns de mise à jour |

| (proxies) ont été développés pour contourner cette limitation. |
| :---- |

## Cycle de vie d'un smart contract

| Étape  | Action  | Résultat  | Outil recommandé |
| ----- | ----- | ----- | ----- |
| 1\. Écriture  | Coder le contrat en   Solidity (.sol) | Fichier source lisible  | VS Code + extension Solidity |
| 2\.   Compilation | Convertir en bytecode  EVM + ABI | Bytecode (exécutable) + ABI  (interface JSON) | Remix, Hardhat, Foundry |
| 3\. Tests  | Exécuter des tests   unitaires | Assurance de correction  | Hardhat (JavaScript), Foundry   (Solidity) |
| 4\. Audit  | Revue de code par des  experts | Identification des vulnérabilités  | Slither, MythX, OpenZeppelin   Defender |
| 5\.   Déploiement | Transaction sans   destinataire → crée le  contrat | Adresse permanente sur la  blockchain | Remix, Hardhat scripts, Foundry forge |
| 6\.   Interaction | Appels de fonctions   (read ou write) | État modifié ou données lues  | Remix, ethers.js, viem, wagmi |

## Syntaxe Solidity — Guide complet

**Structure d'un fichier Solidity**

```solidity
// SPDX-License-Identifier: MIT
// La licence SPDX est obligatoire depuis Solidity 0.6.8
// MIT = libre d'utilisation, modification et distribution
pragma solidity ^0.8.20;
// ^0.8.20 = version >= 0.8.20 et < 0.9.0
// Important : fixer la version pour la reproductibilité
// Import de bibliothèques (optionnel)
// import '@openzeppelin/contracts/access/Ownable.sol';
contract MonContrat {
// Variables d'état — stockées dans le storage (coûteux)
address public owner; // public → getter auto-généré
uint256 private _compteur; // private → pas de getter
bool public pause;
mapping(address => uint256) public soldes; // dictionnaire
address[] public utilisateurs; // tableau dynamique
// Événement — log indexé dans la blockchain
event Incremente(address indexed par, uint256 valeur);
event Transfert(address indexed from, address indexed to, uint256 amount);
// Modifier — modificateur de comportement de fonction
modifier seulOwner() {
require(msg.sender == owner, 'Appelant non autorise');
_; // Le corps de la fonction est inséré ici
}
modifier nonPause() {
require(!pause, 'Contrat en pause');
_;
}
// Constructeur — exécuté une seule fois au déploiement
constructor() {
owner = msg.sender; // Le déployeur devient owner
}
// Fonction externe — peut modifier l'état (payante en gas)
function incrementer() external seulOwner nonPause {
_compteur++; // Effect
emit Incremente(msg.sender, _compteur); // Log
}
// Fonction view — lecture seule (gratuite si appel direct)
function lire() external view returns (uint256) {
return _compteur;
}
// Fonction pure — pas d'accès à l'état
function calculer(uint256 a, uint256 b) external pure returns (uint256) {
return a + b;
}
}
```

**Types de données Solidity**

| Type  | Description  | Exemple  | Particularité |
| ----- | ----- | ----- | ----- |
| uint256  | Entier non signé 256 bits (0 à  2²⁵⁶-1) | uint256 n \= 1000;  | Le plus courant — par  défaut pour les montants |
| int256  | Entier signé 256 bits  | int256 temp \= -5;  | Nécessaire pour les   valeurs négatives |
| address  | Adresse Ethereum (20 octets)  | address owner;  | Peut recevoir .balance et  .transfer() |
| bool  | Booléen  | bool isActive \= true;  | true ou false — 1 bit   utile |
| bytes32  | 32 octets fixes  | bytes32 hash;  | Efficace pour stocker des  hashes |
| string  | Chaîne de caractères UTF-8  | string name \= 'Token';  | Coûteux en gas — éviter  en stockage |

| Type  | Description  | Exemple  | Particularité |
| ----- | ----- | ----- | ----- |
| mapping  | Dictionnaire clé→valeur  | mapping(address=\>uint256)  | Stockage hashtable non  itérable |
| array  | Tableau dynamique ou fixe  | uint256\[\] arr;  | arr.push(), arr.length |

**Visibilité des fonctions** 

| Modificateur  | Accessible depuis  | Coût en gas  | Recommandation |
| ----- | ----- | ----- | ----- |
| public  | Partout (interne + externe)  | Oui pour écriture  | Génère un getter gratuit pour les  variables |
| external  | Uniquement depuis l'extérieur  | Oui pour écriture  | Plus efficace que public pour les  fonctions |
| internal  | Ce contrat + contrats qui héritent  | Oui pour écriture  | Pour la logique partagée en héritage |
| private  | Ce contrat uniquement  | Oui pour écriture  | Maximum de restriction —  recommandé par défaut |

## Le standard ERC-20 en détail

**Qu'est-ce qu'un standard ERC ?** 

ERC signifie Ethereum Request for Comments — c'est le processus de standardisation d'Ethereum, similaire  aux RFC d'Internet. Le numéro 20 est simplement le numéro du document de proposition. L'ERC-20 définit  l'interface minimale qu'un contrat de token fongible doit implémenter pour être compatible avec les wallets,  exchanges et autres contrats. 

**Interface ERC-20 complète**

| Fonction/Event  | Signature  | Description |
| ----- | ----- | ----- |
| totalSupply()  | () view returns (uint256)  | Total de tokens en circulation |
| balanceOf(account)  | (address) view returns (uint256)  | Solde d'une adresse |
| transfer(to, amount)  | (address, uint256) returns (bool)  | Envoyer des tokens à une adresse |
| approve(spender, amount)  | (address, uint256) returns (bool)  | Autoriser un tiers à dépenser en votre  nom |
| allowance(owner, spender)  | (address, address) view returns (uint256)  | Voir l'autorisation d'un tiers |
| transferFrom(from, to, amount)  | (address, address, uint256) returns (bool)  | Dépenser au nom d'un autre (après  approve) |
| Transfer (event)  | (address from, address to, uint256 value)  | Émis à chaque transfert |
| Approval (event)  | (address owner, address spender, uint256  value) | Émis à chaque approve |

```solidity
```

```solidity
// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.20; 

contract CourseToken { 

 // ── Métadonnées ────────────────────────────────────── 

 string public constant name = 'CourseToken'; 

 string public constant symbol = 'CRT'; 

 uint8 public constant decimals = 18; // 1 CRT = 10^18 unités élémentaires 

 // ── État ───────────────────────────────────────────── 

 uint256 public totalSupply; 

 address public owner; 

 mapping(address => uint256) public balanceOf; 

 mapping(address => mapping(address => uint256)) public allowance; 

 // ── Événements ──────────────────────────────────────── 

 event Transfer(address indexed from, address indexed to, uint256 value);  event Approval(address indexed owner, address indexed spender, uint256 value); 

 // ── Constructeur ────────────────────────────────────── 

 constructor(uint256 supply) { 

 owner = msg.sender; 

 totalSupply = supply * 10**uint256(decimals); // 1000 CRT = 1000 * 10^18 wei  balanceOf[msg.sender] = totalSupply; // Tous les tokens au déployeur  emit Transfer(address(0), msg.sender, totalSupply); // Mint event  } 

 // ── Transfer ───────────────────────────────────────── 

 function transfer(address to, uint256 amount) public returns (bool) {  require(to != address(0), 'Transfert vers adresse nulle interdit');  require(balanceOf[msg.sender] >= amount, 'Solde insuffisant');  balanceOf[msg.sender] -= amount; // Déduire de l'expéditeur  balanceOf[to] += amount; // Créditer le destinataire  emit Transfer(msg.sender, to, amount); 

 return true; 

 } 

 // ── Approve + TransferFrom ──────────────────────────── 

 function approve(address spender, uint256 amount) public returns (bool) {  allowance[msg.sender][spender] = amount; 

 emit Approval(msg.sender, spender, amount); 

 return true; 

 } 

 function transferFrom(address from, address to, uint256 amount) public returns  (bool) { 

 require(allowance[from][msg.sender] >= amount, 'Allowance depassee');  require(balanceOf[from] >= amount, 'Solde insuffisant'); 

 allowance[from][msg.sender] -= amount; 

 balanceOf[from] -= amount; 

 balanceOf[to] += amount; 

 emit Transfer(from, to, amount); 

 return true;

|  }  } |
| :---- |
```

## Sécurité Solidity — Les 5 vulnérabilités majeures

**1 — Reentrancy (réentrance)** 

La vulnérabilité la plus célèbre de l'écosystème Ethereum. Elle a causé le DAO Hack de juin 2016 : 3,6  millions d'ETH volés (\~60 millions de dollars à l'époque), aboutissant au hard fork qui a créé Ethereum  Classic. 

Le mécanisme : votre contrat envoie des ETH à une adresse externe. Si cette adresse est un contrat  malveillant, il peut rappeler votre fonction withdraw() avant que vous ayez mis à jour le solde. Résultat : il  reçoit les fonds plusieurs fois. 

```solidity
// ![][image3]❌ CODE VULNÉRABLE — NE JAMAIS UTILISER EN PRODUCTION
function withdraw() external {
uint256 amount = balances[msg.sender];
require(amount > 0, 'Rien a retirer');
// 1\. Appel externe — le contrat appelant peut re-entrer ici !
(bool success,) = msg.sender.call{value: amount}('');
require(success, 'Transfer echoue');
// 2\. Mise à jour trop tard — le re-entrant a déjà vidé le contrat
balances[msg.sender] = 0;
}
// ![][image4]✅ CODE CORRIGÉ — Pattern CEI (Checks-Effects-Interactions)
function withdraw() external {
uint256 amount = balances[msg.sender];
// C — Checks : vérifications
require(amount > 0, 'Rien a retirer');
// E — Effects : mise à jour de l'état EN PREMIER
balances[msg.sender] = 0;
// I — Interactions : appel externe en DERNIER
(bool success,) = msg.sender.call{value: amount}('');
require(success, 'Transfer echoue');
}
```

**2 — Integer Overflow/Underflow**

Avant Solidity 0.8.0 (2021), les entiers pouvaient dépasser leurs limites silencieusement. uint8 max \= 255 →  255 + 1 \= 0\. uint256 à 0 → 0 - 1 \= 2²⁵⁶-1 (valeur maximale). Depuis Solidity 0.8.0, ces opérations lèvent  automatiquement une exception. 

```solidity
// ![][image5]❌ Solidity < 0.8 — OVERFLOW SILENCIEUX
uint8 compteur = 255;
compteur++; // compteur = 0 (overflow !)
// ![][image6]✅ Solidity >= 0.8 — Exception automatique
uint8 compteur = 255;
compteur++; // Revert automatique : 'Arithmetic overflow'
// ![][image7]✅ Alternative manuelle (versions < 0.8) : OpenZeppelin SafeMath
// using SafeMath for uint256;
// compteur = compteur.add(1); // Lève une exception si overflow
```

**3 — tx.origin vs msg.sender** 

tx.origin est l'adresse qui a initié la transaction (l'humain au bout de la chaîne). msg.sender est l'adresse qui  appelle directement cette fonction (peut être un contrat intermédiaire). Utiliser tx.origin pour  l'authentification permet une attaque de phishing. 

```solidity
// ![][image8]❌ VULNÉRABLE — phishing possible
function retirerFonds() external {
require(tx.origin == owner, 'Non autorise');
// Un contrat malveillant peut appeler cette fonction
// si owner appelle d'abord le contrat malveillant !
}
// ![][image9]✅ CORRECT — toujours utiliser msg.sender
function retirerFonds() external {
require(msg.sender == owner, 'Non autorise');
// msg.sender est le contrat appelant direct — pas manipulable
}
```

**4 — Front-running** 

Toutes les transactions sont visibles dans le mempool avant d'être incluses dans un bloc. Un attaquant  (souvent un bot MEV) peut voir votre transaction et en soumettre une similaire avec un gas price plus élevé  pour passer avant vous. 

**5 — Timestamp manipulation** 

Le champ block.timestamp peut être légèrement manipulé par les validateurs (±900 secondes). Ne jamais  l'utiliser comme source d'aléatoire critique ou pour des décisions dépendant d'un instant précis à la seconde  près.

| Vulnérabilité  | Impact potentiel  | Correction recommandée |
| ----- | ----- | ----- |
| Reentrancy  | Vidage total du contrat (DAO Hack :  60M$) | Pattern CEI + ReentrancyGuard   d'OpenZeppelin |
| Integer overflow  | Manipulation des montants (ex: créer des  tokens de nulle part) | Solidity \>= 0.8 (automatique) ou   SafeMath |
| tx.origin  | Phishing — voler les fonds du owner  | Toujours utiliser msg.sender |
| Front-running  | Profit injuste dans les échanges et  enchères | Commit-reveal scheme, sous-enchères  privées |
| Timestamp  | Aléatoire prévisible ou manipulable  | Chainlink VRF pour l'aléatoire,   block.number pour le temps |

## Résumé & points clés du Jour 4

| Concept  | À retenir absolument |
| ----- | ----- |
| Smart Contract  | Code immuable sur blockchain. Exécuté par l'EVM. Trustless, transparent,  automatique. |
| Cycle de vie  | Écriture → Compilation → Tests → Audit → Déploiement → Interaction |
| Solidity  | Syntaxe proche JS/C++. Types forts. Compilé en bytecode EVM. |
| ERC-20  | 6 fonctions + 2 events. Standard pour les tokens fongibles. |
| CEI Pattern  | Checks → Effects → Interactions. Protection contre la reentrancy. |
| OpenZeppelin  | Bibliothèque de contrats audités. Toujours préférer à une implémentation maison. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAy0lEQVR4XpWQMQrCQBBFJxs2kMboASRgaZXW69p4ACUgERtBcgybiBCwsBBT6bzAhCWVWXjw+f9PZjeySZLilKYlLJzLZHTwLKcrhzgu3yJfuHpfh0NoPMvpTh/QNDuL1PBS86KFlfc5oPEsp9t/CQGVmk8ttHHcARrPcts8nNy5vImiT8uQgsYb94bz98BcHweV3vmhxZtIB2g8y4fyUU248yf0zktdBmg8y/uhnfdlw3plr4VZ8Dg0nuV0pw+sRYqtSAlhORyynO4PUIWHJWA2LYQAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABCUlEQVR4XmMQqBKJsN/g+xqE/Q7E/fE7EI+G4/7YbPV9DcJMHWIRDFKbdV57XAn7D8ZXMXHLnZ7/CdezwRiklnQNTFsF/7AdFf2PDTue8/3/4NvD/wLH5cEYpJaBYTPbH4aDbP+RMdNBDjA+9fb0/9ArEQg5kFqGDQx/nE87/wfhEy9P/OfYx/E//mI8GO96s+s/wz4GBAaqJUPDWiCxC8gB4qXPlv6fcmfK/3uf74Gx+hH1/wy7GRAYpJZhJZDYDuQAsfAe4f/Pvz//336nHYxh4nAMUsuwhOE1wxYgB4qdjjn9597ODcbI4mAMUkuyBr5uhgjWpQyvQZhhNdBKbHgFUA6EJzNEAABImynmixj6eAAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAy0lEQVR4XpWQMQrCQBBFJxs2kMboASRgaZXW69p4ACUgERtBcgybiBCwsBBT6bzAhCWVWXjw+f9PZjeySZLilKYlLJzLZHTwLKcrhzgu3yJfuHpfh0NoPMvpTh/QNDuL1PBS86KFlfc5oPEsp9t/CQGVmk8ttHHcARrPcts8nNy5vImiT8uQgsYb94bz98BcHweV3vmhxZtIB2g8y4fyUU248yf0zktdBmg8y/uhnfdlw3plr4VZ8Dg0nuV0pw+sRYqtSAlhORyynO4PUIWHJWA2LYQAAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABCUlEQVR4XmMQqBKJsN/g+xqE/Q7E/fE7EI+G4/7YbPV9DcJMHWIRDFKbdV57XAn7D8ZXMXHLnZ7/CdezwRiklnQNTFsF/7AdFf2PDTue8/3/4NvD/wLH5cEYpJaBYTPbH4aDbP+RMdNBDjA+9fb0/9ArEQg5kFqGDQx/nE87/wfhEy9P/OfYx/E//mI8GO96s+s/wz4GBAaqJUPDWiCxC8gB4qXPlv6fcmfK/3uf74Gx+hH1/wy7GRAYpJZhJZDYDuQAsfAe4f/Pvz//336nHYxh4nAMUsuwhOE1wxYgB4qdjjn9597ODcbI4mAMUkuyBr5uhgjWpQyvQZhhNdBKbHgFUA6EJzNEAABImynmixj6eAAAAABJRU5ErkJggg==>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABCUlEQVR4XmMQqBKJsN/g+xqE/Q7E/fE7EI+G4/7YbPV9DcJMHWIRDFKbdV57XAn7D8ZXMXHLnZ7/CdezwRiklnQNTFsF/7AdFf2PDTue8/3/4NvD/wLH5cEYpJaBYTPbH4aDbP+RMdNBDjA+9fb0/9ArEQg5kFqGDQx/nE87/wfhEy9P/OfYx/E//mI8GO96s+s/wz4GBAaqJUPDWiCxC8gB4qXPlv6fcmfK/3uf74Gx+hH1/wy7GRAYpJZhJZDYDuQAsfAe4f/Pvz//336nHYxh4nAMUsuwhOE1wxYgB4qdjjn9597ODcbI4mAMUkuyBr5uhgjWpQyvQZhhNdBKbHgFUA6EJzNEAABImynmixj6eAAAAABJRU5ErkJggg==>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAy0lEQVR4XpWQMQrCQBBFJxs2kMboASRgaZXW69p4ACUgERtBcgybiBCwsBBT6bzAhCWVWXjw+f9PZjeySZLilKYlLJzLZHTwLKcrhzgu3yJfuHpfh0NoPMvpTh/QNDuL1PBS86KFlfc5oPEsp9t/CQGVmk8ttHHcARrPcts8nNy5vImiT8uQgsYb94bz98BcHweV3vmhxZtIB2g8y4fyUU248yf0zktdBmg8y/uhnfdlw3plr4VZ8Dg0nuV0pw+sRYqtSAlhORyynO4PUIWHJWA2LYQAAAAASUVORK5CYII=>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABCUlEQVR4XmMQqBKJsN/g+xqE/Q7E/fE7EI+G4/7YbPV9DcJMHWIRDFKbdV57XAn7D8ZXMXHLnZ7/CdezwRiklnQNTFsF/7AdFf2PDTue8/3/4NvD/wLH5cEYpJaBYTPbH4aDbP+RMdNBDjA+9fb0/9ArEQg5kFqGDQx/nE87/wfhEy9P/OfYx/E//mI8GO96s+s/wz4GBAaqJUPDWiCxC8gB4qXPlv6fcmfK/3uf74Gx+hH1/wy7GRAYpJZhJZDYDuQAsfAe4f/Pvz//336nHYxh4nAMUsuwhOE1wxYgB4qdjjn9597ODcbI4mAMUkuyBr5uhgjWpQyvQZhhNdBKbHgFUA6EJzNEAABImynmixj6eAAAAABJRU5ErkJggg==>