import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import styles from './ProductCard.module.scss'

const ProductCard = memo(({ product }) => {
  if (!product || typeof product !== 'object') return null
  if (!product.id || !product.title || typeof product.price !== 'number') return null

  const { addItem, toggleFavorite, isFavorite } = useCart()
  const favorited = isFavorite(product.id)
  const defaultVariant = { color: 'Black', size: 'M', variantKey: 'Black-M' }

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image || '',
      ...defaultVariant,
      quantity: 1
    })
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({ id: product.id, name: product.title, price: product.price, image: product.image })
  }

  const displayTitle = product.title.length > 40 ? product.title.slice(0, 40) + '…' : product.title
  const displayPrice = typeof product.price === 'number' ? product.price.toFixed(2) : '0'

  return (
    <div className={styles.card}>
      <button 
        className={`${styles.favoriteBtn} ${favorited ? styles.active : ''}`}
        onClick={handleFavorite}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        ♥
      </button>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img 
          src={product.image || 'https://via.placeholder.com/150'} 
          alt={product.title || 'Product'} 
          className={styles.image} 
          loading="lazy"
        />
      </Link>
      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {displayTitle}
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{displayPrice}</span>
          {product.price > 50 && (
            <span className={styles.original}>₹{(product.price * 1.15).toFixed(2)}</span>
          )}
        </div>
        <button className={styles.addBtn} onClick={handleQuickAdd}>
          Quick Add
        </button>
      </div>
    </div>
  )
})

export default ProductCard