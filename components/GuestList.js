import {Box, Heading, ScrollView} from "native-base";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";

const GuestList = ({eventID}) =>{

    return(
        <Box flexGrow={1} maxW="100%" maxH={"50%"} bg="violet.400" rounded="md" shadow={3}>
            <Box>
                <Heading pb="3" size="lg" textAlign={"center"}>
                    "Guest List"
                </Heading>
                {/*<ScrollView showsVerticalScrollIndicator={true}*/}
                {/*            borderColor={"black"}*/}
                {/*            rounded="md"*/}
                {/*            bg="violet.300"*/}
                {/*            maxH={"90%"} marginLeft= "5%" marginRight="5%"*/}
                {/*            textAlign={"center"}*/}
                {/*            lineHeight={10}*/}
                {/*>*/}
                {/*    {guestsMap}*/}
                {/*</ScrollView>*/}
            </Box>
        </Box>
    );
}

export default GuestList;