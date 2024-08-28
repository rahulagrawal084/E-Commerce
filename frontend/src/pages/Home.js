import React, { useEffect, useRef, useState } from 'react'
import bike from "../assest/bike.png"
import HomeCard from '../components/HomeCard'
import { useSelector } from "react-redux"
import CardFeature from '../components/CardFeature'
import { GrPrevious, GrNext } from "react-icons/gr"
import FilterProduct from '../components/FilterProduct'
import AllProduct from '../components/AllProduct'

const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  const homeProductCartList = productData.slice(1,5)
  const homeProductCartListVegetable = productData.filter(el => el.category === "vegetables", [])

  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef = useRef() //referencing from cardFeature below

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200
  }

  const prevProduct = () => { 
    slideProductRef.current.scrollLeft -= 200
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src={bike} className='h-7'/>
          </div>
        <h2 className='text-4xl md:text-7xl font-bold py-3'>The fastest delivery at <span className='text-red-600'>your home</span></h2>
        <p className='py-3 text-base'>An e-commerce website is one that allows people to buy and sell physical goods, services, and digital products over the internet rather than at a brick-and-mortar location</p>
        <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {
          homeProductCartList[0] ? homeProductCartList.map((el) => {
            return (
              <HomeCard
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            )
          }) : loadingArray.map((el,index) => {
            return (
              <HomeCard
                key={index+"loading"}
                loading={"Loading..."}
              />
            )
          })
        }
        </div>
      </div>
      <div className=''>
          <div className='flex w-full items-center'>
            <h2 className='font-bold text-2xl text-slate-800 mb-4'>Fresh Vegetables</h2>
            <div className='ml-auto flex gap-4'>
              <button className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded' onClick={prevProduct}><GrPrevious/></button>
              <button className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded' onClick={nextProduct}><GrNext/></button>
            </div>
          </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
            {
              homeProductCartListVegetable[0] ? homeProductCartListVegetable.map(el => {
                return (
                  <CardFeature
                    key={el._id+"vegetables"}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                )
              })
              : 
              loadingArrayFeature.map((el, index) => <CardFeature loading="Loading..." key={index+"cartLoading"}/>)
            }
          </div>
        </div>

        <AllProduct heading={"Your Product"}/>
    </div>
  )
}

export default Home
