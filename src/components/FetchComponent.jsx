import useRawgFetch from '../hooks/useRawgFetch';
import PropTypes from 'prop-types';

function FetchComponent({ id, child: ChildComponent, globalCart }) {
  const [data, loading, error] = useRawgFetch(id);

  if (loading) return 'Is Loading';
  if (error) return error.toString();

  return <ChildComponent data={data} globalCart={globalCart} />;
}

FetchComponent.propTypes = {
  id: PropTypes.number,
  child: PropTypes.elementType.isRequired,
  globalCart: PropTypes.object
};

export default FetchComponent;
