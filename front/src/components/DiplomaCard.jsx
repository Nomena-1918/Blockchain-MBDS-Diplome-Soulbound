export default function DiplomaCard({ diploma, compact }) {
  if (!diploma) return null
  return (
    <div className="card">
      <p style={{ fontWeight: 700, color: '#283a97' }}>{diploma.studentName}</p>
      <p style={{ color: '#555', fontSize: 13 }}>{diploma.degree} · {diploma.year}</p>
    </div>
  )
}
