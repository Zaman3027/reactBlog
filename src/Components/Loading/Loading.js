import { Div, Icon } from "atomize"

const Loading = () => {
    return (
        <Div
            h="100%"
            w="100%"
            d="flex"
            justify="center"
            align="center"
        >
            <Icon
                size="80px"
                name="Loading"
                color="info700"
            />
        </Div>
    )

}

export default Loading;