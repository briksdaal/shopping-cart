import getPrice from '../helpers/generatePriceFromId';
import prepareText from '../helpers/prepareText';
import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';

function ProductPage({ product }) {
  return (
    <div>
      <img src={product.background_image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{prepareText(product.description_raw)}</p>
      <p>${getPrice(product.id)}</p>
      <AddToCartButton />
    </div>
  );
}

ProductPage.propTypes = {
  product: PropTypes.object
};

export default ProductPage;
