import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import getPrice from '../helpers/generatePriceFromId';
import Cart from '../components/Cart';

const mockFullCart = {
  cartItems: [
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
  ],
  updateCartItemQty: vi.fn()
};

const mockEmptyCart = {
  cartItems: [],
  updateCartItemQty: vi.fn()
};

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useOutletContext: vi
    .fn()
    .mockImplementationOnce(() => mockFullCart)
    .mockImplementationOnce(() => mockEmptyCart)
    .mockImplementationOnce(() => mockFullCart)
}));

const renderCart = () => {
  render(<Cart />, {
    wrapper: ({ children }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    }
  });
};

it('Renders title', () => {
  renderCart();

  expect(
    screen.getByRole('heading', { name: 'Your Cart' })
  ).toBeInTheDocument();
});

it("Doesn't render checkout if cart is empty, instead renders empty message", () => {
  renderCart();

  expect(
    screen.queryByRole('link', { name: 'Proceed to Checkout' })
  ).not.toBeInTheDocument();

  expect(screen.getByText('Sorry, this seems to be empty')).toBeInTheDocument();
});

it("Renders checkout link and sum if cart isn't empty", () => {
  renderCart();

  const expectedSum = +mockFullCart.cartItems
    .reduce((acc, cur) => acc + getPrice(cur.id) * cur.qty, 0)
    .toFixed(2);

  const link = screen.getByRole('link', { name: 'Proceed to Checkout' });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/checkout');
  expect(screen.getByText(expectedSum, { exact: false })).toBeInTheDocument();
});
