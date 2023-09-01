import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Footer from '../components/Footer';

it('Renders content', () => {
  render(<Footer />);

  expect(screen.getByText('Footy footer')).toBeInTheDocument();
});
