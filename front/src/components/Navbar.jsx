import { Link, useLocation } from 'react-router-dom'

const shortenAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : ''

const MetaMaskIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 35 33" xmlns="http://www.w3.org/2000/svg">
    <polygon points="32.9582,0.5 19.1945,10.3304 21.6875,4.3877" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="2.0332,0.5 15.6986,10.4258 13.3039,4.3877" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="28.0098,23.5334 24.2891,29.3398 32.1738,31.5117 34.4375,23.6587" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="0.5742,23.6587 2.8262,31.5117 10.7109,29.3398 6.9902,23.5334" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="10.2734,14.5654 8.0625,17.9277 15.8906,18.2832 15.623,9.8643" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="24.7168,14.5654 19.2734,9.7578 19.1094,18.2832 26.9277,17.9277" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="10.7109,29.3398 15.4121,27.0527 11.3672,23.7129" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="19.5879,27.0527 24.2891,29.3398 23.623,23.7129" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LockIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

export default function Navbar({ walletAddress, setWalletAddress, isOwner, setIsOwner }) {
  const { pathname } = useLocation()

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask non détecté. Installez l'extension sur https://metamask.io")
        return
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setWalletAddress(accounts[0])
    } catch (err) {
      alert("Impossible de se connecter à MetaMask.")
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
