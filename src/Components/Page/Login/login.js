import { useState } from "react";
import { devURL, proURL } from "../../../utils/utils";
import dotenv from 'dotenv';
import { Redirect } from "react-router-dom";
import { Div, Button, Icon, Input, Text } from "atomize";


function Login() {
    dotenv.config();
    const url = proURL;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [register, setRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handelSubmit = async () => {
        setIsLoading(true);
        try {
            console.log(url);
            const rawRes = await fetch(`${url}api/auth/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            setIsLoading(false);
            const resJson = await rawRes.json();
            if (resJson.success) {
                localStorage.setItem('token', resJson.token.accessToken);
                setRegister(true);
            }

            console.log(resJson);

        } catch (error) {
            console.debug(error.message);
        }

    }

    if (register) {
        return <Redirect to='/addPost' />
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
                    tag="header"
                    textSize="display3"
                    textTransform="lowercase"
                    fontFamily="code"
                    textAlign="center"
                    hoverTextColor="info700"
                >
                    React Blog
                </Text>
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
                    Login
                </Button>
            </Div>
        </Div>
    );
}

export default Login;