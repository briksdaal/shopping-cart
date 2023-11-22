import PropTypes from 'prop-types';

function Title({ children, noMargin = false }) {
  return (
    <h2
      className={
        noMargin
          ? 'flex flex-col items-center text-center text-4xl'
          : 'mb-12 flex flex-col items-center text-center text-4xl md:mb-16'
      }>
      {children}
      <div className="mt-4 h-1 w-36 bg-blue-700"></div>
    </h2>
  );
}

Title.propTypes = {
  children: PropTypes.string,
  noMargin: PropTypes.bool
};

export default Title;
