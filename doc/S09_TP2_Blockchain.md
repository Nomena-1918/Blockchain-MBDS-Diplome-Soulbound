

## TP n°2 — Mini-blockchain Python

Ce TP est la mise en pratique directe du Jour 2\. Vous allez construire une blockchain fonctionnelle en Python  avec deux classes — Block et Blockchain — en implémentant le chaînage par hash, le minage PoW, et la  vérification d'intégrité. 

| ℹ![][image1] Objectifs du TP2 |
| :---- |
| Implémenter la classe Block avec tous ses champs (index, timestamp, data, previous_hash, nonce, hash). |
| Comprendre pourquoi JSON + sort_keys est essentiel pour le déterminisme du hash. |
| Implémenter mine() — la boucle de Proof of Work. |
| Implémenter is_valid() — la vérification complète de la chaîne. |
| Observer expérimentalement pourquoi falsifier un bloc invalide toute la chaîne. |

**Compréhension préalable** 

**Pourquoi JSON pour sérialiser le bloc ?** 

Pour calculer le hash d'un bloc, nous devons d'abord le convertir en une représentation textuelle unique.  Plusieurs choix s'imposent : pourquoi JSON avec sort_keys=True ? 

- sort_keys=True garantit que les clés du dictionnaire sont toujours dans le même ordre alphabétique,  indépendamment de la version de Python ou de la machine. Sans cela, {'a':1,'b':2} et {'b':2,'a':1}  pourraient donner des sérialisations différentes mais des données identiques.

- JSON est un format texte universel, indépendant du langage — utile si vous imaginez que d'autres nœuds  (en JavaScript, Go, Rust...) doivent valider le même bloc.

- encode() convertit la chaîne JSON en bytes pour hashlib.

**Classe Block — implémentation complète**

```python
import hashlib
import time
import json
class Block:
"""
Représente un bloc dans la blockchain.
Attributs :
index : Position du bloc dans la chaîne (0 = Genesis)
timestamp : Heure de création (Unix timestamp en secondes)
data : Contenu du bloc (transactions, message, etc.)
previous_hash : Hash du bloc précédent (chaînage)
nonce : Nombre itéré pendant le minage
hash : Hash de ce bloc (calculé automatiquement)
"""
def __init__(self, index: int, data, previous_hash: str):
self.index = index
self.timestamp = time.time() # Heure actuelle en secondes Unix
self.data = data
self.previous_hash = previous_hash
self.nonce = 0 # Commence à 0, incrémenté pendant le minage
self.hash = self.compute_hash() # Hash initial (avant minage)
def compute_hash(self) -> str:
"""
Calcule le hash SHA-256 de ce bloc.
Tous les champs sont inclus — modifier n'importe lequel change le hash.
sort_keys=True garantit un ordre déterministe des clés JSON.
"""
bloc_dict = {
'index' : self.index,
'timestamp' : self.timestamp,
'data' : self.data,
'previous_hash' : self.previous_hash,
'nonce' : self.nonce
}
bloc_str = json.dumps(bloc_dict, sort_keys=True).encode('utf-8')
return hashlib.sha256(bloc_str).hexdigest()
def mine(self, difficulty: int) -> None:
"""
Proof of Work : trouve un nonce tel que le hash commence
par 'difficulty' zéros hexadécimaux.
Modifie self.nonce et self.hash en place.
"""
prefix = '0' * difficulty
while not self.hash.startswith(prefix):
self.nonce += 1
self.hash = self.compute_hash()
def __repr__(self) -> str:
return (f'Block(#{self.index} | nonce={self.nonce} | '
f'hash={self.hash[:12]}... | prev={self.previous_hash[:12]}...)')
```

**Classe Blockchain — implémentation complète**

```python
class Blockchain:
"""
Chaîne de blocs avec Proof of Work et validation d'intégrité.
"""
def __init__(self, difficulty: int = 3):
"""
```

 difficulty : nombre de zéros requis en tête du hash.  3 \= \~4000 essais en moyenne → rapide pour les tests.  Bitcoin utilise \~19 zéros hexadécimaux en 2026\. 

 """ 

```python
 self.difficulty = difficulty 

 self.chain = [] 

```

 # Créer et miner le bloc Genesis (index 0, pas de bloc précédent)  self.chain.append(self._create_genesis()) 

```python
 def _create_genesis(self) -> Block: 

 """ 

 Le bloc Genesis est le premier bloc — il n'a pas de bloc précédent.  Par convention, son previous_hash est une chaîne de 64 zéros.  """ 

 genesis = Block( 

 index = 0, 

 data = 'Genesis Block — La naissance de la blockchain',  previous_hash = '0' * 64 # Pas de bloc précédent  ) 

 genesis.mine(self.difficulty) 

 print(f'Genesis miné : {genesis}') 

 return genesis 

 def add_block(self, data) -> Block: 

 """ 

 Crée un nouveau bloc, le lie au dernier bloc de la chaîne, le mine,  et l'ajoute à la chaîne. 

 """ 

 dernier_bloc = self.chain[-1] 

 nouveau_bloc = Block( 

 index = len(self.chain), 

 data = data, 

 previous_hash = dernier_bloc.hash # Chaînage !  ) 

 nouveau_bloc.mine(self.difficulty) 

 self.chain.append(nouveau_bloc) 

 print(f'Bloc miné : {nouveau_bloc}') 

 return nouveau_bloc 

 def is_valid(self) -> bool: 

 """ 

 Vérifie l'intégrité de toute la chaîne. 

 Deux vérifications par bloc (sauf Genesis) : 

 1\. Le hash enregistré correspond bien au hash calculé.  2\. previous_hash correspond bien au hash du bloc précédent.  """ 

 for i in range(1, len(self.chain)): 

 bloc_courant = self.chain[i] 

 bloc_precedent = self.chain[i - 1] 

```

 # Vérification 1 : Le hash du bloc est-il correct ?  hash_recalcule = bloc_courant.compute_hash() 

 if bloc_courant.hash != hash_recalcule: 

```python
 print(f' ÉCHEC Bloc #{i}: hash modifié')

|  return False   # Vérification 2 : Le chaînage est-il intact ?   if bloc_courant.previous_hash != bloc_precedent.hash:   print(f' ÉCHEC Bloc #{i}: chaînage rompu')   return False   return True |
| :---- |

```

**Tests et observations** 

```python
```

# ── Test principal ──────────────────────────────────────
```python
print('=== CONSTRUCTION DE LA BLOCKCHAIN ===')
bc = Blockchain(difficulty=3)
bc.add_block({'de': 'Alice', 'vers': 'Bob', 'montant': 50, 'devise': 'CRT'}) bc.add_block({'de': 'Bob', 'vers': 'Carol', 'montant': 30, 'devise': 'CRT'}) bc.add_block({'de': 'Carol', 'vers': 'Dave', 'montant': 10, 'devise': 'CRT'})
print(f'\nNombre de blocs : {len(bc.chain)}')
print(f'Chaîne valide ? {bc.is_valid()}')
```

# ── Afficher la chaîne ──────────────────────────────────
```python
print('\n=== ÉTAT DE LA CHAÎNE ===')
for bloc in bc.chain:
print(f'Bloc #{bloc.index}: hash={bloc.hash[:20]}... |
prev={bloc.previous_hash[:20]}...')
```

# ── Test de falsification ────────────────────────────────
```python
print('\n=== TENTATIVE DE FALSIFICATION ===')
print(f'Données originales bloc #1 : {bc.chain[1].data}')
```

# Un attaquant modifie les données du bloc #1
bc.chain[1].data = {'de': 'Alice', 'vers': 'Eve_HACK', 'montant': 50000} # Note : l'attaquant ne recalcule PAS le hash !
```python
print(f'Données falsifiées bloc #1 : {bc.chain[1].data}')
print(f'Chaîne valide après falsification ? {bc.is_valid()}')
```

# Attendu : False — le hash du bloc #1 ne correspond plus à ses données
```

```

**Questions d'analyse** 

1\. Pourquoi is_valid() détecte-t-il la falsification même si l'attaquant ne touche pas au champ hash ? 2\. Si l'attaquant recalcule le hash du bloc #1 après sa modification, is_valid() retourne-t-il True ? Pourquoi ? 

3\. Pour falsifier définitivement le bloc #1 d'une chaîne de 100 blocs, que doit faire l'attaquant ? Pourquoi  c'est infaisable avec PoW en pratique ?

4\. Bonus : Ajouter une méthode afficher_arbre() qui affiche la chaîne sous forme d'arbre ASCII. 

| ✓ TP 2 réussi si... |
| :---- |
| is_valid() retourne True sur la chaîne non modifiée. |
| is_valid() retourne False après modification des données d'un bloc. |
| Vous pouvez expliquer les deux vérifications effectuées par is_valid(). |
| Vous comprenez pourquoi un attaquant doit re-miner TOUS les blocs suivants. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>
```
```