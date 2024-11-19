import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItems } from "./cartSlice";

function DeleteItemButton({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(removeItems(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default DeleteItemButton;
