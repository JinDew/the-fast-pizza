import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  currentNumberById,
  decreaseQuantity,
  increaseQuantity,
} from "./cartSlice";

function UpdateCartQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const inCartNum = useSelector(currentNumberById(pizzaId));
  return (
    <div className="flex items-center gap-3">
      <Button onClick={() => dispatch(decreaseQuantity(pizzaId))} type="round">
        -
      </Button>
      <span className="text-sm font-medium">{inCartNum}</span>
      <Button onClick={() => dispatch(increaseQuantity(pizzaId))} type="round">
        +
      </Button>
    </div>
  );
}

export default UpdateCartQuantity;
