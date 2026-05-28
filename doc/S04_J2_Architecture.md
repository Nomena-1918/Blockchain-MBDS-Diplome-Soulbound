

# Jour 2 — Architecture & Consensus

Ce cours explore la structure interne d'une blockchain : comment les blocs sont construits, comment ils sont  chaînés, comment les transactions sont organisées grâce aux arbres de Merkle, et comment des nœuds  distribués — potentiellement malveillants — arrivent à s'accorder sur un historique commun. 

| ℹ![][image1] Objectifs du Jour 2 |
| :---- |
| Décrire les 7 champs d'un en-tête de bloc Bitcoin et leur rôle. |
| Expliquer pourquoi modifier un bloc invalide toute la chaîne qui suit. |
| Construire un arbre de Merkle en Python et comprendre les Merkle Proofs. |
| Comparer PoW et PoS sur les dimensions sécurité, énergie, vitesse. |
| Implémenter un mini Proof of Work et mesurer l'impact de la difficulté. |

## Anatomie d'un bloc Bitcoin

**Pourquoi cette structure ?** 

Un bloc Bitcoin est conçu pour répondre à deux exigences contradictoires : être vérifiable indépendamment  par n'importe quel nœud du réseau, et être impossible à falsifier sans refaire un travail computationnel  colossal. Sa structure en deux parties — en-tête compact et corps variable — est la solution à ce double  objectif. 

**L'en-tête de bloc (80 octets fixes)** 

L'en-tête est la partie qui est hashée par les mineurs. Ses 80 octets contiennent toutes les informations  nécessaires pour vérifier la validité du bloc sans télécharger les transactions. 

| Champ  | Taille  | Rôle détaillé |
| ----- | ----- | ----- |
| version  | 4 octets  | Numéro de version du protocole Bitcoin. Permet les mises à jour progressives du  réseau (soft forks). |
| prev_block_hash  | 32 octets  | SHA256(SHA256(en-tête du bloc précédent)). C'est ce champ qui crée le chaînage — modifier un bloc change ce champ dans le suivant. |
| merkle_root  | 32 octets  | Racine de l'arbre de Merkle de toutes les transactions du bloc. Résume l'intégralité  du corps en 32 octets. |
| timestamp  | 4 octets  | Heure Unix approximative du minage. Les nœuds acceptent un écart de ±2h avec  l'heure réseau. |
| bits  | 4 octets  | Cible de difficulté encodée en format compact. Détermine le nombre de zéros requis  en tête du hash. |
| nonce  | 4 octets  | Number Used Once. La seule variable que les mineurs font varier. Seulement 4  milliards de valeurs (2³²) — insuffisant pour les ASICs modernes qui utilisent aussi  extraNonce. |

**Le corps du bloc (taille variable)**

Le corps contient la liste des transactions incluses dans ce bloc. La première transaction est toujours la  transaction coinbase — elle crée de nouveaux bitcoins versés au mineur comme récompense. Le reste sont  des transactions ordinaires du mempool sélectionnées par le mineur (généralement les plus rémunératrices  en frais). 

| Élément  | Description |
| ----- | ----- |
| Transaction coinbase  | Première tx — crée de nouveaux BTC (récompense de bloc + frais de toutes les  txs) |
| Transactions ordinaires  | Transactions choisies dans le mempool par le mineur, triées généralement par  frais décroissants |
| Taille max  | 4 MB avec SegWit (Segregated Witness, 2017\) — environ 2 000 à 4 000  transactions par bloc |
| Temps moyen  | Un bloc est produit environ toutes les 10 minutes — cible ajustée par le champ  bits |

**Pourquoi l'immutabilité est-elle garantie ?** 

Voici la démonstration complète de l'immutabilité par le chaînage. Supposons qu'un attaquant veuille  modifier la transaction du bloc \#500 000 (par exemple, changer le destinataire d'un paiement). 

# 

# 

# 

# 

| ⚠![][image2] La règle des 6 confirmations |
| :---- |
| Attendre 6 confirmations (6 blocs supplémentaires après le vôtre) avant de considérer |
| une transaction comme définitive. Pourquoi 6 ? La probabilité qu'un attaquant recalcule |
| 6 blocs plus vite que le réseau honnête est inférieure à 0.1% avec 10% de la puissance. |
| La plupart des exchanges considèrent une transaction Bitcoin définitive après 6 confirmations. |

## Arbres de Merkle

**Le problème à résoudre** 

Un bloc Bitcoin peut contenir jusqu'à 4 000 transactions. Comment un nœud léger (smartphone, extension  navigateur) peut-il vérifier qu'une transaction spécifique est bien dans un bloc, sans télécharger les 4 000  transactions ?

La réponse est l'arbre de Merkle — une structure de données inventée par Ralph Merkle en 1979, bien avant  Bitcoin, et qui est au cœur de nombreux systèmes distribués modernes (Git, IPFS, Ethereum, etc.). 

**Construction d'un arbre de Merkle** 

L'arbre est construit de bas en haut. Chaque transaction est d'abord hashée individuellement (feuilles).  Ensuite, les hashes sont groupés par paires et hashés ensemble (nœuds intermédiaires). Le processus se  répète jusqu'à obtenir un unique hash final : la Merkle Root. 

```python
import hashlib
def h(data: str) -> str:
"""Hachage SHA256 simplifié — version courte pour lisibilité"""
return hashlib.sha256(data.encode()).hexdigest()[:16]
```

# Niveau 0 — Les 4 transactions (feuilles de l'arbre)
txA = h('TxA: Alice → Bob 0.5 BTC')
txB = h('TxB: Carol → Dave 1.2 BTC')
txC = h('TxC: Eve → Frank 0.3 BTC')
txD = h('TxD: Grace → Hank 2.0 BTC')
```python
print(f'TxA: {txA}')
print(f'TxB: {txB}')
print(f'TxC: {txC}')
print(f'TxD: {txD}')
```

# Niveau 1 — Hash des paires
h_AB = h(txA + txB) # hash(TxA || TxB)
h_CD = h(txC + txD) # hash(TxC || TxD)
```python
print(f'H(AB): {h_AB}')
print(f'H(CD): {h_CD}')
```

# Niveau 2 — Racine de Merkle
merkle_root = h(h_AB + h_CD)
```python
print(f'Merkle Root: {merkle_root}')
```

# → Ce seul hash de 32 octets résume les 4 transactions du bloc
```

```

**Merkle Proof — vérifier sans tout télécharger** 

Un nœud léger veut vérifier que TxB appartient au bloc. Au lieu de télécharger toutes les transactions, il  demande seulement la Merkle Proof — un chemin dans l'arbre qui permet de recalculer la Merkle Root.

```python
```

# Merkle Proof pour TxB
```

| # Le nœud léger connaît : TxB et la Merkle Root du bloc  # Le nœud complet lui fournit : [txA, h_CD] — seulement 2 hashes !  def verify_merkle_proof(tx_hash, proof, root):   """   Vérifie que tx_hash appartient à l'arbre dont la racine est root.  proof = liste de (hash, position) : 'left' ou 'right'   """   current = tx_hash   for sibling, position in proof:   if position == 'left':   current = h(sibling + current)   else:   current = h(current + sibling)   return current == root  # Proof pour TxB : on a besoin de txA (frère gauche) et h_CD (oncle droit) proof_TxB = [(txA, 'left'), (h_CD, 'right')]  # Vérification : seulement 2 hashes au lieu de 4 000 transactions !  result = verify_merkle_proof(txB, proof_TxB, merkle_root)  print(f'TxB dans le bloc : {result}') # True |
| :---- |

| Approche  | Données nécessaires  | Complexité |
| ----- | ----- | ----- |
| Télécharger toutes les transactions  | N transactions complètes  | O(N) |
| Merkle Proof  | log₂(N) hashes  | O(log N) |
| Exemple concret (4 000 txs)  | 4 000 txs (\~2 MB) vs 12 hashes (\~384  bytes) | Rapport 5 000× |

```

## Mécanismes de consensus

**Le Problème des Généraux byzantins** 

Le consensus distribué est formalisé par le « Problème des Généraux byzantins » (Lamport, Shostak, Pease,  1982). Des généraux assiègent une ville. Certains peuvent être traîtres. Comment les généraux honnêtes  peuvent-ils s'accorder sur un plan d'attaque malgré les traîtres ? 

Dans le contexte blockchain : les nœuds sont les généraux, les transactions sont le plan. Certains nœuds  peuvent être malveillants. Comment le réseau s'accorde-t-il sur la blockchain valide ? 

**Proof of Work (PoW) — Le mécanisme de Bitcoin** 

Le PoW résout le problème byzantin d'une manière économique : pour avoir voix au chapitre (proposer un  bloc), un nœud doit dépenser de l'énergie réelle. La puissance de vote est proportionnelle à la puissance de  calcul. Les traîtres existent, mais ils doivent contrôler \>50% de la puissance totale pour attaquer.

```python
import hashlib, time
def miner_bloc(message: str, difficulte: int) -> tuple:
"""
Trouver un nonce tel que SHA256(message + nonce) commence par
'difficulte' zéros hexadécimaux.
Chaque zéro supplémentaire multiplie le temps par \~16.
"""
cible = '0' * difficulte
nonce = 0
t0 = time.time()
while True:
candidat = f'{message}{nonce}'
hash_val = hashlib.sha256(candidat.encode()).hexdigest()
if hash_val.startswith(cible):
duree = time.time() - t0
return nonce, hash_val, duree
nonce += 1
```

# Tester différentes difficultés
for diff in range(1, 7):
nonce, h, duree = miner_bloc('Bloc #1000', diff)
```python
print(f'diff={diff} | nonce={nonce:>8} | {h[:24]}... | {duree:.3f}s')
```

# Résultats typiques :
# diff=1 | nonce= 3 | 0e7f... | 0.000s
# diff=2 | nonce= 87 | 00a3... | 0.001s
# diff=3 | nonce= 1842 | 000f... | 0.012s
# diff=4 | nonce= 35219 | 0000... | 0.231s
# diff=5 | nonce= 712034 | 00000... | 4.612s
# diff=6 | nonce=11453821 | 000000.. | 74.3s
```

```

**Proof of Stake (PoS) — Le mécanisme d'Ethereum depuis 2022** 

Le PoS remplace la dépense énergétique par une mise financière. Pour devenir validateur, un nœud doit  immobiliser 32 ETH. La sélection du validateur qui propose le prochain bloc est aléatoire, pondérée par la  mise. Si un validateur se comporte malhonnêtement, sa mise est partiellement ou totalement détruite — le  slashing.

| Critère  | Proof of Work (Bitcoin)  | Proof of Stake (Ethereum) |
| ----- | ----- | ----- |
| Sécurité via  | Dépense énergétique réelle  | Mise économique (32 ETH min) |
| Pénalité si fraude  | Perte de l'énergie + matériel   investis | Slashing : perte partielle ou totale de la  mise |
| Énergie  | Très élevée (\~120 TWh/an Bitcoin)  | Très faible (\~0.01 TWh/an Ethereum post Merge |

| Critère  | Proof of Work (Bitcoin)  | Proof of Stake (Ethereum) |
| ----- | ----- | ----- |
| Attaque 51%  | Contrôler \>50% de la puissance de  calcul | Contrôler \>33% des ETH stakés |
| Finalité  | \~60 min (6 confirmations)  | \~15 minutes (finalité économique garantie) |
| Temps de bloc  | \~10 minutes  | \~12 secondes |
| TPS (Layer 1\)  | \~7 transactions/seconde  | \~15–30 transactions/seconde |

**Autres mécanismes de consensus** 

| Mécanisme  | Blockchain  | Comment ça marche ?  | Avantage principal |
| ----- | ----- | ----- | ----- |
| DPoS (Delegated PoS)  | EOS, TRON  | Les détenteurs de tokens élisent des  délégués qui valident | Très rapide (\>1000 TPS) mais  moins décentralisé |
| Proof of Authority (PoA)  | Chaînes privées,   Sepolia | Validateurs identifiés et approuvés  (autorités connues) | Très rapide et peu énergivore  — adapté aux consortiums |
| Proof of History (PoH)  | Solana  | Preuve cryptographique de l'ordre  temporel des événements | \~65 000 TPS — séquence   optimisée |
| PBFT  | Hyperledger Fabric  | Vote à 2/3 de nœuds identifiés —  tolérance byzantine formelle | Finalité immédiate — adapté  aux réseaux d'entreprise |

```

```

## Résumé & points clés du Jour 2

| Concept  | À retenir absolument |
| ----- | ----- |
| Structure d'un bloc  | En-tête (80 octets) : 6 champs dont prev_hash et nonce. Corps : transactions. |
| Chaînage  | prev_hash lie chaque bloc au précédent → modifier 1 bloc invalide toute la suite |
| Merkle Root  | Hash de toutes les txs en O(log N) — Merkle Proof pour vérification légère |
| PoW  | Trouver nonce → hash \< cible. Sécurité par énergie. Bitcoin utilise PoW. |
| PoS  | Miser des ETH pour valider. Slashing si fraude. Ethereum utilise PoS depuis 2022\. |
| Règle de la chaîne longue  | La blockchain valide est celle avec le plus de travail cumulé (PoW) ou de validations  (PoS) |

| ![][image3] Pour approfondir avant le Jour 3 |
| :---- |
| Faire le TP2 (mini-blockchain Python) — vous allez construire exactement ce que l'on vient de décrire. |
| Aller sur andersbrownworth.com/blockchain → section 'Blockchain' → modifier un bloc et observer. |
| Chercher 'Bitcoin Block 0' sur bitcoin.org/en/developer-reference pour voir le vrai Genesis Block. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>