import { render, screen, within } from '@testing-library/react';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

const renderHeader = (numOfItemsInCart) => {
  render(<Header numOfItemsInCart={numOfItemsInCart} />, {
    wrapper: ({ children }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    }
  });
};

describe('Nav items tests', () => {
  it('Renders title', () => {
    renderHeader();

    const heading = screen.getByRole('heading');
    expect(within(heading).getByAltText('Retro Potato')).toBeInTheDocument();
  });

  it('Titles links to root', () => {
    renderHeader();

    const heading = screen.getByRole('heading');
    expect(within(heading).getByRole('link')).toHaveAttribute('href', '/');
  });

  it('Renders navbar', () => {
    renderHeader();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Navbar contains home, shop and about us', () => {
    const items = ['Home', 'Shop', 'About Us', 'cart'];
    renderHeader();

    const navItems = within(screen.getByRole('navigation')).getAllByRole(
      'link'
    );

    expect(navItems).toHaveLength(items.length);
    navItems.forEach((item, i) => {
      if (i === items.length - 1) {
        expect(within(item).getByTestId(items[i])).toBeInTheDocument();
        return;
      }
      expect(within(item).getByText(items[i])).toBeInTheDocument();
    });
  });

  it('Navbar element contain appropriate links', () => {
    const links = ['/', '/shop', '/about', '/cart'];
    renderHeader();

    const navItems = within(screen.getByRole('navigation')).getAllByRole(
      'link'
    );

    navItems.forEach((item, i) => {
      expect(item).toHaveAttribute('href', links[i]);
    });
  });
});

describe('Cart counter tests', () => {
  it('Shows no counter when cart is empty', () => {
    renderHeader(0);
    const navItems = within(screen.getByRole('navigation')).getAllByRole(
      'link'
    );
    const cartItem = navItems[navItems.length - 1];

    expect(within(cartItem).queryByText('0')).not.toBeInTheDocument();
  });

  it("Shows correct counter when cart isn't empty", () => {
    renderHeader(4);
    const navItems = within(screen.getByRole('navigation')).getAllByRole(
      'link'
    );
    const cartItem = navItems[navItems.length - 1];

    expect(within(cartItem).getByText('4')).toBeInTheDocument();
  });
});
