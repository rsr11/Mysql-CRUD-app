import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";





// useEffect(()=>{
  //     fetch("/books/updatebook/")
  // },[])
  
  const UpdateBook = () => {
    
    const [book , setBook] = useState({name:"",description:"", price:200});
    let location = useLocation();
    let path = location.pathname;
    let id = path.substr(12,path.length+1);
    console.log(id);
   
    let navigate = useNavigate();

    const updateBook = ()=>{
      axios.get(`http://localhost:4000/books/updatebook/${id}`,)
      .then((res)=>{
         console.log(res.data);
         setBook(res.data[0]);
        })
      .catch((err)=>{console.log(err);}) 
      // window.location.reload();

    }

    const onSubmitHandler = (e)=>{
             e.preventDefault();
             axios.put(`http://localhost:4000/books/updatebook/${id}`,{
              name: book.name , description:book.description , price: book.price
            })
            .then((res)=>{
               console.log(res.data);
               setBook(res.data[0]);
              })
            .catch((err)=>{console.log(err);}) 

            navigate("/");


      
    }

 

    const changedata = (e)=>{
         setBook({...book,[e.target.name]:e.target.value })
    }

    useEffect(()=>{
      updateBook()
    },[])


    

    console.log(book);

  return (
    <div>
      <button className='bg-black border-2 border-black px-2 py-3 m-5 text-white' > <Link to={"/"}> / back to home page </Link> </button>
      <h1 className='text-center text-2xl font-bold'>Update book here !</h1>
      <div className='' >
        <form action="" onSubmit={onSubmitHandler} className='flex flex-col w-[30vw] mx-auto mt-10'>
            <label htmlFor="" >name</label>
            <input type="text" required className='border-2 p-2 text-black'  onChange={changedata}  value={book.name} placeholder='name of book..' name="name" id="" />
            <label htmlFor="" className='mt-3' >Description</label>
            <textarea name="description" required className='border-2 p-2' id="" onChange={changedata} value={book.description} placeholder='desc of book..' cols="40" rows="4"></textarea>
            <label htmlFor="" className='mt-3'>Price</label>
            <input type="text" className='border-2 p-2' onChange={changedata} name="price" value={book.price} placeholder='price of book' id="" />

            <button className='mt-3 text-white border-2 border-blue-500 bg-blue-500 transition-all hover:bg-blue-600 px-3 py-2' type='submit' >Submit</button>

        </form>
      </div>
    </div>
  )
}

export default UpdateBook
