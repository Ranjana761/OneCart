import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { IoTrashBin } from "react-icons/io5"
import CartTotal from '../component/CartTotal'

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] 
    px-[15px] md:px-[40px] pt-[100px] pb-[100px] md:pb-[40px] text-white">

      {/* Page Title */}
      <div className="text-center mb-[30px]">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-[20px] mb-[40px]">
        {cartData.length === 0 ? (
          <p className="text-center text-gray-400 text-[18px]">
            Your cart is empty 🛒
          </p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            if (!productData) return null

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-[15px] 
                bg-[#1d3a3a91] p-[12px] rounded-2xl border border-[#2f5252] 
                shadow-md flex-wrap"
              >
                {/* Product Image */}
                <img
                  src={productData.image1}
                  alt={productData.name}
                  className="w-[90px] h-[90px] rounded-lg object-cover"
                />

                {/* Product Info */}
                <div className="flex flex-col justify-between flex-1 min-w-[140px]">
                  <p className="text-[18px] font-semibold">{productData.name}</p>
                  <p className="text-[#9ff9f9] mt-[4px]">
                    {currency}{productData.price}
                  </p>
                </div>

                {/* Size, Quantity, and Delete grouped */}
                <div className="flex items-center gap-[10px]">
                  {/* Size */}
                  <p className="w-[38px] h-[38px] text-center leading-[38px]
                  bg-[#518080b4] border border-[#9ff9f9] rounded-md text-[15px]">
                    {item.size}
                  </p>

                  {/* Quantity */}
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="w-[50px] h-[38px] bg-[#518080b4] border border-[#9ff9f9]
                    rounded-md text-center text-[16px] font-semibold text-white outline-none"
                    onChange={(e) =>
                      e.target.value === ' ' || e.target.value === '0'
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                  />

                  {/* Delete */}
                  <IoTrashBin
                    className="text-[#9ff9f9] w-[25px] h-[25px] cursor-pointer hover:text-[#f06]"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Cart Total + Button */}
      {cartData.length > 0 && (
        <div className="flex flex-col items-center md:items-start gap-[20px]">
          <div className="w-full sm:w-[400px]">
            <CartTotal />
          </div>

          <button
            className="text-[18px] bg-[#2a5454] hover:bg-[#387373] py-[12px] px-[50px]
            rounded-xl text-white border border-[#3a6b6b] shadow-md transition-all duration-200"
            onClick={() => navigate('/placeorder')}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
