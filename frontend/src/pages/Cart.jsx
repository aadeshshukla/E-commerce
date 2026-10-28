import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQty, removeItem, total, count } = useCart()

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <h2>Your cart is empty</h2>
        <p className="muted">Browse the shop and add something you like.</p>
        <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    )
  }

  return (
    <div className="container section">
      <h2>Shopping Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-info">
                <Link to={`/product/${item.productId}`} className="product-name">
                  {item.name}
                </Link>
                <span className="muted">${item.price.toFixed(2)} each</span>
              </div>
              <div className="qty-row">
                <button className="qty-btn" onClick={() => updateQty(item.productId, item.quantity - 1)}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQty(item.productId, item.quantity + 1)}>+</button>
              </div>
              <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
              <button className="remove-btn" onClick={() => removeItem(item.productId)}>Remove</button>
            </div>
          ))}
        </div>
        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Items</span><span>{count}</span></div>
          <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <Link to="/checkout" className="btn btn-primary btn-lg btn-block">Proceed to Checkout</Link>
        </aside>
      </div>
    </div>
  )
}
