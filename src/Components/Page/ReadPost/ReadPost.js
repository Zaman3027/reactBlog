import { Div, Text } from "atomize";
import { useEffect, useState } from "react";
import { proURL } from "../../../utils/utils";
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
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resJson = await rawRes.json();
        console.log(resJson);
        const { content, postedOn, user_name } = resJson.playload;
        setContent(content);
        setAuthor(user_name);
        setPostDate(postDate);
    }

    return (
        <Div>
            <RenderContent
                content={getContent}
            />
            <Text>{postDate}</Text>
            <Text>{author}</Text>
        </Div>
    );
}

export default ReadPost;