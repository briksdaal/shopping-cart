import PropTypes from 'prop-types';
import Title from './Title';

function H3({ children }) {
  return <h3 className="mb-2 text-2xl">{children}</h3>;
}

H3.propTypes = {
  children: PropTypes.string
};

function P({ children }) {
  return <p className="mb-8">{children}</p>;
}

P.propTypes = {
  children: PropTypes.string
};

export default function About() {
  return (
    <div className="flex w-full justify-center bg-sky-50">
      <div className="mx-4 my-12 w-full max-w-screen-xl md:my-16">
        <Title>About Us</Title>
        <H3>About Retro Potato</H3>
        <P>
          Welcome to Retro Potato, a haven for passionate gamers and devoted
          enthusiasts of the golden age of video gaming. Born out of a shared
          love for the classics, Retro Potato is more than just a shop –
          it&apos;s a celebration of the iconic Super Nintendo Entertainment
          System (SNES) era. Our journey began with a simple mission: to bring
          the magic of 16-bit gaming back to life, curated for a new generation
          of players and cherished by those who&apos;ve never forgotten the joy
          of blowing into a cartridge.
        </P>
        <H3>Curating Nostalgia, Pixel by Pixel</H3>
        <P>
          At Retro Potato, we believe in the power of nostalgia to transport us
          to a time when gaming was an adventure, and each pixel held a world of
          possibilities. Our team is dedicated to curating a collection that
          goes beyond mere games – we handpick each title to ensure that it
          embodies the essence of the SNES era. From timeless classics to hidden
          gems, our inventory is a carefully crafted journey through the rich
          history of gaming, where every title tells a story and every console
          holds a piece of the past.
        </P>
        <H3>Fast, Seamless, and Joyful</H3>
        <P>
          We understand that the joy of retro gaming should be accessible and
          immediate. That&apos;s why, at Retro Potato, we prioritize a seamless
          experience from the moment you click to explore our catalog to the
          instant your chosen game arrives at your doorstep. With lightning-fast
          delivery and a commitment to customer satisfaction, we strive to make
          your journey into the world of Retro Potato as enjoyable as the games
          themselves. Join us in reliving the magic – because here, the spirit
          of retro gaming lives on, and every player is part of our story.
        </P>
      </div>
    </div>
  );
}
