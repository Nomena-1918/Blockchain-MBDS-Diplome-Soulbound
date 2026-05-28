

# Jour 1 — Fondamentaux & Cryptographie

Ce premier cours pose les fondations mathématiques et cryptographiques sur lesquelles repose toute la  blockchain. Sans comprendre le hachage et la signature numérique, il est impossible de comprendre  vraiment pourquoi la blockchain est sécurisée. 

| ℹ![][image1] Objectifs du Jour 1 |
| :---- |
| Retracer les événements clés qui ont conduit à l'invention de Bitcoin. |
| Expliquer les 4 propriétés d'une fonction de hachage cryptographique (SHA-256). |
| Calculer des hashes en Python et observer l'effet d'avalanche. |
| Décrire la cryptographie asymétrique ECDSA et la dérivation d'une adresse Ethereum. |
| Comprendre le problème fondamental résolu par Satoshi Nakamoto. |

## Histoire : 30 ans de recherches avant Bitcoin

Bitcoin n'est pas sorti de nulle part en 2008\. Il est la synthèse de trois décennies de recherches en  cryptographie, systèmes distribués et monnaie numérique. Comprendre cette histoire permet de  comprendre pourquoi Bitcoin est conçu comme il l'est. 

**Les précurseurs (1991–2004)** 

| Année  | Acteur  | Contribution  | Lien avec Bitcoin |
| ----- | ----- | ----- | ----- |
| 1991  | Haber & Stornetta  | Premier système de chaînage de   documents horodatés par hash | Concept fondateur du chaînage  de blocs |
| 1993  | Cynthia Dwork & Moni  Naor | Preuve de travail computationnel pour  lutter contre le spam | Précurseur du mécanisme PoW |
| 1997  | Adam Back  | Hashcash : PoW appliqué aux emails — le  spam coûte du calcul | Bitcoin cite directement Hashcash |
| 1998  | Wei Dai  | b-money : registre distribué pseudonyme,  sans tiers de confiance | Satoshi a cité b-money dans son  whitepaper |
| 2004  | Hal Finney  | RPOW : premiers tokens numériques  basés sur PoW, réutilisables | Premier utilisateur de Bitcoin en  2009 |

**Le problème fondamental : la double dépense** 

Avant Bitcoin, créer une monnaie numérique sans banque centrale se heurtait à un obstacle insurmontable :  le problème de la double dépense.

| ▶![][image2] Illustration du problème |
| :---- |
| Alice possède un token numérique valant 10€. Elle envoie ce token à Bob. |
| Mais un fichier numérique peut être copié à l'infini — rien n'empêche Alice |
| d'envoyer le même token simultanément à Bob ET à Carol. |
| Qui est le vrai propriétaire ? Sans banque centrale pour tenir un registre officiel, |

| impossible de répondre. C'est LE problème que Bitcoin résout. |
| :---- |

**La solution Satoshi Nakamoto (2008)** 

Le 31 octobre 2008, une personne ou un groupe sous le pseudonyme Satoshi Nakamoto publie sur une liste  de diffusion cryptographique un document de 9 pages intitulé « Bitcoin: A Peer-to-Peer Electronic Cash  System ». Ce whitepaper décrit une solution élégante au problème de la double dépense. 

*"A purely peer-to-peer version of electronic cash would allow online payments to be sent directly  from one party to another without going through a financial institution."* 

La solution repose sur trois idées combinées : un registre public et partagé (la blockchain), un mécanisme de  consensus par preuve de travail (PoW), et une règle simple — la chaîne la plus longue est la vraie. Ensemble,  ces trois idées rendent la double dépense computationnellement infaisable. 

| Date  | Événement |
| ----- | ----- |
| 3 janvier 2009  | Bloc Genesis miné par Satoshi. Récompense : 50 BTC. Le texte 'The Times 03/Jan/2009  Chancellor on brink of second bailout for banks' est inscrit dedans. |
| 12 janvier 2009  | Première transaction Bitcoin : Satoshi envoie 10 BTC à Hal Finney. |
| 2010  | Première transaction commerciale : Laszlo Hanyecz achète 2 pizzas pour 10 000 BTC. |
| 2011  | Satoshi Nakamoto disparaît. Responsabilité du réseau transmise à la communauté. |
| 2015  | Ethereum lancé par Vitalik Buterin — blockchain avec smart contracts Turing-complets. |
| 2022  | The Merge (15 septembre) — Ethereum passe de PoW à PoS. Consommation −99,95%. |

## Le hachage cryptographique — SHA-256

**Définition formelle** 

Une fonction de hachage cryptographique est une fonction mathématique qui prend une entrée de taille  arbitraire et produit une sortie de taille fixe, appelée hash, digest ou empreinte. Elle doit satisfaire des  propriétés de sécurité précises. 

**SHA-256** 

Secure Hash Algorithm 256 bits. Produit une empreinte de 256 bits \= 32 octets \= 64 caractères hexadécimaux.  Conçu par la NSA en 2001, standardisé par le NIST. Utilisé par Bitcoin pour hacher les blocs et les transactions,  et par Ethereum comme primitive de base. 

**Les 4 propriétés fondamentales** 

Pour qu'une fonction de hachage soit dite « cryptographique », elle doit satisfaire ces 4 propriétés. Ce sont  ces propriétés — et non l'algorithme lui-même — qui fondent la sécurité de la blockchain.

**Propriété 1 — Déterminisme** 

La même entrée produit toujours exactement la même sortie. Cette propriété est triviale pour un  algorithme, mais fondamentale pour la blockchain : tous les nœuds du réseau doivent calculer le même hash  pour les mêmes données. 

```python
import hashlib
def sha256(texte: str) -> str:
return hashlib.sha256(texte.encode('utf-8')).hexdigest()
```

# Déterminisme : appeler 100 fois → toujours le même résultat
```python
print(sha256('Bonjour')) # 5e4b3ef2d8c71b2a1a9e65b4a3f8c0d1...
print(sha256('Bonjour')) # Identique — toujours
print(sha256('Bonjour')) # Identique — toujours
```

**Propriété 2 — Effet d'avalanche** 

Un changement infime dans l'entrée — même un seul bit — produit un hash radicalement différent. En  pratique, environ 50% des bits de la sortie changent. Cette propriété est essentielle pour l'intégrité des  données : il est impossible de modifier subtilement un document en espérant un hash similaire. 

```python
```

# Effet d'avalanche : 1 caractère de différence → hash totalement différent print(sha256('Bonjour')) # 5e4b3ef2...
```python
print(sha256('bonjour')) # a7f3d8c2... (minuscule → tout change)
print(sha256('Bonjour ')) # d1c8e912... (espace en fin → tout change) print(sha256('Bonjou r')) # f4a2b891... (espace au milieu → tout change)
```

# Mesurer l'effet d'avalanche
```python
def comparer(a, b):
ha, hb = sha256(a), sha256(b)
diff = sum(1 for x, y in zip(ha, hb) if x != y)
print(f'{a!r:20} vs {b!r:20} → {diff}/64 chars différents ({diff/64*100:.0f}%)')
comparer('Bonjour', 'bonjour') # \~32/64 (\~50%)
comparer('1000', '1001') # \~31/64 (\~48%)
comparer('abc', 'abd') # \~30/64 (\~47%)
```

**Propriété 3 — Unidirectionnalité (résistance à la préimage)** 

Connaître le hash H(x) ne permet pas de retrouver x. La fonction est un sens unique. La seule approche pour  « casser » cette propriété serait d'essayer toutes les entrées possibles (attaque par force brute), ce qui est  computationnellement infaisable pour SHA-256 (2²⁵⁶ possibilités).

| ▶![][image3] Pour visualiser 2²⁵⁶ |
| :---- |
| Il y a environ 10⁸⁰ atomes dans l'univers observable. |
| 2²⁵⁶ ≈ 1,16 × 10⁷⁷ — du même ordre de grandeur. |
| Même avec tous les ordinateurs du monde actuels, tester toutes les entrées SHA-256 |
| prendrait un temps astronomiquement plus long que l'âge de l'univers. |

**Propriété 4 — Résistance aux collisions** 

Il est computationnellement impossible de trouver deux entrées distinctes x et y telles que SHA256(x) =  SHA256(y). Des collisions existent mathématiquement (le domaine de sortie est fini), mais les trouver  délibérément est infaisable. Note : SHA-1 a été cassé en 2017 — c'est pourquoi Bitcoin utilise SHA-256,  beaucoup plus robuste. 

| Propriété  | Attaque ciblée  | Complexité  | Sécurité pratique |
| ----- | ----- | ----- | ----- |
| Déterminisme  | Prévisibilité  | N/A — propriété   requise | Garantie |
| Effet d'avalanche  | Modification subtile  | Impossible — \~50%  bits changent | Garantie |
| Unidirectionnalité  | Préimage (retrouver x depuis  H(x)) | 2²⁵⁶ opérations  | Infaisable |
| Résistance collisions  | Trouver x≠y avec H(x)=H(y)  | 2¹²⁸ opérations  | Infaisable |

```

```

## Cryptographie asymétrique et ECDSA

**Principe général** 

La cryptographie symétrique utilise la même clé pour chiffrer et déchiffrer — ce qui pose le problème de  l'échange de clé. La cryptographie asymétrique utilise une paire de clés mathématiquement liées : une clé  privée secrète et une clé publique partageable. Ce que l'une fait, seule l'autre peut le défaire. 

**ECDSA — Elliptic Curve Digital Signature Algorithm** 

Algorithme de signature numérique basé sur les courbes elliptiques. Bitcoin et Ethereum utilisent la courbe  secp256k1 — une courbe définie par l'équation y² \= x³ + 7 sur un corps fini. Les opérations sur cette courbe sont  efficaces à calculer dans un sens (multiplication de point) mais infaisables à inverser (logarithme discret  elliptique). 

**La paire de clés : comment ça fonctionne ?** 

| Élément  | Nature  | Comment l'obtenir  | Propriétés de sécurité |
| ----- | ----- | ----- | ----- |
| Clé privée  ![][image4] | 256 bits aléatoires  | Générée aléatoirement par   MetaMask | JAMAIS partagée — qui la   possède contrôle le wallet |
| Clé publique  ![][image5] | Point sur la courbe secp256k1  | Multiplication de la clé privée par  le point générateur G | Partageable — ne révèle pas la  clé privée |
| Adresse Ethereum  ![][image6] | 20 octets (40 hex)  | Keccak256(clé_publique)\[12:\]  | Identifiant public pour recevoir  des fonds |

**Comment fonctionne une signature ?** 

Quand vous envoyez une transaction depuis MetaMask, voici ce qui se passe en coulisse :

# 

# 

# 

# 

# 

La signature prouve que le propriétaire de la clé privée a autorisé la transaction — sans jamais révéler la clé  privée elle-même. C'est l'élément fondamental de la sécurité d'Ethereum. 

**Dérivation de l'adresse Ethereum — étape par étape** 

| Étape  | Opération  | Résultat |
| ----- | ----- | ----- |
| 1\. Clé privée  | 256 bits générés aléatoirement  | Ex: 0x4c0883a69102937d6231471b5dbb6e... |
| 2\. Clé publique  | Multiplication par le point G de secp256k1  | Point (x, y) sur la courbe — 64 octets |
| 3\. Hash   Keccak256 | Keccak256(clé_publique_sans_préfixe)  | Hash de 32 octets |
| 4\. Adresse  | Les 20 derniers octets du hash (40 hex +  préfixe 0x) | Ex: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F |

| ✗ La règle d'or de la sécurité crypto |
| :---- |
| Votre clé privée \= votre identité numérique \= accès total à vos fonds. |
| La clé privée ne peut pas être retrouvée depuis l'adresse publique (unidirectionnalité). |
| La phrase de récupération (12 mots) génère déterministiquement votre clé privée. |
| Qui possède la phrase de récupération possède vos fonds. Pas de recours, pas de récupération. |

## Application : le hachage dans la blockchain

Maintenant que vous comprenez SHA-256, voyons comment il est utilisé concrètement dans Bitcoin et  Ethereum. 

**Dans Bitcoin** 

- Hachage des blocs : chaque en-tête de bloc est haché deux fois (SHA256(SHA256(en-tête))) pour produire  le hash du bloc.

- Preuve de travail : les mineurs cherchent un nonce tel que SHA256(SHA256(en-tête)) commence par N  zéros.

- Arbre de Merkle : les transactions sont hashées par paires jusqu'à obtenir une racine unique.
- Adresses Bitcoin : dérivées via SHA256 + RIPEMD160 de la clé publique.

**Dans Ethereum**

- Keccak256 (variante de SHA-3) est utilisé pour les adresses et les identifiants de fonctions dans l'ABI.
- Le hash d'une transaction identifie celle-ci de manière unique — c'est le TxHash visible sur Etherscan.
- Les event logs sont indexés par hash de la signature de l'événement.

## Résumé & points clés du Jour 1

| Concept  | À retenir absolument |
| ----- | ----- |
| SHA-256  | 64 hex, 256 bits, déterministe, unidirectionnel, effet avalanche, résistant aux collisions |
| Clé privée  | 256 bits aléatoires — JAMAIS partagée — signe les transactions |
| Clé publique  | Dérivée de la clé privée (multiplication ECDSA) — vérifier les signatures |
| Adresse  | Keccak256(clé_publique)\[20 derniers octets\] — recevoir des fonds |
| Double dépense  | Problème fondamental résolu par la blockchain sans tiers de confiance |
| Genesis Block  | 3 janvier 2009 — premier bloc Bitcoin, 50 BTC, The Times inscrit dedans |

| ![][image7] Pour approfondir avant le Jour 2 |
| :---- |
| Faire le TP1 en entier si ce n'est pas déjà fait. |
| Aller sur andersbrownworth.com/blockchain → jouer avec la démonstration interactive. |
| Lire les 2 premières pages du whitepaper Bitcoin (bitcoin.org/bitcoin.pdf). |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABI0lEQVR4XqXMTUsCURTG8fuN/DbRRqioiKJSEiuQIqJESmmGEHshoppqelMQF1P0upCczWwFV+7cFFFBzL3DnDznegcJw8Vc+G3OPP9h0eFkJLm25yDt/J7rFw/iP/g9kTt10GAsHWHx7JlTqtYBlWuNvtQWu3DxYqHCszc2kGsbLLsOeqlGgnsP2LG4VhSpw2eQnsDlAt4/vohx59BNUhsJOza9aYqF3VuQLIrV830fGs0W0S5fOhsJu3DxRPpYzG2XQXE5D+Lu53ke6O0fqB12bHRlX8zkrkD5Gzdbb0Q3H4MNwo4NpfJiMnMCiuty+Pz+IUeVKkxlDNK9Qdix6PwWH189ADTWZlqvENswiLr3gl24eGB23RlZKgBZ3umvs8XuF4nhPz2KccS/AAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABK0lEQVR4XqXM3UvCUBjH8fNn7a/otoSSsLcLI5qIZUWRrHwDa9CLBdUJoqg2ugicEGRREhSBMKPQ8Cb/ie1se+o5a7OEMNjgc3F4ft+RodFZYSF/qKNN5YZtq7d/wvvcxrmOQmJWIHFZaSp3r4DU6ltP3ha7YHFi65KlTx8ArX6pNT6Alp85fHu3btiR6XWVze9XwHUNhsnAtm0Of1Q4u+fw1tlVADsSzR2zRFEDV4nHPz/LsrjHegtS9Op7pwF2weJx6YCJ8gV4DNP8FTuOw9UabVje0/wddiSyWGST+RPwGIbpB/X3NqSpxkVznQ3CjoSTMptYocBJFJ5eWlA4KnP49m9dsCP9YqY5srQDrt1/cLfYBYtD4ZgwPCXpaHBmjfUyEMvqqG8sKXwCLRIziOpoAXYAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABKklEQVR4XmN4c2U7Awa+NMUIjI+Z7Xx1XOPOixPhU0D4zf29nAzPbhxEwS9u7eD/dk37NQh/PSP9/82F7tjXl1cagfCTg3FTSddw7dxeFPzgTEfo+0My/0H49T6Z/y/OlNS9vj4hHIRvbzG6z3Dr3DYU/Ph4bt2jTbL/QfjhZvn/dzfI/7+1TgGML65x28fw7NJ+OH55dYP8rU2m9y4ukP8Pwufmyf8/PVvh//EZ6u9A+Nb+aWakazi+dR7Dhd1T5UEY6K97Z+bK/9/Y79EDwtunBdVtmZEadWj9JCEQPgZUy3D3wlb5MwsM74Hwgam6T7b3Wx29ef6AEAjfvnKaAR0zHJllf2x3n8ZbEF43MbLt6I6FDPgw6Rp2tdps29zqNRmEz6ybw0AIAwCXGFyNAXtHfQAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABFElEQVR4XmPYsXodAzretGSZFAg3FhVNSE9OXTh12iwXEN68ZTsDw/YdezFwa0t7KwivWLmSZ/XqNaxx0fGPQHj1mg2KGIoJatiz7xAG7uudkAvCEydMqVq/cQtfS1NLCAgX5BWvYFi0bCUKnjlnvkRlecV8EI6Njvs3edpM9+07dzGAcG1N/RSGC2fPwPHxI4cl+7s6DwT5+twB4f6eHv+87Lylrc2tvSC8ZuVKP9I1bN24gWHl4kUuIFxTVvq8vrK8d+Oa1exgvHYNAzpmmD6xvzI5NuYPCPd1tseuXr6MAR9m6GxtScpMTdsFwhEh4V8WLVhgu2fXTgZcmHQNB9avY2guKGgH4RXTppruX7eWAR8GAO3ELL/xXNDuAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA+0lEQVR4XmM4V1/PAMNna2tZd1lYtW5TUz8Mwttd3dpOtbexnu7qZADhM0DMcG3zRji+XF5Wft3E+PfntCQwfhzk//tAcVHFtU0bGGCYdA13Vi+F48fp8Sufe9r+fl+e+weEX8X6/z6XEbf67prlDDDM8OT4STi+P31W/Etf/1/7nJz+g/AuK/tfxyZOS3x09DgDDDMcX7YMBZ/p7o1akJb2FoT3dHRFn1i5guEkEiZdw9bFEzFwfUnOZRDesnACAzpmWD5nAgZurSq6AMJLZvYxoGOGtSsWYuDJbfWnQHjT2hUM6BhDMUENRzatw8D7VyzyAOHDG9YwoGMAiiYzGiJzKW0AAAAASUVORK5CYII=>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>