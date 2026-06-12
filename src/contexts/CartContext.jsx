import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo, useRef } from 'react'

const CartContext = createContext()

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

const initialState = {
  cartItems: [],
  favorites: [],
  recentlyViewed: []
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.cartItems.find(
        i => i.id === action.payload.id && i.variantKey === action.payload.variantKey
      )
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.id === action.payload.id && i.variantKey === action.payload.variantKey
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          )
        }
      }
      return { ...state, cartItems: [...state.cartItems, { ...action.payload }] }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          i => !(i.id === action.payload.id && i.variantKey === action.payload.variantKey)
        )
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(i =>
          i.id === action.payload.id && i.variantKey === action.payload.variantKey
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
      }
    case 'CLEAR_CART':
      return { ...state, cartItems: [] }

    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.some(f => f.id === action.payload.id)
      if (exists) {
        return { ...state, favorites: state.favorites.filter(f => f.id !== action.payload.id) }
      } else {
        return { ...state, favorites: [...state.favorites, action.payload] }
      }
    }

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload)
      }

    case 'ADD_RECENTLY_VIEWED': {
      const payload = action.payload
      if (!payload?.id || !payload?.title || !payload?.image || typeof payload.price !== 'number') {
        return state
      }
      const filtered = state.recentlyViewed.filter(i => i.id !== payload.id)
      const updated = [payload, ...filtered].slice(0, 8)
      return { ...state, recentlyViewed: updated }
    }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => ({
    cartItems: loadFromStorage('cart', []),
    favorites: loadFromStorage('favorites', []),
    recentlyViewed: loadFromStorage('recentlyViewed', [])
  }))

  const timeoutRef = useRef(null)
  const persist = useCallback((key, value) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => saveToStorage(key, value), 300)
  }, [])

  useEffect(() => { persist('cart', state.cartItems) }, [state.cartItems, persist])
  useEffect(() => { persist('favorites', state.favorites) }, [state.favorites, persist])
  useEffect(() => { persist('recentlyViewed', state.recentlyViewed) }, [state.recentlyViewed, persist])

  const addItem = useCallback((item) => dispatch({ type: 'ADD_ITEM', payload: item }), [])
  const removeItem = useCallback((id, variantKey) => dispatch({ type: 'REMOVE_ITEM', payload: { id, variantKey } }), [])
  const updateQuantity = useCallback((id, variantKey, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, variantKey, quantity } }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const toggleFavorite = useCallback((product) => dispatch({ type: 'TOGGLE_FAVORITE', payload: product }), [])
  const removeFavorite = useCallback((id) => dispatch({ type: 'REMOVE_FAVORITE', payload: id }), [])
  const addRecentlyViewed = useCallback((product) => {
    const safe = {
      id: Number(product.id),
      title: product.title || 'Untitled',
      name: product.title || 'Untitled',
      price: typeof product.price === 'number' ? product.price : Number(product.price) || 0,
      image: product.image || 'https://via.placeholder.com/150',
      description: product.description || ''
    }
    dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: safe })
  }, [])

  const isFavorite = useCallback((id) => state.favorites.some(f => f.id === id), [state.favorites])
  const itemCount = useMemo(() => state.cartItems.reduce((s, i) => s + i.quantity, 0), [state.cartItems])
  const subtotal = useMemo(() => state.cartItems.reduce((s, i) => s + i.price * i.quantity, 0), [state.cartItems])
  const favoritesCount = useMemo(() => state.favorites.length, [state.favorites])

  const value = useMemo(() => ({
    cart: state.cartItems,
    favorites: state.favorites,
    recentlyViewed: state.recentlyViewed,
    addItem, removeItem, updateQuantity, clearCart,
    toggleFavorite, removeFavorite, addRecentlyViewed, isFavorite,
    itemCount, subtotal, favoritesCount
  }), [state.cartItems, state.favorites, state.recentlyViewed, addItem, removeItem, updateQuantity, clearCart, toggleFavorite, removeFavorite, addRecentlyViewed, isFavorite, itemCount, subtotal, favoritesCount])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}