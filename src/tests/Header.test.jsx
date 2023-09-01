import { render, screen, within } from '@testing-library/react';
import { expect } from 'vitest';
import Header from '../components/Header';

it('Renders title', () => {
  render(<Header />);

  expect(
    screen.getByRole('heading', { name: 'Retro Potato' })
  ).toBeInTheDocument();
});

it('Titles links to root', () => {
  render(<Header />);

  expect(screen.getByRole('link', { name: 'Retro Potato' })).toHaveAttribute(
    'href',
    '/'
  );
});

it('Renders navbar', () => {
  render(<Header />);

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('Navbar contains home, shop and about us', () => {
  const items = ['Home', 'Shop', 'About Us'];
  render(<Header />);

  const navItems = within(screen.getByRole('navigation')).getAllByRole(
    'listitem'
  );

  expect(navItems).toHaveLength(3);
  navItems.forEach((item, i) => {
    expect(within(item).getByText(items[i])).toBeInTheDocument();
  });
});

it('Navbar element contain appropriate links', () => {
  const items = ['Home', 'Shop', 'About Us'];
  const links = ['/', '/shop', '/about'];
  render(<Header />);

  const navItems = within(screen.getByRole('navigation')).getAllByRole(
    'listitem'
  );

  navItems.forEach((item, i) => {
    expect(within(item).getByRole('link', { name: items[i] })).toHaveAttribute(
      'href',
      links[i]
    );
  });
});
