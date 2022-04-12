import {Box, Button, Text} from "native-base";
import React from "react";

const PeopleCard = (props) => {

    const handleClick = () => {
        console.log(props._id)
        return props._id
    }

    return (
        <Box
            background={'#B9F8D3'}
            marginBottom={'5%'}
            width={'100%'}
            borderRadius={8}
            pb={"1%"} pt={"1%"}
        >
            <Box flexDirection={"row"} alignSelf={'center'} pb={"1%"} pt={"1%"}>
                <Text textAlign={"center"} width={"50%"}>
                    {props.props.firstName} {props.props.lastName}
                </Text>
            </Box>
            <Button onPress={() => handleClick()}>
                {"Add " + props.props.username}
            </Button>
        </Box>
    )
}

export default PeopleCard