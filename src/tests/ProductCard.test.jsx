import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import ProductCard from '../components/ProductCard';
import getPrice from '../helpers/generatePriceFromId';

const game = {
  id: 65821,
  name: 'Game Title',
  background_image: 'https://imagesbank.com/2349302'
};

it('Renders card title', () => {
  render(<ProductCard product={game} />);

  expect(screen.getByRole('heading', { name: game.name })).toBeInTheDocument();
});

it('Renders price correctly', () => {
  const price = getPrice(game.id).toString();
  render(<ProductCard product={game} />);

  expect(screen.getByText(price, { exact: false })).toBeInTheDocument();
});

it('Renders image', () => {
  render(<ProductCard product={game} />);

  expect(screen.getByRole('img').src).toEqual(game.background_image);
  expect(screen.getByRole('img').alt).toEqual(game.name);
});

it('Renders add to cart button', () => {
  render(<ProductCard product={game} />);

  expect(screen.getByRole('button', 'Add to Cart')).toBeInTheDocument();
});

it('Renders a link to the correct page', () => {
  render(<ProductCard product={game} />);

  expect(screen.getByRole('link')).toHaveAttribute('href', `/shop/${game.id}`);
});
