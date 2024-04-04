import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const {id} = useParams();
    const [values, setValue] = useState({
        id: parseInt(id),
        title: '',
        description: '',
        contact: '',
        status:'',
    })
    useEffect(() => {
        axios.get('http://localhost:3001/tickets/' + id)
        .then(res => {
            setValue(prevValues => ({
                ...prevValues,
                title: res.data.title,
                description: res.data.description,
                contact: res.data.contact,
                status: res.data.status,
                lastestUpdateTimestamp: new Date().toISOString()
            }));
        })
        .catch(err => console.log(err));
    }, [id]);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put('http://localhost:3001/tickets/' + id, values)
        .then(res => {
            navigate('/');
        })
        .catch(err => console.log(err));
        
    }

    return (
        <div>
            <Link to="/"  className="button">All tickets</Link>
            <h1>Update Ticket</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">title: </label>
                    <input type="text" name="title" placeholder='Enter Title' 
                    value={values.title} onChange={e => setValue({...values, title: e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="contact">description: </label>
                    <input type="text" name="description" placeholder='Enter Description' 
                    value={values.description} onChange={e => setValue({...values, description: e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="contact">Contact: </label>
                    <input type="text" name="contact" placeholder='Enter Contact' 
                    value={values.contact} onChange={e => setValue({...values, contact: e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="status">Status: </label>
                    <select type="text" name="status" id="status" value={values.status} onChange={e => setValue({...values, status: e.target.value})} required>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button>Update</button>
            </form>
        </div>
    );
}
export default Update