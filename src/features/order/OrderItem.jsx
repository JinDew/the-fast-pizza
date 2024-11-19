import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="">
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>

        <p className="font-semibold ">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm italic capitalize text-stone-500">
        {isLoadingIngredients ? "loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
