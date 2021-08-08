import { Div, Icon, Button } from "atomize";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";


const BottomNav = () => {
    const { handelLogOut, user } = useContext(UserContext);
    return <Div
        d={{ xs: "flex", md: "none" }}
        w="100%"
        h="45px"
        pos="fixed"
        justify="space-between"
        align="center"
        bottom="0"
        bg="white"
        shadow="2"
        p={{ x: "1rem", t: "0.5rem" }}
    >
        <Link to={`/user/${user.user_id}`}
            style={{
                textDecoration: "none",
                color: "black",
                height: "100%",
                marginLeft: "0.25rem"
            }} >
            <Button
                h="100%"
                w="auto"
                bg="white"
                hoverBg="info400"
                textColor="info700"
            >
                <Icon
                    name="User"
                    size="20px"
                    color="info700"
                    m={{ r: "0.25rem" }}
                />
                {user.user_name}
            </Button>

        </Link>
        <Link to='/addPost'
            style={{
                textDecoration: "none",
                color: "black",
                height: "100%"
            }} >
            <Button
                h="100%"
                w="auto"
                bg="info300"
                hoverBg="info400"
                textColor="info700"
            >
                <Icon
                    name="Plus"
                    size="20px"
                    color="info700"
                    m={{ r: "0.25rem" }}
                />
                Post
            </Button>
        </Link>
        <Button
            h="100%"
            w="4rem"
            bg="white"
            hoverBg="info400"
            m={{ l: "0.25rem" }}
            onClick={handelLogOut}
        >
            <Icon
                name="Logout"
                size="25px"
                color="danger700"
            />
        </Button>
    </Div>
}

export default BottomNav;