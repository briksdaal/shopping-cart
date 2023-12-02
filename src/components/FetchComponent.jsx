import useRawgFetch from '../hooks/useRawgFetch';
import PropTypes from 'prop-types';
import Loading from './Loading';

function FetchComponent({ id, Child, numOfProductsToShow }) {
  const [data, loading, error] = useRawgFetch(id);

  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <h3 className="text-2xl">{error.toString()}</h3>
        <h4 className="text-xl">
          There seems to have been an error... try reloading
        </h4>
      </>
    );

  return <Child data={data} numOfProductsToShow={numOfProductsToShow} />;
}

FetchComponent.propTypes = {
  id: PropTypes.number,
  Child: PropTypes.elementType.isRequired,
  numOfProductsToShow: PropTypes.number
};

export default FetchComponent;
