import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import getPrice from '../helpers/generatePriceFromId';

const game = {
  id: 65821,
  name: 'Game Title',
  background_image: 'https://imagesbank.com/2349302'
};

const renderCard = () => {
  render(<ProductCard product={game} />, {
    wrapper: ({ children }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    }
  });
};

it('Renders card title', () => {
  renderCard();

  expect(screen.getByRole('heading', { name: game.name })).toBeInTheDocument();
});

it('Renders price correctly', () => {
  const price = getPrice(game.id).toString();
  renderCard();

  expect(screen.getByText(price, { exact: false })).toBeInTheDocument();
});

it('Renders image', () => {
  renderCard();

  expect(screen.getByRole('img').src).toEqual(game.background_image);
  expect(screen.getByRole('img').alt).toEqual(game.name);
});

it('Renders add to cart button', () => {
  renderCard();

  expect(screen.getByRole('button', 'Add to Cart')).toBeInTheDocument();
});

it('Renders a link to the correct page', () => {
  renderCard();
  const links = screen.getAllByRole('link');
  links.forEach((link) => {
    expect(link).toHaveAttribute('href', `/shop/${game.id}`);
  });
});
