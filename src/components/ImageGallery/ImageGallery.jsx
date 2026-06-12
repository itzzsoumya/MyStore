import { memo, useState } from 'react'
import styles from './ImageGallery.module.scss'

const ImageGallery = memo(({ images }) => {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <img src={mainImage} alt="Product" />
      </div>
      <div className={styles.thumbnails}>
        {images.map((img, idx) => (
          <button key={idx} className={`${styles.thumb} ${mainImage === img ? styles.active : ''}`} onClick={() => setMainImage(img)}>
            <img src={img} alt={`Thumb ${idx+1}`} />
          </button>
        ))}
      </div>
    </div>
  )
})

export default ImageGallery