import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAssets } from '../context/AssetContext.jsx'
import { filterAssets } from '../utils/assetUtils.js'
import { STATUSES, TYPES } from '../data/initialAssets.js'

export default function AssetsPage() {
  const { assets, removeAsset } = useAssets()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [type, setType] = useState('All')
  const visible = useMemo(() => filterAssets(assets, { query, status, type }), [assets, query, status, type])

  const onDelete = (a) => {
    if (window.confirm(`Delete "${a.name}"?`)) removeAsset(a.id)
  }

  return (
    <section>
      <h1>Assets</h1>
      <div className="toolbar">
        <input type="search" placeholder="Search name, serial, owner…" aria-label="Search assets" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select aria-label="Filter by type" value={type} onChange={(e) => setType(e.target.value)}>
          <option>All</option>{TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <Link to="/assets/new" className="btn primary">+ Add asset</Link>
      </div>
      {visible.length === 0 ? (
        <p className="empty">No assets found.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Type</th><th>Serial #</th><th>Assigned to</th><th>Status</th><th>Purchased</th><th>Price</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {visible.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td><td>{a.type}</td><td>{a.serialNumber}</td><td>{a.assignedTo || '—'}</td>
                  <td><span className={`badge ${a.status.replace(/\s/g, '').toLowerCase()}`}>{a.status}</span></td>
                  <td>{a.purchaseDate}</td><td>${Number(a.price).toLocaleString()}</td>
                  <td className="actions">
                    <Link to={`/assets/${a.id}/edit`} className="btn small">Edit</Link>
                    <button className="btn small danger" onClick={() => onDelete(a)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="muted">Showing {visible.length} of {assets.length} assets</p>
    </section>
  )
}
