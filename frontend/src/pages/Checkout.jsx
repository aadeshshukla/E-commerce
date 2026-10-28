import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'

const EMPTY_FORM = { customerName: '', email: '', phone: '', address: '', city: '', postalCode: '' }

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [placing, setPlacing] = useState(false)
  const navigate = useNavigate()

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const placeOrder = async (e) => {
    e.preventDefault()
    setError('')
    setPlacing(true)
    try {
      const order = await api.placeOrder({
        ...form,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      })
      clearCart()
      navigate(`/order-success?orderNumber=${order.orderNumber}`)
    } catch (err) {
      setError(err.message)
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <h2>Nothing to checkout</h2>
        <p className="muted">Your cart is empty.</p>
        <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    )
  }

  return (
    <div className="container section">
      <h2>Checkout</h2>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Shipping Details</h3>
          {error && <p className="error-banner">{error}</p>}
          <label>
            Full Name
            <input required value={form.customerName} onChange={set('customerName')} placeholder="John Doe" />
          </label>
          <label>
            Email
            <input type="email" required value={form.email} onChange={set('email')} placeholder="john@example.com" />
          </label>
          <label>
            Phone
            <input required value={form.phone} onChange={set('phone')} placeholder="+1 555 123 4567" />
          </label>
          <label>
            Address
            <input required value={form.address} onChange={set('address')} placeholder="Street and number" />
          </label>
          <div className="form-row">
            <label>
              City
              <input required value={form.city} onChange={set('city')} />
            </label>
            <label>
              Postal Code
              <input required value={form.postalCode} onChange={set('postalCode')} />
            </label>
          </div>
          <button className="btn btn-primary btn-lg btn-block" disabled={placing}>
            {placing ? 'Placing order...' : `Place Order ($${total.toFixed(2)})`}
          </button>
        </form>
        <aside className="cart-summary">
          <h3>Your Items</h3>
          {items.map((i) => (
            <div key={i.productId} className="summary-row">
              <span>{i.name} x {i.quantity}</span>
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="muted small">Payment is skipped - this is a demo store for a college project.</p>
        </aside>
      </div>
    </div>
  )
}
