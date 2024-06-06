import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page refresh
        try {
            await login(inputs);
            navigate('/');
        } catch (error) {
            setError(error.response.data);
        }
    };
    return(
        <div className='auth'>
            <h1>Login</h1>
            <form action="">
                <input type="text" placeholder='username' name='username' required onChange={handleChange}/>
                <input type="password" placeholder='password' name='password' required onChange={handleChange}/>
                <button onClick={handleSubmit}>Login</button>
                {error && <p>{error}</p>}
                <span>
                    Don't you have an account? <Link to='/register'>Register</Link>
                </span>
            </form>
        </div>
    );
}

export default Login;

