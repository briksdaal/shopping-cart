import Products from './Products';
import FetchComponent from './FetchComponent';

function ShopPage() {
  return (
    <div>
      <h2>Our Games</h2>
      <FetchComponent child={Products} />
    </div>
  );
}

export default ShopPage;
