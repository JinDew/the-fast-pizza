import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItemButton from "./DeleteItemButton";
import UpdateCartQuantity from "./UpdateCartQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCartQuantity pizzaId={pizzaId} />
        <DeleteItemButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
