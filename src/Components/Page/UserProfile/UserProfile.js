import { Button, Div, Text } from "atomize";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { proURL } from "../../../utils/utils";
import Header from "../../Header/Header";
import RenderContent from "../RenderContent/RenderContent";

function UserProfile(props) {
    const userId = props.match.params.id;
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPostLoading, setIsPostLoading] = useState(true);
    useEffect(() => {
        getUser();
        getPost();
    }, []);

    const getUser = async () => {
        setIsLoading(true);
        try {
            const rawRes = await fetch(`${proURL}api/users/${userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const status = await rawRes.status;
            const rawJson = await rawRes.json();
            if (status === 200) {
                setUser(rawJson);

            } else {
            }
            setIsLoading(false);
        } catch (err) {

        }
    }

    //get Post

    const getPost = async () => {
        try {
            setIsPostLoading(true);
            const token = localStorage.getItem('token');
            const rawRes = await fetch(`${proURL}api/post/user/${userId}`, {
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
        setIsPostLoading(false);
    }

    const deletePost = async (id) => {
        try {
            const rawRes = await fetch(`${proURL}api/post/${id}`, {
                method: "delete",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const status = await rawRes.status;
            //const rawJson = await rawRes.json();
            if (status === 200) {
                const temp = [];
                post.forEach((val) => {
                    console.log({ Postid: parseInt(val.postId) });
                    if (parseInt(val.postid) !== parseInt(id))
                        temp.push(val);
                });
                setPost(temp);
            }
        } catch (error) {
            console.log({ error });
        }
    }

    if (isLoading) {
        return <Div>Loading...</Div>
    } else {
        return (
            <Div
                bg="gray300"
                p={{ b: "1rem" }}
            >
                <Header />
                <Div
                    w="100%"
                    bg="gray300"
                    d="flex"
                    flexDir="column"
                    justify="start"
                    align="center"
                    m={{ t: "1rem" }}
                >
                    <Div
                        d="flex"
                        flexDir="column"
                        bg="white"
                        maxW="600px"
                        w="100%"
                        h="10rem"
                        shadow="3"
                        rounded="sm"
                        p={{ l: "2rem", y: "1rem" }}
                    >
                        <Text
                            tag="header"
                            textSize="display3"
                            textColor="info700"
                            m={{
                                y: "0.5rem"
                            }}
                        >{user.user_name}</Text>
                        <Text
                            tag="header"
                            textSize="title"
                            textColor="success700"
                            m={{
                                y: "0.5rem"
                            }}
                        >{user.user_email}</Text>
                    </Div>
                    <Div>
                        {
                            isPostLoading ?
                                <Div>Loading..</Div> :
                                <Div>
                                    {post.map(({ context, postid }, idx) => {

                                        return (
                                            <Div key={idx}
                                                maxW="650px"
                                                w="100%"
                                                shadow="2"
                                                p={{ x: "1rem", y: "1rem" }}
                                                m={{ t: "0.5rem" }}
                                                rounded="md"
                                                bg="white"
                                            >
                                                <RenderContent
                                                    key={idx}
                                                    content={context}
                                                />
                                                <Div
                                                    d="flex"
                                                    justify="center"
                                                >
                                                    <Link
                                                        to={`/readPost/${postid}`}
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
                                                    <Button
                                                        textAlign="center"
                                                        textColor="danger700"
                                                        textSize="16px"
                                                        textWeight="500"
                                                        cursor="pointer"
                                                        bg="white"
                                                        m={{ l: "0.5rem" }}
                                                        onClick={() => deletePost(postid)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Div>
                                            </Div>

                                        );
                                    })}
                                </Div>
                        }
                    </Div>
                </Div>
            </Div>
        );
    }

}

export default UserProfile;