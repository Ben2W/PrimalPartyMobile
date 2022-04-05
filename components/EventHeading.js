import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View} from "native-base";

const EventHeading = ({props}) => {
    return(
            <Container maxW={"100%"} maxH="17%" bg="indigo.300" rounded="md" shadow={3}>
                <Box>
                    <Heading pb="1" size="lg" marginLeft="2%" >
                        {props.title}
                    </Heading>
                    <Text size = "md" marginLeft="2%" fontWeight="medium">
                        Date: {props.date} {"\n"}
                        Location: {props.location} {"\n"}
                        Guests: {props.guests.length} {"\n"}
                        Desc: {props.desc}
                    </Text>
                </Box>
            </Container>
    );
}

export default EventHeading;