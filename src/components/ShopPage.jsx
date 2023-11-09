import { useOutletContext } from 'react-router-dom';
import Products from './Products';
import FetchComponent from './FetchComponent';

function ShopPage() {
  const globalCart = useOutletContext();
  return (
    <div>
      <h2>Our Games</h2>
      <FetchComponent child={Products} globalCart={globalCart} />
    </div>
  );
}

export default ShopPage;
