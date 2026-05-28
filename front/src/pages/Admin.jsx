import { useState } from 'react'

const MetaMaskIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 35 33" xmlns="http://www.w3.org/2000/svg">
    <polygon points="32.9582,0.5 19.1945,10.3304 21.6875,4.3877" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="2.0332,0.5 15.6986,10.4258 13.3039,4.3877" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="28.0098,23.5334 24.2891,29.3398 32.1738,31.5117 34.4375,23.6587" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="0.5742,23.6587 2.8262,31.5117 10.7109,29.3398 6.9902,23.5334" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const LockIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#8898d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const UploadIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
)
const PlusIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const ListIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
)
const ExternalLinkIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const CheckIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const XIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const RECENT_DIPLOMAS_MOCK = [
  { name: 'John Doe',   degree: 'L3 - Web Intégration et Web Designer',   date: '28/05/2026', mention: 'TB' },
  { name: 'Marie Dupont',  degree: 'L3 - Base de données et Réseaux',            date: '27/05/2026', mention: 'B'  },
  { name: 'Jean Rakoto',   degree: 'L3 - Design et Communication Digital', date: '26/05/2026', mention: 'AB' },
  { name: 'Aicha Diallo',  degree: 'L3 - Web Intégration et Web Designer',    date: '25/05/2026', mention: 'TB' },
]

const MENTION_BADGE = {
  'Très Bien':  { bg: '#f0f7d4', color: '#3a6010', short: 'TB' },
  'Bien':       { bg: '#E6F1FB', color: '#0C447C', short: 'B'  },
  'Assez Bien': { bg: '#FAEEDA', color: '#633806', short: 'AB' },
  'Passable':   { bg: '#F1EFE8', color: '#444441', short: 'P'  },
}

export default function Admin({ walletAddress, isOwner }) {
  const [form, setForm] = useState({
    studentAddress: '',
    studentName:    '',
    degree:         'Licence en Informatique - Option Web Intégration et Web Designer',
    mention:        'Très Bien',
    year:           '2026',
  })
  const [pdfFile, setPdfFile]     = useState(null)
  const [ipfsCid, setIpfsCid]     = useState('')
  const [uploading, setUploading] = useState(false)
  const [minting, setMinting]     = useState(false)
  const [txHash, setTxHash]       = useState('')
  const [mintError, setMintError] = useState('')

  if (!walletAddress) {
    return (
      <main className="page-wrapper" style={{ textAlign: 'center', paddingTop: 80 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
          <MetaMaskIcon size={52} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#283a97' }}>Connexion requise</h2>
        <p style={{ color: '#555' }}>Connectez votre wallet MetaMask pour accéder au tableau de bord.</p>
      </main>
    )
  }

  if (!isOwner) {
    return (
      <main className="page-wrapper" style={{ textAlign: 'center', paddingTop: 80 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
          <LockIcon size={52} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#283a97' }}>Accès refusé</h2>
        <p style={{ color: '#555' }}>Seul le propriétaire du contrat (l'université) peut accéder à cette page.</p>
      </main>
    )
  }

  const handleInput = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Veuillez sélectionner un fichier PDF.')
      return
    }
    setPdfFile(file)
    setIpfsCid('')
    setUploading(true)
    await new Promise(r => setTimeout(r, 1200))
    setIpfsCid('QmX9bJX3kFRs7tWvFp1LkGz8mN5sQ2yRhTc4wU6vD8eA1b')
    setUploading(false)
  }

  const handleMint = async () => {
    if (!form.studentAddress || !form.studentName || !ipfsCid) {
      alert('Veuillez remplir tous les champs et uploader le PDF sur IPFS.')
      return
    }
    if (!/^0x[0-9a-fA-F]{40}$/.test(form.studentAddress)) {
      alert('Adresse Ethereum invalide.')
      return
    }
    setMinting(true)
    setMintError('')
    setTxHash('')
    // TODO: brancher mintDiploma() depuis utils/contract.js
    await new Promise(r => setTimeout(r, 1500))
    setTxHash('0xSIMULATED_' + Date.now())
    setForm({ studentAddress: '', studentName: '', degree: 'Licence en Informatique - Option Web Intégration et Web Designer', mention: 'Très Bien', year: '2026' })
    setPdfFile(null)
    setIpfsCid('')
    setMinting(false)
  }

  return (
    <main className="page-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <img src="/itu_logo_positif.svg" alt="ITU" height="24" />
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#283a97' }}>Tableau de bord</h1>
          <p style={{ fontSize: 13, color: '#777' }}>
            Connecté en tant qu'owner · <span className="mono">{walletAddress}</span>
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-value">—</div>
          <div className="stat-label">Diplômes émis</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">2026</div>
          <div className="stat-label">Promotion actuelle</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: 18 }}>Sepolia</div>
          <div className="stat-label">Réseau actif</div>
        </div>
      </div>

      {txHash && (
        <div style={{
          padding: '12px 16px', marginBottom: 20,
          background: '#f0f7d4', border: '1px solid #b2d235',
          borderRadius: 10, fontSize: 13, color: '#3a6010',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <CheckIcon size={14} />
          Diplôme émis avec succès !{' '}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank" rel="noreferrer"
            style={{ color: '#3a6010', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3 }}
          >
            Voir la transaction <ExternalLinkIcon size={11} />
          </a>
        </div>
      )}

      {mintError && (
        <div style={{
          padding: '12px 16px', marginBottom: 20,
          background: '#FCEBEB', border: '1px solid #F7C1C1',
          borderRadius: 10, fontSize: 13, color: '#791F1F',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <XIcon size={14} /> {mintError}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        <div className="card">
          <div className="itu-accent-bar" />
          <p className="section-title"><PlusIcon /> Émettre un diplôme</p>

          <div className="form-group">
            <label>Adresse Ethereum de l'étudiant</label>
            <input
              type="text"
              placeholder="0x…"
              value={form.studentAddress}
              onChange={handleInput('studentAddress')}
              style={{ fontFamily: 'Courier New, monospace', fontSize: 12 }}
            />
          </div>

          <div className="form-group">
            <label>Nom complet de l'étudiant</label>
            <input type="text" placeholder="Ex: John Doe" value={form.studentName} onChange={handleInput('studentName')} />
          </div>

          <div className="form-row-2">
            <div>
              <label>Filière / Diplôme</label>
              <input type="text" value={form.degree} onChange={handleInput('degree')} />
            </div>
            <div>
              <label>Mention</label>
              <select value={form.mention} onChange={handleInput('mention')}>
                <option>Très Bien</option>
                <option>Bien</option>
                <option>Assez Bien</option>
                <option>Passable</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Année d'obtention</label>
            <input type="text" value={form.year} onChange={handleInput('year')} />
          </div>

          <div className="form-group">
            <label>PDF du diplôme officiel</label>
            <label htmlFor="pdf-upload" className="upload-zone" style={{ cursor: 'pointer' }}>
              <div style={{ color: '#283a97', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                <UploadIcon size={28} />
              </div>
              <p>{pdfFile ? pdfFile.name : 'Glisser-déposer le PDF'}</p>
              <span>{pdfFile ? '' : 'ou cliquer pour choisir (.pdf)'}</span>
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handlePdfUpload}
            />
          </div>

          {uploading && (
            <div style={{ fontSize: 13, color: '#283a97', marginBottom: 12, fontWeight: 500 }}>
              Upload sur IPFS en cours…
            </div>
          )}
          {ipfsCid && (
            <div className="form-group">
              <label>CID IPFS (généré automatiquement)</label>
              <div className="cid-box mono">{ipfsCid}</div>
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15 }}
            onClick={handleMint}
            disabled={minting || uploading || !ipfsCid}
          >
            <img src="/itu_icon_white.svg" alt="" width="16" style={{ flexShrink: 0 }} />
            {minting ? 'Transaction en cours…' : 'Émettre le diplôme (Mint SBT)'}
          </button>
          <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 8 }}>
            MetaMask va s'ouvrir pour confirmer la transaction
          </p>
        </div>

        <div className="card">
          <div className="itu-accent-bar" />
          <p className="section-title"><ListIcon /> Derniers diplômes émis</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {RECENT_DIPLOMAS_MOCK.map((d, i) => {
              const shortMap = { TB: 'Très Bien', B: 'Bien', AB: 'Assez Bien', P: 'Passable' }
              const m = MENTION_BADGE[shortMap[d.mention]] || MENTION_BADGE['Passable']
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 0.8fr',
                  alignItems: 'center', gap: 8,
                  padding: '10px 12px', background: '#F8F9FD',
                  borderRadius: 8, fontSize: 13,
                  border: '1px solid #E2E7F4'
                }}>
                  <span style={{ fontWeight: 600 }}>{d.name}</span>
                  <span style={{ color: '#777', fontSize: 12 }}>{d.degree}</span>
                  <span style={{ color: '#777', fontSize: 12 }}>{d.date}</span>
                  <span className="badge" style={{ background: m.bg, color: m.color, fontSize: 10 }}>
                    {d.mention}
                  </span>
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 11, color: '#aaa', marginTop: 12, textAlign: 'center' }}>
            Données de démonstration
          </p>
        </div>
      </div>
    </main>
  )
}
