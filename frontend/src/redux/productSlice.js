import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast"

const initialState = {
    productList : [],
    cartItem : []
}

export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setDataProduct : (state,action) => {
            state.productList = [...action.payload]
        },
        addCartItem : (state,action) => {
            const check = state.cartItem.some((el) => el._id === action.payload._id)
            if(check){
                toast("Already item in cart")
            }else{
                toast("One item added to cart")
                const total = action.payload.price
                state.cartItem = [...state.cartItem, {...action.payload, qty : 1, total : total}] 
            }
        },
        deleteCartItem : (state,action) => {
             //once we click delete icon in cart page(AiFillDelete in CartProduct), here id will display to console for deleted item because we passed this deleteCart function in onclick of AiFillDelete in CartProduct.js
            toast("One item deleted")
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            state.cartItem.splice(index,1)
            console.log(index)
        },
        increaseQty : (state,action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let qty = state.cartItem[index].qty
            const qtyInc = ++qty
            state.cartItem[index].qty = qtyInc
            //when we increase qty in cart then total price should also be updated in cart page
            const price = state.cartItem[index].price
            const total =  price * qtyInc

            state.cartItem[index].total = total
        },
        decreaseQty : (state,action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let qty = state.cartItem[index].qty
            if (qty > 1){
                const qtyDec = --qty
                state.cartItem[index].qty = qtyDec

                const price = state.cartItem[index].price
                const total =  price * qtyDec

                state.cartItem[index].total = total
            }
        }
    }
})

export const {setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty} = productSlice.actions

export default productSlice.reducer