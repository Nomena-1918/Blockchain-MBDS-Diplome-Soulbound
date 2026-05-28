const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const FileIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
)

const CopyIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
)

const ExternalLinkIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const LockIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const MENTION_STYLES = {
  'Très Bien': { bg: '#f0f7d4', color: '#3a6010', short: 'TB' },
  'Bien':      { bg: '#E6F1FB', color: '#0C447C', short: 'B'  },
  'Assez Bien':{ bg: '#FAEEDA', color: '#633806', short: 'AB' },
  'Passable':  { bg: '#F1EFE8', color: '#444441', short: 'P'  },
}

export default function DiplomaCard({ diploma, compact = false }) {
  if (!diploma) return null

  const mention = MENTION_STYLES[diploma.mention] || MENTION_STYLES['Passable']
  const initials = diploma.studentName
    ? diploma.studentName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  if (compact) {
    return (
      <div className="card" style={{ marginTop: 20 }}>
        {/* En-tête */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#e8ecf8', color: '#283a97',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 15, flexShrink: 0,
            border: '2px solid #8898d4'
          }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A' }}>{diploma.studentName}</p>
            <p style={{ fontSize: 13, color: '#555' }}>IT University Madagascar · Promo {diploma.year}</p>
          </div>
          <span className="badge badge-success" style={{ gap: 4 }}>
            <CheckIcon /> Diplôme valide
          </span>
        </div>

        {/* Infos principales */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <InfoField label="Diplôme" value={diploma.degree} />
          <InfoField label="Mention">
            <span className="badge" style={{ background: mention.bg, color: mention.color }}>
              {diploma.mention}
            </span>
          </InfoField>
          <InfoField label="Année d'obtention" value={diploma.year} />
          <InfoField label="Token ID" value={`#${String(diploma.tokenId).padStart(4, '0')}`} />
        </div>

        {/* Lien IPFS */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 12px', background: '#F8F9FD',
          borderRadius: 8, fontSize: 13, color: '#555',
          border: '1px solid #E2E7F4'
        }}>
          <FileIcon size={14} />
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Diplôme officiel PDF
          </span>
          <a
            href={`https://ipfs.io/ipfs/${diploma.ipfsCid}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#283a97', fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            Voir sur IPFS <ExternalLinkIcon size={11} />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div style={{
          width: 100, height: 120, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(160deg, #283a97 0%, #1a2a6e 100%)',
          border: '1px solid #8898d4',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: 12
        }}>
          <img src="/itu_icon_white.svg" alt="ITU" width="54" style={{ display: 'block' }} />
          <span style={{ fontSize: 9, color: '#b2d235', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
            SBT #{String(diploma.tokenId).padStart(4, '0')}
          </span>
        </div>

        {/* Informations */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>
            {diploma.degree}
          </p>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
            IT University Madagascar · Promotion {diploma.year}
          </p>
          <p style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A', marginBottom: 10 }}>
            {diploma.studentName}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span className="badge" style={{ background: mention.bg, color: mention.color }}>
              Mention {diploma.mention}
            </span>
            <span className="badge badge-lock" style={{ gap: 4 }}>
              <LockIcon /> Non-transférable
            </span>
          </div>

          {/* Boutons actions */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/?address=${diploma.studentAddress}`)}>
              <CopyIcon /> Copier le lien
            </button>
            <a
              href={`https://sepolia.etherscan.io/token/${diploma.contractAddress}?a=${diploma.tokenId}`}
              target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button className="btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}>
                <ExternalLinkIcon /> Etherscan
              </button>
            </a>
            <a
              href={`https://ipfs.io/ipfs/${diploma.ipfsCid}`}
              target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button className="btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}>
                <FileIcon size={13} /> PDF officiel
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoField({ label, value, children }) {
  return (
    <div>
      <p style={{ fontSize: 11, color: '#7a7a8c', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</p>
      {children || <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>{value}</p>}
    </div>
  )
}
