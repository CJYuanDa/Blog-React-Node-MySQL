import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function User() {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState(currentUser);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}));
        console.log('handleChange:', file);
    }

    async function upload() {
        try {
            const formData = new FormData();
            console.log('upload:', file);
            if (!file) {
                return '';
            }
            formData.append('file', file);
            const res = await axios.post('/upload/headshot', formData);
            console.log('headshot:', res.data)
            return res.data;
        } catch (err) {
            console.log(err);
            return '';
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const imgUrl = await upload();
        if (imgUrl != '') {
            console.log('imgUrl:', imgUrl);
            user.img = imgUrl;
        }
        console.log('user:', user);
        try {
            const res = await axios.put('/users', user);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }
    return(
        <div className="modify_user">
            <h1>UPDATE PERSONAL DATA</h1>
            <div className='user_update'>
                <label htmlFor="name">Name: </label>
                <input id='username' name='username' type='text'value={user.username} onChange={handleChange} required/>
            </div>
            <div className='user_update'>
                <label htmlFor="email">Email: </label>
                <input id='email' name='email' type='email' value={user.email} onChange={handleChange} required/>
            </div>
            <div className='user_update'>
                <label htmlFor="file">Photo: </label>
                <input id='file' name='img' type='file' onChange={e => setFile(e.target.files[0])} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default User;