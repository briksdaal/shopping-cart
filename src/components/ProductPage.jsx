import getPrice from '../helpers/generatePriceFromId';
import prepareText from '../helpers/prepareText';
import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';

function ProductPage({ data, globalCart }) {
  const qty = globalCart.cartItems.find((item) => item.id === data.id)?.qty;
  const onChange = globalCart.updateCartItemQty(data);

  return (
    <div>
      <img src={data.background_image} alt={data.name} />
      <h1>{data.name}</h1>
      <p>{prepareText(data.description_raw)}</p>
      <p>${getPrice(data.id)}</p>
      <AddToCartButton qty={qty} onChange={onChange} />
    </div>
  );
}

ProductPage.propTypes = {
  data: PropTypes.object,
  globalCart: PropTypes.object
};

export default ProductPage;
