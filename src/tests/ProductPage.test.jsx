import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import ProductPage from '../components/ProductPage';
import getPrice from '../helpers/generatePriceFromId';
const game = {
  id: 65821,
  name: 'Game Title',
  description_raw:
    'This is a very long description that has been cut surprisingly short.',
  background_image: 'https://imagesbank.com/2349302'
};

const globalCart = { cartItems: [], updateCartItemQty: vi.fn() };

it('Renders game title and description', () => {
  render(<ProductPage data={game} globalCart={globalCart} />);

  expect(screen.getByRole('heading', { name: game.name })).toBeInTheDocument();
  expect(
    screen.getByText('This is a very long description', { exact: false })
  ).toBeInTheDocument();
});

it('Renders price correctly', () => {
  const price = getPrice(game.id).toString();
  render(<ProductPage data={game} globalCart={globalCart} />);

  expect(screen.getByText(price, { exact: false })).toBeInTheDocument();
});

it('Renders image', () => {
  render(<ProductPage data={game} globalCart={globalCart} />);

  expect(screen.getByRole('img').src).toEqual(game.background_image);
  expect(screen.getByRole('img').alt).toEqual(game.name);
});

it('Renders add to cart button', () => {
  render(<ProductPage data={game} globalCart={globalCart} />);

  expect(screen.getByRole('button', 'Add to Cart')).toBeInTheDocument();
});
