
import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { proURL } from '../../utils/utils';

export const UserContext = createContext();
const { Provider } = UserContext;

export function UserProvider(props) {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        getAuth().then(val => {
            setIsLogedIn(val);
            setIsLoading(false);
        })

    }, [])

    const handelLogOut = () => {
        localStorage.removeItem("token");
        setIsLogedIn(false);
        history.push('/');
    }
    const getAuth = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token == null) return false;
        const rawRes = await fetch(`${proURL}api/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const status = await rawRes.status;
        const userData = await rawRes.json();
        setUser(userData);
        return status === 200;
    }
    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return <Provider
            value={{
                handelLogOut,
                isLogedIn,
                setIsLogedIn,
                getAuth,
                user
            }}
        >{props.children}</Provider>
    }

}