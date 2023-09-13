import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotal,getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";
// import { getCartItems,isLoading } from './../../vite-final/src/features/cart/cartSlice';
// import cartItems from './cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

function App() {
  //we can invoke this calculatetotal in cart container also we have implement it in cartContainer
  // const { cartItems } = useSelector((state) => state.cart)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(calculateTotal())
  //  },[cartItems])

  //this code for async thunk use below code we dont
  //use cartItems bcoz it is used in calculating total and we calculate it in cartcontainer
  const { isOpen}=useSelector((state)=>state.modal)
  const { isLoading } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  
  //for getCartItems we setup useEffects
  useEffect(() => { 
    dispatch(getCartItems())
  }, [])
  
  if (isLoading) { 
    return <div className="loading">
          <h1>Loading....</h1>
          </div>
  }

  
  return <>
    { isOpen && <Modal/>}
    <Navbar />
    <CartContainer/>
  </>;
}
export default App;
//finally app run using asyncThunk