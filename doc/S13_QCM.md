

# QCM d'entraînement — Guide complet

Ce document contient 10 questions d'entraînement couvrant l'ensemble du cours, avec pour chaque  question : les 4 choix de réponse, la bonne réponse expliquée en détail, et les raisons pour lesquelles les  autres choix sont incorrects. Utilisez ce document après avoir tenté de répondre seul. 

| ℹ![][image1] Consignes d'utilisation |
| :---- |
| Couvrez la section 'Corrigé et explications' et répondez aux 10 questions. |
| Comptez votre score, puis lisez les explications pour chaque question. |
| Pour chaque erreur, relisez la section du cours correspondante. |
| Score ≥ 8/10 : prêt pour le QCM final. Score \< 6/10 : révision nécessaire. |

**Les 10 questions** 

**Q1 — Hachage cryptographique** 

Quelle propriété de SHA-256 garantit qu'un seul bit différent en entrée produit un hash radicalement  différent en sortie ? 

- a) Le déterminisme

- b) L'effet d'avalanche

- c) L'unidirectionnalité

- d) La résistance aux collisions

**Q2 — Cryptographie asymétrique** 

- Dans le système ECDSA utilisé par Ethereum, quelle clé est utilisée pour SIGNER une transaction ?
- a) La clé publique
- b) La clé privée

- c) L'adresse Ethereum (0x...)

- d) Le hash de la transaction

**Q3 — Structure d'un bloc** 

À quoi sert le champ 'nonce' dans l'en-tête d'un bloc Bitcoin ? 

- a) À identifier de manière unique le mineur qui a créé le bloc

- b) À horodater précisément le moment du minage

- c) À être itéré par les mineurs jusqu'à trouver un hash valide (PoW)

- d) À lister le nombre de transactions dans le corps du bloc

**Q4 — Arbre de Merkle**

Qu'est-ce que la Merkle Root d'un bloc blockchain ? 

- a) L'adresse du mineur qui a produit le bloc

- b) Un hash unique résumant toutes les transactions du bloc via un arbre binaire

- c) Le premier hash calculé lors de la création du bloc Genesis

- d) Le hash du bloc précédent dans la chaîne

**Q5 — Modèle UTXO** 

Que signifie l'acronyme UTXO dans le contexte de Bitcoin ? 

- a) Universal Token eXchange Operation

- b) Unspent Transaction Output

- c) Unified Token eXchange Order

- d) Unsigned Transaction eXecution Output

**Q6 — Solidity** 

Que signifie le mot-clé 'view' devant une fonction Solidity ? 

- a) La fonction n'est visible que par le owner du contrat

- b) La fonction lit l'état du contrat sans le modifier — gratuite si appelée directement
- c) La fonction affiche des informations dans les logs EVM

- d) La fonction déclenche automatiquement un événement lors de son appel

**Q7 — Sécurité Solidity** 

- Le pattern 'Checks-Effects-Interactions' (CEI) protège principalement contre quelle vulnérabilité ?
- a) L'integer overflow/underflow
- b) Le front-running via le mempool

- c) La reentrancy (réentrance)

- d) L'utilisation de tx.origin pour l'authentification

**Q8 — DApp et ethers.js** 

- Quelle bibliothèque JavaScript est utilisée dans ce cours pour interagir avec Ethereum depuis un navigateur ?
- a) TensorFlow.js
- b) ethers.js

- c) jQuery

- d) socket.io

**Q9 — Layer 2**

- En quoi les ZK-Rollups se distinguent-ils fondamentalement des Optimistic Rollups ?
- a) Ils coûtent beaucoup plus cher en frais de transaction
- b) Ils soumettent des preuves cryptographiques zk-SNARK/STARK permettant une finalité plus rapide
- c) Ils n'ont aucun lien avec le Layer 1 Ethereum pour la sécurité

- d) Ils sont exclusivement compatibles avec Bitcoin, pas Ethereum

**Q10 — DeFi** 

Qu'est-ce qu'un 'rug pull' dans l'écosystème DeFi ? 

- a) Une mise à jour de sécurité urgente d'un protocole DeFi

- b) Une arnaque où les fondateurs d'un projet retirent toute la liquidité et disparaissent
- c) Un type de preuve cryptographique zk utilisé dans les ZK-Rollups

- d) Un mécanisme de vote décentralisé dans une DAO

**Corrigé complet avec explications**   

Pour chaque question, la bonne réponse est indiquée en premier, suivie d'une explication détaillée et d'une  analyse des mauvaises réponses. 

**Q1 — Réponse : b) L'effet d'avalanche** 

| ✓ Bonne réponse |
| :---- |
| L'effet d'avalanche (avalanche effect) garantit que changer 1 seul bit en entrée |
| modifie \~50% des bits du hash en sortie. C'est une propriété de design délibérée |
| de SHA-256 qui rend impossible la modification subtile d'un document en espérant |
| conserver un hash similaire. |
| ⚠![][image2] **Pourquoi les autres sont faux ?** |
| a) Déterminisme \= même entrée → même hash (propriété différente, liée à la cohérence). |
| c) Unidirectionnalité \= impossibilité de retrouver x depuis H(x) (sens unique). |
| d) Résistance aux collisions \= impossible de trouver deux entrées avec le même hash. |
| Ces 4 propriétés existent toutes dans SHA-256, mais ce sont 4 propriétés distinctes. |

Section de cours correspondante : 3.2 · Le hachage cryptographique — SHA-256, Propriété 2\. 

**Q2 — Réponse : b) La clé privée** 

| ✓ Bonne réponse |
| :---- |
| La clé privée est l'unique élément secret de la cryptographie asymétrique. |
| Elle est utilisée pour signer — c'est-à-dire créer une signature numérique prouvant |
| que le propriétaire de cette clé a autorisé la transaction. |
| La vérification de cette signature se fait avec la clé publique correspondante. |
| ⚠![][image3] **Pourquoi les autres sont faux ?** |
| a) La clé publique VÉRIFIE les signatures — elle ne les crée pas. |
| c) L'adresse est dérivée de la clé publique et sert à recevoir des fonds, pas à signer. |
| d) Le hash de la transaction est CE QUI EST signé, pas l'outil de signature. |

Section de cours correspondante : 3.3 · Cryptographie asymétrique et ECDSA. 

**Q3 — Réponse : c) Itéré pour trouver un hash valide (PoW)**

| ✓ Bonne réponse |
| :---- |
| Le nonce (Number Used Once) est le seul champ de l'en-tête que les mineurs font |
| varier librement. Ils incrémentent le nonce (0, 1, 2, 3...) et recalculent le hash |
| jusqu'à ce qu'il commence par le nombre requis de zéros — c'est la Proof of Work. |
| Avec 4 octets, le nonce peut atteindre \~4 milliards. Si insuffisant, les mineurs |
| changent aussi extraNonce dans la transaction coinbase. |
| ⚠![][image4] **Pourquoi les autres sont faux ?** |
| a) L'identité du mineur n'est pas dans l'en-tête — sa récompense va à son adresse dans la coinbase. |
| b) L'horodatage est dans le champ 'timestamp', pas le nonce. |
| d) Le nombre de transactions n'est pas explicitement stocké dans l'en-tête. |

Section de cours correspondante : 4.1 · Anatomie d'un bloc Bitcoin. 

**Q4 — Réponse : b) Hash résumant toutes les transactions via un arbre binaire** 

| ✓ Bonne réponse |
| :---- |
| La Merkle Root est calculée en hashant les transactions par paires jusqu'à obtenir |
| un seul hash de 32 octets. Elle résume l'intégralité du corps du bloc dans l'en-tête. |
| Avantage clé : un nœud léger peut vérifier l'appartenance d'une transaction au bloc |
| avec seulement O(log N) hashes (Merkle Proof) au lieu de télécharger toutes les txs. |
| ⚠![][image5] **Pourquoi les autres sont faux ?** |
| a) L'adresse du mineur est dans la transaction coinbase, pas dans l'en-tête. |
| c) Le 'premier hash' du Genesis Block est son propre hash, pas la Merkle Root. |
| d) Le hash du bloc précédent est dans le champ 'prev_block_hash', pas la Merkle Root. |

Section de cours correspondante : 4.2 · Arbres de Merkle. 

**Q5 — Réponse : b) Unspent Transaction Output** 

| ✓ Bonne réponse |
| :---- |
| Un UTXO est une 'sortie de transaction non dépensée'. Bitcoin ne stocke pas de soldes |
| mais des UTXOs — chacun représentant un montant de BTC verrouillé par un script. |
| Dépenser un UTXO \= l'utiliser comme entrée dans une nouvelle transaction (il est détruit). |
| Votre 'solde' Bitcoin \= somme de tous vos UTXOs. |
| ⚠![][image6] **Pourquoi les autres sont faux ?** |
| a), c), d) Sont des abréviations inventées qui ne correspondent à aucun standard. |
| Le modèle UTXO est fondamentalement différent du modèle de comptes d'Ethereum. |

Section de cours correspondante : 5.1 · Bitcoin — Le modèle UTXO. 

**Q6 — Réponse : b) Lit l'état sans le modifier** 

| ✓ Bonne réponse |
| :---- |
| Une fonction 'view' en Solidity déclare qu'elle ne modifie aucune variable d'état. |
| Elle peut lire les variables d'état et appeler d'autres fonctions 'view' ou 'pure'. |
| Si elle est appelée directement (sans transaction), elle est gratuite — l'EVM l'exécute |
| localement sans créer de transaction. Si appelée depuis une transaction, elle consomme du gas. |
| ⚠![][image7] **Pourquoi les autres sont faux ?** |
| a) La visibilité (public, private, internal, external) est un concept distinct de view. |
| c) Les logs EVM sont créés par 'emit EventName(...)' — pas par view. |
| d) Les événements sont déclenchés par 'emit', indépendamment de view. |

Section de cours correspondante : 6.3 · Syntaxe Solidity — Visibilité des fonctions. 

**Q7 — Réponse : c) La reentrancy**

| ✓ Bonne réponse |
| :---- |
| Le pattern CEI (Checks-Effects-Interactions) est la défense principale contre la reentrancy. |
| Principe : mettre à jour l'état (Effects) AVANT d'appeler des contrats externes (Interactions). |
| Ainsi, même si le contrat externe rappelle la fonction, l'état est déjà mis à jour |
| et la double dépense est impossible. Mémoire : DAO Hack 2016, 60 millions de dollars. |
| ⚠![][image8] **Pourquoi les autres sont faux ?** |
| a) Integer overflow est résolu par Solidity 0.8+ ou SafeMath — CEI n'y contribue pas. |
| b) Front-running se combat avec commit-reveal ou MEV-protection — pas CEI. |
| d) tx.origin se remplace par msg.sender — CEI n'y contribue pas directement. |

Section de cours correspondante : 6.5 · Sécurité Solidity, Vulnérabilité 1\. 

**Q8 — Réponse : b) ethers.js** 

| ✓ Bonne réponse |
| :---- |
| ethers.js (avec viem) est la bibliothèque JavaScript standard pour interagir avec Ethereum. |
| Elle fournit BrowserProvider (connexion MetaMask), Signer (signature de transactions), |
| et Contract (interface vers les smart contracts via ABI). |
| La version 6 (2023) est celle utilisée dans ce cours. |
| ⚠![][image9] **Pourquoi les autres sont faux ?** |
| a) TensorFlow.js est une bibliothèque de machine learning — sans rapport avec Ethereum. |
| c) jQuery est une bibliothèque de manipulation DOM des années 2000 — pas pour la blockchain. |
| d) socket.io est pour les WebSockets temps réel — pas pour les transactions blockchain. |

Section de cours correspondante : 8.5 · TP5 DApp ethers.js, Comprendre ethers.js v6. 

**Q9 — Réponse : b) Preuves zk-SNARK/STARK pour une finalité rapide** 

| ✓ Bonne réponse |
| :---- |
| La différence fondamentale : les Optimistic Rollups supposent que les transactions |
| sont valides par défaut et permettent 7 jours de contestation (fraud proof). |
| Les ZK-Rollups soumettent une preuve mathématique (zk-SNARK ou zk-STARK) prouvant |
| cryptographiquement la validité de toutes les transactions — finalité en quelques heures. |
| zkSync Era, StarkNet, Polygon zkEVM utilisent cette approche. |
| ⚠![][image10] **Pourquoi les autres sont faux ?** |
| a) Les ZK-Rollups sont généralement plus chers à prouver côté serveur, mais pas forcément |
|  plus chers pour l'utilisateur — cela dépend de l'implémentation. |
| c) Les ZK-Rollups héritent exactement la sécurité d'Ethereum L1 via les preuves. |
| d) Les ZK-Rollups sont principalement sur Ethereum — pas Bitcoin. |

Section de cours correspondante : 7.4 · Scalabilité — Solutions Layer 2\. 

**Q10 — Réponse : b) Arnaque où les fondateurs retirent la liquidité**

| ✓ Bonne réponse |
| :---- |
| Un rug pull (littéralement 'retirer le tapis sous les pieds') est une arnaque DeFi |

| classique : les fondateurs d'un protocole créent une illusion de liquidité, |
| :---- |
| attirent des investisseurs, puis retirent toute la liquidité et disparaissent. |
| Les investisseurs restent avec des tokens sans valeur et sans recours. |
| C'est l'un des risques majeurs de la DeFi non auditée. |
| ⚠![][image11] **Pourquoi les autres sont faux ?** |
| a) Les mises à jour de sécurité sont des 'upgrades' ou 'patches', pas des rug pulls. |
| c) Les preuves zk s'appellent zk-SNARKs ou zk-STARKs. |
| d) Le vote dans une DAO s'appelle 'governance vote' ou 'on-chain voting'. |

Section de cours correspondante : 7.2 · DeFi — Finance Décentralisée, Risques DeFi. 

**Tableau récapitulatif des réponses** 

| Question  | Bonne réponse  | Thème  | Section |
| ----- | ----- | ----- | ----- |
| Q1  | b) Effet d'avalanche  | SHA-256  | 3.2 |
| Q2  | b) La clé privée  | ECDSA  | 3.3 |
| Q3  | c) Itéré pour le PoW  | Nonce / Minage  | 4.1 |
| Q4  | b) Hash arbre Merkle  | Merkle Root  | 4.2 |
| Q5  | b) Unspent Transaction Output  | UTXO Bitcoin  | 5.1 |
| Q6  | b) Lit l'état sans modifier  | Solidity view  | 6.3 |
| Q7  | c) Reentrancy  | Sécurité CEI  | 6.5 |
| Q8  | b) ethers.js  | DApp / ethers.js  | 8.5 |
| Q9  | b) Preuves zk-SNARK/STARK  | ZK-Rollups  | 7.4 |
| Q10  | b) Arnaque de liquidité  | DeFi / Rug pull  | 7.2 |

| ![][image12] Interprétation de votre score |
| :---- |
| 10/10 : Excellent — vous maîtrisez parfaitement le cours. |
| 8-9/10 : Très bien — quelques révisions ponctuelles suffisent. |
| 6-7/10 : Bien — revoir les sections correspondant à vos erreurs. |
| 4-5/10 : Passable — relecture des cours J1 à J5 recommandée. |
| \< 4/10 : Insuffisant — reprendre le cours depuis le début. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABKUlEQVR4XqXPPUsDQRAG4PETBAVRbKNRkFwKxVYrsRfsBP+BdoKdaGeh2NmKlWAhpAoqMRYSSEICOTkPsYixMR94MQTPLtnX3dHzcjkLJcWzszvDsDOEYpZ8XjI9LH+0Dvuhl308UjtCLeH3tLvJDA3Ib2+xt1tq52/8V7MV8yqdTTT02XdlZ2MMDX3GVlA8DeL1klp5HsxciTbNMJThoW6OisxfoHpDreQRdz0frMIICZhyXGkq0MeRqXxhbw3WNTk6bLauCJXICNPDZRgBOObn+n/uLBeqoHw+ynjnakztecxyg4DuMiMDnjfX75dPmPxUjnq4iFRXk2UIip34Mj3u3p0a0iRYYX+JRGryDkmZ/EUp6s85RDJodNhcz2qiFl/4K3wT9bT2CRx4FOZEo2XyAAAAAElFTkSuQmCC>

[image12]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>