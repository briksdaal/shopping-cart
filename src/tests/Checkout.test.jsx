import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Checkout from '../components/Checkout';

it('Renders content', () => {
  render(<Checkout />);

  expect(
    screen.getByText('Hmm... we never got around to making this work!')
  ).toBeInTheDocument();
});
