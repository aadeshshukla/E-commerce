import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { count } = useCart()

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/home" className="logo">
          Campus<span>Kart</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/track">Track Order</NavLink>
          <NavLink to="/login">Login / Sign up</NavLink>
        </nav>
        <Link to="/cart" className="cart-link">
          Cart
          <span className="cart-badge">{count}</span>
        </Link>
      </div>
    </header>
  )
}
