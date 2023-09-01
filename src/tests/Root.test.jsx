import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import Root from '../components/Root';

vi.mock('../components/Header', () => ({
  default: () => <header>header</header>
}));

vi.mock('../components/Footer', () => ({
  default: () => <header>footer</header>
}));

it('Renders header, main, and footer', () => {
  render(<Root />);

  expect(screen.getByText('header')).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByText('footer')).toBeInTheDocument();
});
