import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const selectList = [ 3, 4, 5]

const Users = () => {
    const [users, setUsers] = useState([])
    /* const [users, setUsers] = useState([{
        name: 'Y Ravi Prakash', email: 'yravi.dt@gmail.com', age: 45
    }]) */
   
    const [dataPerPage, setDataPerPage] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)

    const getAllUsers = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/users`)
            setUsers(data?.users)
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(() => {
        getAllUsers()
    },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8080/api/v1/users/'+id)
        .then( res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
    /* ---------------------- Pagination ------------------- */
    const numOfTotalPages = Math.ceil(users.length/dataPerPage)
    const pages = [...Array(numOfTotalPages+1).keys()].slice(1)

    const indexOfLastPage = currentPage * dataPerPage
    const indexOfFirstPage = indexOfLastPage - dataPerPage
    const visibleData = users.slice(indexOfFirstPage, indexOfLastPage)

    const prevPageHandler = () => { if(currentPage !== 1) setCurrentPage(currentPage - 1)}
    const nextPageHandler = () => { if(currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1)}

    /* ---------------------- Pagination //----------------- */
  return (
    <div className='d-flex vh-auto justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <div className='d-flex justify-content-between align-items-center p-3'>
            <Link to='/create' className='btn btn-success'>+ Add</Link>
            <div className="form-group">
                <select onChange={(e) => setDataPerPage(e.target.value)}>
                    {selectList.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
            </div>
            </div>
            <table className='table'> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleData.map( (o, i) => 
                    <tr key={i}>
                        <td>{o.name}</td>
                        <td>{o.email}</td>
                        <td>{o.age}</td>
                        <td>
                            <Link to={`/update/${o._id}`} className='btn btn-success'>Update</Link>
                            <button className='btn btn-danger' onClick={((e) => handleDelete(o._id))}>Delete</button>
                        </td>
                    </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><button className="page-link cursor" onClick={prevPageHandler}>Previous</button></li>
                                {pages.map((o) => <li className={currentPage === o ? 'active' : 'page-item'} key={o}><button className="page-link cursor" onClick={() => setCurrentPage(o)}>{o}</button></li> )}
                                <li className="page-item"><button className="page-link cursor" onClick={nextPageHandler}>Next</button></li>
                            </ul>
                        </nav>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
      {/* <h1>Users</h1> */}
    </div>
  )
}

export default Users
