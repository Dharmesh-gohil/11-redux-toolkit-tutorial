import { closeModal } from "../features/modal/modalSlice"
import { clearCart } from "../features/cart/cartSlice"
import { useDispatch } from "react-redux"

const Modal = () => {
    const dispatch=useDispatch()
  return (
      <aside className="modal-container">
          <div className="modal">
              <h4>Do you really wants to remove all items from cart ?</h4>
              <div className="btn-container">
                  <button className="btn confirm-btn" type="button" onClick={() => {
                      dispatch(clearCart())
                      dispatch(closeModal())
                  }}> confirm</button>
                  <button className="btn clear-btn" type="button" onClick={() => { dispatch(closeModal())}}> cancel</button>

              </div>
          </div>
      </aside>
  )
}
export default Modal