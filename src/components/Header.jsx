import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  return (
    <header>
      <h1>
        <Link to="/">Retro Potato</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/cart">
              <FaShoppingCart data-testid="cart" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
