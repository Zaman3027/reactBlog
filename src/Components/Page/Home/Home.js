import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { proURL } from "../../../utils/utils";
import RenderContent from "../RenderContent/RenderContent";
import { Div, Text } from "atomize";
import Headers from '../../Header/Header.js';
import BottomNav from "../../Header/BottomNav";

function Home() {
    useEffect(() => {
        getPost()
    }, []);
    const [post, setPost] = useState([]);
    const url = proURL;
    const getPost = async () => {
        try {
            const token = localStorage.getItem('token');
            const rawRes = await fetch(`${url}api/post`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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
        <Div
            bg="gray300"
        >
            <Headers />
            <BottomNav />
            <Div
                bg="gray300"
                minH="100vh"
                d="flex"
                flexDir="column"
                justify="start"
                align="center"
                m={{ t: { xs: '0.5rem', md: "1rem" }, b: { xs: "50px" } }}
            >
                {post.map(({ context, user_name, user_id, postid }, idx) => {

                    return (
                        <Div key={idx}
                            maxW={{ md: "650px", xs: "360px" }}
                            w="100%"
                            shadow="2"
                            p={{ x: "1rem", y: "1rem" }}
                            m={{ t: "0.5rem" }}
                            rounded="md"
                            bg="white"
                        >
                            <Link
                                to={`/user/${user_id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Text
                                    tag="p"
                                    textSize="heading"
                                    textColor="info700"
                                    textWeight={{ md: "700", xs: "500" }}
                                >{user_name}</Text>
                            </Link>
                            <RenderContent
                                key={idx}
                                content={context}
                            />
                            <Link
                                to={`/readPost/${postid}`}
                                w="100"
                                style={{ textDecoration: "none", marginTop: "0.5rem" }}
                            >
                                <Text
                                    textAlign="center"
                                    textColor="success700"
                                    textSize="subtitle"
                                    textWeight="500"
                                >
                                    Read More
                                </Text>
                            </Link>
                        </Div>

                    );
                })}
            </Div>
        </Div>
    );
}

export default Home;