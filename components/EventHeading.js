import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View} from "native-base";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {eventDataGET} from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";

const EventHeading = (pass) => {
    const props = pass.props.eventData

    return(
            <Container maxW={"100%"} maxH="20%" bg="indigo.300" rounded="md" shadow={3} flexGrow="1">
                <Box flexGrow="1">
                    <Heading pb="1" size="lg" marginLeft="2%" >
                        {props.name}
                    </Heading>
                    <Text size = "md" marginLeft="2%" fontWeight="medium">
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