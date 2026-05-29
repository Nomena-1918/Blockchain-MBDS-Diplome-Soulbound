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
  if (!window.ethereum) {
    if (useSigner) {
      throw new Error("MetaMask n'est pas installé.");
    }
    return new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  if (useSigner) {
    return await provider.getSigner();
  }
  return provider;
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
