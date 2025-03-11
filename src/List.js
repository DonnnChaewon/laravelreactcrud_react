import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function List() {
    const [topic, setTopic] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getTopic = () => {
            fetch('http://localhost:8000/api/topics').then(res => { 
                return res.json() 
            }).then(response => {
                console.log(response.topics)
                setTopic(response.topics)
            }).catch(error => { 
                console.log(error) 
            })
        }
        getTopic()
    }, [])

    const deleteTopic = (id) => {
        if(window.confirm('Confirm to delete topic?')) {
            axios.delete(`http://localhost:8000/api/topicsdelete/${id}`).then(function (response) {
                console.log(response.data)
                alert('Success to delete topic!')
                navigate('/topicslist')
            }).catch(function (error) {
                console.error('Error deleting topic: ', error)
                alert('Fail to delete topic!')
            })
        }
    }

    return (
        <React.Fragment>
            <div className='container container_overflow'>
                <div className='row'>
                    <div className='col-12'>
                        <h5 className='mb-4'>Topics List</h5>
                        <p className='text-danger'></p>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th scope='col'>No.</th>
                                    <th scope='col'>Title</th>
                                    <th scope='col'>Description</th>
                                    <th scope='col'>Image</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topic.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index+1} </td>
                                        <td>{data.title} </td>
                                        <td>{data.description} </td>
                                        <td><img src={`http://localhost:8000/storage/${data.image}`} height='50%' width='50%' /></td>
                                        <td>
                                            <Link to={`/edittopic/${data.id}/edit`} className='btn btn-warning'>Edit</Link>
                                            <button onClick={() => deleteTopic(data.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default List