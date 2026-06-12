import { useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import ProductGridSkeleton from '../components/Skeleton/ProductGridSkeleton'
import { useCart } from '../contexts/CartContext'
import styles from './ProductListingPage.module.scss'

const ProductListingPage = () => {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { recentlyViewed, favorites } = useCart()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setAllProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [location.key, loadProducts])

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return allProducts
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [allProducts, searchQuery])

  const bestOffers = useMemo(() => filteredProducts.filter(p => p.price > 50), [filteredProducts])
  const trending = useMemo(() => filteredProducts.filter(p => p.id % 2 === 0), [filteredProducts])
  const newArrivals = filteredProducts

  // ✅ Valid recently viewed: must exist in allProducts and have required fields
  const validRecentlyViewed = useMemo(() => {
    if (!Array.isArray(recentlyViewed) || recentlyViewed.length === 0) return []
    if (allProducts.length === 0) return [] // wait for products to load
    const productIds = new Set(allProducts.map(p => p.id))
    const valid = recentlyViewed.filter(item =>
      item && item.id && productIds.has(item.id) && item.title && item.image && typeof item.price === 'number'
    )
    if (valid.length === 0 && recentlyViewed.length > 0) {
      console.warn('Recently viewed items are invalid or missing product data:', recentlyViewed)
    }
    return valid
  }, [recentlyViewed, allProducts])

  const safeFavorites = useMemo(() => {
    if (!Array.isArray(favorites)) return []
    if (allProducts.length === 0) return []
    const productIds = new Set(allProducts.map(p => p.id))
    return favorites.filter(item => item && item.id && productIds.has(item.id))
  }, [favorites, allProducts])

  if (loading) return <ProductGridSkeleton />
  if (error) {
    return (
      <div className={styles.status}>
        <p>Error: {error}</p>
        <button onClick={loadProducts} className={styles.retryBtn}>Retry</button>
      </div>
    )
  }

  return (
    <div className={styles.home}>
      {searchQuery && (
        <div className={styles.searchInfo}>
          Showing results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} products)
        </div>
      )}

      {filteredProducts.length === 0 && searchQuery && (
        <div className={styles.status}>No products found matching "{searchQuery}"</div>
      )}

      {filteredProducts.length > 0 && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>New Arrivals</h2>
            <ProductGrid products={newArrivals} />
          </section>

          {bestOffers.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🔥 Best Offers</h2>
              <ProductGrid products={bestOffers} />
            </section>
          )}

          {trending.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>⚡ Trending Now</h2>
              <ProductGrid products={trending} />
            </section>
          )}
        </>
      )}

      {validRecentlyViewed.length > 0 && !searchQuery && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👁️ Your Watch List (Recently Viewed)</h2>
          <ProductGrid products={validRecentlyViewed} />
        </section>
      )}

      {safeFavorites.length > 0 && !searchQuery && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>❤️ Your Favorites</h2>
          <ProductGrid products={safeFavorites} />
        </section>
      )}
    </div>
  )
}

export default ProductListingPage