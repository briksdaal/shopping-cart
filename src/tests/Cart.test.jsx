import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CartContext from '../contexts/CartContext';
import getPrice from '../helpers/generatePriceFromId';
import Cart from '../components/Cart';

const fullCart = [
  {
    id: 24899,
    name: 'Super Mario World',
    background_image:
      'https://media.rawg.io/media/games/3bb/3bb2c8d774c3a83eb2c17d0d3d51f020.jpg',
    qty: 1
  },
  {
    id: 25080,
    name: 'Super Mario Bros.',
    background_image:
      'https://media.rawg.io/media/games/154/154fea9689109f26c49c6a2db6263ef9.jpg',
    qty: 2
  }
];

const emptyCart = [];

const renderCart = (cartItems) => {
  render(
    <CartContext.Provider value={{ cartItems, updateCartItemQty: () => {} }}>
      <Cart />
    </CartContext.Provider>,
    {
      wrapper: ({ children }) => {
        return <BrowserRouter>{children}</BrowserRouter>;
      }
    }
  );
};

it('Renders title', () => {
  renderCart(fullCart);

  expect(
    screen.getByRole('heading', { name: 'Your Cart' })
  ).toBeInTheDocument();
});

it("Doesn't render checkout if cart is empty, instead renders empty message", () => {
  renderCart(emptyCart);

  expect(
    screen.queryByRole('link', { name: 'Proceed to Checkout' })
  ).not.toBeInTheDocument();

  expect(screen.getByText('This seems to be empty...')).toBeInTheDocument();
});

it("Renders checkout link and sum if cart isn't empty", () => {
  renderCart(fullCart);

  const expectedSum = +fullCart
    .reduce((acc, cur) => acc + getPrice(cur.id) * cur.qty, 0)
    .toFixed(2);

  const link = screen.getByRole('link', { name: 'Proceed to Checkout' });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/checkout');
  expect(screen.getByText(expectedSum, { exact: false })).toBeInTheDocument();
});
