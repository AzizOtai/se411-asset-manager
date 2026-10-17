import { filterAssets, validateAsset, summarize } from './assetUtils.js'
import { initialAssets } from '../data/initialAssets.js'

describe('filterAssets', () => {
  it('returns all with no filters', () => expect(filterAssets(initialAssets)).toHaveLength(initialAssets.length))
  it('searches case-insensitively across fields', () => {
    expect(filterAssets(initialAssets, { query: 'MACBOOK' })).toHaveLength(1)
    expect(filterAssets(initialAssets, { query: 'omar' })[0].name).toMatch(/ThinkPad/)
  })
  it('filters by status and type', () => {
    expect(filterAssets(initialAssets, { status: 'Retired' })).toHaveLength(1)
    expect(filterAssets(initialAssets, { type: 'Laptop' })).toHaveLength(2)
  })
  it('returns empty on no match', () => expect(filterAssets(initialAssets, { query: 'zzz' })).toEqual([]))
})

describe('validateAsset', () => {
  it('flags missing fields', () => {
    expect(Object.keys(validateAsset({ name: '', serialNumber: '', price: '', purchaseDate: '' }))).toHaveLength(4)
  })
  it('rejects negative price', () => {
    expect(validateAsset({ name: 'a', serialNumber: 'b', price: -1, purchaseDate: '2024-01-01' }).price).toBeDefined()
  })
  it('accepts valid asset', () => {
    expect(validateAsset({ name: 'a', serialNumber: 'b', price: 10, purchaseDate: '2024-01-01' })).toEqual({})
  })
})

describe('summarize', () => {
  it('counts and totals', () => {
    const s = summarize(initialAssets)
    expect(s.total).toBe(6)
    expect(s.byStatus['In Use']).toBe(3)
    expect(s.totalValue).toBe(12809)
  })
})
