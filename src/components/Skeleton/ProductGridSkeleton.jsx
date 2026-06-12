import ProductCardSkeleton from './ProductCardSkeleton'
import styles from './ProductGridSkeleton.module.scss'

const ProductGridSkeleton = ({ count = 8 }) => (
  <div className={styles.grid}>
    {Array(count).fill().map((_, i) => <ProductCardSkeleton key={i} />)}
  </div>
)
export default ProductGridSkeleton