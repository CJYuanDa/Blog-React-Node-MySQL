import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

function Write() {
    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || '');
    const [value, setValue] = useState(state?.description || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');
    const navigate = useNavigate();

    async function upload() {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/upload/img', formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const imgUrl = await upload();
        try {
            state ? await axios.put(`/posts/${state.id}`, {
                title,
                description: value,
                cat,
                img: file ? imgUrl: ''
            })
            : await axios.post(`/posts/`, {
                title,
                description: value,
                cat,
                img: file ? imgUrl: "",
                date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className='add'>
            <div className="content">
                <input type="text" value={title} placeholder='title' onChange={e => setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input type="file" id='file' style={{display: 'none'}} onChange={e => setFile(e.target.files[0])}/>
                    <label className='file' htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === 'art'} name='cat' value='art' id='art' onChange={e => setCat(e.target.value)} required/>
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === 'science'} name='cat' value='science' id='science' onChange={e => setCat(e.target.value)} required/>
                        <label htmlFor="art">Science</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === 'technology'} name='cat' value='technology' id='technology' onChange={e => setCat(e.target.value)} required/>
                        <label htmlFor="art">Technology</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === 'cinema'} name='cat' value='cinema' id='cinema' onChange={e => setCat(e.target.value)} required/>
                        <label htmlFor="art">Cinema</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === 'design'} name='cat' value='design' id='design' onChange={e => setCat(e.target.value)} required/>
                        <label htmlFor="art">Design</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === 'food'} name='cat' value='food' id='food' onChange={e => setCat(e.target.value)} required/>
                        <label htmlFor="art">Food</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;

