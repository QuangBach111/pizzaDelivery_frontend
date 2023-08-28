/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  if (to === -1)
    <button onClick={() => navigate(-1)}>&larr; Go back</button>;
  return (
    <Link to={to} className='text-sm text-blue-500 hover:text-blue-600'>
      {children}
    </Link>
  );
}

export default LinkButton;
