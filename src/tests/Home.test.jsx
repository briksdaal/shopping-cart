import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Home from '../components/Home';

it('Renders content', () => {
  render(<Home />);

  expect(
    screen.getByText('This is the homepage of the Retro Potato shop')
  ).toBeInTheDocument();
});
