import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    // CHECK URL { pathname, search, hash, state, key }
    const cat = useLocation().search;
    useEffect(() => {
        async function fetchdata() {
            try {
                const res = await axios.get(`/posts${cat}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchdata();
    }, [cat]);

    function getText(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const desc = doc.body.textContent.split(' ');
        let abstract = '';
        for (let i = 0; i < 15; i++) {
            abstract += desc[i] + ' '
        }
        return abstract + '...';
    }
    
    return(
        <div className='home'>
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className='link' to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.description)}</p>
                            <button><Link className='link' to={`/post/${post.id}`}>Read More</Link></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

