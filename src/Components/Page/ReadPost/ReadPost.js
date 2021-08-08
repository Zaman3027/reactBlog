import { Button, Div, Text, Icon } from "atomize";
import { useEffect, useState } from "react";
import { proURL } from "../../../utils/utils";
import BottomNav from "../../Header/BottomNav";
import Header from "../../Header/Header";
import RenderContent from "../RenderContent/RenderContent";

const ReadPost = (props) => {
    const [getContent, setContent] = useState([]);
    const [postDate, setPostDate] = useState("");
    const [author, setAuthor] = useState("");
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        getPost();
        getLike();
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

    const getLike = async () => {
        try {
            const token = localStorage.getItem('token');
            const rawRes = await fetch(`${proURL}api/post/like/${postId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const rawJson = await rawRes.json();
            const { likeCount, userLike } = rawJson.playload;
            setLike(userLike);
            setLikeCount(likeCount);
        } catch (error) {

        }
    }

    const handelLikeClick = async (getLike) => {
        try {
            const token = localStorage.getItem('token');
            const rawRes = await fetch(`${proURL}api/post/like/${postId}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ like: !like })
            });

            const status = await rawRes.status;
            const resJson = await rawRes.json();
            if (status === 200) {
                await getLike();
                console.log({ resJson });
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Div>
            <Button
                h="60px"
                w={{ md: "80px", xs: "50px" }}
                pos="fixed"
                bottom={{ md: "50px", xs: "30px" }}
                left={{ md: "50px", xs: "0px" }}
                hoverBg="info300"
                rounded="circle"
                bg="transparent"
                textColor="black"
                onClick={() => handelLikeClick(getLike)}
            >
                <Icon
                    m={{ r: "0.25rem" }}
                    name={like ? "HeartSolid" : "Heart"}
                    size="30px"
                    color={like ? "danger900" : "black"}
                />
                {likeCount}
            </Button>
            <Header />
            <BottomNav />
            <Div
                m={{ t: { xs: '0.5rem', md: "1rem" }, b: { xs: "50px" } }}
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