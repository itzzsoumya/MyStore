import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductGrid.module.scss'

const ProductGrid = ({ products }) => {
  const productArray = Array.isArray(products) ? products : []
  
  if (productArray.length === 0) {
    return <div className={styles.empty}>No products to show</div>
  }
  
  return (
    <div className={styles.grid}>
      {productArray.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid