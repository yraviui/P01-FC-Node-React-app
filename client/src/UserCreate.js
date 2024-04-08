import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
/* name: String, email: String,  age: Number */
const UserCreate = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(null)
    const navigate = useNavigate()
    const Summit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/v1/users', {name, email, age})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch( err => console.log(err))
    }
  return (
    <div className='d-flex vh-auto justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={Summit}>
                <h1>Create User</h1>
                <div className='m-2'>
                    <label htmlFor=''>Name</label>
                    <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='form-control' />
                </div>
                <div className='m-2'>
                    <label htmlFor=''>Email</label>
                    <input type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className='form-control' />
                </div>
                <div className='m-2'>
                    <label htmlFor=''>Age</label>
                    <input type='text' onChange={(e) => setAge(e.target.value)} placeholder='Enter Age' className='form-control' />
                </div>
                <button className='btn btn-success'>Sumbit</button >
            </form>
        </div>
    </div>
  )
}

export default UserCreate
