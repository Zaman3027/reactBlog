import { useState } from "react";
import { Redirect } from "react-router-dom";
import { devURL, proURL } from "../../../utils/utils";
import './Register.css'

function Register() {
    const url = proURL;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [register, setRegister] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log({ name, email, password });
        try {
            //console.log(url);
            const rawRes = await fetch(`${url}api/users`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });

            const resJson = await rawRes.json();
            console.log(resJson);
            if (resJson.success) {
                setRegister(true);
            }

        } catch (error) {
            console.debug(error.message);
        }

    }

    if (register) {
        return <Redirect to='/' />
    }

    return (
        <div className='formDiv' >
            <form className='form' onSubmit={handelSubmit}>
                <label htmlFor='name' >Name</label>
                <input type='text'
                    required={true}
                    id='name'
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />

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

export default Register;