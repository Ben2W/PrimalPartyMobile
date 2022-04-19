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
            <Container maxW={"100%"} maxH="18%" bg="indigo.300" rounded="md" shadow={3} flexGrow="1" >
                <Box flexDir={'row'} ml={'5%'} mt={'2%'}>
                <Box flexGrow="1" flexDir={'column'} >
                    {/*<Heading pb="1" size="lg" marginLeft="2%" textAlign={'left'} >*/}
                    {/*    {props.name}*/}
                    {/*</Heading>*/}
                    <Box flexDir={'row'} width={'50%'}>
                            <Icon as={Entypo} name="calendar" color="coolGray.800" size={'md'} _dark={{
                                color: "warmGray.50"
                            }} />
                            <Heading size={'md'}>
                                {" " + new Date(props.date).toLocaleDateString("en-US")} {"\n"}
                            </Heading>
                    </Box>

                    <Box flexDir={'row'} width={'50%'}>
                    <Icon as={Entypo} name="location-pin" color="coolGray.800" size={'md'} _dark={{
                                color: "warmGray.50"
                            }} />
                            <Heading size={'md'} >
                                {" " + props.address} {"\n"}
                            </Heading>
                    </Box>
                </Box>
                <Box flexGrow="1" flexDir={'column'} >
                    <Box flexDir={'row'} width={'50%'}>
                        <Icon as={Entypo} name="users" color="coolGray.800" size={'md'} _dark={{
                            color: "warmGray.50"
                        }} />
                        <Heading size={'md'}>
                            {" " + props.guests.length} {"\n"}
                        </Heading>
                    </Box>
                    <Box flexDir={'column'} width={'75%'}>
                        <Heading size={'md'} mb={'-10%'}>
                            Description
                        </Heading>
                        <Text overflow-wrap={'normal'} fontSize={'12'}>
                            {'\n' + props.description}
                        </Text>
                    </Box>
                </Box>
                </Box>
            </Container>
    );
}

export default EventHeading;