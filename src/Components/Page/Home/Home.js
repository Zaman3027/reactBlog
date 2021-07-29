import { useState } from "react";
import { Redirect } from "react-router-dom";
import { devURL, proURL } from "../../../utils/utils";



function Home() {
    const [getUserss, setUsers] = useState([]);
    const [redirect, setRedirect] = useState(false);
    if (localStorage.getItem('token') == null || redirect) {
        return <Redirect to='/' />
    }
    const url = proURL;
    const getUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const rawRes = await fetch(`${url}api/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (rawRes.status === 403) {
                setRedirect(true);
            }
            const { success, users } = await rawRes.json();
            if (success) {
                setUsers(users);
            };

        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <div>
            <button onClick={getUsers}> Get Users</button>
            {getUserss.map(({ user_email, user_name }, idx) => {
                return (
                    <div key={idx} >
                        <h1>{user_email}</h1>
                        <p>{user_name}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;