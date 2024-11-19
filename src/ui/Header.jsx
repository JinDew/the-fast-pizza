import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import { useSelector } from "react-redux";

function Header() {
  const userName = useSelector((state) => state.user.username);
  return (
    <header className="flex justify-around px-6 py-5 text-sm uppercase bg-yellow-500 border-t-8 md:py-10 md:text-3xl border-stone-500 font-pizza">
      <Link to="/">The Fast Pizza!</Link>
      {userName && <p className="hidden md:block">Founded by: {userName}</p>}
      <SearchOrder />
    </header>
  );
}

export default Header;
