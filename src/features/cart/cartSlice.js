import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import cartItems from './../../cartItems';
import { openModal } from "../modal/modalSlice";
// import { getCartItems } from './../../../../vite-final/src/features/cart/cartSlice';
const url = 'https://course-api.com/react-useReducer-cart-project';



const initialState = {
    // cartItems:cartItems,
    cartItems:[],
    amount: 4,
    total: 0,
    isLoading:true
}

//creating asyncThunk this function must return promise always remember
//so it denote all lifecycle of promise(like pending,fullfiled,rejected)
//for this we have to create
//extraReducers: {
//[getCartItems.pending]: (state) => { state.isLoading = true },
//[getCartItems.fulfilled]: (state,action) =>
//{ state.isLoading = false ,state.cartItems=action.payloads },
//[getCartItems.rejected]: (state) => { state.isLoading = false }}

//using fetch api
// export const getCartItems = createAsyncThunk('cart/getCartItems', () => { 
//     return fetch(url)
//         .then((resp) => resp.json())
//         .catch((err) => console.log(err))
// })

//using async await 
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async () => { 
        try {
            const resp = await axios.get(url)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue("There was an error..........")
        }
    }
)

//using async await and also access parameter and thunkAPI which is useful
// export const getCartItems = createAsyncThunk(
//     'cart/getCartItems',
//     async (name,thunkAPI) => {
//         try {
//   for access this name we pass name in app where we dispatch  
//      dispatch(getCartItems("name")) and we can access it
//              console.log(name)
//              console.log(thunkAPI)
//              console.log(thunkAPI.getState())    
//              thunkAPI.dispatch(openModal())

//             const resp = await axios.get(url)
//             return resp.data
//         } catch (error) {
//             return thunkAPI.rejectWithValue("There was an error..........")
//         }
//     }
// )


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // we directly modify state bcoz of immer library
        //clearCart is function
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            // here action is Object so it contain two property one is type and second is payload
            // id is inside of payload so we can destructer payload and use id directly by 
            //passing id as object from cartItem below in increase and decrease we have used both approach see it 
            console.log(action)
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        // increase:(state,action) or destructer payload as (action,{payload})
        increase: (state, { payload }) => {
            console.log(payload)
            // const itemId=payload.id you can use to find and access itemId in place of payload.id
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, action) => {
            //below line of code show what action contain so we get id just action.payload
            // if we not passing id as objects here we pass only id value not like in increase 
            // where we pass id as object
            console.log(action)
            const itemId = action.payload
            // const cartItem = state.cartItems.find((item) =>  item.id === payload.id)
            const cartItem = state.cartItems.find((item) => item.id === itemId)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotal: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        },
    },
    //extra reducer using builder in RTK 2.0
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(getCartItems.fulfilled,(state, action) => {
            console.log(action)
            state.isLoading = false
            state.cartItems = action.payload
        }).addCase(getCartItems.rejected, (state) => {
            state.isLoading = false
        })
     }

    //we adding extra reducers here
    // extraReducers: {
    //     [getCartItems.pending]: (state) => {
    //         state.isLoading = true
    //     },
    //     [getCartItems.fulfilled]: (state, action) => {
    //         console.log(action)
    //         state.isLoading = false
    //         state.cartItems = action.payload
    //     },
    //     [getCartItems.rejected]: (state) => {
    //         state.isLoading = false
    //     }
    // }
    
})
// console.log(cartSlice)
export const { clearCart,removeItem,increase,decrease,calculateTotal}=cartSlice.actions
export default cartSlice.reducer
