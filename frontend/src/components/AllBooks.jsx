import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'


const AllBooks = () => {

    const [books , setBooks] = useState([]);
    const navigate = useNavigate();
    const [reloadData, setReloadData] = useState(true);

    // const [deletebook , setDeletebook] =useState();

    const fetchBooks = async ()=>{
         const res = await fetch("http://localhost:4000/books/getbooks");
         const data = await res.json();
         setBooks(data);
       console.log(data);
    }

    const deleteBook = async (id,event)=>{
        event.preventDefault();
      // const res = await fetch(`http://localhost:4000/books/deletebook/${id}`);
      
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
      .then(async(result) => {
        if (result.isConfirmed) {
          
           await axios.delete(`http://localhost:4000/books/deletebook/${id}`);
            setReloadData((prev) => !prev);
          

        //  axios.delete(`http://localhost:4000/books/deletebook/${id}`);  
        //  alert("deleted!!");
        //  window.location.reload();
        }
      });

     

    }



    useEffect(()=>{
        fetchBooks();
    },[reloadData])

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
           <button className='border-2 border-red-500 p-2 bg-red-500 text-white' onClick={(event)=>{deleteBook(e.book_id,event)}} > Delete</button>
           </div>
        
        </div>
      })}


      </div>

    <div className='flex justify-center my-40'> <button className='border-2 border-blue-500 bg-blue-500 hover:bg-blue-600 px-2 py-3 text-white'> <Link to={"/addbook"}>Add New Book </Link> </button> </div>

    </div>
  )
}

export default AllBooks
