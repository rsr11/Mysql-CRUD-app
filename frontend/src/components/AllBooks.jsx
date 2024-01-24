import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const AllBooks = () => {

    const [books , setBooks] = useState([]);
    const navigate = useNavigate();

    // const [deletebook , setDeletebook] =useState();

    const fetchBooks = async ()=>{
         const res = await fetch("http://localhost:4000/books/getbooks");
         const data = await res.json();
         setBooks(data);
       console.log(data);
    }

    const deleteBook = async (id)=>{
      // const res = await fetch(`http://localhost:4000/books/deletebook/${id}`);

      axios.delete(`http://localhost:4000/books/deletebook/${id}`);  
      window.location.reload();

    }



    useEffect(()=>{
        fetchBooks();
    },[])

  return (
    <div>
      <h1 className='text-center mt-10 text-4xl font-semibold underline'>All Books</h1>

      <div className='flex mx-10 flex-wrap gap-x-10 gap-y-20 mt-10' >
      { books.length === 0 ? <h1>wait a minute...</h1> :  books.map((e)=>{
        return <div key={e.book_id} className='w-80'>
           <h1 className='text-3xl' >{e.name}</h1>
           <p className='text-lg mt-3'> {e.description}</p>
           <h3 className={`text-lg font-semibold mt-3 ${e.name === "error in backend" ? "hidden":"block"} `} > Rs. {e.price}</h3>
           
           <div className={`gap-3 mt-3 ${e.name === "error in backend" ? "hidden":"flex"} `} >
           <button className='border-2 border-green-500 p-2 bg-green-500 text-white' > <Link to={`/updatebook/${e.book_id}` }>Update</Link></button>
           <button className='border-2 border-red-500 p-2 bg-red-500 text-white' onClick={()=>{deleteBook(e.book_id)}} > Delete</button>
           </div>
        
        </div>
      })}


      </div>

    <div className='flex justify-center my-40'> <button className='border-2 border-blue-500 bg-blue-500 px-2 py-3 text-white'> <Link to={"/addbook"}>Add New Book </Link> </button> </div>

    </div>
  )
}

export default AllBooks
