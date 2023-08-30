import getPrice from '../helpers/generatePriceFromId';
import prepareText from '../helpers/prepareText';
import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';

function ProductPage({ game }) {
  return (
    <div>
      <img src={game.background_image} alt={game.name} />
      <h1>{game.name}</h1>
      <p>{prepareText(game.description_raw)}</p>
      <p>${getPrice(game.id)}</p>
      <AddToCartButton />
    </div>
  );
}

ProductPage.propTypes = {
  game: PropTypes.object
};

export default ProductPage;
