import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View} from "native-base";
import {useState} from "react";

const EventHeading = ({props}) => {

    props = props.data.data;
    // const [props, setProps] = useState({props})
    // const [numGuests, setNumGuests] = useState(0)
    //

    return(
            <Container maxW={"100%"} maxH="20%" bg="indigo.300" rounded="md" shadow={3} flexGrow="1">
                <Box flexGrow="1">
                    <Heading pb="1" size="lg" marginLeft="2%" >
                        {props.name}
                    </Heading>
                    <Text size = "md" marginLeft="2%" fontWeight="medium">
                        Date: {props.date} {"\n"}
                        Location: {props.address} {"\n"}
                        Guests: {props.guests.length} {"\n"}
                        Desc: {props.description}
                    </Text>
                </Box>
            </Container>
    );
}

export default EventHeading;