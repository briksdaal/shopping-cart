import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';

function LinkContainer({ children }) {
  return <div>{children}</div>;
}

LinkContainer.propTypes = {
  children: PropTypes.element
};

function Header({ numOfItemsInCart }) {
  return (
    <header className="flex justify-center">
      <div className="m-4 flex w-full max-w-[1280px] justify-between gap-16">
        <h1>
          <Link to="/">
            <div className="flex items-center gap-4">
              <img
                className="w-20"
                src="./assets/retro_potato_icon.png"
                alt="Retro Potato"
              />
              <img
                className="w-56"
                src="./assets/retro_potato_logo.png"
                alt="Retro Potato Logo"
              />
            </div>
          </Link>
        </h1>
        <nav className="grow">
          <div className="flex h-full items-center justify-between text-xl">
            <div className="flex gap-16">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About Us</Link>
            </div>
            <div>
              <Link to="/cart" className="relative">
                <IoCartOutline data-testid="cart" className="text-2xl" />
                {numOfItemsInCart !== 0 && (
                  <div className="absolute right-0 top-0 flex h-5 w-5 translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {numOfItemsInCart}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  numOfItemsInCart: PropTypes.number
};

export default Header;
