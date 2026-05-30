import { useState, useEffect } from 'react'
import DiplomaCard from '../components/DiplomaCard.jsx'
import { fetchDiploma } from '../utils/contract.js'
import { MetaMaskIcon, LinkIcon, LockIcon, LoaderIcon, BookIcon, ChainIcon } from '../components/Icons.jsx'

export default function Student({ walletAddress }) {
  const [diploma, setDiploma] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!walletAddress) return

    let isMounted = true
    setLoading(true)
    setDiploma(null)

    fetchDiploma(walletAddress)
      .then(data => {
        if (isMounted) {
          setDiploma(data)
          setLoading(false)
        }
      })
      .catch(err => {
        console.error(err)
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => { isMounted = false }
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
                ['Diplôme', diploma.degree],
                ['Établissement', 'IT University Madagascar'],
                ['Mention', diploma.mention],
                ['Année', diploma.year],
              ]} />
            </div>

            <div className="card">
              <div className="itu-accent-bar" />
              <p className="section-title" style={{ marginBottom: 12, fontSize: 13 }}>
                <ChainIcon size={14} /> Données blockchain
              </p>
              <DetailTable rows={[
                ['Token ID', `#${String(diploma.tokenId).padStart(4, '0')}`],
                ['Standard', 'ERC-721 (Soulbound)'],
                ['Réseau', 'Sepolia Testnet'],
                ['Contrat', diploma.contractAddress ? `${diploma.contractAddress.slice(0, 8)}…` : '—'],
                ['IPFS CID', diploma.ipfsCid ? `${diploma.ipfsCid.slice(0, 12)}…` : '—'],
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
