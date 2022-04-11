import {Box, Center, Heading, Spinner, Text, View} from "native-base"
import ReduxStore from "../redux/ReduxStore";
import {useDispatch} from "react-redux";
import GetEvents from "./GetEvents";
import {eventSET} from "../redux/eventsReducer";
import React, {useContext, useEffect, useState} from "react";
import {CredentialsContext} from "./CredentialsContext";
import {FlatList} from "react-native";
import CustomCard from "./CustomCard";

const InitDashboard = ({navigation}) => {
    const [eventData, setEventData] = useState([]);
    const [firstName, setFirstName] = useState(useContext(CredentialsContext).storedCredentials.firstName)

    const dispatch = useDispatch();

    const init = () => {
        GetEvents.then((events) => {
            dispatch(eventSET({events}))
            setEventData(events)
        })
    }

    useEffect(() => {
        init();
    }, []);


    return (
        <View style={{
            flex: 1,
            top: "5%",
            marginLeft: "2%",
            marginRight: "2%",
        }}>
        <>
            <Box maxH={"80%"} flexGrow={1} borderWidth={"2"} borderColor={"indigo.100"} >
                <Heading textAlign={"center"}>
                    Upcoming Events
                </Heading>
                <FlatList
                    data = {eventData}
                    renderItem={({ item }) => (
                        <CustomCard
                            navigation = {navigation}
                            data = {item}
                            key = {item._id}
                        />
                    )}
                    keyExtractor={item => item._id}
                />
            </Box>
        </>
        </View>
    )
}

export default InitDashboard;
