import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { proURL } from "../../../utils/utils";
import RenderContent from "../RenderContent/RenderContent";
import { Div, Text } from "atomize";
import Headers from '../../Header/Header.js';




function Home() {
    useEffect(() => {
        getPost()
    }, []);
    const [post, setPost] = useState([]);
    const [redirect, setRedirect] = useState(false);
    if (localStorage.getItem('token') == null || redirect) {
        return <Redirect to='/' />
    }
    const url = proURL;
    const getPost = async () => {
        try {
            const token = localStorage.getItem('token');
            const rawRes = await fetch(`${url}api/post`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (rawRes.status === 403) {
                setRedirect(true);
            }
            const { success, playload } = await rawRes.json();
            console.log({ playload });
            if (success) {
                setPost(playload);
            }

        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <Div>
            <Headers />
            <Div
                bg="gray300"
                minH="100vh"
                d="flex"
                flexDir="column"
                justify="center"
                align="center"
            >
                {post.map(({ context, user_name }, idx) => {

                    return (
                        <Div key={idx}
                            maxW="650px"
                            w="100%"
                            shadow="3"
                            p="0.3rem"
                            m={{ t: "0.5rem" }}
                            rounded="sm"
                            bg="white"
                        >
                            <Text tag="p" textSize="subheader" >@{user_name}</Text>
                            <RenderContent
                                key={idx}
                                content={context}
                            />
                        </Div>

                    );
                })}
            </Div>
        </Div>
    );
}

export default Home;