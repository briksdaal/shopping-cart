import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { expect, vi } from 'vitest';
import routes from '../routes';

function renderMemoryRouter(path = '/') {
  render(
    <RouterProvider
      router={createMemoryRouter(routes, { initialEntries: [path] })}
    />
  );
}

vi.stubGlobal('scrollTo', vi.fn());

it('Render homepage on visit', async () => {
  renderMemoryRouter();

  expect(
    screen.getByRole('heading', {
      name: 'Get excellent condition physical copies of your favorite SNES games'
    })
  ).toBeInTheDocument();
});

it('Render shop page', async () => {
  renderMemoryRouter('/shop');

  expect(
    screen.getByRole('heading', {
      name: 'Our Games'
    })
  ).toBeInTheDocument();
});

it('Render about us page', async () => {
  renderMemoryRouter('/about');

  expect(
    screen.getByRole('heading', {
      name: 'About Us'
    })
  ).toBeInTheDocument();
});

it('Render cart page', async () => {
  renderMemoryRouter('/cart');

  expect(
    screen.getByRole('heading', {
      name: 'Your Cart'
    })
  ).toBeInTheDocument();
});

it('Render checkout page', async () => {
  renderMemoryRouter('/checkout');

  expect(
    screen.getByRole('heading', {
      name: 'Checkout'
    })
  ).toBeInTheDocument();
});

it('Render error page', async () => {
  renderMemoryRouter('/asdf');

  expect(
    screen.getByRole('heading', {
      name: 'Sorry! There seems to have been an error. Nothing to see here...'
    })
  ).toBeInTheDocument();
});

it('Navigates to about page on click', async () => {
  renderMemoryRouter();
  const user = userEvent.setup();

  const header = screen.getByRole('navigation');
  const aboutLink = within(header).getByRole('link', { name: 'About Us' });

  await user.click(aboutLink);

  const main = screen.getByRole('main');

  expect(
    within(main).getByRole('heading', {
      name: 'About Us'
    })
  ).toBeInTheDocument();
});
