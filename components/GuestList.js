import {Box, Heading, ScrollView, Text} from "native-base";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {FlatList} from "react-native";
import PeopleCard from "./PeopleCard";

const GuestList = (pass) =>{
    const props = pass.props.eventData

    return(
        <Box flexGrow={1} maxW="100%" maxH={"50%"} bg="violet.400" rounded="md" shadow={3}>
            <Box>
                <Heading pb="3" size="lg" textAlign={"center"}>
                    "Guest List"
                </Heading>
                <FlatList
                    data = {props.guests}
                    renderItem={({ item }) => (
                        <Box flexDirection={"row"} marginLeft="5%" pb={"1%"} pt={"1%"}
                             background={'fuchsia.200'}

                        >
                                <Text textAlign={"left"} width={"50%"}>
                                 {item.firstName} {item.lastName}
                                </Text>
                                {/*<Text key={index} textAlign={"center"} width={"50%"} marginLeft="5%">*/}
                                {/*{" (" + item.tasks.length + " tasks)"}*/}
                                {/*</Text>*/}
                            </Box>
                        // <PeopleCard props ={item} _id={item._id} key = {item._id} eventID = {props.eventID} />
                    )}
                    keyExtractor={item => item._id}

                    showsVerticalScrollIndicator={true}
                    borderColor={"black"}
                    rounded="md"
                    bg="violet.300"
                    maxH={"90%"} marginLeft= "5%" marginRight="5%"
                    textAlign={"center"}
                    lineHeight={10}
                />
            </Box>
        </Box>
    );
}

export default GuestList;