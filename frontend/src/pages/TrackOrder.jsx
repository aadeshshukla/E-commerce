import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'

const STEPS = ['PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED']

export default function TrackOrder() {
  const [params] = useSearchParams()
  const [orderNumber, setOrderNumber] = useState(params.get('orderNumber') || '')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const track = async (number) => {
    if (!number) return
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      setOrder(await api.trackOrder(number))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const initial = params.get('orderNumber')
    if (initial) track(initial)
  }, [params])

  const currentStep = order ? STEPS.indexOf(order.status) : -1

  return (
    <div className="container section">
      <h2>Track Your Order</h2>
      <form className="track-form" onSubmit={(e) => { e.preventDefault(); track(orderNumber.trim()) }}>
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Enter your order number, e.g. ORD-LTZ4KQ-4821"
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Checking...' : 'Track'}
        </button>
      </form>

      {error && <p className="error-banner">{error}</p>}

      {order && (
        <div className="track-result">
          <div className="timeline">
            {STEPS.map((step, idx) => (
              <div key={step} className={`timeline-step ${idx <= currentStep ? 'done' : ''}`}>
                <div className="timeline-dot">{idx <= currentStep ? '\u2713' : ''}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="track-meta">
            <p><span>Order Number</span><strong>{order.orderNumber}</strong></p>
            <p><span>Status</span><strong>{order.status}</strong></p>
            <p><span>Placed On</span><strong>{new Date(order.createdAt).toLocaleString()}</strong></p>
            <p><span>Deliver To</span><strong>{order.customerName}, {order.address}, {order.city} {order.postalCode}</strong></p>
            <p><span>Total</span><strong>${Number(order.total).toFixed(2)}</strong></p>
          </div>
          <h3>Items</h3>
          <div className="track-items">
            {order.items.map((i) => (
              <div key={i.id} className="summary-row">
                <span>{i.productName} x {i.quantity}</span>
                <span>${(Number(i.unitPrice) * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
