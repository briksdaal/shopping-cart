import { useParams, useOutletContext } from 'react-router-dom';
import FetchComponent from './FetchComponent';
import ProductPage from './ProductPage';

export default function ProductPageContainer() {
  const globalCart = useOutletContext();
  const { productId } = useParams();
  return (
    <FetchComponent
      id={+productId}
      child={ProductPage}
      globalCart={globalCart}
    />
  );
}
