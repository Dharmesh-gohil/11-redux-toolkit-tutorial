import { useDispatch,useSelector } from "react-redux"
import CartItem from "./CartItem"
import { calculateTotal, clearCart } from "../features/cart/cartSlice"
import { useEffect } from "react"
import { openModal } from "../features/modal/modalSlice"

const CartContainer = () => {
  const dispatch=useDispatch()
  const { cartItems,amount,total}=useSelector((state)=>state.cart)
  useEffect(() => { 
    dispatch(calculateTotal())
  },[cartItems])
  if (amount < 1) { 
  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
        <h4 className="empty-cart">is currently empty</h4>
      </header>
    </section>
  )
}

  return (
    <section className="cart">
      <header>
        <h2>Your bag has</h2>
      </header>
      <div>
        {cartItems.map((item) => { 
          const { id } = item
           return < CartItem key = { id }{ ...item}/>
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>Total <span>${ total.toFixed(3)}</span></h4>
        </div>
        {/* <button className="btn clear-btn" onClick={()=>dispatch(clearCart())}>Clear-Item</button> */}
        <button className="btn clear-btn"
          onClick={() => dispatch(openModal())}
          // disabled={cartItems.length === 0}
          // style={cartItems.length !== 0 ? { opacity: "1" } : {opacity:"0.3", transition:"all .3s ease-in-out"}}
        >
          Clear-Item
        </button>

      </footer>
    </section>
  )
}
export default CartContainer