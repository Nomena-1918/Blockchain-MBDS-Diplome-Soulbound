import { useState, useEffect } from 'react'
import DiplomaCard from '../components/DiplomaCard.jsx'

const MOCK_DIPLOMA = {
  studentName:     'John Doe',
  degree:          'Licence en Informatique - Option Web Intégration et Web Designer',
  mention:         'Très Bien',
  year:            '2026',
  ipfsCid:         'QmX9bJX3kFRs7tWvFp1LkGz8mN5sQ2yRhTc4wU6vD8eA1b',
  tokenId:         '42',
  contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
}

const MetaMaskIcon = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 35 33" xmlns="http://www.w3.org/2000/svg">
    <polygon points="32.9582,0.5 19.1945,10.3304 21.6875,4.3877" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="2.0332,0.5 15.6986,10.4258 13.3039,4.3877" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="28.0098,23.5334 24.2891,29.3398 32.1738,31.5117 34.4375,23.6587" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="0.5742,23.6587 2.8262,31.5117 10.7109,29.3398 6.9902,23.5334" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ChainIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)
const BookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)
const LockIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const LoaderIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#8898d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: 'spin 1s linear infinite' }}>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
)

export default function Student({ walletAddress }) {
  const [diploma, setDiploma] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!walletAddress) return
    setLoading(true)
    setTimeout(() => {
      setDiploma({ ...MOCK_DIPLOMA, studentAddress: walletAddress })
      setLoading(false)
    }, 900)
  }, [walletAddress])

  if (!walletAddress) {
    return (
      <main className="page-wrapper" style={{ textAlign: 'center', paddingTop: 80 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
          <MetaMaskIcon size={52} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: '#283a97' }}>
          Connectez votre wallet
        </h2>
        <p style={{ fontSize: 15, color: '#555', maxWidth: 360, margin: '0 auto' }}>
          Cliquez sur "Connecter MetaMask" dans la barre de navigation
          pour consulter votre diplôme.
        </p>
      </main>
    )
  }

  return (
    <main className="page-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <img src="/itu_logo_positif.svg" alt="ITU" height="24" />
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#283a97' }}>Mon diplôme</h1>
          <p style={{ fontSize: 13, color: '#777' }}>
            Wallet : <span className="mono">{walletAddress}</span>
          </p>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#7a7a8c' }}>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <LoaderIcon size={36} />
          </div>
          <p>Chargement de votre diplôme depuis la blockchain…</p>
        </div>
      )}

      {diploma && !loading && (
        <>
          <DiplomaCard diploma={diploma} compact={false} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <div className="itu-accent-bar" />
              <p className="section-title" style={{ marginBottom: 12, fontSize: 13 }}>
                <BookIcon size={14} /> Informations académiques
              </p>
              <DetailTable rows={[
                ['Diplôme',         diploma.degree],
                ['Établissement',   'IT University Madagascar'],
                ['Mention',         diploma.mention],
                ['Année',           diploma.year],
              ]} />
            </div>

            <div className="card">
              <div className="itu-accent-bar" />
              <p className="section-title" style={{ marginBottom: 12, fontSize: 13 }}>
                <ChainIcon size={14} /> Données blockchain
              </p>
              <DetailTable rows={[
                ['Token ID',  `#${String(diploma.tokenId).padStart(4, '0')}`],
                ['Standard',  'ERC-721 (Soulbound)'],
                ['Réseau',    'Sepolia Testnet'],
                ['Contrat',   diploma.contractAddress ? `${diploma.contractAddress.slice(0,8)}…` : '—'],
                ['IPFS CID',  diploma.ipfsCid ? `${diploma.ipfsCid.slice(0,12)}…` : '—'],
              ]} />
            </div>
          </div>

          <div style={{
            marginTop: 20, padding: '14px 18px',
            background: '#e8ecf8', border: '1px solid #8898d4',
            borderRadius: 12, fontSize: 13, color: '#283a97',
            display: 'flex', alignItems: 'flex-start', gap: 8
          }}>
            <LockIcon size={15} />
            <span>
              <strong>Soulbound Token</strong> — Ce diplôme est non-transférable.
              Il est lié de façon permanente à votre adresse Ethereum et ne peut
              ni être vendu, ni être transféré, ni être supprimé.
            </span>
          </div>
        </>
      )}
    </main>
  )
}

function DetailTable({ rows }) {
  return (
    <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
      <tbody>
        {rows.map(([key, val]) => (
          <tr key={key} style={{ borderBottom: '1px solid #E2E7F4' }}>
            <td style={{ padding: '7px 0', color: '#7a7a8c', width: '45%', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>{key}</td>
            <td style={{ padding: '7px 0', fontWeight: 500, color: '#1A1A1A', wordBreak: 'break-all' }}>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
