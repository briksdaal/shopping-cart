import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import ErrorPage from '../components/ErrorPage';

it('Renders content', () => {
  render(<ErrorPage />);

  expect(
    screen.getByRole('heading', {
      name: 'Sorry! There seems to have been an error. Nothing to see here...'
    })
  ).toBeInTheDocument();
});
