import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetItems } from '../../redux/cartSlice';
import './success.scss';
const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetItems());
  }, []);

  return (
    <div className="success">
      <div className="wrapper">
        <h1> Success :)</h1>
        <h1> Thank you for you purchase! </h1>
        <Link to="/">Continute to Shopping</Link>
      </div>
    </div>
  );
};
export default Success;
