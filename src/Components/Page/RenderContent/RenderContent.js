import { Div, Text, Image } from "atomize";

function RenderContent({ content }) {
    return (
        <Div
            d='flex'
            flexDir="column"
            justify="center"
            align="center"
            m={{ l: { xs: "1rem" } }}
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
                                    <Text tag="h1" textSize={{ md: "display3", xs: "display1" }} >{values.value}</Text> :
                                    values.type === 2 ?
                                        <Text tag="h3" textSize={{ md: "heading", xs: "subheader" }} >{values.value}</Text> :
                                        values.type === 3 ?
                                            <Text tag="p" textSize="paragraph" >{values.value}</Text> :

                                            <Image src={values.value} alt='img-content' />

                            }
                        </Div>
                    );
                })}
            </Div>
        </Div>
    );
}

export default RenderContent;