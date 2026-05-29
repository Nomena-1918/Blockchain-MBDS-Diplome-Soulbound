import { Link, useLocation } from 'react-router-dom'
import { MetaMaskIcon, LockIcon } from './Icons.jsx'

const shortenAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : ''

export default function Navbar({ walletAddress, setWalletAddress, isOwner, setIsOwner }) {
  const { pathname } = useLocation()

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask non détecté. Installez l'extension sur https://metamask.io")
        return
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      
      if (chainId !== '0xf31075' && chainId !== '11155111') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xf31075' }],
          })
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
              })
            } catch (addError) {
              alert("Veuillez configurer et basculer sur le réseau Sepolia dans votre wallet.")
              return
            }
          } else {
            alert("Veuillez basculer sur le réseau Sepolia dans votre wallet.")
            return
          }
        }
      }
      setWalletAddress(accounts[0])
    } catch (err) {
      console.error(err)
      alert("Impossible de se connecter à MetaMask ou de changer de réseau.")
    }
  }

  const handleDisconnect = () => {
    setWalletAddress(null)
    setIsOwner(false)
  }

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #E2E7F4',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 32,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 4px rgba(40,58,151,0.08)'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <img src="/itu_logo_positif.svg" alt="IT University Madagascar" height="28" style={{ display: 'block' }} />
        <span style={{
          fontWeight: 600,
          fontSize: 13,
          color: '#283a97',
          borderLeft: '2px solid #b2d235',
          paddingLeft: 10,
          lineHeight: 1.3
        }}>
          DiploChain
        </span>
      </Link>

      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        <NavLink to="/" active={pathname === '/'}>Vérifier un diplôme</NavLink>
        <NavLink to="/mon-diplome" active={pathname === '/mon-diplome'}>Mon diplôme</NavLink>
        {isOwner && (
          <NavLink to="/admin" active={pathname === '/admin'}>
            <LockIcon /> Administration
          </NavLink>
        )}
      </div>

      {walletAddress ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isOwner && (
            <span className="badge badge-warning" style={{ fontSize: 10 }}>Owner</span>
          )}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#e8ecf8',
            border: '1px solid #8898d4',
            borderRadius: 10,
            padding: '6px 14px',
            fontSize: 13,
            color: '#1a2a6e',
            fontWeight: 500
          }}>
            <MetaMaskIcon size={15} />
            <span className="mono">{shortenAddress(walletAddress)}</span>
          </div>
          <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={handleDisconnect}>
            Déconnecter
          </button>
        </div>
      ) : (
        <button className="btn-primary" onClick={handleConnect}>
          <MetaMaskIcon size={15} /> Connecter MetaMask
        </button>
      )}
    </nav>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#283a97' : '#555',
        padding: '6px 12px',
        borderRadius: 8,
        borderBottom: active ? '2px solid #b2d235' : '2px solid transparent',
        transition: 'color .15s',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}
    >
      {children}
    </Link>
  )
}
