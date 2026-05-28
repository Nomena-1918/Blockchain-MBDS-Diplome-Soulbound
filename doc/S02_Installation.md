
# Guide d'installation complet

Ce guide vous accompagne pas à pas dans la mise en place de votre environnement de développement  blockchain. Prévoyez environ 30 à 45 minutes. Tous les outils listés sont gratuits, open-source, et disponibles  sur Windows, macOS et Linux. 

| ✗ Règle de sécurité absolue — à lire avant tout |
| :---- |
| L'intégralité des travaux pratiques de ce cours se déroule sur le réseau de test Sepolia. |
| Le testnet Sepolia est un clone d'Ethereum où les tokens (SEP) n'ont AUCUNE valeur réelle. |
| Ne créez JAMAIS un wallet sur le mainnet (réseau principal) pour ce cours. |
| Ne saisissez JAMAIS de vrais fonds dans ce cadre. |
| La phrase de récupération MetaMask (12 mots) ne doit JAMAIS être partagée ni stockée en ligne. |

## Vue d'ensemble des outils

Voici la liste complète des outils que vous allez installer, avec leur rôle précis dans le cours. 

| Outil  | Version min  | Rôle dans ce cours  | TP concernés |
| ----- | ----- | ----- | ----- |
| Python  | 3.10+  | Implémenter SHA-256, la mini-blockchain, le PoW  | TP1, TP2 |
| Node.js LTS  | 18+  | Exécuter ethers.js et les scripts de déploiement  | TP5 |
| Git  | 2.40+  | Versionner le code du mini-projet sur GitHub  | Projet |
| VS Code  | 1.85+  | Éditeur de code principal — extensions Solidity et  Python | Tous |
| MetaMask  | Extension  | Wallet navigateur — signer les transactions Sepolia  | TP3, TP4, TP5 |
| Remix IDE  | Web  | Compiler et déployer les smart contracts Solidity  | TP4 |

## Étape 1 — Python 3.10+

**Installation** 

Rendez-vous sur python.org et téléchargez la dernière version stable (3.11 ou 3.12 recommandée). Lors de  l'installation sous Windows, cochez impérativement la case « Add Python to PATH » — sans cela, Python ne  sera pas reconnu dans le terminal. 

**Vérification**

```bash
```

# Dans un terminal (PowerShell, CMD, bash, zsh)
python --version
# Doit afficher : Python 3.10.x ou supérieur
pip --version
# Doit afficher : pip 23.x ou supérieur
# Si 'python' ne fonctionne pas sous Windows, essayez :
python3 --version
```

```

**Installation des bibliothèques Python nécessaires** 

Aucune bibliothèque tierce n'est requise pour les TP Python — nous utilisons uniquement hashlib, json et  time, qui sont inclus dans la bibliothèque standard de Python. 

| ![][image1] En cas de problème sous Windows |
| :---- |
| Si 'python' n'est pas reconnu, allez dans Paramètres → Système → Variables d'environnement |
| et ajoutez manuellement le chemin Python à la variable PATH. |
| Chemin type : C:\\Users\\VotreNom\\AppData\\Local\\Programs\\Python\\Python312\\ |

```

```

## Étape 2 — Node.js 18 LTS

**Pourquoi Node.js ?** 

Node.js est nécessaire pour le TP5 où vous utiliserez ethers.js, la bibliothèque JavaScript officielle pour  interagir avec Ethereum. Vous n'avez pas besoin de connaître Node.js en profondeur — nous l'utilisons  uniquement pour exécuter des fichiers JavaScript. 

**Installation** 

Rendez-vous sur nodejs.org et téléchargez la version LTS (Long Term Support). Évitez les versions impaires  (19, 21, 23\) qui sont des versions « Current » moins stables. 

```bash
node --version
```

# Doit afficher : v18.x.x ou supérieur
npm --version
# Doit afficher : 9.x ou supérieur
# npm = Node Package Manager — il permet d'installer des bibliothèques
```

```

## Étape 3 — Git & GitHub

**Pourquoi Git ?** 

Git est le système de contrôle de version utilisé par pratiquement tous les développeurs dans le monde.  Vous en aurez besoin pour versionner votre mini-projet et le soumettre via GitHub. Si vous ne connaissez pas  Git, voici les commandes essentielles.

```bash
```

# Installation (vérification)
git --version
# Doit afficher : git version 2.40.x ou supérieur
# Configuration initiale (à faire une seule fois)
git config --global user.name 'Votre Prénom Nom'
git config --global user.email 'votre@email.com'
# Commandes essentielles pour le mini-projet
git init # Initialiser un repo
git add . # Ajouter tous les fichiers modifiés
git commit -m 'Message' # Créer un commit
git push origin main # Pousser vers GitHub
```

```

**Créer un compte GitHub** 

Rendez-vous sur github.com et créez un compte gratuit si vous n'en avez pas. Vous utiliserez GitHub pour  héberger le code de votre mini-projet — le lien vers votre repository sera à soumettre dans 14 jours. 

```

```

## Étape 4 — VS Code & extensions

**Pourquoi VS Code ?** 

Visual Studio Code est l'éditeur de code le plus populaire du monde en 2026 (enquête Stack Overflow). Il est  gratuit, open-source, et dispose d'un écosystème d'extensions exceptionnel. Nous utiliserons 3 extensions  spécifiques pour ce cours. 

**Extensions à installer** 

Après avoir installé VS Code (code.visualstudio.com), ouvrez l'onglet Extensions (Ctrl+Shift+X ou  Cmd+Shift+X) et installez les extensions suivantes :

| Extension  | Auteur  | Rôle  | TP |
| ----- | ----- | ----- | ----- |
| Solidity  | Juan Blanco  | Coloration syntaxique, autocomplétion,  détection d'erreurs Solidity | TP4 |
| Python  | Microsoft  | Débogage, autocomplétion, linting Python  | TP1,   TP2 |
| Live Server  | Ritwick Dey  | Serveur HTTP local pour la DApp —  rechargement automatique | TP5 |

| ![][image2] Conseil de configuration VS Code |
| :---- |
| Activez l'auto-sauvegarde : Fichier → Préférences → Paramètres → cherchez 'Auto Save' |
| → sélectionner 'afterDelay'. Vous ne perdrez plus de modifications en oubliant de sauvegarder. |

## Étape 5 — MetaMask (critique \!) Qu'est-ce que MetaMask ?

MetaMask est une extension de navigateur qui fait office de portefeuille (wallet) Ethereum. Il stocke vos clés  privées localement sur votre ordinateur — ni MetaMask ni Ethereum n'ont accès à vos clés. C'est MetaMask  qui permet à votre navigateur de signer des transactions et d'interagir avec des smart contracts déployés sur  Ethereum. 

**Procédure d'installation détaillée** 

# 

# 

# 

# 

| ✗ La règle des 12 mots — comprenez l'enjeu |
| :---- |
| La phrase de 12 mots (seed phrase) est la SEULE façon de récupérer votre wallet si vous perdez |
| l'accès à MetaMask. Quiconque possède ces 12 mots contrôle totalement votre wallet. |
| Sur le mainnet (réseau réel), perdre ces 12 mots \= perdre TOUS vos fonds définitivement. |
| Pour ce cours, les enjeux financiers sont nuls (testnet), mais prenez l'habitude correcte dès maintenant. |

## Étape 6 — Obtenir des ETH de test (Faucet)

**Qu'est-ce qu'un faucet ?** 

Un faucet (robinet en français) est un service web qui distribue gratuitement des tokens de test. Pour ce  cours, vous avez besoin d'ETH Sepolia (SEP) pour payer les frais de transaction lors des déploiements de  contrats et des tests. 

**Faucets disponibles**

| Faucet  | URL  | Montant/jour  | Prérequis  | Temps d'attente |
| ----- | ----- | ----- | ----- | ----- |
| Alchemy Sepolia  | sepoliafaucet.com  | 0.5 SEP  | Compte Alchemy gratuit  (email requis) | 1-3 minutes |
| Google Cloud  | cloud.google.com/.../sepolia  | 0.1 SEP  | Compte Google  | 1-2 minutes |
| PoW Faucet  | sepolia-faucet.pk910.de  | Variable  | Aucun compte requis  | 5-15 minutes   (minage) |

**Procédure** 

# 

# 

Si sepoliafaucet.com est indisponible, utilisez le faucet Google ou le faucet PoW. L'objectif est d'avoir au  moins 0.2 SEP avant le Jour 3 du cours. 

## Étape 7 — Remix IDE

**Présentation** 

Remix IDE est un environnement de développement Solidity entièrement dans le navigateur — pas  d'installation requise. Il intègre un compilateur Solidity, un déploiement vers différents réseaux, un  débogueur et une interface pour interagir avec les contrats déployés. 

**Prise en main rapide** 

# 

# 

| ℹ![][image3] Les 3 onglets essentiels de Remix |
| :---- |
|  ![][image4]File Explorer : gérer les fichiers .sol de votre projet. |
| ⚙ ![][image5]Solidity Compiler : compiler votre contrat → générer le bytecode EVM et l'ABI. |
|  ![][image6]Deploy & Run : déployer sur le réseau choisi et interagir avec les fonctions. |

## Check-list finale

Avant le Jour 1, vérifiez que tous ces points sont validés. Si un point échoue, revoyez la section  correspondante.

| Vérification  | Commande / Action  | Résultat attendu |
| ----- | ----- | ----- |
| Python installé  | python --version  | ≥ 3.10 |
| Node.js installé  | node --version  | ≥ 18 |

| Vérification  | Commande / Action  | Résultat attendu |
| ----- | ----- | ----- |
| Git configuré  | git config user.name  | Votre nom affiché |
| VS Code ouvert  | Ouvrir VS Code  | Interface accessible |
| Extension Solidity  | Extensions VS Code  | Solidity de Juan Blanco visible |
| MetaMask installé  | Icône dans navigateur  | Icône renard orange visible |
| MetaMask sur Sepolia  | Vérifier le réseau  | Affiche : Sepolia |
| Solde SEP \> 0  | Ouvrir MetaMask  | Affiche \> 0 SEP |
| Remix chargé  | remix.ethereum.org  | Interface Remix accessible |

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABVUlEQVR4XqXOTUsCURQG4Lvqb7h0L7Trj7hLatGuTQUahmDKRFC0K6MCtaikUiJBSTS0gsxALT/CIEyCujmp4+g4M3qbM8UwzqzCxXMX57zv4aLgphmphbbMxrB3xgNuzq1XqdNZD4gfWIzxfQtSQ59pmwLf2wzdNz/NMwUChM474VsFGVv10jhtM6jzo5VxxqFoFCiX2C6SvsDIBn2B9EVOJjBF0nhaceEHKftHepyKZmltQ2TLZCA0f4msckholwns1XlUz1IKOk+ZejjCi51XIuNqRGBfZNzHBU/nKJM6P1r5+3F1iPS1+R6OEcA3MoTDUVmztD6nzaJ6zj3kK+sea1U8XdCunpBWZbsLYC6BvQLdRnd0khFfHtSerwfpxFEFpCJ7SAuFAj6dQ/9uDCQuw+Qs4L8DwWMv0tIV/1Wm3A4dx5J1HExPTSbtiwsTYNlpR1o/RW79IQAS3qUAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAABC0lEQVR4XmOITamwqOleeBmEp6458Hv62oM4MUi+asrqyyAcWdhpwVAycc3tNYev/wfhtUdvEMQwtSB9lGkum7b5d/vK4/+RcdsKCL77+OX/lQeugDG6GpA+hoIJa39Xz9v/HxXvA+OFuy78b1t2BIzR1YD0MWR3LftdNmP7f2Tct+IgGN988Ox/38pDYIyuBqSPMs1pLfN/F05c/x8bvvno5f/+FfvBGF0OpI8hqW7G75zu5f+x4RsPnv/vXrwTjNHlQPoY4ion/k5vXfAfGz577f7/1jmbwBhdDqSPIbyw43Zy/cz/EDyLCAxRC9JHmebIuCKLhLyWyyAcU97/mxCOKOq8DMJ+qZUWALfYGBEURpyDAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABkklEQVR4Xp3Pvy8DYRzH8Scmkz9CwiJmo0VsJoZGRElLhURCQiziR4gfFdcW1euvu16r7d1pXbTX46i7KqKNVDrVZBD+AavI132fRGKTdHht3/fzyUOGbCPkl21krM3udPVMTM0Q5JyabrE7XF0Dg7axoWF7Hxp1uAhRi2WHXDAaiJfVbyZ88rXr5020uOH5dC2swfyqGwKCZCDtptzbXCTl9KPZ5W1Acyu7sOkLAZs4pcRzHZQLA5KZPPCpLKUUriaJIOcOmWAcUP3lFSr1BpiPNapQLIN8fgmCpEAkIVF53egnrCD6GJYHVLWC28ozXJoP1JlWpCtc0lrmU5RWLHU2F3lZnmGOOUDGwxNoN3egaNdU+kyFWDoLISENR+H4N7ou3beSHS+77wlEAeV0E7Kqbh3nKUH8DQQ4CPIf6Mq8I2SL8e95WQ6QqKiQkBWIWh9GfuvY4w9bAfduPbCG7qs1QpbW3VteawWxXAJCseRbMJaKo3BccnKpbEdQkMhfzUWBmNgdTWbGUeQk0x7gRfKfH/AcsGufHlyfAAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABzklEQVR4Xp3QyU5acRTH8T9ujMZNE5NuujZ2027qRuMjuOkruNLEaIoWbVHTgqkNG9DKVAYxojhc8IqxgCi99CJcw6AyhcpQa0ViKaWGRSmGU859BBaf5Gy++SWH5L7lSDKV4rHBaPtJJNr1yRdOosLP0hP7Z27mR77QfZ0vEHRfqxLy/eqKcFzgKbI6PNV9hnOad5yA9Ov0b8rJwlki9dwfPH2Iav/+Nhl9zVx2sqF4P9KtbtXm5RqYEM/xRiemYWhkHORqU83li5RQpVJpI7t2u9jBcHWkMlpgSiID7ZqNt7HPwBvZUiMUgtNzTKGLy5tWEo0nBCq96Qa9fS+HRd0yHHo5LxKODPu37e7G4mvQLFt4BwzHNRcZVsyhI18I0IxUBuMvp/BmkFSuOrbuuUE0LYG1bbqIstl0C2HZLx0ftZpNpFAaYXBwCETCSZ5abYJXYglIZQtA0a46OoulJsmfu7tWlX71Fm1Re3XJvAJeiGZ5Y43viWbfgWFlsx7wB3pQLBZ9QACAMB7PM2SzUgNGoxm0WtMv9EFpAMs6xSwtqovZTLYXlUpF0nyUTl/wIuHgI9pGL+Qy6cdIqVAkY+fnfV4vI8jnrwkql8vkP6K/zvtLcdltAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABjUlEQVR4XmPgtStmwIXFXcv4siKyF86ra/3bu/PSfxCOmbDnMQOjbgwGFrRMEgbhtvzKC8pa+v9r7B3/33v2EIztUpr3YGggSpO4lgUKVtY0Fyhrm30QhFvTC/9XKKv+v7pw7v9FKxeDsY6FXSqDmKImQ7qsQhgIH+DhWd8jJvvEvWPPfxBOm7Hz/6lLJ/+v2rj6v194+GUQBqpnYbBWVlT/aMbzBYQfyzD8DzVw/e/fdwCMJ83c8b+yu/t/WHz8RxE5VV0Q5pdSZCBP075GifV/5nH9AuFp7vyzonIaf9RkVP4H4TjXqP+KdvEv5KW1LaXE1BlgmGGSICPLYhN2HRA+ts7zeqClyf9p0rw/QLhBUPb/PCbmiB4GBgZkzLBfkEHkzTrl8yD89GzF/5XhfBd3arIfAOG3TAz/TzAwmO8DqkPGDCc1mJ3/3DD4D8I31hk8WxfNZvJZneE/CN9jZFhygIGBZT/IcCRMnqZ1Vsy+Z1KYykF4pR2D1AoXBqFdOoxFINzBw8AIxAzoGAAeHwIjdHuHLQAAAABJRU5ErkJggg==>