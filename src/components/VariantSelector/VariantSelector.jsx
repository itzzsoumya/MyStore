import { memo } from 'react'
import styles from './VariantSelector.module.scss'

const VariantSelector = memo(({ variants, selectedColor, selectedSize, onColorChange, onSizeChange }) => {
  const uniqueColors = [...new Set(variants.map(v => v.color))]
  const uniqueSizes = [...new Set(variants.map(v => v.size))]

  const getSizeStatus = (size) => {
    const available = variants.some(v => v.size === size && v.stock > 0)
    if (!available) return 'soldout'
    const lowStock = variants.some(v => v.size === size && v.stock > 0 && v.stock <= 3)
    return lowStock ? 'lowstock' : 'available'
  }

  return (
    <div className={styles.selector}>
      <div className={styles.section}>
        <label>Colour:</label>
        <div className={styles.swatches}>
          {uniqueColors.map(color => (
            <button
              key={color}
              className={`${styles.swatch} ${selectedColor === color ? styles.active : ''}`}
              style={{ backgroundColor: color === 'Black' ? '#111' : color === 'White' ? '#f0f0f0' : color }}
              onClick={() => onColorChange(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <label>Size:</label>
        <div className={styles.sizes}>
          {uniqueSizes.map(size => {
            const status = getSizeStatus(size)
            return (
              <button
                key={size}
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''} ${styles[status]}`}
                onClick={() => status !== 'soldout' && onSizeChange(size)}
                disabled={status === 'soldout'}
              >
                {size}
                {status === 'lowstock' && <span className={styles.lowStockBadge}>Low</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
})

export default VariantSelector