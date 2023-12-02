import Products from './Products';
import Title from './Title';
import FetchComponent from './FetchComponent';

function ShopPage() {
  return (
    <div className="flex w-full justify-center bg-sky-50">
      <div className="my-12 max-w-screen-xl px-6 md:my-16">
        <Title>Our Games</Title>
        <FetchComponent child={Products} />
      </div>
    </div>
  );
}

export default ShopPage;
