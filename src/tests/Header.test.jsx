import { render, screen, within } from '@testing-library/react';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

const renderHeader = () => {
  render(<Header />, {
    wrapper: ({ children }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    }
  });
};

it('Renders title', () => {
  renderHeader();

  expect(
    screen.getByRole('heading', { name: 'Retro Potato' })
  ).toBeInTheDocument();
});

it('Titles links to root', () => {
  renderHeader();

  expect(screen.getByRole('link', { name: 'Retro Potato' })).toHaveAttribute(
    'href',
    '/'
  );
});

it('Renders navbar', () => {
  renderHeader();

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('Navbar contains home, shop and about us', () => {
  const items = ['Home', 'Shop', 'About Us', 'cart'];
  renderHeader();

  const navItems = within(screen.getByRole('navigation')).getAllByRole(
    'listitem'
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
  const items = ['Home', 'Shop', 'About Us', 'Cart'];
  const links = ['/', '/shop', '/about', '/cart'];
  renderHeader();

  const navItems = within(screen.getByRole('navigation')).getAllByRole(
    'listitem'
  );

  navItems.forEach((item, i) => {
    if (i === items.length - 1) {
      expect(within(item).getByRole('link')).toHaveAttribute('href', links[i]);
      return;
    }
    expect(within(item).getByRole('link', { name: items[i] })).toHaveAttribute(
      'href',
      links[i]
    );
  });
});
