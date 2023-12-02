import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';
import getPrice from '../helpers/generatePriceFromId';
import CartViewContext from '../contexts/CartViewContext';

const game = {
  id: 65821,
  name: 'Game Title',
  background_image: 'https://imagesbank.com/2349302'
};

const onChange = vi.fn();

const renderCard = (qty, cartView) => {
  render(
    <CartViewContext.Provider value={cartView}>
      <ProductCard product={game} qty={qty} onChange={onChange} />
    </CartViewContext.Provider>,
    {
      wrapper: ({ children }) => {
        return <BrowserRouter>{children}</BrowserRouter>;
      }
    }
  );
};

afterEach(() => {
  vi.resetAllMocks();
});

describe('Render tests', () => {
  it('Renders card title', () => {
    renderCard();

    expect(
      screen.getByRole('heading', { name: game.name })
    ).toBeInTheDocument();
  });

  it('Renders price correctly', () => {
    const price = getPrice(game.id).toString();
    renderCard();

    expect(screen.getByText(price, { exact: false })).toBeInTheDocument();
  });

  it('Renders image', () => {
    renderCard();

    expect(screen.getByRole('img').src).toEqual(game.background_image);
    expect(screen.getByRole('img').alt).toEqual(game.name);
  });

  it('Renders add to cart button', () => {
    renderCard();

    expect(screen.getByRole('button', 'Add to Cart')).toBeInTheDocument();
  });

  it('Renders a link to the correct page', () => {
    renderCard();
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', `/shop/${game.id}`);
    });
  });
});

describe('X button tests', () => {
  it("X button doesn't show on regular view with no quantity", async () => {
    renderCard();
    const xButton = screen.queryByTestId('remove-from-cart');

    expect(xButton).not.toBeInTheDocument();
  });

  it("X button doesn't show on regular view even with quantity", async () => {
    renderCard(3);
    const xButton = screen.queryByTestId('remove-from-cart');

    expect(xButton).not.toBeInTheDocument();
  });

  it("X button doesn't show on cart view with no quantity", async () => {
    renderCard(0, true);
    const xButton = screen.queryByTestId('remove-from-cart');

    expect(xButton).not.toBeInTheDocument();
  });

  it('X button shows on cart view with quantity', async () => {
    renderCard(3, true);
    const xButton = screen.getByTestId('remove-from-cart');

    expect(xButton).toBeInTheDocument();
  });

  it('Clicking X button calls onChange with 0', async () => {
    const user = userEvent.setup();
    renderCard(3, true);
    const xButton = screen.getByTestId('remove-from-cart');

    await user.click(xButton);

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(0);
  });
});
