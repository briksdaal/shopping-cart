import PropTypes from 'prop-types';

function Title({ children }) {
  return (
    <h2 className="mb-12 flex flex-col items-center text-center text-4xl md:mb-16">
      {children}
      <div className="mt-4 h-1 w-36 bg-blue-700"></div>
    </h2>
  );
}

Title.propTypes = {
  children: PropTypes.string
};

export default Title;
