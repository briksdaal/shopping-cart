import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';

function Header({ numOfItemsInCart }) {
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
              <IoCartOutline data-testid="cart" />
              {numOfItemsInCart !== 0 && <div>{numOfItemsInCart}</div>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  numOfItemsInCart: PropTypes.number
};
export default Header;
