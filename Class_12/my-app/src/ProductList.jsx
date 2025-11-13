import React from 'react'
import { Link, Outlet } from 'react-router'

export default function ProductList() {

    const products = [
        123,12,445,55,766
    ]
  return (
    <>
        <div>
            Products we have:
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
            {products.map((item, index)=><Link key={index} to={`/productlist/${item}`}>Product No. {item}</Link>)}

        </div>
        <Outlet/>
    </>
  )
}
