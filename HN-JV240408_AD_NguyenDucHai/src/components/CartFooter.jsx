import React, { useContext } from 'react'
import { formatMoney } from '../utils/formatData';
import { ProductProvider } from '../providers/ProductContext';

export default function CartFooter() {
  const { totalAmount } = useContext(ProductProvider);
  return (
    <>
       <footer className="flex items-center gap-5 pt-5">
        <span>Tổng tiền:</span>
        <span>{formatMoney(totalAmount)}</span>
      </footer>
    </>
  )
}
