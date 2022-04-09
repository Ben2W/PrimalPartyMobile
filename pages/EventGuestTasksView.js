import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View} from "native-base";
import EventHeading from "../components/EventHeading"
import GuestTasksList from "../components/GuestTasksList";
import {useState} from "react";

const EventGuestTasksView = ({navigation, data}) => {
    const [props, setProps] = useState({data})

    const guestsMap = props.guests.map((item, index) => {
        if (item.tasks.length > 1){
            return(
                <Box flexDirection={"row"} marginLeft="5%" borderBottomWidth={"1"} marginRight={"5%"} pb={"1%"} pt={"1%"} borderColor={"gray.300"}>
                    <Text key={index} textAlign = "left" width={"50%"} marginLeft="5%">
                        {item.firstName} {item.lastName} {": "}
                    </Text>
                    <Text key={index} textAlign={"left"} width={"50%"} marginLeft="5%">
                        {item.tasks.slice(0,-1).join("\n") + "\n" + item.tasks.slice(-1)}
                    </Text>
                </Box>
            );
        }
        else if (item.tasks.length === 1){
            return(
                <Box flexDirection={"row"} marginLeft="5%" borderBottomWidth={"1"} marginRight={"5%"} pb={"1%"} pt={"1%"} borderColor={"gray.300"}>
                    <Text key={index} textAlign = "left" width={"50%"} marginLeft="5%">
                        {item.firstName} {item.lastName} {": "}
                    </Text>
                    <Text key={index} textAlign={"left"} width={"50%"} marginLeft="5%">
                        {item.tasks[0]}
                    </Text>
                </Box>
            );
        }
        else{
            return(
                <Box flexDirection={"row"} marginLeft="5%" borderBottomWidth={"1"} marginRight={"5%"} pb={"1%"} pt={"1%"} borderColor={"gray.300"}>
                    <Text key={index} textAlign = "left" width={"50%"} marginLeft="5%">
                    {item.firstName} {item.lastName} {": "}
                    </Text>
                    <Text key={index} textAlign={"left"} width={"50%"} marginLeft="5%">
                        {"*No Tasks!*"}
                    </Text>
                </Box>
            );
        }
    });




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
                <GuestTasksList guestsMap={guestsMap} heading = {"Task List"}/>
            </VStack>
        </View>
    );
}

export default EventGuestTasksView