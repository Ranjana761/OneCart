import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className='w-full bg-[#dbfcfcec] text-[#1e2223] 
      md:pb-0 pb-[90px] md:pt-[40px] pt-[25px] border-t border-slate-300'>

      {/* Top Section */}
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row 
        justify-between items-start md:items-center px-[20px] gap-[30px] md:gap-[0]'>

        {/* Brand */}
        <div className='flex flex-col items-start justify-start gap-[10px] w-full md:w-[30%]'>
          <div className='flex items-center gap-[10px]'>
            <img src={logo} alt='logo' className='w-[35px] h-[35px]' />
            <h1 className='text-[22px] font-semibold'>OneCart</h1>
          </div>
          <p className='hidden md:block text-[15px] leading-[1.5rem]'>
            OneCart is your all-in-one online shopping destination, offering
            quality products, unbeatable deals, and fast delivery — all backed
            by trusted service to make your life easier every day.
          </p>
          <p className='md:hidden text-[15px]'>
            Fast. Easy. Reliable. OneCart shopping.
          </p>
        </div>

        {/* Company */}
        <div className='flex flex-col items-start md:items-center justify-start gap-[10px] w-full md:w-[25%]'>
          <h2 className='text-[18px] font-semibold'>Company</h2>
          <ul className='flex flex-col gap-[5px] text-[15px]'>
            <li className='cursor-pointer hover:text-[#007b7b]'>Home</li>
            <li className='cursor-pointer hover:text-[#007b7b]'>About Us</li>
            <li className='cursor-pointer hover:text-[#007b7b]'>Delivery</li>
            <li className='cursor-pointer hover:text-[#007b7b]'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className='flex flex-col items-start md:items-center justify-start gap-[10px] w-full md:w-[25%]'>
          <h2 className='text-[18px] font-semibold'>Get In Touch</h2>
          <ul className='flex flex-col gap-[5px] text-[15px]'>
            <li className='cursor-pointer hover:text-[#007b7b]'>+91-9340728935</li>
            <li className='cursor-pointer hover:text-[#007b7b]'>contact@onecart.com</li>
            <li className='cursor-pointer hover:text-[#007b7b]'>+1-123-456-7890</li>
            <li className='cursor-pointer hover:text-[#007b7b]'>admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className='w-full h-[1px] bg-slate-300 mt-[25px]'></div>

      {/* Bottom Section */}
      <div className='w-full text-center py-[10px] text-[14px]'>
        © 2025 OneCart. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
