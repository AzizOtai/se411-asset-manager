export function filterAssets(assets, { query = '', status = 'All', type = 'All' } = {}) {
  const q = query.trim().toLowerCase()
  return assets.filter((a) => {
    if (status !== 'All' && a.status !== status) return false
    if (type !== 'All' && a.type !== type) return false
    if (!q) return true
    return [a.name, a.type, a.serialNumber, a.assignedTo, a.status].some((f) =>
      String(f ?? '').toLowerCase().includes(q),
    )
  })
}

export function validateAsset(a) {
  const errors = {}
  if (!a.name?.trim()) errors.name = 'Name is required'
  if (!a.serialNumber?.trim()) errors.serialNumber = 'Serial number is required'
  if (a.price === '' || a.price == null || Number.isNaN(Number(a.price)) || Number(a.price) < 0)
    errors.price = 'Price must be a non-negative number'
  if (!a.purchaseDate) errors.purchaseDate = 'Purchase date is required'
  return errors
}

export function summarize(assets) {
  const byStatus = {}
  let totalValue = 0
  for (const a of assets) {
    byStatus[a.status] = (byStatus[a.status] || 0) + 1
    totalValue += Number(a.price) || 0
  }
  return { total: assets.length, byStatus, totalValue }
}
