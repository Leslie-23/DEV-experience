import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
        <aside>
    <p>Copyright © {new Date().getFullYear()} - All rights reserved by DevEx</p>
  </aside>

    </footer>
  )
}

export default Footer