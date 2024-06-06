import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Menu({cat}) {
    const [posts, setPosts] = useState([]);
    // CHECK URL { pathname, search, hash, state, key }

    useEffect(() => {
        async function fetchdata() {
            try {
                const res = await axios.get(`/posts/?cat=${cat}`);
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchdata();
    }, [cat]);
    return(
        <div className='menu'>
            <h1>Other posts you may like</h1>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src={`../upload/${post?.img}`} alt="" />
                    <h2>{post.title}</h2>
                    <button><Link className='link' to={`/post/${post.id}`}>Read More</Link></button>
                </div>
            ))}
        </div>
    )
}

export default Menu;