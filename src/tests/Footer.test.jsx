import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Footer from '../components/Footer';
import { BrowserRouter } from 'react-router-dom';

const renderFooter = (numOfItemsInCart) => {
  render(<Footer numOfItemsInCart={numOfItemsInCart} />, {
    wrapper: ({ children }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    }
  });
};
it('Renders content', () => {
  renderFooter();

  expect(
    screen.getByText('At Retro Potato, our commitment', { exact: false })
  ).toBeInTheDocument();
});
