import React, { useContext } from 'react'
import { ProductProvider } from '../providers/ProductContext'

export default function CartItem({cart}) {
  const {handleDeleteFromCart,changeQuantity} = useContext(ProductProvider)
  return (
    <>
       <li className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            className="h-14 border p-1 w-14 object-cover rounded-full"
            src={cart.product.image}
            alt=""
          />
          <div>{cart.product.product_name}</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex gap-3">
            <button className="h-6 leading-4 px-2 border rounded" onClick={()=>changeQuantity(cart.product.id,"+")}>+</button>
            <span>{cart.quantity}</span>
            <button className="h-6 leading-4 px-2 border rounded" onClick={()=>changeQuantity(cart.product.id,"-")}>-</button>
          </div>
          <i onClick={()=>handleDeleteFromCart(cart.product.id)} className="fa-solid fa-trash cursor-pointer p-2 hover:bg-slate-50 rounded-full hover:text-black" />
        </div>
      </li>
    </>
  )
}
