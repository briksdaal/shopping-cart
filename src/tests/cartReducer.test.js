import cartReducer from '../helpers/cartReducer';

it('Adds to empty cart', () => {
  const cart = [];
  const product = {
    id: 6,
    name: 'Product Name',
    background_image: 'urlforimage'
  };

  const updatedCart = cartReducer(cart, { type: 'added_to_cart', product });

  expect(updatedCart).toHaveLength(1);
  expect(updatedCart).toContainEqual({ ...product, qty: 1 });
});

it('Adds to cart with products', () => {
  const cart = [
    { id: 4, name: 'Product 4', background_image: 'urlforimage', qty: 2 }
  ];

  const product = {
    id: 6,
    name: 'Product Name',
    background_image: 'urlforimage'
  };

  const updatedCart = cartReducer(cart, { type: 'added_to_cart', product });

  expect(updatedCart).toHaveLength(2);
  expect(updatedCart).toContainEqual({ ...product, qty: 1 });
});

it('Increments quantity', () => {
  const product1 = {
    id: 4,
    name: 'Product 4',
    background_image: 'urlforimage',
    qty: 2
  };
  const product2 = {
    id: 2,
    name: 'Product 2',
    background_image: 'urlforimage2',
    qty: 4
  };

  const cart = [product1, product2];

  const updatedCart = cartReducer(cart, { type: 'incremented', id: 4 });

  expect(updatedCart).toHaveLength(2);
  expect(updatedCart).toContainEqual({ ...product1, qty: 3 });
  expect(updatedCart).toContainEqual(product2);
});

it('Decrements quantity', () => {
  const product1 = {
    id: 4,
    name: 'Product 4',
    background_image: 'urlforimage',
    qty: 2
  };
  const product2 = {
    id: 2,
    name: 'Product 2',
    background_image: 'urlforimage2',
    qty: 4
  };

  const cart = [product1, product2];

  const updatedCart = cartReducer(cart, { type: 'decremented', id: 4 });

  expect(updatedCart).toHaveLength(2);
  expect(updatedCart).toContainEqual({ ...product1, qty: 1 });
  expect(updatedCart).toContainEqual(product2);
});

it('Removes from cart', () => {
  const product1 = {
    id: 4,
    name: 'Product 4',
    background_image: 'urlforimage',
    qty: 2
  };
  const product2 = {
    id: 2,
    name: 'Product 2',
    background_image: 'urlforimage2',
    qty: 4
  };

  const cart = [product1, product2];

  const updatedCart = cartReducer(cart, { type: 'removed_from_cart', id: 2 });

  expect(updatedCart).toHaveLength(1);
  expect(updatedCart).toContainEqual(product1);
  expect(updatedCart).not.toContainEqual(product2);
});
