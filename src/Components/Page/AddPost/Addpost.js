import { Div, Button, Icon, Input, Row, Col, Dropdown, Anchor } from "atomize";
import { useState } from "react";
import { proURL } from "../../../utils/utils.js";
import RenderContent from "../RenderContent/RenderContent";
import './Addpost.css'

function AddPost() {
    const [fields, setFields] = useState([{ value: "", type: 1 }]);

    const handelPost = async () => {
        const context = [];
        context.push(fields[0]);
        context.push(fields[1]);
        const playload = { context, content: fields };
        console.log(JSON.stringify(playload));
        const token = localStorage.getItem('token');
        const rawRes = await fetch(`${proURL}api/post`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playload),
        });
        const resJson = await rawRes.json();
        console.log({ resJson });
    }

    function handleTextChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }
    function handleTypeChange(i, type) {
        const values = [...fields];
        values[i].type = parseInt(type) + 1;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: "", type: 3 });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }
    const filedType = (type) => {
        switch (type) {
            case 1:
                return "Title"
            case 2:
                return "Subheader"
            case 3:
                return "Paragraph"
            default:
                return "Image"
        }
    }
    return (
        <Div
            justify="center"
            d="flex"
            align="center"
            flexDir="column"
        >
            <h1>Add Post</h1>



            {fields.map((field, idx) => {
                return (
                    <Div key={`${field}-${idx}`}
                        justify="center"
                        d="flex"
                        align="center"
                        w="800px"
                        m={{ t: "0.5rem" }}
                    >
                        <Row>
                            <Col size={{ xs: 12, lg: 7 }} >
                                <Input
                                    maxW="500px"
                                    w="600px"
                                    textSize={filedType(field.type)}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={e => handleTextChange(idx, e)}
                                    value={field.value}
                                />
                            </Col>
                            <Col size={{ xs: 12, lg: 3 }} >
                                <Dropdown
                                    targetHover
                                    onChange={e => console.log(e.target)}
                                    menu={
                                        <Div>
                                            {["Title", "SubTitle", "Paragraph", "Image"].map((name, index) => (
                                                <Anchor
                                                    d="block"
                                                    p={{ y: "0.25rem" }}
                                                    onClick={e => handleTypeChange(idx, index)}
                                                >
                                                    {name}
                                                </Anchor>
                                            ))}
                                        </Div>
                                    }
                                >{filedType(fields[idx].type)}</Dropdown>

                            </Col>
                            <Col size={{ xs: 12, lg: 2 }} >
                                <Button
                                    h="2.5rem"
                                    w="3.5rem"
                                    className="remove-content"
                                    bg="danger700"
                                    hoverBg="danger600"
                                    m={{ r: "1rem" }}
                                    shadow="2"
                                    hoverShadow="4"
                                    onClick={e => handleRemove(idx, e)}
                                >
                                    <Icon name="DeleteSolid" size="20px" color="white" />
                                </Button>
                            </Col>
                        </Row>
                    </Div>
                );
            })}
            <Button
                prefix={
                    <Icon
                        name="Plus"
                        size="16px"
                        color="white"
                        m={{ r: "0.5rem" }}
                    />
                }
                w="100%"
                maxW="600px"
                bg="warning700"
                hoverBg="warning800"
                rounded="circle"
                m={{ t: "1rem" }}
                p={{ r: "1.5rem", l: "1rem" }}
                shadow="3"
                hoverShadow="4"
                onClick={handleAdd}
            >
                Add
            </Button>
            <Button
                prefix={
                    <Icon
                        name="Plus"
                        size="16px"
                        color="white"
                        m={{ r: "0.5rem" }}
                    />
                }
                w="100%"
                maxW="600px"
                bg="warning700"
                hoverBg="warning800"
                rounded="circle"
                m={{ t: "1rem" }}
                p={{ r: "1.5rem", l: "1rem" }}
                shadow="3"
                hoverShadow="4"
                onClick={handelPost}
            >
                Post
            </Button>
            <p>------- Preview ---------</p>
            <RenderContent
                content={fields}
            />
        </Div>
    );
}

export default AddPost;