import getPrice from '../helpers/generatePriceFromId';
import prepareText from '../helpers/prepareText';
import PropTypes from 'prop-types';
import CartContext from '../contexts/CartContext';
import { useContext } from 'react';
import AddToCartButton from './AddToCartButton';
import Title from './Title';

function ProductPage({ data }) {
  const { cartItems } = useContext(CartContext);
  const qty = cartItems.find((item) => item.id === data.id)?.qty;

  return (
    <div className="flex w-full justify-center bg-sky-50">
      <div className="mx-4 mb-12 mt-4 grid w-full max-w-screen-xl gap-8 md:my-16 md:grid-cols-2 md:gap-12">
        <div className="row-start-2 row-end-3 md:col-span-2 md:row-start-1 md:row-end-2">
          <Title noMargin={true}>{data.name}</Title>
        </div>
        <div className="h-[300px] w-full flex-1 md:h-[400px]">
          <img
            src={data.background_image}
            alt={data.name}
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-5">
            <p className="text-2xl text-red-600">${getPrice(data.id)}</p>
            <AddToCartButton qty={qty} product={data} />
          </div>
          <p>{prepareText(data.description_raw)}</p>
        </div>
      </div>
    </div>
  );
}

ProductPage.propTypes = {
  data: PropTypes.object
};

export default ProductPage;
