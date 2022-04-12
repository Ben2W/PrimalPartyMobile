import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View} from "native-base";
import {useState} from "react";

<<<<<<< Updated upstream
const EventHeading = ({data}) => {
    const [props, setProps] = useState({data})
    const [numGuests, setNumGuests] = useState(0)

=======
const EventHeading = ({props}) => {
    props = props.data;

    // const [props, setProps] = useState({props})
    // const [numGuests, setNumGuests] = useState(0)
    //
>>>>>>> Stashed changes

    return(
            <Container maxW={"100%"} maxH="20%" bg="indigo.300" rounded="md" shadow={3} flexGrow="1">
                <Box flexGrow="1">
                    <Heading pb="1" size="lg" marginLeft="2%" >
                        {props.name}
                    </Heading>
                    <Text size = "md" marginLeft="2%" fontWeight="medium">
                        Date: {props.date} {"\n"}
                        Location: {props.address} {"\n"}
                        Guests: {numGuests} {"\n"}
                        Desc: {props.description}
                        {"\n"}ID: {props._id}
                    </Text>
                </Box>
            </Container>
    );
}

export default EventHeading;