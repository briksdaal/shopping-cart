import { useOutletContext } from 'react-router-dom';
import Products from './Products';
import Title from './Title';
import FetchComponent from './FetchComponent';

function ShopPage() {
  const globalCart = useOutletContext();
  return (
    <div className="flex w-full justify-center bg-sky-50">
      <div className="my-16 w-full max-w-screen-xl">
        <Title>Our Games</Title>
        <FetchComponent child={Products} globalCart={globalCart} />
      </div>
    </div>
  );
}

export default ShopPage;
