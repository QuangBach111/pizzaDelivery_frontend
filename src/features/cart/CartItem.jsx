/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cardSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";
function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  function handleDeleteCartItem() {
    dispatch(deleteItem(item.pizzaId));
  }

  return (
    <li className="py-3 flex justify-between items-center">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-5">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={item.pizzaId} />
        <Button onClick={handleDeleteCartItem} type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
