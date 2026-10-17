import { assetReducer } from './AssetContext.jsx'

const base = [{ id: 1, name: 'A', price: 1 }, { id: 2, name: 'B', price: 2 }]

describe('assetReducer', () => {
  it('adds with next id and numeric price', () => {
    const s = assetReducer(base, { type: 'add', asset: { name: 'C', price: '5' } })
    expect(s).toHaveLength(3)
    expect(s[2]).toMatchObject({ id: 3, price: 5 })
  })
  it('updates by id', () => {
    const s = assetReducer(base, { type: 'update', asset: { id: 2, name: 'B2', price: '9' } })
    expect(s[1]).toMatchObject({ name: 'B2', price: 9 })
  })
  it('removes by id', () => expect(assetReducer(base, { type: 'remove', id: 1 })).toEqual([base[1]]))
  it('ignores unknown actions', () => expect(assetReducer(base, { type: 'x' })).toBe(base))
})
