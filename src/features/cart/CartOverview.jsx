import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalNum, getCartTotalPrice } from "./cartSlice";

function CartOverview() {
  const totalCartQuan = useSelector(getCartTotalNum);
  const totalCartPrice = useSelector(getCartTotalPrice);

  if (!totalCartQuan) return null;

  return (
    <div className="flex items-center justify-between py-4 text-sm font-semibold uppercase lg:px-20 bg-stone-700 text-stone-200">
      <p className="space-x-4 text-stone-300">
        <span>{totalCartQuan} pizzas</span>
        <span>${totalCartPrice}</span>
      </p>

      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
