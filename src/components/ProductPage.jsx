import useUrlFetch from '../hooks/useUrlFetch';
import getPrice from '../helpers/generatePriceFromId';
import prepareText from '../helpers/prepareText';
import PropTypes from 'prop-types';

const baseUrl = 'https://api.rawg.io/api/games/';

function ProductPage({ id }) {
  const gameUrl = id ? baseUrl + id.toString() : baseUrl;
  const [data, loading, error] = useUrlFetch(gameUrl);

  if (loading) return 'Is Loading';
  if (error) return error.toString();

  return (
    <div>
      <img src={data.background_image} alt={data.name} />
      <h1>{data.name}</h1>
      <p>{prepareText(data.description_raw)}</p>
      <p>${getPrice(data.id)}</p>
    </div>
  );
}

ProductPage.propTypes = {
  id: PropTypes.number
};

export default ProductPage;
