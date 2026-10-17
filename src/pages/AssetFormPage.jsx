import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAssets } from '../context/AssetContext.jsx'
import { validateAsset } from '../utils/assetUtils.js'
import { STATUSES, TYPES } from '../data/initialAssets.js'

const blank = { name: '', type: TYPES[0], serialNumber: '', assignedTo: '', status: STATUSES[1], purchaseDate: '', price: '' }

export default function AssetFormPage() {
  const { id } = useParams()
  const { assets, addAsset, updateAsset } = useAssets()
  const navigate = useNavigate()
  const existing = id ? assets.find((a) => a.id === Number(id)) : null
  const [form, setForm] = useState(existing ?? blank)
  const [errors, setErrors] = useState({})

  if (id && !existing) return <p className="empty">Asset not found.</p>

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const errs = validateAsset(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    existing ? updateAsset(form) : addAsset(form)
    navigate('/assets')
  }

  const field = (k, label, input) => (
    <label>{label}{input}{errors[k] && <span className="error" role="alert">{errors[k]}</span>}</label>
  )

  return (
    <section>
      <h1>{existing ? 'Edit asset' : 'Add asset'}</h1>
      <form onSubmit={submit} noValidate>
        {field('name', 'Name', <input value={form.name} onChange={set('name')} />)}
        {field('type', 'Type', <select value={form.type} onChange={set('type')}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>)}
        {field('serialNumber', 'Serial number', <input value={form.serialNumber} onChange={set('serialNumber')} />)}
        {field('assignedTo', 'Assigned to', <input value={form.assignedTo} onChange={set('assignedTo')} />)}
        {field('status', 'Status', <select value={form.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>)}
        {field('purchaseDate', 'Purchase date', <input type="date" value={form.purchaseDate} onChange={set('purchaseDate')} />)}
        {field('price', 'Price (USD)', <input type="number" min="0" step="0.01" value={form.price} onChange={set('price')} />)}
        <div className="form-actions">
          <button type="submit" className="btn primary">{existing ? 'Save changes' : 'Add asset'}</button>
          <button type="button" className="btn" onClick={() => navigate('/assets')}>Cancel</button>
        </div>
      </form>
    </section>
  )
}
