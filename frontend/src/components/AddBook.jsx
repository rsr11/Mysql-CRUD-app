import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AddBook = () => {


    const [bookdata , setbookdata] = useState({
        name:"",
        description:"",
        price:Number(200)
    })  

    const navigate = useNavigate();

    const onChangeEvent = (e)=>{
        // console.log(e.target.value);
        setbookdata({...bookdata, [e.target.name]:e.target.value })  
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

      
       
        
        
        const {name,description, price} = bookdata;
            const response = await fetch("http://localhost:4000/books/addbook",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name,description,price})
            });
            const json = await response.json();
            console.log(json);
            navigate("/");
            
           


    }

  return (
    <div>
        <button className='bg-black border-2 border-black px-2 py-3 m-5 text-white' > <Link to={"/"}> / back to home page </Link> </button>
      <h1 className='text-center text-2xl font-bold'>Add new Book here !</h1>
      <div className='' >
        <form action="" onSubmit={handleSubmit} className='flex flex-col w-[30vw] mx-auto mt-10'>
            <label htmlFor="" >name</label>
            <input type="text" required minLength={5} maxLength={20} className='border-2 p-2 text-black'  onChange={onChangeEvent}  value={bookdata.name} placeholder='name of book..' name="name" id="" />
            <label htmlFor="" className='mt-3' >Description</label>
            <textarea name="description" minLength={10} maxLength={255} required className='border-2 p-2' id="" onChange={onChangeEvent} value={bookdata.description} placeholder='desc of book..' cols="40" rows="4"></textarea>
            <label htmlFor="" className='mt-3'>Price</label>
            <input type="number" min={0} max={500} className='border-2 p-2' onChange={onChangeEvent} name="price" value={bookdata.price} placeholder='price of book' id="" />

            <button className='mt-3 text-white border-2 border-blue-500 bg-blue-500 transition-all hover:bg-blue-600 px-3 py-2' type='submit' >Submit</button>

        </form>
      </div>
    </div>
  )
}

export default AddBook
