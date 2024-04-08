import  react from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './Users'
import UserCreate from './UserCreate'
import UserUpdate from './UserUpdate'

function App() {
  return (
    <div className='container bg-primary h-100 p-5'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/update/:id' element={ <UserUpdate />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
