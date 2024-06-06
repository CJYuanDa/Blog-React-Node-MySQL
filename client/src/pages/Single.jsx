import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js';
import DOMPurify from 'dompurify';

function Single() {
    const [post, setPost] = useState([]);
    let { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        currentUser = {};
        currentUser['username'] = 'none';
    }
    
    // CHECK URL { pathname, search, hash, state, key }
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split('/')[2];

    useEffect(() => {
        if (currentUser.username == 'none') navigate('/login');
        async function fetchdata() {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchdata();
    }, [postId]);

    async function handleDelete() {
        try {
            await axios.delete(`/posts/${postId}`);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    function getText(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent;
    }

    return(
        <div className='single'>
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    {post.userImg && <img src={`../headshot/${post.userImg}`} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username == post.username && <div className="edit">
                        <Link to={`/write`} state={post}>
                            <img src={Edit} alt="" />
                        </Link>
                        <img onClick={handleDelete} src={Delete} alt="" />
                    </div>}
                </div>
                <h1>{post.title}</h1>
                <p dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.description),
                }}></p>
            </div>
            <Menu cat={post.cat}/>
        </div>
    );
}

export default Single;