import { render, screen } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AddToCartButton from '../components/AddToCartButton';
import CartContext from '../contexts/CartContext';

const dispatch = vi.fn();

const product = {
  id: 8,
  name: 'Product Name',
  background_image: 'bg_url'
};

afterEach(() => {
  vi.resetAllMocks();
});

describe('Render tests', () => {
  it('Renders add to cart button when quantity is 0', () => {
    render(<AddToCartButton qty={0} product={product} />);
    const addToCart = screen.getByRole('button', { name: 'Add to Cart' });

    expect(addToCart).toBeInTheDocument();
  });

  it('Renders quantity and two buttons (increment and decrement) when quantity is > 0', () => {
    render(<AddToCartButton qty={3} product={product} />);

    expect(screen.getByText('3', { exact: false })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(
      screen.queryByRole('button', { name: 'Add to Cart' })
    ).not.toBeInTheDocument();
  });
});

describe('Quantity update tests', () => {
  it('Clicking on add to cart calls dispatch with type "added to cart" and product', async () => {
    const user = userEvent.setup();
    render(
      <CartContext.Provider value={{ dispatch }}>
        <AddToCartButton qty={0} product={product} />
      </CartContext.Provider>
    );
    const addToCart = screen.getByRole('button', { name: 'Add to Cart' });

    await user.click(addToCart);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'added_to_cart', product })
    );
  });

  it('Clicking on increment calls dispatch with type "incremented" and product id', async () => {
    const user = userEvent.setup();
    render(
      <CartContext.Provider value={{ dispatch }}>
        <AddToCartButton qty={4} product={product} />
      </CartContext.Provider>
    );
    const incrementBtn = screen.getByRole('button', { name: '+' });

    await user.click(incrementBtn);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'incremented', id: product.id })
    );
  });

  it('Clicking on decrement with qty > 1 calls dispatch with type "decremented" and product id', async () => {
    const user = userEvent.setup();
    render(
      <CartContext.Provider value={{ dispatch }}>
        <AddToCartButton qty={8} product={product} />
      </CartContext.Provider>
    );
    const decrementBtn = screen.getByRole('button', { name: '-' });

    await user.click(decrementBtn);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'decremented', id: product.id })
    );
  });

  it('Clicking on decrement with qty === 1 calls dispatch with type "removed_from_cart" and product id', async () => {
    const user = userEvent.setup();
    render(
      <CartContext.Provider value={{ dispatch }}>
        <AddToCartButton qty={1} product={product} />
      </CartContext.Provider>
    );
    const decrementBtn = screen.getByRole('button', { name: '-' });

    await user.click(decrementBtn);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'removed_from_cart', id: product.id })
    );
  });
});
