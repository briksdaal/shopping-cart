import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { expect } from 'vitest';
import ProductPage from '../components/ProductPage';
import getPrice from '../helpers/generatePriceFromId';

const game = {
  id: 65821,
  name: 'Game Title',
  description_raw:
    'This is a very long description that has been cut surprisingly short.',
  background_image: 'https://imagesbank.com/2349302'
};

const url = `https://api.rawg.io/api/games/`;
const server = setupServer(
  ...[
    rest.get(url + game.id, (req, res, ctx) => {
      return res(ctx.json(game));
    }),

    rest.get(url, (req, res, ctx) => {
      return res(ctx.status(404));
    })
  ]
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders loading at first', async () => {
  render(<ProductPage id={game.id} />);

  expect(screen.getByText('Is Loading')).toBeInTheDocument();
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

it('Renders game data after fetching', async () => {
  render(<ProductPage id={game.id} />);

  await screen.findByRole('heading', { name: game.name });

  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.queryByText('Is Loading')).not.toBeInTheDocument();
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

it('Renders price correctly', async () => {
  const price = getPrice(game.id).toString();

  render(<ProductPage id={game.id} />);

  await screen.findByRole('heading', { name: 'Game Title' });

  expect(screen.getByText(price, { exact: false })).toBeInTheDocument();
});

it('Renders image', async () => {
  render(<ProductPage id={game.id} />);

  await screen.findByRole('heading', { name: 'Game Title' });

  expect(screen.getByRole('img').src).toEqual(game.background_image);
  expect(screen.getByRole('img').alt).toEqual(game.name);
});

it('Handles error responses', async () => {
  server.use(
    rest.get(url + game.id, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<ProductPage id={game.id} />);

  await screen.findByText('error', { exact: false });

  expect(screen.findByText('error', { exact: false })).toBeInTheDocument;
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});

it('Shows error when no id is passed', async () => {
  render(<ProductPage />);

  await screen.findByText('error', { exact: false });

  expect(screen.findByText('error', { exact: false })).toBeInTheDocument;
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});
