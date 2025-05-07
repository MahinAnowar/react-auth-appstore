import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { Outlet, useNavigation } from 'react-router-dom'
import { Footer } from '../Components/Footer/Footer'
import Loading from '../Pages/Loading/Loading'

export const HomeLayout = () => {
  const {state} = useNavigation();
  return (
    <div>
        <Navbar></Navbar>
        {state=="loading" ? <Loading></Loading> : <Outlet></Outlet> }
        <Footer></Footer>
    </div>
  )
}
