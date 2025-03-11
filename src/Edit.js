import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

function Edit() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [message, setMessage] = useState('')
    const [inputs, setInputs] = useState([])
    const [image, setImage] = useState('')

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    const uploadTopic = async () => {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        formData.append('title', inputs.title)
        formData.append('description', inputs.description)
        formData.append('image', image)
        const response = await axios.post('http://localhost:8000/api/topicsupdate/' + id, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        setMessage(response.data.message)
        console.log(response)
        setTimeout(() => {
            navigate('/topicslist')
        }, 2000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadTopic()
    }

    useEffect(() => {
        getTopic()
    }, [])

    function getTopic() {
        axios.get('http://localhost:8000/api/topics/' + id).then(function (response) {
            console.log(response)
            setInputs(response.data.topic)
        })
    }

    return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 mt-4'>
                        <h5 className='mb-4'>Edit Topic</h5>
                        <p className='text-success'><b>{message}</b></p>

                        <form onSubmit={handleSubmit}>
                            <div className='mb-3 row'>
                                <label className='col-sm-3'>Title</label>
                                <div className='col-sm-9'>
                                    <input type='text' value={inputs.title} className='form-control' name='name' onChange={handleChange} />
                                </div>
                            </div>

                            <div className='mb-3 row'>
                                <label className='col-sm-3'>Description</label>
                                <div className='col-sm-9'>
                                    <textarea value={inputs.description} className='form-control' name='description' onChange={handleChange} />
                                </div>
                            </div>

                            <div className='mb-3 row'>
                                <label className='col-sm-3'>Image</label>
                                <div className='col-sm-9'>
                                    <img src={`http://localhost:8000/storage/${inputs.image}`} height='50%' width='50%' />
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

export default Edit