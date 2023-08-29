import { render, screen } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AddToCartButton from '../components/AddToCartButton';

const onChange = vi.fn();

afterEach(() => {
  vi.resetAllMocks();
});

it('Renders add to cart button when quantity is 0', () => {
  render(<AddToCartButton qty={0} onChange={onChange} />);
  const addToCart = screen.getByRole('button', { name: 'Add to Cart' });

  expect(addToCart).toBeInTheDocument();
});

it('Renders quantity and two buttons (increment and decrement) when quantity is > 0', () => {
  render(<AddToCartButton qty={3} onChange={onChange} />);

  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getAllByRole('button')).toHaveLength(2);
  expect(
    screen.queryByRole('button', { name: 'Add to Cart' })
  ).not.toBeInTheDocument();
});

it('Clicking on add to cart (qty is 0) calls onChange with 1', async () => {
  const user = userEvent.setup();
  render(<AddToCartButton qty={0} onChange={onChange} />);
  const addToCart = screen.getByRole('button', { name: 'Add to Cart' });

  await user.click(addToCart);

  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith(1);
});

it('Clicking on increment calls onChange with qty + 1', async () => {
  const user = userEvent.setup();
  render(<AddToCartButton qty={4} onChange={onChange} />);
  const incrementBtn = screen.getByRole('button', { name: '+' });

  await user.click(incrementBtn);

  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith(5);
});

it('Clicking on decrement calls onChange with qty - 1', async () => {
  const user = userEvent.setup();
  render(<AddToCartButton qty={8} onChange={onChange} />);
  const decrementBtn = screen.getByRole('button', { name: '-' });

  await user.click(decrementBtn);

  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith(7);
});
