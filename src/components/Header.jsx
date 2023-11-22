import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoCartOutline, IoMenuOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import retroPotatoIcon from '../../assets/retro_potato_icon.png';
import retroPotatoLogo from '../../assets/retro_potato_logo.png';

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
}

function StyledNavLink({ to, onClick, isMobileMenuOpen, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        isActive
          ? `${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            } no-underline decoration-blue-700 decoration-4 underline-offset-12 transition-opacity duration-1000 md:underline md:opacity-100`
          : `${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            } decoration-blue-700 decoration-4 underline-offset-12 transition-opacity duration-1000 md:opacity-100 md:hover:underline`
      }>
      {children}
    </NavLink>
  );
}

StyledNavLink.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  isMobileMenuOpen: PropTypes.bool,
  children: PropTypes.string
};

function Header({ numOfItemsInCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');

    if (isMobileMenuOpen) {
      html.classList.add('overflow-y-hidden');
      body.classList.add('overflow-y-hidden');
      body.classList.add('relative');
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      html.classList.remove('overflow-y-hidden');
      body.classList.remove('overflow-y-hidden');
      body.classList.remove('relative');
      window.removeEventListener('touchmove', preventScroll, {
        passive: false
      });
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { title: 'Home', to: '/' },
    { title: 'Shop', to: '/shop' },
    { title: 'About Us', to: '/about' }
  ];

  return (
    <header className="fixed top-0 z-10 flex w-full justify-center md:static md:h-auto md:shadow-lg">
      <div className="absolute z-10 h-full w-full bg-white shadow-lg md:hidden"></div>
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
                src={retroPotatoIcon}
                alt="Retro Potato"
              />
              <img
                className="w-32 md:w-56"
                src={retroPotatoLogo}
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
              } flex h-screen w-full flex-col gap-4 bg-white p-4 pt-32 text-center transition-all duration-500 md:static md:z-20 md:mt-0 md:flex md:h-auto md:flex-row md:gap-8 md:p-0 md:text-left lg:gap-16`}>
              {navLinks.map((navLink) => (
                <StyledNavLink
                  key={navLink.title}
                  to={navLink.to}
                  onClick={closeMobileMenu}
                  isMobileMenuOpen={isMobileMenuOpen}>
                  {navLink.title}
                </StyledNavLink>
              ))}
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
