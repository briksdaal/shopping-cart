import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import Products from '../components/Products';

const products = {
  results: [
    {
      name: 'Product 1',
      id: 4321
    },
    {
      name: 'Product 2',
      id: 5432
    },
    {
      name: 'Product 3',
      id: 8497
    }
  ]
};

vi.mock('../components/ProductCard', () => ({
  default: ({ product }) => <h2>{product.name}</h2>
}));

it('Renders products when array is bigger than 0', () => {
  render(<Products data={products} />);
  screen.debug();
  expect(screen.getAllByRole('heading')).toHaveLength(3);
  expect(
    screen.queryByRole('heading', { name: 'Sorry, this seems to be empty' })
  ).not.toBeInTheDocument();
});

it('Renders empty message when array is empty', () => {
  render(<Products data={[]} />);

  expect(
    screen.getByRole('heading', { name: 'Sorry, this seems to be empty' })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('heading')).toHaveLength(1);
});

it('Renders empty message when no products prop provided', () => {
  render(<Products />);

  expect(
    screen.getByRole('heading', { name: 'Sorry, this seems to be empty' })
  ).toBeInTheDocument();
  expect(screen.queryAllByRole('heading')).toHaveLength(1);
});
