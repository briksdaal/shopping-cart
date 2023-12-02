import { useParams } from 'react-router-dom';
import FetchComponent from './FetchComponent';
import ProductPage from './ProductPage';

export default function ProductPageContainer() {
  const { productId } = useParams();
  return <FetchComponent id={+productId} Child={ProductPage} />;
}
