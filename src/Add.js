import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Add() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')

    const uploadTopic = async () => {
        console.log(image)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)

        const response = await axios.post('http://localhost:8000/api/topics', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        if(response) {
            console.log(response)
            setMessage(response.message)
            setTimeout(() => {
                navigate('/topicslist')
            }, 2000)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadTopic()

    }

    return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 mt-4'>
                        <h5 className='mb-4'>Add Topic</h5>
                        <p className='text-warning'>{message}</p>

                        <form onSubmit={handleSubmit}>
                            <div className='mb-3 row'>
                                <label className='col-sm-3'>Title</label>
                                <div className='col-sm-9'>
                                    <input type='text' className='form-control' onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>

                            <div className='mb-3 row'>
                                <label className='col-sm-3'>Description</label>
                                <div className='col-sm-9'>
                                    <textarea className='form-control' onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>

                            <div className='mb-3 row'>
                                <label className='col-sm-3'>Image</label>
                                <div className='col-sm-9'>
                                    <input type='file' className='form-control' onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            </div>

                            <div className='mb-3 row'>
                                <label className='col-sm-3'></label>
                                <div className='col-sm-9'>
                                    <button type='submit' className='btn btn-success'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Add