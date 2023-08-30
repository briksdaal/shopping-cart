import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { expect } from 'vitest';
import PropTypes from 'prop-types';
import FetchComponent from '../components/FetchComponent';

function MockChild({ data }) {
  return <div>{data.data}</div>;
}

MockChild.propTypes = {
  data: PropTypes.object
};

const server = setupServer(
  ...[
    rest.get('https://api.rawg.io/api/games', (req, res, ctx) => {
      const platforms = req.url.searchParams.get('platforms');
      const stores = req.url.searchParams.get('stores');
      const key = req.url.searchParams.get('key');
      if (platforms && stores && key)
        return res(ctx.json({ data: 'All games data' }));
      else return res(ctx.json({ data: 'Bad response' }));
    }),
    rest.get('https://api.rawg.io/api/games/5', (req, res, ctx) => {
      const platforms = req.url.searchParams.get('platforms');
      const stores = req.url.searchParams.get('stores');
      const key = req.url.searchParams.get('key');
      if (!platforms && !stores && key)
        return res(ctx.json({ data: 'Game #5 data' }));
      else return res(ctx.json({ data: 'Bad response' }));
    })
  ]
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders loading at first', async () => {
  render(<FetchComponent id={5} child={MockChild} />);

  expect(screen.getByText('Is Loading')).toBeInTheDocument();
  expect(screen.queryByText('Some data')).not.toBeInTheDocument();
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

it('Sends request to all games api url if no id is provided', async () => {
  render(<FetchComponent child={MockChild} />);

  await screen.findByText('All games data');

  expect(screen.getByText('All games data')).toBeInTheDocument();
  expect(screen.queryByText('Game #5 data')).not.toBeInTheDocument();
  expect(screen.queryByText('Is Loading')).not.toBeInTheDocument();
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

it('Sends request to specific game api url if id is provided', async () => {
  render(<FetchComponent id={5} child={MockChild} />);

  await screen.findByText('Game #5 data');

  expect(screen.getByText('Game #5 data')).toBeInTheDocument();
  expect(screen.queryByText('All games data')).not.toBeInTheDocument();
  expect(screen.queryByText('Is Loading')).not.toBeInTheDocument();
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

it('Handles errors', async () => {
  server.use(
    rest.get('https://api.rawg.io/api/games/5', (req, res, ctx) => {
      return res(ctx.status(401));
    })
  );
  render(<FetchComponent id={5} child={MockChild} />);

  await screen.findByText('Error: 401');

  expect(screen.getByText('Error: 401')).toBeInTheDocument();
  expect(screen.queryByText('Some data')).not.toBeInTheDocument();
  expect(screen.queryByText('Is Loading')).not.toBeInTheDocument();
});
