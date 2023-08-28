/* eslint-disable react/prop-types */
/* eslint-disable no-extra-semi */

import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItem, increaseItem } from "./cardSlice";
import { getCartQuantityById } from "./cardSlice";
function UpdateItemQuantity({ pizzaId }) {
  const currentQuantity = useSelector(getCartQuantityById(pizzaId));
  console.log(currentQuantity);
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        type="round"
        onClick={() => dispatch(decreaseItem(pizzaId))}
      >
        -
      </Button>
      <span className="px-2">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItem(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
