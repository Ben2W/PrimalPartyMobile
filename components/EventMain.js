import * as React from 'react';
import {NativeBaseProvider, Box, Center, Heading, ScrollView, Flex, VStack, ZStack, Container, View, Text} from "native-base";


const EventMain = ({ navigation, route }) => {
    const props = route.params;
    const guestsMap = props.guests.map((item, index) =>
        <Text key={index}>
            {item.firstName} {item.lastName} {"\n"}
        </Text>
    );

    return (
        <View style={{
            flex: 1,
            alignContent: "center",
            top: "5%",
            marginLeft: "2%",
            marginRight: "2%",
            flexDirection: "column",
        }}>
            <VStack space={"2%"} flex={1}>
                <Container maxW={"100%"} maxH="20%" bg="indigo.300" rounded="md" shadow={3} >
                    <Heading pb="1" size="lg" marginLeft="2%">
                        Event: {props.title}
                    </Heading>
                    <Text size = "md" marginLeft="2%" fontWeight="medium">
                        Location: {props.location} {"\n"}
                        Date: {props.date} {"\n"}
                        Desc: {props.desc}
                    </Text>
                </Container>
                <Box flexGrow={1} maxW="100%" maxH={"70%"} bg="indigo.100" rounded="md" shadow={3} >
                    <Heading pb="3" size="lg">
                        Guests
                    </Heading>
                    <ScrollView showsVerticalScrollIndicator={true} borderColor={"black"} maxH={"100%"}>
                        {guestsMap}
                    </ScrollView>
                </Box>
            </VStack>
        </View>
    );
}

export default EventMain;