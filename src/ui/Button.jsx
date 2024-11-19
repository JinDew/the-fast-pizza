import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "font-semibold text-sm tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full disabled:bg-slate-100 disabled:cursor-not-allowed focus:ring-orange-200 focus:ring focus:outline-none focus:bg-yellow-300 focus:ring-offset-2 hover: text-stone-800 hover:bg-yellow-200";

  const styles = {
    primary: base + " px-6 py-3 ",
    round: base + " px-3.5 py-1.5 ",
    small: base + " px-1 py-1 sm:px-4 text-xs",
    secondary:
      "px-4 text-sm py-2 text-stone-400 md:px-6 md:py-3 border-2 border-stone-300 font-semibold tracking-wide uppercase transition-colors duration-300  rounded-full disabled:bg-slate-100 disabled:cursor-not-allowed focus:ring-orange-200 focus:ring focus:outline-none focus:bg-yellow-300 focus:ring-offset-2 hover:text-stone-800 hover:bg-stone-300",
  };

  const className =
    "px-4 py-3 font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full md:px-6 md:py-3 disabled:bg-slate-100 disabled:cursor-not-allowed focus:ring-orange-200 focus:ring focus:outline-none focus:bg-yellow-300 focus:ring-offset-2 hover: text-stone-800 hover:bg-stone-300";

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
