import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category')
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState(null)

  useEffect(() => {
    api.categories().then(setCategories).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      api.products({ category: categoryId, search })
        .then(setProducts)
        .catch(() => setProducts([]))
    }, 250)
    return () => clearTimeout(timer)
  }, [categoryId, search])

  const selectCategory = (id) => {
    setSearchParams(id ? { category: id } : {})
  }

  return (
    <div className="container section">
      <h2>Shop</h2>
      <div className="filter-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={`chip ${!categoryId ? 'active' : ''}`}
          onClick={() => selectCategory(null)}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`chip ${String(c.id) === categoryId ? 'active' : ''}`}
            onClick={() => selectCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {products === null ? (
        <p className="loading-text">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="loading-text">No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
