import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page refresh
        try {
            const res = await axios.post('/auth/register', inputs);
            navigate('/login')
        } catch (error) {
            setError(error.response.data);
        }
    };

    return(
        <div className='auth'>
            <h1>Register</h1>
            <form action="">
                <input type="text" placeholder='username' name='username' required onChange={handleChange} />
                <input type="email" placeholder='email' name='email' required onChange={handleChange}/>
                <input type="password" placeholder='password' name='password' required onChange={handleChange}/>
                <button onClick={handleSubmit}>Register</button>
                {error && <p>{error}</p>}
                <span>
                    Don't you have an account? <Link to='/login'>Login</Link>
                </span>
            </form>
        </div>
    );
}

export default Register;

