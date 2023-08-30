import useRawgFetch from '../hooks/useRawgFetch';
import PropTypes from 'prop-types';

function FetchComponent({ id, child: ChildComponent }) {
  const [data, loading, error] = useRawgFetch(id);

  if (loading) return 'Is Loading';
  if (error) return error.toString();

  return <ChildComponent data={data} />;
}

FetchComponent.propTypes = {
  id: PropTypes.number,
  child: PropTypes.elementType.isRequired
};

export default FetchComponent;
