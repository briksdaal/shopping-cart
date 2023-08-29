import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { expect } from 'vitest';
import PropTypes from 'prop-types';
import useUrlFetch from '../hooks/useUrlFetch';

function FetchTestComponent({ url }) {
  const [data, loading, error] = useUrlFetch(url);

  if (loading) return 'Is Loading';
  if (error) return error.toString();

  return <div data-testid="fetched-data">{data.data}</div>;
}

FetchTestComponent.propTypes = {
  url: PropTypes.string
};

const url = 'https://someurl.com';
const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json({ data: 'Some data' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders loading at first', async () => {
  render(<FetchTestComponent url={url} />);

  expect(screen.getByText('Is Loading')).toBeInTheDocument();
  expect(screen.queryByText('Some data')).not.toBeInTheDocument();
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

it('Renders data after fetching', async () => {
  render(<FetchTestComponent url={url} />);

  await screen.findByText('Some data');

  expect(screen.getByText('Some data')).toBeInTheDocument();
  expect(screen.queryByText('Is Loading')).not.toBeInTheDocument();
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

it('Works with url with parameters', async () => {
  render(<FetchTestComponent url={url + '?id=34233'} />);

  await screen.findByText('Some data');

  expect(screen.getByText('Some data')).toBeInTheDocument();
});

it('Handles 40x responses', async () => {
  server.use(
    rest.get(url, (req, res, ctx) => {
      return res(ctx.status(401));
    })
  );
  render(<FetchTestComponent url={url} />);

  await screen.findByText('Error: 401');

  expect(screen.getByText('Error: 401')).toBeInTheDocument();
  expect(screen.queryByText('Some data')).not.toBeInTheDocument();
  expect(screen.queryByText('Is Loading')).not.toBeInTheDocument();
});

it('Handles thrown error', async () => {
  server.use(
    rest.get(url, () => {
      throw new Error();
    })
  );
  render(<FetchTestComponent url={url} />);

  await screen.findByText('TypeError: Failed to fetch');

  expect(screen.getByText('TypeError: Failed to fetch')).toBeInTheDocument();
  expect(screen.queryByText('Some data')).not.toBeInTheDocument();
  expect(screen.queryByText('Is Loading')).not.toBeInTheDocument();
});
