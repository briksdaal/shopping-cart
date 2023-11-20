import useRawgFetch from '../hooks/useRawgFetch';
import PropTypes from 'prop-types';

function FetchComponent({
  id,
  child: ChildComponent,
  globalCart,
  numOfProductsToShow
}) {
  const [data, loading, error] = useRawgFetch(id);

  if (loading) return 'Is Loading';
  if (error) return error.toString();

  return (
    <ChildComponent
      data={data}
      globalCart={globalCart}
      numOfProductsToShow={numOfProductsToShow}
    />
  );
}

FetchComponent.propTypes = {
  id: PropTypes.number,
  child: PropTypes.elementType.isRequired,
  globalCart: PropTypes.object,
  numOfProductsToShow: PropTypes.number
};

export default FetchComponent;
