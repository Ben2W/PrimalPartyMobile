import * as React from 'react';
import {NativeBaseProvider, Box, Center, Heading, ScrollView, Flex, VStack, ZStack, Container, View, Text} from "native-base";
import EventHeading from "../components/EventHeading";
import GuestTasksList from "../components/GuestTasksList";
import {useState} from "react";


const EventGuestGuestsListView = ({ navigation, data }) => {
    const userData = data.data

    const [props, setProps] = useState(userData)
    const [guestsMap, setGuestsMap] = useState(userData.guests)

    // console.log(guestsMap);
    // const [guestsMap, setGuestsMap] = useState({data.guests})


    // const setGuestsMap() = props.guests.map((item, index) =>
    //     <Box flexDirection={"row"} marginLeft="5%" pb={"1%"} pt={"1%"}>
    //         <Text key={index} textAlign={"left"} width={"50%"}>
    //         {item.firstName} {item.lastName}
    //         </Text>
    //         <Text key={index} textAlign={"center"} width={"50%"} marginLeft="5%">
    //             {" (" + item.tasks.length + " tasks)"}
    //         </Text>
    //     </Box>
    // );

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
                <EventHeading props={props}/>
                <GuestTasksList guestsMap={guestsMap} heading={"Guest List"}/>
            </VStack>
        </View>
    );
}

export default EventGuestGuestsListView;