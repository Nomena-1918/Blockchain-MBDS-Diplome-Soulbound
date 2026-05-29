// Configuration Web3 du projet
export const SEPOLIA_CHAIN_ID = "0xf31075"; // 11155111 en décimal (hex requis pour MetaMask)
export const SEPOLIA_CHAIN_ID_DEC = 11155111;

// Adresse temporaire à remplacer après déploiement réel par Dev 1
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

export const CONTRACT_ABI = [
  "function owner() view returns (address)",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function studentTokens(address student) view returns (uint256)",
  "function mint(address student, string memory ipfsCid) returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

// Passerelles IPFS pour la récupération des métadonnées
export const IPFS_GATEWAYS = [
  "https://ipfs.io/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/"
];
