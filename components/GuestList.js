import {Box, Button, Heading, ScrollView, Text} from "native-base";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {FlatList} from "react-native";
import PeopleCard from "./PeopleCard";
import {guestREMOVE, individualEventGet} from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";

const GuestList = (pass) =>{
    const [props, setProps] = useState(pass.props.eventData)
    const [guests, setGuests] = useState(pass.props.eventData.guests)
    const dispatch = useDispatch();

    const handleRemove = (guestID, eventID) => {
        console.log(guestID)
        console.log(eventID)
        let newGuestList = dispatch(guestREMOVE({guestID: guestID, eventID: eventID}));
        console.log(newGuestList)
        setGuests(newGuestList);
        // let tempEvents = ReduxStore.getState().events;
        // console.log(tempEvents)
        // let curEvent = tempEvents.find((obj) => obj._id === eventID);
        // setProps(curEvent);
    }

    return(
        <Box flexGrow={1} maxW="100%" maxH={"50%"} bg="violet.400" rounded="md" shadow={3}>
            <Box>
                <Heading pb="3" size="lg" textAlign={"center"}>
                    "Guest List"
                </Heading>
                <FlatList
                    data = {guests}
                    renderItem={({ item }) => (
                        <Box flexDirection={"row"} marginLeft="5%" pb={"1%"} pt={"1%"}
                             background={'fuchsia.200'}

                        >
                                <Text textAlign={"left"} width={"50%"}>
                                 {item.firstName} {item.lastName}
                                </Text>
                                <Button onPress={() => handleRemove(item._id, props._id)}>
                                    {"Remove: " + item.username }
                                </Button>
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