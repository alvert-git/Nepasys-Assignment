import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CartSidebar from './CartSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
            <Navbar />
            <main>
                <Outlet/>
            </main>
            <Footer/>

            <CartSidebar /> 
        </>
  )
}

export default Layout