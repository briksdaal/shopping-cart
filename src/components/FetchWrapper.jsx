import useRawgFetch from '../hooks/useRawgFetch';
import PropTypes from 'prop-types';
import Loading from './Loading';

function FetchWrapper(Child, id) {
  function FetchWrappedChild(props) {
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

    return <Child {...props} data={data} />;
  }

  return FetchWrappedChild;
}

FetchWrapper.propTypes = {
  id: PropTypes.number,
  Child: PropTypes.elementType.isRequired,
  numOfProductsToShow: PropTypes.number
};

export default FetchWrapper;
