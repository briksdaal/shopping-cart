import Products from './Products';
import Title from './Title';
import FetchWrapper from './FetchWrapper';

function ShopPage() {
  const FetchWrapperProducts = FetchWrapper(Products);
  return (
    <div className="flex w-full justify-center bg-sky-50">
      <div className="my-12 max-w-screen-xl px-6 md:my-16">
        <Title>Our Games</Title>
        <FetchWrapperProducts />
      </div>
    </div>
  );
}

export default ShopPage;
