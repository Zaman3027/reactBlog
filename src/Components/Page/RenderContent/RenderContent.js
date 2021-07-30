import { Div, Text } from "atomize";

function RenderContent({ content }) {
    return (
        <Div
            d='flex'
            flexDir="column"
            justify="center"
            align="center"
        >
            <Div
                d='flex'
                flexDir="column"
                justify="flex-start"
                align="center"
                maxW="600px"
                w="100%"
            >
                {content.map((values, idx) => {
                    return (
                        <Div key={idx}
                            d="flex"
                            m={{ t: "0.25rem" }}
                        >
                            {
                                values.type === 1 ?
                                    <Text tag="h1" textSize="display3" >{values.value}</Text> :
                                    values.type === 2 ?
                                        <Text tag="h3" textSize="heading" >{values.value}</Text> :
                                        values.type === 3 ?
                                            <Text tag="p" textSize="paragraph" >{values.value}</Text> :
                                            <Div
                                                p="0.2rem"
                                                shadow="5"
                                            >
                                                <img src={values.value} alt='img-content' />
                                            </Div>

                            }
                        </Div>
                    );
                })}
            </Div>
        </Div>
    );
}

export default RenderContent;