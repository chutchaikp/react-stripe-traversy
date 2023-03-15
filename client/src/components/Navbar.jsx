import { Link } from 'react-router-dom';
import {
  MdAssignmentAdd,
  MdCameraOutdoor,
  MdClose,
  MdHome,
  MdLogin,
  MdMenu,
  MdRemove,
  MdShoppingCart,
} from 'react-icons/md';
import './navbar.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseQuantity,
  increseQuantity,
  removeItem,
  resetItems,
} from '../redux/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { publicRequest } from '../requestMethod.js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Navbar = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [showTopCart, setShowTopCart] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const requestBody = {
        userName: 'dev',
        email: 'chutchai.kp@gmail.com',
        items,
      };

      const response = await publicRequest.post('/orders', requestBody);
      const session = response.data;
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      debugger;
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">STORE</Link>
        </div>

        <div className="menu">
          <ul>
            <li>
              <Link to="/">
                <MdHome />
              </Link>
            </li>

            <li>
              <Link to="/">
                <MdMenu />
              </Link>
            </li>
            <li>
              <div
                className="cart"
                onClick={() => setShowTopCart(!showTopCart)}
              >
                <MdShoppingCart />
                {items.length > 0 && (
                  <div className="counter">{items.length}</div>
                )}
              </div>

              {showTopCart && (
                <div className="modal">
                  <div className="header">
                    <span>Shopping Bag ({items.length})</span>
                    <MdClose onClick={() => setShowTopCart(false)} />
                  </div>

                  <div className="items">
                    {items.map((item, idx) => {
                      return (
                        <div key={idx} className="item">
                          <div className="title">{item.product.title}</div>
                          <div className="price">{item.product.price}</div>
                          <div className="quantity">
                            <button
                              onClick={() =>
                                dispatch(decreaseQuantity(item.product))
                              }
                            >
                              -
                            </button>
                            {item.quantity}
                            <button
                              onClick={() =>
                                dispatch(increseQuantity(item.product))
                              }
                            >
                              +
                            </button>
                          </div>
                          <div
                            className="btn"
                            onClick={() => dispatch(removeItem(item))}
                          >
                            <MdClose />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="subtotal">
                    <span>SUBTOTAL</span>
                    <span>{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="btnCheckout">
                    <button onClick={handleCheckout}>CHECKOUT</button>
                  </div>
                  <div className="reset">
                    <button onClick={() => dispatch(resetItems())}>
                      reset
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
