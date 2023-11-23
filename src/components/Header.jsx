import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoCartOutline, IoMenuOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import retroPotatoIcon from '../../assets/retro_potato_icon.png';
import retroPotatoLogo from '../../assets/retro_potato_logo.png';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const html = document.body.parentElement;

    if (isMobileMenuOpen) {
      html.classList.add('overflow-y-hidden', 'touch-none');
    }

    return () => {
      if (isMobileMenuOpen) {
        html.classList.remove('overflow-y-hidden', 'touch-none');
      }
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { title: 'Home', to: '/' },
    { title: 'Shop', to: '/shop' },
    { title: 'About Us', to: '/about' }
  ];

  return (
    <header className="fixed top-0 z-10 flex w-full justify-center md:h-auto md:bg-white md:shadow-lg">
      <div className="absolute z-10 h-full w-full bg-white shadow-lg md:hidden"></div>
      <div
        className={`mx-6 ${
          isScrolled ? 'mb-1' : 'mb-4'
        } mt-1 flex w-full max-w-screen-xl justify-between gap-16 transition-all duration-200 md:mb-4 md:mt-4`}>
        <button
          className={`${
            isScrolled ? 'mt-0' : 'mt-4'
          } z-20 text-3xl transition-all duration-200 md:hidden`}
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
                className={`${
                  isScrolled ? 'hidden' : ''
                } w-32 md:block md:w-56`}
                src={retroPotatoLogo}
                alt="Retro Potato Logo"
              />
            </div>
          </NavLink>
        </h1>
        <nav className="flex items-center md:grow">
          <div
            className={`absolute left-0 ${
              isMobileMenuOpen ? 'top-0' : 'top-[-1000px]'
            } flex h-screen w-full touch-manipulation flex-col items-center gap-4 overscroll-contain bg-white p-4 pt-32 text-center text-xl transition-all duration-500 md:static md:z-20 md:mt-0 md:flex md:h-auto md:flex-row md:gap-8 md:p-0 md:text-left lg:gap-16`}>
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
          <NavLink
            to="/cart"
            className="relative z-20"
            onClick={closeMobileMenu}>
            <IoCartOutline
              data-testid="cart"
              className={`${
                isScrolled ? 'mt-0' : 'mt-4'
              } text-3xl transition-all duration-200 md:mt-auto`}
            />
            {numOfItemsInCart !== 0 && (
              <div
                className={`absolute ${
                  isScrolled ? 'top-1' : 'top-4'
                } right-0 flex translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white transition-all duration-200 md:top-0`}>
                {numOfItemsInCart}
              </div>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  numOfItemsInCart: PropTypes.number
};

export default Header;
