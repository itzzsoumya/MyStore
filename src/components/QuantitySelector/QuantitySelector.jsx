import { memo } from 'react'
import styles from './QuantitySelector.module.scss'

const QuantitySelector = memo(({ quantity, setQuantity, stock }) => {
  const decrease = () => { if (quantity > 1) setQuantity(quantity - 1) }
  const increase = () => { if (quantity < stock) setQuantity(quantity + 1) }

  return (
    <div className={styles.selector}>
      <label>Quantity:</label>
      <div className={styles.controls}>
        <button onClick={decrease}>-</button>
        <span>{quantity}</span>
        <button onClick={increase}>+</button>
      </div>
      <span className={styles.stock}>{stock} available</span>
    </div>
  )
})

export default QuantitySelector