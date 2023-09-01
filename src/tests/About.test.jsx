import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import About from '../components/About';

it('Renders content', () => {
  render(<About />);

  expect(screen.getByText('About Us')).toBeInTheDocument();
});
