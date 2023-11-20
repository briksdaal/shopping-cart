import iconWhite from '../../assets/retro_potato_icon_white.png';
import logoWhite from '../../assets/retro_potato_logo_white.png';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex justify-center bg-darkblue py-16">
      <div className="m-4 flex w-full max-w-screen-xl text-white">
        <div className="mr-16 flex-[2_2_0%]">
          <Link to="/">
            <div className="flex items-center gap-4">
              <img className="w-20" src={iconWhite} alt="Retro Potato" />
              <img className="w-56" src={logoWhite} alt="Retro Potato Logo" />
            </div>
          </Link>
          <p className="text-neutral-400">
            At Retro Potato, our commitment to delivering joy is as strong as
            our love for all things retro. Explore, play, and relive the magic
            with us – where every pixel tells a story.
          </p>
        </div>
        <div className="mr-16 flex-1">
          <h3 className="mb-5 mt-7 text-2xl">Pages</h3>
          <ul className="flex flex-col gap-2 text-neutral-400">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="mr-16 flex-1">
          <h3 className="mb-5 mt-7 text-2xl">Contact Us</h3>
          <p className="text-3xl">
            <a
              className="footer-link"
              href="https://github.com/briksdaal"
              target="_blank"
              rel="noreferrer">
              <FaGithub />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
