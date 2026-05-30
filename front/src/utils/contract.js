import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, IPFS_GATEWAYS } from '../config';

// Traduit un lien ipfs://CID en URL de passerelle HTTP
export function formatIpfsUrl(ipfsUrl) {
  if (!ipfsUrl) return '';
  if (ipfsUrl.startsWith('http')) return ipfsUrl;
  const cid = ipfsUrl.replace('ipfs://', '');
  return `${IPFS_GATEWAYS[0]}${cid}`;
}

// Récupère le provider ou le signer MetaMask
export async function getProviderOrSigner(useSigner = false) {
  // Détecte si on utilise l'adresse locale Hardhat par défaut
  const isLocalhost = CONTRACT_ADDRESS.toLowerCase() === "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  if (useSigner) {
    if (!window.ethereum) {
      throw new Error("MetaMask n'est pas installé.");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Si on n'est pas en local (on est sur Sepolia réel), on valide/force le réseau
    if (!isLocalhost) {
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 11155111) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xf31075' }], // 11155111 en hex
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xf31075',
                  chainName: 'Sepolia Test Network',
                  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
                  rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io']
                }]
              });
            } catch (addError) {
              throw new Error("Veuillez configurer et basculer sur le réseau Sepolia dans votre wallet.");
            }
          } else {
            throw new Error("Veuillez basculer sur le réseau Sepolia dans votre wallet.");
          }
        }
      }
    }
    return await provider.getSigner();
  }

  // Pour la lecture seule :
  // Si on est en local, on utilise le provider MetaMask ou un RPC local
  if (isLocalhost) {
    if (window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }
    return new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  }

  // Sur Sepolia réel, on utilise TOUJOURS le provider RPC public
  // pour que la recherche et la consultation fonctionnent indépendamment du réseau MetaMask actif.
  return new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
}

// Initialise l'instance du Smart Contract
export async function getContractInstance(useSigner = false) {
  const providerOrSigner = await getProviderOrSigner(useSigner);
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
}

// Récupère les détails du diplôme d'un étudiant
export async function fetchDiploma(studentAddress) {
  try {
    const contract = await getContractInstance(false);
    
    // 1. Vérifie si l'étudiant a un diplôme
    const balance = await contract.balanceOf(studentAddress);
    if (Number(balance) === 0) {
      return null;
    }

    // 2. Récupère le Token ID de l'étudiant
    const tokenId = await contract.studentTokens(studentAddress);
    
    // 3. Récupère le tokenURI
    const tokenUri = await contract.tokenURI(tokenId);
    const metadataUrl = formatIpfsUrl(tokenUri);

    // 4. Télécharge le JSON de métadonnées depuis IPFS
    const response = await fetch(metadataUrl);
    if (!response.ok) {
      throw new Error("Erreur de récupération des métadonnées IPFS");
    }
    const metadata = await response.json();

    // Extraction robuste des attributs
    const attributes = metadata.attributes || [];
    const getAttr = (keys) => {
      const found = attributes.find(a => keys.includes(a.trait_type?.toLowerCase()));
      return found ? found.value : '';
    };

    return {
      studentAddress: studentAddress,
      studentName: getAttr(['student name', 'nom', 'name', 'studentname']) || metadata.name?.replace('Diplôme de ', '') || 'Étudiant',
      degree: getAttr(['degree', 'filière', 'diplome', 'diplôme']) || metadata.description || 'Diplôme',
      mention: getAttr(['mention', 'grade']) || 'Très Bien',
      year: getAttr(['year', 'année', 'annee']) || '2026',
      ipfsCid: getAttr(['pdf cid', 'pdf_cid', 'hash', 'ipfs']) || (metadata.image ? metadata.image.replace('ipfs://', '') : ''),
      tokenId: tokenId.toString(),
      contractAddress: CONTRACT_ADDRESS
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du diplôme:", error);
    throw error;
  }
}

// Émet un diplôme (Mint SBT)
export async function mintDiploma(studentAddress, ipfsCid) {
  try {
    const contract = await getContractInstance(true);
    const tx = await contract.mint(studentAddress, ipfsCid);
    const receipt = await tx.wait();
    return receipt.hash || tx.hash;
  } catch (error) {
    console.error("Erreur lors du mint:", error);
    throw error;
  }
}

// Vérifie si l'adresse est le propriétaire du contrat
export async function isContractOwner(address) {
  try {
    if (!address) return false;
    const contract = await getContractInstance(false);
    const ownerAddress = await contract.owner();
    return ownerAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error("Erreur de vérification owner:", error);
    return false;
  }
}
