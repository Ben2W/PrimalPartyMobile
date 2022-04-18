import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View, Icon, AddIcon} from "native-base";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {eventDataGET, eventTaskPOST} from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";

const EventHeading = (pass) => {
    const [props, setProps] = useState(pass.props.eventData)

    useEffect(() => {
        let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === props._id);
        let eventArray = ReduxStore.getState().events[findEvent];
        setProps(eventArray);
    }, [ReduxStore.getState().events])

    return(
            <Container maxW={"100%"} maxH="20%" bg="indigo.300" rounded="md" shadow={3} flexGrow="1">
                <Box flexGrow="1">
                    <Heading pb="1" size="lg" marginLeft="2%" textAlign={'left'} >
                        {props.name}
                    </Heading>
                    <Text size = "md" marginLeft="2%" fontWeight="medium">
                        <Icon as={Entypo} name="app-store" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }} />
                        Date: {new Date(props.date).toLocaleDateString("en-US")} {"\n"}
                        Location: {props.address} {"\n"}
                        Guests: {props.guests.length} {"\n"}
                        Desc: {props.description}
                        {"\n"}ID: {props._id}
                    </Text>
                </Box>
            </Container>
    );
}

export default EventHeading;