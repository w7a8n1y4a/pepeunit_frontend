import spinner_img from '/images/loader.svg'

import './primitives.css'

const Spinner = () => {
  return (
    <img className="spinner" src={spinner_img} width="36" height="36" alt="signout" />
  );
};

export default Spinner;

