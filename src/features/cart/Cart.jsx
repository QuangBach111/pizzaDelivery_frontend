/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from "./cardSlice";
function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

      <ul className='divide-y divide-stone-200 mt-3'>
        {cart.map(item => (
          < CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button onClick={handleClearCart} type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
