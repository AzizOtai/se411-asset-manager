import { Link } from 'react-router-dom'
import { useAssets } from '../context/AssetContext.jsx'
import { summarize } from '../utils/assetUtils.js'
import { STATUSES } from '../data/initialAssets.js'

export default function Dashboard() {
  const { assets } = useAssets()
  const { total, byStatus, totalValue } = summarize(assets)
  return (
    <section>
      <h1>Dashboard</h1>
      <div className="cards">
        <div className="card"><h3>Total assets</h3><p className="big">{total}</p></div>
        <div className="card"><h3>Total value</h3><p className="big">${totalValue.toLocaleString()}</p></div>
        {STATUSES.map((s) => (
          <div className="card" key={s}><h3>{s}</h3><p className="big">{byStatus[s] || 0}</p></div>
        ))}
      </div>
      <p><Link to="/assets" className="btn">View all assets</Link> <Link to="/assets/new" className="btn primary">Add asset</Link></p>
    </section>
  )
}
