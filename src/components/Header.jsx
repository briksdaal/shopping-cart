import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoCartOutline, IoMenuOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

function StyledNavLink({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        isActive
          ? 'no-underline decoration-blue-700 decoration-4 underline-offset-12 md:underline'
          : 'decoration-blue-700 decoration-4 underline-offset-12 md:hover:underline'
      }>
      {children}
    </NavLink>
  );
}

StyledNavLink.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string
};

function Header({ numOfItemsInCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const body = document.querySelector('body');
    if (isMobileMenuOpen) body.classList.add('overflow-y-hidden');
    else body.classList.remove('overflow-y-hidden');
  }, [isMobileMenuOpen]);

  console.log(isMobileMenuOpen);
  return (
    <header className="sticky top-0 z-10 flex justify-center">
      <div className="absolute z-10 h-full w-full bg-white shadow-lg"></div>
      <div className="mx-6 my-4 mt-1 flex w-full max-w-screen-xl justify-between gap-16 md:mt-4">
        <button
          className="z-20 mt-4 text-3xl md:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}>
          {isMobileMenuOpen ? <IoMdClose /> : <IoMenuOutline />}
        </button>
        <h1 className="z-20">
          <NavLink to="/" onClick={closeMobileMenu}>
            <div className="flex flex-col items-center md:flex-row md:gap-4">
              <img
                className="w-12 md:w-20"
                src="./assets/retro_potato_icon.png"
                alt="Retro Potato"
              />
              <img
                className="w-32 md:w-56"
                src="./assets/retro_potato_logo.png"
                alt="Retro Potato Logo"
              />
            </div>
          </NavLink>
        </h1>
        <nav className="md:grow">
          <div className="flex h-full items-center justify-between text-xl">
            <div
              className={`absolute left-0 ${
                isMobileMenuOpen ? 'top-0' : 'top-[-1000px]'
              } flex h-screen w-full flex-col gap-4 bg-white p-4 pt-32 text-center transition-all md:static md:z-20 md:mt-0 md:flex md:h-auto md:flex-row md:gap-8 md:p-0 md:text-left lg:gap-16`}>
              <StyledNavLink to="/" onClick={closeMobileMenu}>
                Home
              </StyledNavLink>
              <StyledNavLink to="/shop" onClick={closeMobileMenu}>
                Shop
              </StyledNavLink>
              <StyledNavLink to="/about" onClick={closeMobileMenu}>
                About Us
              </StyledNavLink>
            </div>
            <div className="z-20">
              <NavLink
                to="/cart"
                className="relative"
                onClick={closeMobileMenu}>
                <IoCartOutline
                  data-testid="cart"
                  className="mt-4 text-3xl md:mt-auto"
                />
                {numOfItemsInCart !== 0 && (
                  <div className="absolute right-0 top-4 flex translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white md:top-0">
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
