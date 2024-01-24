import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import AllBooks from './components/AllBooks'
import AddBook from './components/AddBook'
import UpdateBook from './components/UpdateBook'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <nav className='bg-black text-white text-3xl text-center py-4'> Ebook_Store </nav>
      <Routes>
        <Route path='/' element={<AllBooks/>} />
        <Route path='/addbook' element={<AddBook/>} />
        <Route path='/updatebook/:id' element={<UpdateBook />} />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
