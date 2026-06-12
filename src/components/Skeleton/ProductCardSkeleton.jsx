import styles from './ProductCardSkeleton.module.scss'

const ProductCardSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.image}></div>
    <div className={styles.title}></div>
    <div className={styles.price}></div>
    <div className={styles.button}></div>
  </div>
)
export default ProductCardSkeleton