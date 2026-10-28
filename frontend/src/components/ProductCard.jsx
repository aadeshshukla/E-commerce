import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <span className="product-category">{product.category?.name}</span>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button
            className={`btn ${added ? 'btn-success' : 'btn-primary'}`}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {added ? 'Added' : 'Add to Cart'}
          </button>
        </div>
        {product.stock === 0 && <span className="out-of-stock">Out of stock</span>}
      </div>
    </div>
  )
}
