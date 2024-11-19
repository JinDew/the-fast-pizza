import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);
  const nonPriorityTotalPrice = useSelector(getCartTotalPrice);
  const priceWithPriority = withPriority ? 0.2 * nonPriorityTotalPrice : 0;
  const withPriorityTotalPrice = priceWithPriority + nonPriorityTotalPrice;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    error: errorBoard,
    position,
    address: addressInfo,
  } = useSelector((state) => state.user);
  const isSubmittingAddress = addressStatus === "loading";
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="flex flex-col gap-2 mb-5 sm:items-center sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          <input
            className=" input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="w-full input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="p-2 mt-2 text-xs text-red-500 bg-red-200 rounded-md">
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isSubmittingAddress}
              className="w-full input"
              type="text"
              name="address"
              defaultValue={addressInfo}
              required
            />
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[8px]">
              <Button
                type="small"
                disabled={isSubmittingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        {addressStatus === "error" && (
          <p className="p-2 mt-2 text-xs text-red-500 bg-red-200 rounded-md">
            {errorBoard}
          </p>
        )}

        <div className="flex items-center gap-5 mb-12">
          <input
            className="w-6 h-6 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-yellow-400 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to prioritize your order?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />

        <div>
          <Button disabled={isSubmitting || isSubmittingAddress} type="primary">
            {isSubmitting
              ? "Placing Order"
              : `Order Now with ${formatCurrency(withPriorityTotalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newOrderObj = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  console.log(newOrderObj);

  const errObject = {};

  if (!isValidPhone(newOrderObj.phone))
    errObject.phone = "Please input correct phone number in digit only!";

  if (Object.keys(errObject).length > 0) return errObject;

  //If all good, then create order and redirect

  const returnData = await createOrder(newOrderObj);

  store.dispatch(clearCart());

  return redirect(`/order/${returnData.id}`);
  // return null;
}

export default CreateOrder;
