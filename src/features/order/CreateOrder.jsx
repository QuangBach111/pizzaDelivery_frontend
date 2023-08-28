/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// import { useState } from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import store from "../../redux/store";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getTotalCartPrice } from "../cart/cardSlice";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
function isValidPhone(str) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
}

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();
  const formError = useActionData();

  const { username } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const totalPrice = useSelector(getTotalCartPrice);
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <button onClick={() => dispatch(fetchAddress())}>CLick me</button>
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={username}
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              required
              className="input"
            />
          </div>
          {formError?.phone && <p className="mt-2 text-xs, text-red-700 bg-red-100">{formError.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div className="relative">
            <input type="text" name="address" className="input" required />
            <span className="absolute right-0.5 ">
              <Button type="small" onClick={() => dispatch(fetchAddress())}>
                Get Position
              </Button>
            </span>
          </div>
        </div>

        <div className="m-2 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input type="hidden" name="totalPrice" value={totalPrice} />
        <div>
          <Button
            disabled={isSubmitting}
            type="primary"
          >
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please give us your correct phone number. We might need it to contact you.';
  }
  if (Object.keys(errors).length > 0) return errors;

  // const newOrder = await createOrder(order);
  const orderId = await createOrder(order);
  console.log('orderId', orderId);


  store.dispatch(clearCart());
  return redirect(`/order/${orderId}`);
}

export default CreateOrder;
