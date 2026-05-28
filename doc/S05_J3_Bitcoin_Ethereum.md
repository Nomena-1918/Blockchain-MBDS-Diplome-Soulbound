

# Jour 3 — Bitcoin & Ethereum

Après avoir posé les fondements cryptographiques et architecturaux, nous allons maintenant étudier les  deux blockchains majeures en détail. Bitcoin et Ethereum ont des philosophies différentes qui se reflètent  dans chaque choix technique. 

| ℹ![][image1] Objectifs du Jour 3 |
| :---- |
| Expliquer le modèle UTXO de Bitcoin avec des exemples de transactions. |
| Comprendre le halving et son impact sur l'offre de Bitcoin. |
| Décrire les 2 types de comptes Ethereum (EOA et Contract Account). |
| Calculer des frais de transaction Ethereum avec le modèle EIP-1559. |
| Créer un wallet MetaMask sur Sepolia et analyser une transaction sur Etherscan. |

## Bitcoin — Le modèle UTXO

**Une idée contre-intuitive : pas de soldes \!** 

La plupart des systèmes financiers stockent des soldes : Alice a 500€ dans son compte. Bitcoin fonctionne  différemment. Il ne stocke jamais de soldes — il stocke des UTXO (Unspent Transaction Outputs), des sorties  de transactions qui n'ont pas encore été dépensées. 

**UTXO — Unspent Transaction Output** 

Une sortie de transaction non dépensée. Chaque UTXO représente un montant de bitcoin appartenant à une  adresse spécifique, verrouillé par un script. Dépenser un UTXO signifie le consommer comme entrée (input)  dans une nouvelle transaction, qui crée de nouveaux UTXOs. 

**Analogie avec les billets de banque** 

Imaginez que Bitcoin n'utilise pas de chèques mais uniquement des billets. Vous ne pouvez pas « utiliser » la  moitié d'un billet — vous devez le dépenser en entier et recevoir de la monnaie en retour.

| ▶![][image2] Exemple complet de transaction UTXO |
| :---- |
| Situation initiale : Alice possède 2 UTXOs : 0.5 BTC (reçu d'une vente) + 0.3 BTC (reçu d'un ami). |
| Alice veut envoyer 0.7 BTC à Bob. |
|  |
| Transaction : |
|  Inputs : UTXO_1 (0.5 BTC) + UTXO_2 (0.3 BTC) \= 0.8 BTC total |
|  Outputs : UTXO_nouveau_1 (0.7 BTC → adresse de Bob) |
|  UTXO_nouveau_2 (0.095 BTC → adresse d'Alice, monnaie de retour) |
|  Frais mineurs \= 0.005 BTC (inputs - outputs) |
|  |
| Après la transaction : |
|  Alice : 1 UTXO de 0.095 BTC |
|  Bob : 1 UTXO de 0.7 BTC |
|  Les 2 UTXOs initiaux d'Alice sont DÉTRUITS (marqués spent). |

**Pourquoi ce modèle est intéressant ?**   

- Validation parallèle : les UTXOs sont indépendants les uns des autres — un nœud peut valider plusieurs  transactions en parallèle si elles n'utilisent pas les mêmes UTXOs.

- Pas de double dépense possible : un UTXO ne peut être consommé qu'une seule fois. Le réseau rejette  automatiquement une tentative d'utiliser le même UTXO deux fois.

- Confidentialité partielle : en changeant d'adresse à chaque transaction, un utilisateur peut compliquer le  traçage de ses UTXOs.

- Stateless : chaque nœud n'a besoin que de l'ensemble des UTXOs non dépensés (UTXO Set) — pas de  l'historique complet.

## Bitcoin — Concepts avancés

**Bitcoin Script — le langage de verrouillage** 

Chaque UTXO est verrouillé par un script Bitcoin (Locking Script ou scriptPubKey). Pour le dépenser, le  destinataire doit fournir un script déverrouillant (scriptSig ou Witness) qui satisfait le script de verrouillage. 

| Type de script  | Description  | Utilisation |
| ----- | ----- | ----- |
| P2PKH (Pay to Public Key Hash)  | Le plus classique — verrouillé avec le hash  de la clé publique | Transactions simples entre 2 wallets |
| P2SH (Pay to Script Hash)  | Permet des conditions complexes   (multisig, timelocks) | Comptes multi-signatures (3 clés sur  5\) |
| P2WPKH (SegWit natif)  | Version efficace de P2PKH — signature  séparée du corps | Transactions modernes depuis 2017 |
| P2TR (Taproot)  | Dernière évolution — combine scripts  complexes visuellement simples | Smart contracts légers sur Bitcoin |

**Le Halving — modèle déflationniste** 

Bitcoin a un modèle d'émission monétaire radicalement différent des monnaies fiat. La quantité totale de  bitcoins est plafonnée à 21 millions, et le rythme d'émission est divisé par deux tous les 210 000 blocs (\~4  ans). C'est le halving.

| Période  | Récompense   de bloc | Date approx.  | Bitcoins créés |
| ----- | ----- | ----- | ----- |
| Genèse → 1er halving  | 50 BTC  | 2009–2012  | 10 500 000 BTC |
| 1er → 2ème halving  | 25 BTC  | 2012–2016  | 5 250 000 BTC |
| 2ème → 3ème halving  | 12.5 BTC  | 2016–2020  | 2 625 000 BTC |
| 3ème → 4ème halving  | 6.25 BTC  | 2020–2024  | 1 312 500 BTC |
| 4ème → 5ème halving  | 3.125 BTC  | 2024–2028  | 656 250 BTC |

| Période  | Récompense   de bloc | Date approx.  | Bitcoins créés |
| ----- | ----- | ----- | ----- |
| …  | …  | …  | … |
| Après 2140  | 0 BTC  | \~2140  | Limite à 21 M BTC |

En pratique, \~19,7 millions de BTC ont déjà été minés (93% du total). Les derniers bitcoins seront minés vers  l'an 2140\. À ce stade, les mineurs ne seront rémunérés que par les frais de transaction. 

**Lightning Network — paiements instantanés hors chaîne** 

Le temps de bloc de 10 minutes est incompatible avec des paiements quotidiens (payer un café). Le  Lightning Network résout ce problème via des canaux de paiement bidirectionnels off-chain. 

# 

# 

# 

| ![][image3] Lightning en 2026 |
| :---- |
| Le Lightning Network compte plus de 70 000 nœuds actifs et 5 000 BTC de capacité. |
| El Salvador l'utilise comme infrastructure de paiement nationale. |
| Des applications comme Strike, Phoenix et Breez permettent des paiements en quelques millisecondes. |

## Ethereum — Une plateforme programmable

**La différence fondamentale avec Bitcoin** 

Vitalik Buterin avait 17 ans quand il a commencé à contribuer à Bitcoin. En 2013, il publie un whitepaper  proposant une blockchain générale — non pas conçue pour une application spécifique (la monnaie), mais  pour exécuter n'importe quel programme informatique. Ethereum est née de cette idée. 

*"Ethereum est un ordinateur mondial — un ordinateur infalsifiable dont personne ne peut couper  l'alimentation."* 

**Le modèle de comptes d'Ethereum** 

Contrairement à Bitcoin qui ne stocke que des UTXOs, Ethereum maintient un état global — une base de  données de tous les comptes et leur état courant. Chaque compte a un solde en ETH, un nonce (compteur  de transactions), et potentiellement du code et un stockage.

| Caractéristique  | EOA (Externally Owned Account)  | Contract Account |
| ----- | ----- | ----- |
| Contrôlé par  | Une clé privée (humain ou bot)  | Son code Solidity |
| Code ?  | Non — pas de logique embarquée  | Oui — logique immuable déployée |
| Peut initier une tx ?  | Oui — seul type pouvant initier  | Non — réagit aux appels entrants |
| Possède un solde ETH ?  | Oui  | Oui |
| Possède un stockage ?  | Non  | Oui — variables d'état persistantes |
| Nonce  | Compteur de transactions   envoyées | Compteur de contrats créés |
| Exemple  | MetaMask, Ledger, portefeuille  papier | Contrat ERC-20, Uniswap, Aave |

## L'EVM et le Gas

**L'Ethereum Virtual Machine** 

L'EVM est la machine virtuelle qui exécute les smart contracts Ethereum. Elle est Turing-complète — ce qui  signifie qu'elle peut théoriquement exécuter n'importe quel programme. En pratique, la limite est le gas  disponible, qui empêche les programmes infinis. 

**Gas** 

Unité de mesure du coût computationnel d'une opération EVM. Chaque opcode (instruction élémentaire) a un  coût fixe en gas. Le gas force les programmes à être efficaces : plus un contrat est complexe, plus il coûte cher à  exécuter. 

**Exemples de coûts en gas (quelques opcodes)** 

| Opération  | Opcode  | Coût en gas  | Raison |
| ----- | ----- | ----- | ----- |
| Addition  | ADD  | 3 gas  | Opération arithmétique simple |
| Hachage SHA3  | SHA3  | 30 + 6/word gas  | Plus coûteux — cryptographie |
| Lecture du stockage  | SLOAD  | 100–2 100 gas  | Accès disque — coûteux |
| Écriture dans le stockage  | SSTORE  | 2 200–20 000 gas  | Modification persistante — très  coûteux |
| Appel externe  | CALL  | 2 600 gas (minimum)  | Communication inter-contrats |
| Transfer ETH simple  | (transaction)  | 21 000 gas  | Minimum pour toute transaction |

**Modèle de frais EIP-1559 (depuis août 2021\)** 

Avant EIP-1559, les frais Ethereum étaient déterminés par une enchère simple (gas price). Depuis EIP-1559,  le modèle est plus sophistiqué avec une base_fee brûlée et un priority_fee (pourboire) pour le validateur.

```python
```

# Calcul des frais Ethereum selon EIP-1559
# Scénario 1 : Transfer ETH simple
gas_limit = 21_000 # Quantité max de gas autorisée pour la tx
gas_used = 21_000 # Quantité réellement consommée
base_fee = 15 # gwei — déterminé automatiquement par le réseau (brûlé) priority_fee = 2 # gwei — pourboire pour le validateur (vous choisissez)
frais_gwei = gas_used * (base_fee + priority_fee)
frais_eth = frais_gwei / 1e9
```python
print(f'Transfer simple : {frais_gwei:,} gwei = {frais_eth:.6f} ETH') # → Transfer simple : 357,000 gwei = 0.000357 ETH
```

# Scénario 2 : Déploiement d'un smart contract (plus complexe)
gas_deploy = 500_000 # Les déploiements consomment beaucoup plus de gas frais_deploy = gas_deploy * (base_fee + priority_fee) / 1e9
```python
print(f'Déploiement contrat : {frais_deploy:.5f} ETH')
```

# → Déploiement contrat : 0.00850 ETH
# Scénario 3 : ERC-20 transfer (lecture + écriture stockage)
gas_token = 65_000
frais_token = gas_token * (base_fee + priority_fee) / 1e9
```python
print(f'Token transfer : {frais_token:.5f} ETH')
```

# → Token transfer : 0.00111 ETH
Terme
| Rôle
| Qui le reçoit ?
base_fee
| Frais de base — varie automatiquement avec
la congestion du réseau | Brûlé — réduit l'offre d'ETH
priority_fee (tip)
| Pourboire optionnel — incite les validateurs à
prioriser votre tx | Validateur qui inclut votre
transaction
gas_limit
| Quantité max de gas que vous autorisez pour
cette transaction | N/A — paramètre de sécurité
gas_used
| Quantité effectivement consommée — peut
être ≤ gas_limit | N/A — déterminé par l'EVM
Remboursement
| (gas_limit - gas_used) × priority_fee vous est
remboursé | Vous — l'expéditeur
```

```

## Les testnets — développer sans risque

Un testnet est une copie d'Ethereum avec la même technologie mais sans valeur réelle. Les tokens de test  peuvent être obtenus gratuitement via des faucets. Les testnets sont indispensables pour développer et  tester des smart contracts sans mettre en jeu de vrais fonds.

| Testnet  | Mécanisme  | Statut (2026)  | Utilisation |
| ----- | ----- | ----- | ----- |
| Sepolia  | PoS — validateurs autorisés  (PoA-like) | Actif — recommandé  | TP3, TP4, TP5 de ce cours |
| Holesky  | PoS — très grande échelle  (\~1,4M validateurs) | Actif — pour tests de  staking | Infrastructure et validateurs |
| Goerli  | PoS  | Déprécié depuis 2024  | Ne plus utiliser |
| Ropsten/Rinkeby/Kovan  | PoW ou PoA  | Fermés  | Ne plus utiliser |

| ![][image4] Toujours vérifier que vous êtes sur Sepolia |
| :---- |
| Avant toute opération dans MetaMask, vérifiez le réseau affiché (en haut). |
| Sur Sepolia, les ETH n'ont aucune valeur — vous pouvez faire des erreurs sans conséquence. |
| Sur le mainnet Ethereum, chaque erreur coûte de vrais ETH. |

## Résumé & points clés du Jour 3

| Concept  | À retenir absolument |
| ----- | ----- |
| UTXO  | Outputs non dépensés — pas de soldes en Bitcoin. Inputs \= UTXOs détruits, Outputs \=  nouveaux UTXOs. |
| Halving  | ÷2 tous les \~4 ans. 2024 : 3.125 BTC/bloc. Max : 21 millions BTC vers 2140\. |
| EOA  | Compte humain (clé privée). Seul type qui peut initier une transaction. |
| Contract Account  | Compte-programme (code Solidity). Déclenché par appel entrant. |
| Gas  | Coût computationnel EVM. Frais \= gas_used × (base_fee + tip). base_fee brûlée. |
| Sepolia  | Testnet Ethereum pour développer — ETH sans valeur réelle. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABK0lEQVR4XqXM3UvCUBjH8fNn7a/otoSSsLcLI5qIZUWRrHwDa9CLBdUJoqg2ugicEGRREhSBMKPQ8Cb/ie1se+o5a7OEMNjgc3F4ft+RodFZYSF/qKNN5YZtq7d/wvvcxrmOQmJWIHFZaSp3r4DU6ltP3ha7YHFi65KlTx8ArX6pNT6Alp85fHu3btiR6XWVze9XwHUNhsnAtm0Of1Q4u+fw1tlVADsSzR2zRFEDV4nHPz/LsrjHegtS9Op7pwF2weJx6YCJ8gV4DNP8FTuOw9UabVje0/wddiSyWGST+RPwGIbpB/X3NqSpxkVznQ3CjoSTMptYocBJFJ5eWlA4KnP49m9dsCP9YqY5srQDrt1/cLfYBYtD4ZgwPCXpaHBmjfUyEMvqqG8sKXwCLRIziOpoAXYAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>