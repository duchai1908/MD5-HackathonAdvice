import React, { useContext } from 'react'
import {ProductProvider} from '../providers/ProductContext'
import ProductItem from './ProductItem'


export default function ListProduct() {
  const { listProduct } = useContext(ProductProvider)


  return (
    <>
       <h1 className="text-center py-4 text-2xl font-bold">
        DANH SÁCH SẢN PHẨM
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-5 py-5 gap-5">
        {listProduct.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
