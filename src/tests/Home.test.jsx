import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

const renderHome = () => {
  render(<Home />, {
    wrapper: ({ children }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    }
  });
};
it('Renders content', () => {
  renderHome();

  expect(
    screen.getByText(
      'Get excellent condition physical copies of your favorite SNES games'
    )
  ).toBeInTheDocument();
});
