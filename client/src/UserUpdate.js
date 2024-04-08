import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserUpdate = () => {
    const { id } = useParams()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users/'+id)
        .then( result => {
            console.log(result.data)
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)
        })
        .catch(err => console.log(err))
    },[])

    const Update = (e) => {
        /* ------------------------------------- */
        e.preventDefault()
        axios.put('http://localhost:8080/api/v1/users/'+id, {name, email, age})
        .then(result => {
            console.log(result.data);
            navigate('/')
        })
        .catch( err => console.log(err))
    }

  return (
    <div className='d-flex vh-auto justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
            <h1>Update User</h1>
            <div className='m-2'>
                <label htmlFor=''>Name</label>
                <input type='text' value={name || ''} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='form-control' />
            </div>
            <div className='m-2'>
                <label htmlFor=''>Email</label>
                <input type='text' value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className='form-control' />
            </div>
            <div className='m-2'>
                <label htmlFor=''>Age</label>
                <input type='text' value={age || ''} onChange={(e) => setAge(e.target.value)} placeholder='Enter Age' className='form-control' />
            </div>
            <button className='btn btn-success'>Update</button>
        </form>
        </div>
    </div>
  )
}

export default UserUpdate
