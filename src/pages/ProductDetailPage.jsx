import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../services/productService'
import { generateVariants, getProductExtraImages } from '../utils/productHelpers'
import ImageGallery from '../components/ImageGallery/ImageGallery'
import VariantSelector from '../components/VariantSelector/VariantSelector'
import QuantitySelector from '../components/QuantitySelector/QuantitySelector'
import ProductDetailSkeleton from '../components/Skeleton/ProductDetailSkeleton'
import { useCart } from '../contexts/CartContext'
import styles from './ProductDetailPage.module.scss'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addItem, addRecentlyViewed, toggleFavorite, isFavorite } = useCart()
  const hasAdded = useRef(false)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [variants, setVariants] = useState([])

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchProductById(id)
      .then(data => {
        setProduct(data)
        const generated = generateVariants(parseInt(id))
        setVariants(generated)
        const colorParam = searchParams.get('color')
        const sizeParam = searchParams.get('size')
        if (colorParam && sizeParam && generated.some(v => v.color === colorParam && v.size === sizeParam)) {
          setSelectedColor(colorParam)
          setSelectedSize(sizeParam)
        } else if (generated.length) {
          setSelectedColor(generated[0].color)
          setSelectedSize(generated[0].size)
        }
        setLoading(false)
      })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [id, searchParams])

  useEffect(() => {
    if (selectedColor && selectedSize) {
      setSearchParams({ color: selectedColor, size: selectedSize })
    }
  }, [selectedColor, selectedSize, setSearchParams])

  useEffect(() => {
    if (product && !hasAdded.current) {
      addRecentlyViewed({
        id: product.id,
        title: product.title,
        name: product.title,
        price: product.price,
        image: product.image,
        description: product.description || ''
      })
      hasAdded.current = true
    }
  }, [product, addRecentlyViewed])

  const selectedVariant = useMemo(
    () => variants.find(v => v.color === selectedColor && v.size === selectedSize),
    [variants, selectedColor, selectedSize]
  )
  const isSoldOut = useMemo(() => !selectedVariant || selectedVariant.stock === 0, [selectedVariant])
  const favorited = useMemo(() => product && isFavorite(product.id), [product, isFavorite])
  const extraImages = useMemo(() => product && getProductExtraImages(parseInt(id), product.image), [product, id])

  const handleAddToCart = useCallback(() => {
    if (!product || isSoldOut) return
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      variantKey: `${selectedColor}-${selectedSize}`,
      quantity
    })
  }, [product, isSoldOut, addItem, selectedColor, selectedSize, quantity])

  const handleToggleFavorite = useCallback(() => {
    if (product) toggleFavorite({ id: product.id, name: product.title, price: product.price, image: product.image })
  }, [product, toggleFavorite])

  if (loading) return <ProductDetailSkeleton />
  if (error) return <div className={styles.status}>Error: {error}</div>
  if (!product) return <div className={styles.status}>Product not found</div>

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>← Back to Shop</button>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <ImageGallery images={extraImages} />
        </div>
        <div className={styles.details}>
          <div className={styles.header}>
            <h1 className={styles.title}>{product.title}</h1>
            <button className={`${styles.favoriteIcon} ${favorited ? styles.active : ''}`} onClick={handleToggleFavorite}>♥</button>
          </div>
          <p className={styles.brand}>Fashion Hub</p>
          <div className={styles.price}>
            <span className={styles.current}>₹{product.price.toFixed(2)}</span>
            {product.price > 50 && <span className={styles.old}>₹{(product.price * 1.15).toFixed(2)}</span>}
          </div>
          <VariantSelector
            variants={variants}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
          />
          {!isSoldOut && <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={selectedVariant.stock} />}
          <button className={`${styles.addBtn} ${isSoldOut ? styles.disabled : ''}`} onClick={handleAddToCart} disabled={isSoldOut}>
            {isSoldOut ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage