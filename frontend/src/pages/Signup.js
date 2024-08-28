import React from 'react'
import signupgif from "../assest/login-animation.gif"
import { BiShow, BiHide } from "react-icons/bi"
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import ImagetoBase64 from '../utility/ImageToBase64'
import { toast } from 'react-hot-toast'

const Signup = () => {
  const navigate = useNavigate()
  // show pwd
  const [showPwd, setShowPwd] = useState(false)
  const handleShowPwd = () => {
    setShowPwd(prev => !prev)
  }

  // show confirm pwd
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const handleShowConfirmPwd = () => {
    setShowConfirmPwd(prev => !prev)
  }

  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
    image : ""
  })

  // it allows writing in all 5 fields fname,lname,email,pwd,cnfpwd
  const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((prev) => {
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((prev) => {
      return {
        ...prev,
        image : data
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() //once we click on sign up button, it will dis allow to refresh page automatically 
    const {firstName, email, password, confirmPassword, image} = data //it means all are required from gui
    if (firstName && email && password && confirmPassword && image){
      if(password === confirmPassword){
        //sending data to server
        const fetchData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })

        const dataRes = await fetchData.json()
        console.log(dataRes)
        // alert(dataRes.message)
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/login") //if email id already register, then it will navigate to login page
        }
      }else{
        alert("Password mismatch")
      } 
    }else{
      alert("Please enter required fields")
    }
  }
    
  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        {/* <h1 className='text-center text-2xl font-bold'>SignUp</h1> */}
        <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
            <img src={data.image ? data.image : signupgif} className='w-full h-full'/>

            <label htmlFor='profileImage'>
              <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                <p className='text-sm p-1 text-white'>Upload</p>
              </div>
              <input 
                type={'file'} 
                id='profileImage' 
                accept='image/*' 
                className='hidden' 
                onChange={handleUploadProfileImage}
              />
            </label>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input 
              type={'text'} 
              id='firstName' 
              name='firstName' 
              className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
              value={data.firstName}
              onChange={handleOnChange}
            />


            <label htmlFor='lastName'>Last Name</label>
            <input 
              type={'text'} 
              id='lastName' 
              name='lastName' 
              className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
              value={data.lastName}
              onChange={handleOnChange}
            />


            <label htmlFor='email'>Email</label>
            <input 
              type={'email'} 
              id='email' 
              name='email' 
              className='mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
              value={data.email}
              onChange={handleOnChange}
            />


            <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
              <input 
                type={showPwd ? "text" : "password"} 
                id='password' 
                name='password' 
                className='w-full bg-slate-200 border-none outline-none'
                value={data.password}
                onChange={handleOnChange}
              />
              {/* if show pwd false then it will show in form of pwd otherwise it will show in form of text */}
              <span 
                className='flex text-xl cursor-pointer' 
                onClick={handleShowPwd}>{showPwd ? <BiShow/> : <BiHide/>}
              </span>
            </div>


            <label htmlFor='confirmPassword'>Confirm Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
              <input 
                type={showConfirmPwd ? "text" : "password"} 
                id='confirmPassword' 
                name='confirmPassword' 
                className='w-full bg-slate-200 border-none outline-none'
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span 
                className='flex text-xl cursor-pointer' 
                onClick={handleShowConfirmPwd}>{showConfirmPwd ? <BiShow/> : <BiHide/>}
              </span>
            </div>


            <button type='submit' className='max-w-[150px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
              Sign Up!!
            </button>
        </form>
        <p className='text-left text-sm mt-2'>Already have account? <Link to={"/login"} className="text-red-500 underline">Login</Link> </p>
      </div>
    </div>
  )
}

export default Signup
