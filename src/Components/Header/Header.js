import { Div, Icon, Text, Button } from "atomize";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";



function Header() {
    const { handelLogOut, user } = useContext(UserContext);

    return (
        <Div
            w="100wh"
            h="3.5rem"
            shadow="2"
            d="flex"
            justify="start"
            align="center"
            bg="white"
        >
            <Div w="1.5rem" />
            <Link to='/home'
                className="blink_me"
                style={{
                    textDecoration: "none",
                    color: "black",
                    marginRight: "auto"
                }} >
                <Text
                    tag="header"
                    textSize="display2"
                    textTransform="lowercase"
                    fontFamily="code"
                    textAlign="center"
                    hoverTextColor="info700"
                    m={{ r: "auto" }}
                >
                    React Blog
                </Text>
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
            <Div w="1.5rem" ></Div>
        </Div>
    );
}

export default Header;