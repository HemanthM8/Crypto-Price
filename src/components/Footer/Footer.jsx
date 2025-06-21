import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <p>© {new Date().getFullYear()} Crypto Price Tracker. All rights reserved.</p>
    </div>
  )
}

export default Footer
