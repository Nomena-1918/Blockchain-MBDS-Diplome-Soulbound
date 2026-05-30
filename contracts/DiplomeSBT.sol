// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title Certification Académique Soulbound (SBT)
/// @notice Permet l'émission de diplômes non-transférables pour l'IT University Madagascar
/// @dev Conforme ERC721 avec transferts bloqués
contract DiplomeSBT is ERC721, Ownable {
    
    // Compteur de Token IDs
    uint256 private _nextTokenId;

    // Association Token ID => CID IPFS des métadonnées
    mapping(uint256 => string) private _tokenCids;

    // Association Adresse Étudiant => Token ID (Un seul diplôme par étudiant)
    mapping(address => uint256) public studentTokens;

    // --- ERREURS PERSONNALISÉES (Optimisation Gas) ---
    error OnlyUniversityAdmin();
    error TokenIsSoulbound();
    error StudentAlreadyHasDiploma();
    error InvalidRecipientAddress();
    error InvalidIPFSHash();

    // --- ÉVÉNEMENTS ---
    event DiplomaIssued(address indexed student, uint256 indexed tokenId, string ipfsCid);

    /// @notice Constructeur du contrat
    /// @dev Initialise le token sous le nom "ITU SBT Diploma" et le symbole "ITUSBT"
    constructor() ERC721("ITU SBT Diploma", "ITUSBT") Ownable(msg.sender) {}

    /// @notice Émet un diplôme non-transférable à un étudiant
    /// @dev Seul l'administrateur de l'université (owner) peut appeler cette fonction
    /// @param student L'adresse publique du portefeuille de l'étudiant
    /// @param ipfsCid Le CID des métadonnées JSON hébergées sur IPFS
    /// @return Le Token ID généré pour ce diplôme
    function mint(address student, string calldata ipfsCid) external returns (uint256) {
        // Checks
        if (msg.sender != owner()) {
            revert OnlyUniversityAdmin();
        }
        if (student == address(0)) {
            revert InvalidRecipientAddress();
        }
        if (bytes(ipfsCid).length == 0) {
            revert InvalidIPFSHash();
        }
        if (balanceOf(student) > 0) {
            revert StudentAlreadyHasDiploma();
        }

        // Effects
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        studentTokens[student] = tokenId;
        _tokenCids[tokenId] = ipfsCid;

        // Interactions
        _safeMint(student, tokenId);

        emit DiplomaIssued(student, tokenId, ipfsCid);

        return tokenId;
    }

    /// @notice Surcharge de approve pour interdire l'approbation de transfert sur un SBT
    /// @dev Lève systématiquement l'erreur TokenIsSoulbound
    function approve(address /* to */, uint256 /* tokenId */) public pure override {
        revert TokenIsSoulbound();
    }

    /// @notice Surcharge de setApprovalForAll pour interdire l'approbation globale de transfert sur un SBT
    /// @dev Lève systématiquement l'erreur TokenIsSoulbound
    function setApprovalForAll(address /* operator */, bool /* approved */) public pure override {
        revert TokenIsSoulbound();
    }

    /// @notice Retourne l'URL complète des métadonnées IPFS pour un token donné
    /// @dev Surcharge de la fonction ERC721 standard
    /// @param tokenId L'ID du jeton recherché
    /// @return L'URI complète au format ipfs://CID
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return string(abi.encodePacked("ipfs://", _tokenCids[tokenId]));
    }

    /// @notice Règle d'or Soulbound : Bloque tous les transferts de jetons après émission
    /// @dev Surcharge de la fonction interne _update d'OpenZeppelin v5
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Si ce n'est pas un mint (from != 0) et pas un burn (to != 0), on bloque le transfert
        if (from != address(0) && to != address(0)) {
            revert TokenIsSoulbound();
        }
        
        return super._update(to, tokenId, auth);
    }
}
