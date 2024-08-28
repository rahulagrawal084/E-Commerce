import { React, useState } from 'react'
import signupgif from "../assest/login-animation.gif"
import { BiShow, BiHide } from "react-icons/bi"
import { Link, Navigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loginRedux } from '../redux/userSlice'


const Login = () => {

  const [data, setData] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate();

  const userData = useSelector(state => state)

  const dispatch = useDispatch()

  // show pwd
  const [showPwd, setShowPwd] = useState(false)
  const handleShowPwd = () => {
    setShowPwd(prev => !prev)
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault() //once we click on sign up button, it will dis allow to make fields blank
    const { email, password } = data //it means all are required
    if (email && password){
      // sending data to server
      const fetchData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      console.log(dataRes)
      toast(dataRes.message)

      // in case if either email or password incorrect, my logic
      if(!dataRes.alert){
        setData(() => {
          return {
            email : "",
            password : ""
          }
        })
      }

      if(dataRes.alert){
        dispatch(loginRedux(dataRes)) //sending data to redux
        setTimeout(() => { //it will take only one sec to navigate home page after login
          navigate("/")
        }, 1000);
      }
      console.log(userData)

    }else{
      alert("Please enter required fields")
    }
  }

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        {/* <h1 className='text-center text-2xl font-bold'>SignUp</h1> */}
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
            <img src={signupgif} className='w-full'/>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
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


            <button type='submit' className='max-w-[150px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
              Login
            </button>
        </form>
        <p className='text-left text-sm mt-2'>Don't have account? <Link to={"/signup"} className="text-red-500 underline">Sign Up!!</Link> </p>
      </div>
    </div>
  )
}

export default Login
