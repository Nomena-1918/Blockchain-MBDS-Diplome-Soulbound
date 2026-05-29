import { useState } from 'react'
import DiplomaCard from '../components/DiplomaCard.jsx'
import { fetchDiploma } from '../utils/contract.js'
import { SearchIcon, ShieldIcon, WarnIcon, FileIcon, LinkIcon, CheckIcon } from '../components/Icons.jsx'

export default function Home() {
  const [searchAddress, setSearchAddress] = useState('')
  const [diploma, setDiploma]             = useState(null)
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState('')
  const [searched, setSearched]           = useState(false)

  const handleSearch = async () => {
    const addr = searchAddress.trim()
    if (!addr) return

    if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) {
      setError('Adresse Ethereum invalide. Elle doit commencer par 0x et contenir 40 caractères hexadécimaux.')
      return
    }

    setLoading(true)
    setError('')
    setDiploma(null)
    setSearched(true)

    try {
      const data = await fetchDiploma(addr)
      setDiploma(data)
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue lors de l'interrogation de la blockchain. Vérifiez l'adresse ou réessayez plus tard.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch() }

  return (
    <main className="page-wrapper" style={{ maxWidth: 680 }}>
      <div style={{ textAlign: 'center', marginBottom: 40, paddingTop: 20 }}>
        <div className="badge badge-primary" style={{ marginBottom: 16, fontSize: 12, gap: 5 }}>
          <ShieldIcon size={12} /> Certifié sur Sepolia Ethereum
        </div>
        <div style={{ marginBottom: 16 }}>
          <img src="/itu_logo_positif.svg" alt="IT University Madagascar" height="36" style={{ display: 'inline-block' }} />
        </div>
        <h1 style={{ fontFamily: 'Fractul, sans-serif', fontSize: 28, fontWeight: 900, color: '#283a97', marginBottom: 10 }}>
          Vérifiez l'authenticité d'un diplôme
        </h1>
        <p style={{ fontSize: 15, color: '#555', maxWidth: 480, margin: '0 auto 28px' }}>
          Entrez l'adresse Ethereum d'un diplômé pour consulter
          son diplôme immuable, certifié par IT University Madagascar.
        </p>
        <div style={{ display: 'flex', gap: 8, maxWidth: 560, margin: '0 auto' }}>
          <input
            type="text"
            placeholder="0x71C7656EC7ab88b098defB75187401B5f6d8976F"
            value={searchAddress}
            onChange={e => setSearchAddress(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ flex: 1, fontFamily: 'Courier New, monospace', fontSize: 12 }}
          />
          <button
            className="btn-primary"
            onClick={handleSearch}
            disabled={loading || !searchAddress.trim()}
            style={{ whiteSpace: 'nowrap', minWidth: 110, gap: 6 }}
          >
            <SearchIcon size={14} /> {loading ? 'Recherche…' : 'Vérifier'}
          </button>
        </div>
        {error && (
          <div style={{
            marginTop: 12, padding: '10px 14px', background: '#FCEBEB',
            border: '1px solid #F7C1C1', borderRadius: 8, fontSize: 13, color: '#791F1F',
            maxWidth: 560, margin: '12px auto 0', textAlign: 'left',
            display: 'flex', alignItems: 'flex-start', gap: 8
          }}>
            <WarnIcon size={14} /> {error}
          </div>
        )}
      </div>

      {searched && !loading && !error && diploma && <DiplomaCard diploma={diploma} compact={true} />}

      {searched && !loading && !error && !diploma && (
        <div className="empty-state">
          <div style={{ color: '#C8D1EB', marginBottom: 12 }}><SearchIcon size={40} /></div>
          <p>Aucun diplôme trouvé pour cette adresse.</p>
          <p style={{ fontSize: 12, marginTop: 4, color: '#aaa' }}>
            Vérifiez que l'adresse est correcte et que le diplôme a bien été émis.
          </p>
        </div>
      )}

      {!searched && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <img src="/itu_icon_green.svg" alt="" width="64" style={{ opacity: 0.3, display: 'inline-block', marginBottom: 12 }} />
          <p style={{ fontSize: 13, color: '#aaa' }}>Entrez une adresse Ethereum ci-dessus pour commencer la vérification</p>
        </div>
      )}

      <div style={{ marginTop: 60, padding: 24, background: '#F8F9FD', borderRadius: 14, border: '1px solid #E2E7F4' }}>
        <div className="itu-accent-bar" />
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: '#283a97' }}>Comment ça fonctionne ?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { Icon: FileIcon,  title: 'PDF sur IPFS',          desc: "Le diplôme officiel est stocké de façon permanente sur le réseau décentralisé IPFS." },
            { Icon: LinkIcon,  title: 'NFT non-transférable',  desc: "Un Soulbound Token (SBT) est émis sur Ethereum. Il est lié à vie à l'adresse de l'étudiant." },
            { Icon: CheckIcon, title: 'Vérification publique', desc: "N'importe qui peut vérifier l'authenticité d'un diplôme en quelques secondes, sans intermédiaire." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} style={{ textAlign: 'center' }}>
              <div style={{ color: '#283a97', marginBottom: 8, display: 'flex', justifyContent: 'center' }}><Icon size={28} /></div>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#1A1A1A' }}>{title}</p>
              <p style={{ fontSize: 12, color: '#777' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
