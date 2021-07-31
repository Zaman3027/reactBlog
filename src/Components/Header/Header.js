import { Div, Row, Col, Text } from "atomize";

function Header() {
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
            <Text
                className="blink_me"
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
            <Text
                m={{ l: "0.5rem" }}
                tag="header"
                textSize={{ xl: "20px", lg: "18px", sm: "16px" }}
                textTransform="lowercase"
                fontFamily="code"
                textAlign="left"
                hoverTextColor="info700"
            >
                logout
            </Text>
            <Div w="1.5rem" ></Div>
        </Div>
    );
}

export default Header;