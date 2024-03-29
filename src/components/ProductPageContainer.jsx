import { useParams } from 'react-router-dom';
import FetchWrapper from './FetchWrapper';
import ProductPage from './ProductPage';

export default function ProductPageContainer() {
  const { productId } = useParams();
  const FetchWrapperProductPage = FetchWrapper(ProductPage, productId);
  return <FetchWrapperProductPage />;
}
