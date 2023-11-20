import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';

function LinkContainer({ children }) {
  return <div>{children}</div>;
}

LinkContainer.propTypes = {
  children: PropTypes.elementType
};

function Header({ numOfItemsInCart }) {
  return (
    <header className="sticky top-0 z-10 flex justify-center bg-white shadow-lg">
      <div className="m-4 flex w-full max-w-screen-xl justify-between gap-16">
        <h1>
          <NavLink to="/">
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
          </NavLink>
        </h1>
        <nav className="grow">
          <div className="flex h-full items-center justify-between text-xl">
            <div className="flex gap-16">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/about">About Us</NavLink>
            </div>
            <div>
              <NavLink to="/cart" className="relative">
                <IoCartOutline data-testid="cart" className="text-3xl" />
                {numOfItemsInCart !== 0 && (
                  <div className="absolute right-0 top-0 flex translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {numOfItemsInCart}
                  </div>
                )}
              </NavLink>
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
