import { createContext, useContext, useReducer, useMemo } from 'react'
import { initialAssets } from '../data/initialAssets.js'

const AssetContext = createContext(null)

export function assetReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const id = state.reduce((m, a) => Math.max(m, a.id), 0) + 1
      return [...state, { ...action.asset, id, price: Number(action.asset.price) }]
    }
    case 'update':
      return state.map((a) =>
        a.id === action.asset.id ? { ...a, ...action.asset, price: Number(action.asset.price) } : a,
      )
    case 'remove':
      return state.filter((a) => a.id !== action.id)
    default:
      return state
  }
}

export function AssetProvider({ children, initial = initialAssets }) {
  const [assets, dispatch] = useReducer(assetReducer, initial)
  const value = useMemo(
    () => ({
      assets,
      addAsset: (asset) => dispatch({ type: 'add', asset }),
      updateAsset: (asset) => dispatch({ type: 'update', asset }),
      removeAsset: (id) => dispatch({ type: 'remove', id }),
    }),
    [assets],
  )
  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
}

export function useAssets() {
  const ctx = useContext(AssetContext)
  if (!ctx) throw new Error('useAssets must be used within AssetProvider')
  return ctx
}
