import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.products()
      .then((all) => setProducts(all.slice(0, 8)))
      .catch(() => setProducts([]))
    api.categories().then(setCategories).catch(() => setCategories([]))
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Shop smart, shop CampusKart</h1>
          <p>Everything you need for college life - gadgets, fashion, books and more.</p>
          <Link to="/shop" className="btn btn-light">Shop Now</Link>
        </div>
      </section>

      <section className="section container">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <Link key={c.id} to={`/shop?category=${c.id}`} className="category-card">
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Featured Products</h2>
          <Link to="/shop" className="see-all">View all</Link>
        </div>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}
