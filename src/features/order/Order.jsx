/* eslint-disable no-unused-vars */
// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from './OrderItem';

function Order() {
  const order = useLoaderData();
  console.log('order', order);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  console.log('order', order);

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase text-red-50">Priority</span>}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between bg-stone-300 px-6 py-5">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className=" bg-stone-300 px-6 py-5">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const data = await getOrder(params.orderId);

  return data;
}

export default Order;
