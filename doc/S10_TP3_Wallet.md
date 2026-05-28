

## TP n°3 — Wallet & Block Explorer

Ce TP est entièrement pratique — pas de code à écrire. Vous allez créer un wallet MetaMask, recevoir des  ETH de test, effectuer une transaction réelle sur le testnet Sepolia, et l'analyser en détail sur Etherscan. C'est  votre première interaction avec une vraie blockchain. 

| ✗ Rappel sécurité |
| :---- |
| Ce TP se déroule UNIQUEMENT sur le testnet Sepolia. |
| Les ETH Sepolia (SEP) n'ont aucune valeur monétaire réelle. |
| Votre phrase de récupération de 12 mots ne doit jamais être partagée. |
| Ne jamais utiliser ce wallet pour des fonds réels après le cours. |

**Procédure complète** 

| Étape  | Action détaillée  | Résultat attendu  | Durée estimée |
| ----- | ----- | ----- | ----- |
| 1  | Installer MetaMask sur metamask.io →  créer un nouveau wallet → noter les 12  mots sur papier | Icône renard dans le navigateur,  wallet créé | 5 min |
| 2  | Paramètres → Avancé → Afficher les  réseaux de test → ON → Sélectionner  Sepolia | Réseau affiché : Sepolia Testnet  | 2 min |
| 3  | Aller sur sepoliafaucet.com → créer  compte Alchemy → coller adresse → Send  Me ETH | Solde ≥ 0.1 SEP dans MetaMask après  3 min | 5 min |
| 4  | MetaMask → Envoyer → adresse du  camarade (binôme) → 0.001 SEP → Suivant  → Confirmer | Transaction soumise → TxHash copié  | 2 min |
| 5  | Aller sur sepolia.etherscan.io → coller le  TxHash → analyser tous les champs | Tous les détails de la transaction  visibles | 10 min |

**Comprendre chaque champ d'Etherscan** 

Une fois votre transaction confirmée, ouvrez-la sur Etherscan et identifiez chaque champ. Voici l'explication  détaillée de ce que vous voyez. 

**Section principale**

| Champ Etherscan  | Valeur type  | Signification détaillée |
| ----- | ----- | ----- |
| Transaction Hash  | 0x4f7a2b...  | SHA256 unique de cette transaction — identifiant  permanent et immuable |
| Status  | Success (vert)  | La transaction a été exécutée sans erreur (revert \= Failed) |
| Block  | \#5 432 109  | Numéro du bloc qui a inclus cette transaction |

| Champ Etherscan  | Valeur type  | Signification détaillée |
| ----- | ----- | ----- |
| Timestamp  | 3 mins ago  | Date et heure d'inclusion dans le bloc (UTC) |
| From  | 0xVotre...  | Votre adresse — l'expéditeur de la transaction |
| To  | 0xCamarade...  | L'adresse du destinataire |
| Value  | 0.001 ETH  | Quantité d'ETH transféré (montant principal) |
| Transaction Fee  | 0.000357 ETH  | Frais \= gas_used × (base_fee + priority_fee) en ETH |

**Section Gas** 

| Champ  | Valeur type  | Signification |
| ----- | ----- | ----- |
| Gas Limit  | 21 000  | Quantité max de gas autorisée (fixée par l'expéditeur) |
| Gas Used By Transaction  | 21 000 (100%)  | Quantité effectivement consommée (100% \= transfer  simple) |
| Base Fee Per Gas  | 15 gwei  | Frais de base — déterminé par le réseau — brûlé |
| Max Fee Per Gas  | 20 gwei  | Maximum que vous étiez prêt à payer par gas |
| Max Priority Fee Per Gas  | 2 gwei  | Pourboire maximum pour le validateur |
| Burnt Fees  | 0.000315 ETH  | 15 gwei × 21 000 \= quantité d'ETH détruite (EIP-1559) |

**Calcul à refaire vous-même** 

| ▶![][image1] Exercice de calcul |
| :---- |
| Données de votre transaction : gas_used=21 000, base_fee=15 gwei, priority_fee=2 gwei |
|  |
| 1\. Frais totaux en gwei \= gas_used × (base_fee + priority_fee) \= ? |
| 2\. Frais totaux en ETH \= résultat gwei / 1 000 000 000 \= ? |
| 3\. Frais brûlés en ETH \= gas_used × base_fee / 1 000 000 000 \= ? |
| 4\. Frais au validateur en ETH \= gas_used × priority_fee / 1 000 000 000 \= ? |
| 5\. Vérification : frais brûlés + frais validateur \= frais totaux ? |

**Questions d'analyse** 

1\. Quel est le numéro de bloc qui a inclus votre transaction ? Combien de secondes après votre envoi la  transaction a-t-elle été confirmée ? 

2\. Calculer manuellement les frais totaux en ETH à partir des valeurs gas et gwei affichées. 

3\. Combien de confirmations affiche Etherscan 5 minutes après la première confirmation ? À quoi  correspondent ces confirmations ? 

4\. Cliquer sur le numéro de bloc → trouver l'adresse du validateur qui a produit ce bloc. Combien de blocs  ce validateur a-t-il proposé récemment ? 

5\. Rechercher votre adresse MetaMask sur Etherscan. Combien de transactions sont visibles ? Y trouve-t-on  les ETH reçus du faucet ?

| ✓ TP 3 réussi si... |
| :---- |
| Votre solde MetaMask reflète les envois et réceptions. |
| Vous trouvez votre transaction sur sepolia.etherscan.io. |
| Vous pouvez expliquer gas_used, base_fee, priority_fee, et frais brûlés. |
| Vous savez ce que signifient les confirmations. |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABK0lEQVR4XqXM3UvCUBjH8fNn7a/otoSSsLcLI5qIZUWRrHwDa9CLBdUJoqg2ugicEGRREhSBMKPQ8Cb/ie1se+o5a7OEMNjgc3F4ft+RodFZYSF/qKNN5YZtq7d/wvvcxrmOQmJWIHFZaSp3r4DU6ltP3ha7YHFi65KlTx8ArX6pNT6Alp85fHu3btiR6XWVze9XwHUNhsnAtm0Of1Q4u+fw1tlVADsSzR2zRFEDV4nHPz/LsrjHegtS9Op7pwF2weJx6YCJ8gV4DNP8FTuOw9UabVje0/wddiSyWGST+RPwGIbpB/X3NqSpxkVznQ3CjoSTMptYocBJFJ5eWlA4KnP49m9dsCP9YqY5srQDrt1/cLfYBYtD4ZgwPCXpaHBmjfUyEMvqqG8sKXwCLRIziOpoAXYAAAAASUVORK5CYII=>