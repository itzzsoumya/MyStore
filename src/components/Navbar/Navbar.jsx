import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import CartDrawer from '../CartDrawer/CartDrawer'
import FavoritesDrawer from '../FavoritesDrawer/FavoritesDrawer'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const { itemCount, favoritesCount } = useCart()
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [favDrawerOpen, setFavDrawerOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const location = useLocation()

  const updateSearch = useCallback((value) => {
    if (location.pathname === '/') {
      if (value.trim()) {
        setSearchParams({ search: value })
      } else {
        setSearchParams({})
      }
    }
  }, [location.pathname, setSearchParams])

  useEffect(() => {
    const timeoutId = setTimeout(() => updateSearch(searchTerm), 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, updateSearch])

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>MyStore</Link>
          <div className={styles.desktopSearch}>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={styles.searchInput} />
              <span className={styles.searchIcon}>🔍</span>
            </div>
          </div>
          <div className={styles.icons}>
            <button className={styles.iconBtn} onClick={() => setFavDrawerOpen(true)}>❤️{favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}</button>
            <button className={styles.iconBtn} onClick={() => setCartDrawerOpen(true)}>🛒{itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}</button>
          </div>
          <div className={styles.mobileIcons}>
            <button className={styles.iconBtn} onClick={() => setMobileSearchOpen(true)}>🔍</button>
            <button className={styles.iconBtn} onClick={() => setFavDrawerOpen(true)}>❤️{favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}</button>
            <button className={styles.iconBtn} onClick={() => setCartDrawerOpen(true)}>🛒{itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}</button>
          </div>
        </div>
      </nav>
      {mobileSearchOpen && (
        <div className={styles.mobileSearchDrawer}>
          <div className={styles.mobileSearchHeader}>
            <button onClick={() => setMobileSearchOpen(false)} className={styles.closeSearch}>←</button>
            <div className={styles.mobileSearchBar}>
              <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} autoFocus className={styles.mobileSearchInput} />
              <span className={styles.searchIcon}>🔍</span>
            </div>
          </div>
        </div>
      )}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <FavoritesDrawer isOpen={favDrawerOpen} onClose={() => setFavDrawerOpen(false)} />
    </>
  )
}
export default Navbar