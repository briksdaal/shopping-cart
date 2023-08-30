import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import ShopPage from '../components/ShopPage';

it('Renders heading', () => {
  render(<ShopPage />);

  expect(
    screen.getByRole('heading', { name: 'Our Games' })
  ).toBeInTheDocument();
});
