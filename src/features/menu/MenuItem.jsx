/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem } from "../cart/cardSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { useState } from "react";
// import { useState } from "react";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  // const [quantity, setquantity] = useState(1);
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const [isAdd, setIsAdd] = useState(false);
  function handleAddToCart() {
    setIsAdd(true);
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  function handleDeleteCart() {
    setIsAdd(false);
    dispatch(deleteItem(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex flex-col w-full">
        <p>{name}</p>
        <p className="text-sm capitalize italic pt-0.1">{ingredients.join(', ')}</p>

        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {!soldOut && (
            <div className="flex gap-3">
              {isAdd ? (
                <>
                  <UpdateItemQuantity pizzaId={pizza.id} />
                  <Button type="small" onClick={handleDeleteCart}>Delete</Button>
                </>
              ) : (
                <Button onClick={handleAddToCart} type="small">Add to card</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
