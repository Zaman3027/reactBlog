import { useState } from "react";
import { devURL, proURL } from "../../../utils/utils";
import './Login.css'
import dotenv from 'dotenv';
import { Redirect } from "react-router-dom";

function Login() {
    dotenv.config();
    const url = proURL;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [register, setRegister] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(url);
            const rawRes = await fetch(`${url}api/auth/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const resJson = await rawRes.json();
            if (resJson.success) {
                localStorage.setItem('token', resJson.token.accessToken);
                setRegister(true);
            }

            console.log(resJson);

        } catch (error) {
            console.debug(error.message);
        }

    }

    if (register) {
        return <Redirect to='/home' />
    }

    return (
        <div className='formDiv' >
            <form className='form' onSubmit={handelSubmit}>
                <label htmlFor='email' >Email</label>
                <input type='email'
                    required={true}
                    id='email'
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />

                <label htmlFor='password' >Password</label>
                <input type='password'
                    required={true}
                    id='password'
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}

export default Login;