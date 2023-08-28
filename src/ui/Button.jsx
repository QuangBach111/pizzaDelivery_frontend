/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base = "bg-yellow-400 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:cursor-not-allowed";
  if (!type) type = base;

  const styles = {
    base,
    primary: base + "px-4 py-3 sm:px-6 sm:py-4",
    small: base + "px-4 py-1.5 sm:px-5 sm:py-2.5 text-xs",
    secondary: "bg-transparent uppercase border-2 border-stone-300 font-semibold text-stone-400 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 disabled:cursor-not-allowed px-4 py-3 sm:px-6 sm:py-4",
    round: base + "rounded-full px-4 py-1.5 sm:px-5 sm:py-2.5 text-xs"
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={styles[type]}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

export default Button;
