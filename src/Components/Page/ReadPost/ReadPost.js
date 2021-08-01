import { Div, Text } from "atomize";
import { useEffect, useState } from "react";
import { proURL } from "../../../utils/utils";
import Header from "../../Header/Header";
import RenderContent from "../RenderContent/RenderContent";

const ReadPost = (props) => {
    const [getContent, setContent] = useState([]);
    const [postDate, setPostDate] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        getPost();
    }, [])
    const postId = props.match.params.id;
    console.log(postId);
    const getPost = async () => {
        const token = localStorage.getItem('token');
        const rawRes = await fetch(`${proURL}api/post/${props.match.params.id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resJson = await rawRes.json();
        console.log(resJson);
        const { content, user_name } = resJson.playload;
        setContent(content);
        setAuthor(user_name);
        setPostDate(postDate);
    }

    return (
        <Div>
            <Header />
            <Div
                m={{ t: "1rem" }}
            >
                <RenderContent
                    content={getContent}
                />
                <Text>{postDate}</Text>
                <Text>{author}</Text>
            </Div>
        </Div>
    );
}

export default ReadPost;