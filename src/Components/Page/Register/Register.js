import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { proURL } from "../../../utils/utils";
import './Register.css'
import { Div, Button, Icon, Input, Text } from "atomize";

function Register() {
    const url = proURL;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [register, setRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handelSubmit = async () => {
        console.log({ name, email, password });
        setIsLoading(true);
        try {
            //console.log(url);
            const rawRes = await fetch(`${url}api/users`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });
            setIsLoading(false);
            const resJson = await rawRes.json();
            console.log(resJson);
            if (resJson.success) {
                setRegister(true);
            }

        } catch (error) {
            console.debug(error.message);
        }

    }

    if (register) {
        return <Redirect to='/' />
    }

    return (
        <Div
            d="flex"
            flexDir="column"
            justify="center"
            align="center"
            h="100vh"
            w="100%"
            bg="gray300"
        >
            <Div
                w="100%"
                maxW="500px"
                shadow="5"
                rounded="md"
                p={{ t: "2rem", b: "1rem", l: "1rem", r: "1rem" }}
            >
                <Text
                    className="blink_me"
                    tag="header"
                    textSize="display3"
                    textTransform="lowercase"
                    fontFamily="code"
                    textAlign="center"
                    hoverTextColor="info700"
                    BG="white"
                >
                    React Blog
                </Text>
                <Text textSize="label" m={{ t: "0.5", b: 0 }}>
                    Name
                </Text>
                <Input type='text'
                    required={true}
                    placeholder="Name"
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <Text textSize="label" m={{ t: "0.5", b: 0 }}>
                    Email
                </Text>
                <Input type='email'
                    required={true}
                    placeholder="Email"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <Text textSize="label" m={{ t: "0.5", b: 0 }}>
                    Password
                </Text>
                <Input
                    m={{ t: 0 }}
                    type={showPassword ? "text" : "password"}
                    required={true}
                    placeholder="Password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}

                    suffix={
                        <Button
                            pos="absolute"
                            onClick={() => setShowPassword(!showPassword)}
                            bg="transparent"
                            w="3rem"
                            top="0"
                            right="0"
                            rounded={{ r: "md" }}
                        >
                            <Icon
                                name={showPassword ? "EyeSolid" : "Eye"}
                                color={showPassword ? "danger800" : "success800"}
                                size="16px"
                            />
                        </Button>
                    }
                />
                <Link to="/"
                    style={{
                        textDecoration: "none"
                    }} >
                    <Text
                        m={{ t: "5px" }}
                        w="100%"
                        textAlign="right"
                        textColor="info700"
                        cursor="pointer"
                    >
                        Already a user?
                    </Text>
                </Link>

                <Button
                    w="100%"
                    onClick={() => handelSubmit()}
                    disabled={isLoading}
                    suffix={
                        <Icon
                            name={isLoading ? "Loading" : "Checked"}
                            size="16px"
                            color="white"
                            m={{ l: "1rem" }}
                        />
                    }
                    shadow="3"
                    hoverShadow="4"
                    m={{ r: "1rem", t: "1rem" }}
                    bg={isLoading ? "warning700" : "success800"}

                >
                    Register
                </Button>
            </Div>
        </Div>
    );
}

export default Register;