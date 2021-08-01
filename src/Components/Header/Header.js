import { Div, Text } from "atomize";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";



function Header() {
    const { handelLogOut } = useContext(UserContext);

    return (
        <Div
            w="100wh"
            h="3.5rem"
            shadow="4"
            d="flex"
            justify="start"
            align="center"
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
            <Link to='/addPost' style={{ textDecoration: "none", color: "black" }} >
                <Text
                    m={{ l: "0.5rem" }}
                    tag="header"
                    textSize={{ xl: "20px", lg: "18px", sm: "16px" }}
                    fontFamily="code"
                    textAlign="left"
                    hoverTextColor="info700"
                >
                    createPost
                </Text>
            </Link>
            <Link to='/addPost' style={{ textDecoration: "none", color: "black" }} >
                <Text
                    m={{ l: "0.5rem" }}
                    tag="header"
                    textSize={{ xl: "20px", lg: "18px", sm: "16px" }}
                    textTransform="lowercase"
                    fontFamily="code"
                    textAlign="left"
                    hoverTextColor="info700"
                >
                    user
                </Text>
            </Link>
            <Text
                m={{ l: "0.5rem" }}
                tag="header"
                textSize={{ xl: "20px", lg: "18px", sm: "16px" }}
                textTransform="lowercase"
                fontFamily="code"
                textAlign="left"
                hoverTextColor="info700"
                onClick={handelLogOut}
            >
                logout
            </Text>
            <Div w="1.5rem" ></Div>
        </Div>
    );
}

export default Header;