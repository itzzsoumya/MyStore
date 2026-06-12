import { useCart } from '../../contexts/CartContext'
import styles from './CartDrawer.module.scss'

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeItem, updateQuantity, subtotal } = useCart()

  const handleQuantityChange = (item, newQty) => {
    if (newQty < 1) {
      removeItem(item.id, item.variantKey)
    } else {
      updateQuantity(item.id, item.variantKey, newQty)
    }
  }

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3>Your Cart</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div className={styles.items}>
          {cart.length === 0 ? (
            <p className={styles.empty}>Cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={`${item.id}-${item.variantKey}`} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.thumbnail} />
                <div className={styles.details}>
                  <p className={styles.name}>{item.name.length > 30 ? item.name.slice(0,30)+'…' : item.name}</p>
                  <p className={styles.variant}>{item.color} / {item.size}</p>
                  <p className={styles.price}>₹{item.price.toFixed(2)}</p>
                  <div className={styles.qtyControl}>
                    <button onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className={styles.remove} onClick={() => removeItem(item.id, item.variantKey)}>🗑️</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <strong>Total</strong>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>
            <button className={styles.checkoutBtn}>Proceed to Checkout →</button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer