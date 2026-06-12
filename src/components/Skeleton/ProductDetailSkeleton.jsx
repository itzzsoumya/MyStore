import styles from './ProductDetailSkeleton.module.scss'

const ProductDetailSkeleton = () => {
  return (
    <div className={styles.page}>
      <div className={styles.backBtn}></div>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}></div>
          <div className={styles.thumbnails}>
            <div className={styles.thumb}></div>
            <div className={styles.thumb}></div>
            <div className={styles.thumb}></div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.title}></div>
          <div className={styles.brand}></div>
          <div className={styles.price}></div>
          <div className={styles.selector}></div>
          <div className={styles.quantity}></div>
          <div className={styles.button}></div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton