import PropTypes from 'prop-types';

function AddToCartButton({ qty = 0, onChange }) {
  function onIncrement() {
    onChange(qty + 1);
  }

  function onDecrement() {
    onChange(qty - 1);
  }

  return (
    <div className="add-to-cart-container">
      {qty > 0 ? (
        <>
          <button onClick={onDecrement}>-</button>
          <span>{qty}</span>
          <button onClick={onIncrement}>+</button>
        </>
      ) : (
        <button onClick={onIncrement}>Add to Cart</button>
      )}
    </div>
  );
}

AddToCartButton.propTypes = {
  qty: PropTypes.number,
  onChange: PropTypes.func
};

export default AddToCartButton;
