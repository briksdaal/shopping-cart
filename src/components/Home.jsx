import { useOutletContext, Link } from 'react-router-dom';
import Products from './Products';
import FetchComponent from './FetchComponent';
import Title from './Title';
import PropTypes from 'prop-types';
import { CgGames, CgCreditCard } from 'react-icons/cg';
import { TbTruckDelivery } from 'react-icons/tb';

function SellingPointCard({ title, subtitle, icon }) {
  return (
    <div className="flex w-full items-center gap-4 rounded-md bg-white px-8 py-12 shadow-3xl">
      <div className="text-5xl text-neutral-400">{icon}</div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <h4 className="text-neutral-500">{subtitle}</h4>
      </div>
    </div>
  );
}

SellingPointCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.element
};

function Home() {
  const globalCart = useOutletContext();

  const sellingPointCardContent = [
    {
      title: 'Curated Retro Joy',
      subtitle: '16-Bit Gaming Bliss',
      icon: <CgGames />
    },
    {
      title: 'Fast Delivery',
      subtitle: 'Starts from $10',
      icon: <TbTruckDelivery />
    },
    {
      title: 'Money Guarantee',
      subtitle: '7 Days Back',
      icon: <CgCreditCard />
    }
  ];

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full justify-center overflow-hidden bg-blue-50 py-32">
        <div className="absolute bottom-0 left-[-40px] h-[90%] w-[30%] bg-[url('/assets/link.png')] bg-contain bg-left bg-no-repeat"></div>
        <div className="absolute bottom-0 right-[-40px] h-[70%] w-[30%] bg-[url('/assets/mario.png')] bg-contain bg-right bg-no-repeat"></div>
        <h2 className="max-w-screen-md text-center text-4xl font-bold leading-loose">
          Get excellent condition physical copies of your favorite SNES games
        </h2>
      </div>
      <div className="mt-24 flex w-full max-w-screen-xl gap-40">
        {sellingPointCardContent.map((content) => (
          <SellingPointCard key={content.title} {...content} />
        ))}
      </div>
      <div className="mt-24 w-full max-w-screen-xl text-center text-2xl leading-loose">
        Step into the world of Retro Potato, your go-to destination for all
        things SNES nostalgia. With a meticulously curated collection,
        lightning-fast delivery, and a commitment to seamless retro joy, we
        invite you to savor the golden era of gaming with each pixel. Relive the
        classics effortlessly, because at Retro Potato, the magic of retro
        gaming is just a click away.
      </div>
      <div className="mt-24 flex w-full justify-center bg-sky-50 pb-24 pt-16">
        <div className="max-w-screen-xl">
          <Title>Our Top Games</Title>
          <FetchComponent
            child={Products}
            globalCart={globalCart}
            numOfProductsToShow={3}
          />
          <div className="mt-16 flex justify-center">
            <Link
              to="/shop"
              className="rounded-md bg-blue-700 px-6 py-2 text-lg text-white hover:bg-blue-400">
              See All Games
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
