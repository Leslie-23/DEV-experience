import React from 'react'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center h-10 text-[12px]'>
        <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by DevEx</p>
  </aside>

    </footer>
  )
}

export default Footer