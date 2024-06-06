import axios from "axios";
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    // CHECK LOCAL STORAGE FIRST
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    async function login(inputs) {
        const res = await axios.post('/auth/login', inputs);
        setCurrentUser(res.data);
    }

    async function logout() {
        await axios.post('/auth/logout');
        setCurrentUser(null);
    }

    // SET LOCAL STORAGE, IF currentUser IS CHANGED
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};  

