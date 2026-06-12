const API_BASE = 'https://fakestoreapi.com'

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return data.filter(p => p && typeof p.id !== 'undefined' && p.title).map(p => ({
    ...p,
    price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
    image: p.image || 'https://via.placeholder.com/150'
  }))
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  const data = await res.json()
  return {
    ...data,
    price: typeof data.price === 'number' ? data.price : parseFloat(data.price) || 0,
    image: data.image || 'https://via.placeholder.com/400'
  }
}