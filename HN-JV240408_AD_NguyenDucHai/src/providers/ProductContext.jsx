import React, { useEffect, useState } from 'react'
import ProductList from '../data.json'
import { saveData } from '../utils/common';
export const ProductProvider = React.createContext();
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function ProductContext({children}) {
    const[totalAmount,setTotalAmount] = useState(0);
    const [listProduct,setListProduct] = useState(()=>{
        return ProductList;
    })
    const[listCart,setListCart] = useState(()=>{
        const cartLocals = JSON.parse(localStorage.getItem("carts")) || []
        return cartLocals
    })
    /**
     * Hàm thêm sản phẩm vào giỏ hàng
     * @param {*} product Đối tượng product
     * Auth: NDHai (18/09/2024)
     */
    const handleAddToCart = (product)=>{
        const findProductByCart = listCart.find(item=>item.product.id === product.id)
        if(!findProductByCart){
            const updateCart = [...listCart,{product,quantity:1}]
            setListCart(updateCart)
            saveData('carts',updateCart)
        }else{
            const updateCarts = listCart.map((cart) => {
                if (cart.product.id === product.id) {
                  return { ...cart, quantity: (cart.quantity + 1) };
                }
                return cart;
            });
            setListCart(updateCarts)
            saveData('carts',updateCarts)
        }
    }
    
    /**
     * Hàm thay đổi số lượng của sản phẩm trong giỏ hàng
     * @param {*} id id của sản phẩm trong giỏ hàng
     * @param {*} change trạng thái tăng hoặc giảm 
     * Auth: NDHai (18/09/2024)
     */
    const changeQuantity = (id,change = "") =>{
        const indexChange = listCart.findIndex(item=>item.product.id === id)
        const newCart = [...listCart]
        if(indexChange !== -1){
            if(change === "+"){
                newCart[indexChange].quantity += 1
            }else if(change === "-"){
                if(newCart[indexChange].quantity === 1){
                    newCart.splice(indexChange,1)
                }else{
                    newCart[indexChange].quantity -= 1
                }      
            }
            setListCart(newCart)
            saveData('carts',newCart)
        }
    }

    /**
     * Hàm xoá sản phẩm khỏi giỏ hàng
     * @param {*} id id của sản phẩm trong giỏ hàng
     * Auth: NDHai (18/09/2024)
     */
    const handleDeleteFromCart = (id) =>{
        Modal.confirm({
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
            content: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            okText: 'Có',
            cancelText: 'Không',
            onOk() {
            const indexDelete = listCart.findIndex(item=>item.product.id === id)     
            if(indexDelete !== -1){
                const newCart = [...listCart]
                newCart.splice(indexDelete,1)
                setListCart(newCart)
                saveData('carts',newCart)
            }
            },
            onCancel() {
            
            },
        });    
    }

    /** 
     * Tính tổng giá tiền của giỏ hàng
     * Auth: NDHai (18/09/2024)
     */
    useEffect(()=>{
        const total = listCart.reduce((prev, current) => {
            return prev + current.product.price * current.quantity;
          }, 0);
          setTotalAmount(total)
    },[listCart])
  return (
    <>
        <ProductProvider.Provider value={{listProduct,handleAddToCart,listCart,handleDeleteFromCart,totalAmount,changeQuantity}}>
            {children}
        </ProductProvider.Provider>
    </>
  )
}
