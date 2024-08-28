import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs"
import ImagetoBase64 from '../utility/ImageToBase64'
import toast from 'react-hot-toast'

const NewProduct = () => {

  const [data, setData] = useState({
    name : "",
    image : "",
    category : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((prev) => {
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0])

    setData((prev) => {
      return {
        ...prev,
        image : data
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)

    const {name, image, category, price} = data;
    if(name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/uploadProduct`,{
        method : "POST",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
      console.log(fetchRes)
      toast(fetchRes.message)  //message coming from backend... "Upload successfully"

      //once data save, it will clear all fields from gui
      setData(() => {
        return {
          name : "",
          image : "",
          category : "",
          price : "",
          description : ""
        }
      })

    }else{
      toast("Enter required fields")
    }
  }

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input 
          type={'text'} 
          name='name' 
          className='bg-slate-200 p-1 my-1'
          value={data.name} 
          onChange={handleOnChange}
        />

        <label htmlFor='category'>Category</label>
        <select 
          className='bg-slate-200 p-1 my-1' 
          id='category' 
          name='category' 
          value={data.category}
          onChange={handleOnChange}>
            <option value={"others"}>Select Category</option>
            <option value={"fruits"}>Fruits</option>
            <option value={"vegetables"}>Vegetable</option>
            <option value={"icecream"}>Ice Cream</option>
            <option value={"dosa"}>Dosa</option>
            <option value={"pizza"}>Pizza</option>
            <option value={"rice"}>Rice</option>
            <option value={"cake"}>Cake</option>
            <option value={"burger"}>Burger</option>
            <option value={"paneer"}>Paneer</option>
            <option value={"sandwich"}>Sandwich</option>
        </select>
        {/* wrong logic, category selected as fruits by default in gui and click save...inspect section we can see category value as null */}

        <label htmlFor='image'>Image
        <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
          {
            data.image ? <img src={data.image} className='h-full'/> : <span className='text-5xl'><BsCloudUpload/></span>
          }
          <input 
            id='image' 
            accept='image/*' 
            type={"file"} 
            onChange={handleUploadImage} 
            className='hidden'
          />
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input 
          type={'text'} 
          id='price' 
          className='bg-slate-200 p-1 my-1' 
          name='price' 
          value={data.price}
          onChange={handleOnChange}
        />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} 
          className='bg-slate-200 p-1 my-1 resize-none' 
          name='description' 
          value={data.description}
          onChange={handleOnChange}>
        </textarea>

        <button className='bg-red-400 hover:bg-red-500 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct
