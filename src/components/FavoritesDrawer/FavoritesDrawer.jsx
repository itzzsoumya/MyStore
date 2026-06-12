import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import styles from './FavoritesDrawer.module.scss'

const FavoritesDrawer = ({ isOpen, onClose }) => {
  const { favorites, removeFavorite } = useCart()

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3>Your Favorites ❤️</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div className={styles.items}>
          {favorites.length === 0 ? (
            <p className={styles.empty}>No favorites yet. Click the heart ❤️ on products to add.</p>
          ) : (
            favorites.map(item => (
              <div key={item.id} className={styles.item}>
                <Link to={`/product/${item.id}`} onClick={onClose} className={styles.imageLink}>
                  <img src={item.image} alt={item.name} className={styles.thumbnail} />
                </Link>
                <div className={styles.details}>
                  <Link to={`/product/${item.id}`} onClick={onClose} className={styles.name}>
                    {item.name.length > 40 ? item.name.slice(0,40)+'…' : item.name}
                  </Link>
                  <p className={styles.price}>₹{item.price.toFixed(2)}</p>
                </div>
                <button
                  className={styles.remove}
                  onClick={() => removeFavorite(item.id)}
                  aria-label="Remove from favorites"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default FavoritesDrawer