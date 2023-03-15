import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import './home.scss';
const Home = () => {
  const dispatch = useDispatch();
  const products = [
    {
      id: 1,
      title: 'coffee',
      price: 4.99,
    },
    {
      id: 2,
      title: 'sunglasses',
      price: 9.99,
    },
    {
      id: 3,
      title: 'camera',
      price: 39.99,
    },
  ];
  return (
    <div className="home">
      <div className="wrapper">
        <h1> Welcome to the store! </h1>
        <div className="items">
          {products.map((p, idx) => {
            return (
              <div key={idx} className="item">
                <h1>{p.title}</h1>
                <h2>{p.price}</h2>
                <button
                  onClick={() => dispatch(addItem({ product: p, quantity: 1 }))}
                >
                  ADD TO CART
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;
