import { Link, useSearchParams } from 'react-router-dom'

export default function OrderSuccess() {
  const [params] = useSearchParams()
  const orderNumber = params.get('orderNumber')

  return (
    <div className="container section empty-state">
      <div className="success-icon">&#10003;</div>
      <h2>Thank you! Your order has been placed.</h2>
      {orderNumber && (
        <p className="order-number">
          Order Number: <strong>{orderNumber}</strong>
        </p>
      )}
      <p className="muted">Keep your order number safe - you can use it to track your order.</p>
      <div className="btn-row">
        <Link to={orderNumber ? `/track?orderNumber=${orderNumber}` : '/track'} className="btn btn-primary">
          Track Order
        </Link>
        <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
      </div>
    </div>
  )
}
