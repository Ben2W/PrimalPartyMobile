import * as React from 'react';
import {NativeBaseProvider, Box, Center, Heading, ScrollView, Flex, VStack, ZStack, Container, View, Text} from "native-base";
import EventHeading from "../components/EventHeading";
import GuestTasksList from "../components/GuestTasksList";
import {useContext, useState} from "react";
import {FAB} from "react-native-paper";
import {CredentialsContext} from "../components/CredentialsContext";


const EventGuestGuestsListView = ({ navigation, data }) => {
    const userData = data.data

    const [props, setProps] = useState(userData)
    const [guestsMap, setGuestsMap] = useState(userData.guests)
    const [curEventID, setCurEventID] = useState(userData._id);

    const handleDelete = async ({curEventID}) => {
        console.log("Deleting: " + curEventID);
        const url = 'https://primalpartybackend.azurewebsites.net/events/' + curEventID

        let details = [curEventID];
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        try {
            const res = await fetch(url,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    credentials: 'include',
                    body: formBody
                })
            return navigation.navigate("Dashboard");
        } catch (e) {
            return en
        }
    }

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
                <>
                    <EventHeading props={props}/>
                    <FAB
                        label={"Delete"}
                        style={{
                            width: "100%",
                            backgroundColor: "#D11A2A",
                        }}
                        onPress={() => handleDelete({curEventID})}
                    />
                </>
                <GuestTasksList guestsMap={guestsMap} heading={"Guest List"}/>
            </VStack>
        </View>
    );
}

export default EventGuestGuestsListView;