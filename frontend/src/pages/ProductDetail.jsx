import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setProduct(null)
    setError('')
    setQty(1)
    setAdded(false)
    api.product(id).then(setProduct).catch((e) => setError(e.message))
  }, [id])

  if (error) {
    return (
      <div className="container section empty-state">
        <h2>Oops</h2>
        <p className="muted">{error}</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    )
  }

  if (!product) {
    return <div className="container section"><p className="loading-text">Loading product...</p></div>
  }

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
  }

  return (
    <div className="container section detail">
      <div className="detail-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="detail-info">
        <span className="product-category">{product.category?.name}</span>
        <h1>{product.name}</h1>
        <p className="price price-lg">${product.price.toFixed(2)}</p>
        <p className="muted">{product.description}</p>
        <p className={product.stock > 0 ? 'in-stock' : 'out-of-stock-text'}>
          {product.stock > 0 ? `In stock: ${product.stock} units` : 'Out of stock'}
        </p>
        <div className="qty-row">
          <button
            className="qty-btn"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={product.stock === 0}
          >
            -
          </button>
          <span className="qty-value">{qty}</span>
          <button
            className="qty-btn"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            disabled={product.stock === 0}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleAdd}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
        {added && (
          <p className="added-note">
            Added to cart. <Link to="/cart">View cart</Link>
          </p>
        )}
      </div>
    </div>
  )
}
