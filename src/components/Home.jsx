import { Link } from 'react-router-dom';
import Products from './Products';
import FetchComponent from './FetchComponent';
import Title from './Title';
import PropTypes from 'prop-types';
import { CgGames, CgCreditCard } from 'react-icons/cg';
import { TbTruckDelivery } from 'react-icons/tb';

function SellingPointCard({ title, subtitle, icon }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-md bg-white px-4 py-4 shadow-3xl lg:flex-row lg:px-8 lg:py-12">
      <div className="text-5xl text-neutral-400">{icon}</div>
      <div>
        <h3 className="text-center font-bold lg:text-left">{title}</h3>
        <h4 className="text-center text-neutral-500 lg:text-left">
          {subtitle}
        </h4>
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
      <div className="relative flex w-full justify-center overflow-hidden bg-blue-50 pb-48 pt-16 lg:pb-32 lg:pt-32">
        <div
          className={`absolute bottom-0 left-[-40px] h-[60%] w-[50%] bg-link bg-contain bg-left-bottom bg-no-repeat sm:h-[90%] sm:w-[30%]`}></div>
        <div
          className={`absolute bottom-0 right-[-40px] h-[50%] w-[50%] bg-mario bg-contain bg-right-bottom bg-no-repeat sm:h-[70%] sm:w-[30%]`}></div>
        <h2 className="max-w-screen-md px-8 text-center text-2xl font-bold leading-snug lg:px-16 lg:text-4xl lg:leading-loose">
          Get excellent condition physical copies of your favorite SNES games
        </h2>
      </div>
      <div className="mt-12 flex w-full max-w-screen-xl flex-col gap-12 px-6 md:mt-24 md:flex-row lg:gap-32">
        {sellingPointCardContent.map((content) => (
          <SellingPointCard key={content.title} {...content} />
        ))}
      </div>
      <div className="mt-12 w-full max-w-screen-xl px-6 text-center text-lg leading-snug md:mt-24 lg:text-2xl lg:leading-loose">
        Step into the world of Retro Potato, your go-to destination for all
        things SNES nostalgia. With a meticulously curated collection,
        lightning-fast delivery, and a commitment to seamless retro joy, we
        invite you to savor the golden era of gaming with each pixel. Relive the
        classics effortlessly, because at Retro Potato, the magic of retro
        gaming is just a click away.
      </div>
      <div className="mt-12 flex w-full justify-center bg-sky-50 pb-12 pt-16 md:mt-24 md:pb-24">
        <div className="max-w-screen-xl px-6">
          <Title>Our Top Games</Title>
          <FetchComponent Child={Products} numOfProductsToShow={3} />
          <div className="mt-12 flex justify-center md:mt-16">
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
