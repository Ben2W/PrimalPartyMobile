import GuestList from "../components/GuestList";
import EventHeading from "../components/EventHeading";
import {Box, View, VStack} from "native-base";
import {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ReduxStore from "../redux/ReduxStore";
import {FAB} from "react-native-paper";
import {eventDELETE} from "../redux/eventsReducer";
import {StackActions as navigation} from "react-navigation";
import {CredentialsContext} from "../components/CredentialsContext";

const EventGuestList = (props) => {
    let delButton = {};
    if (useContext(CredentialsContext).storedCredentials._id === props.eventData.admin._id){
        delButton =
            <Box>
            <FAB
                label={"Search for Friend to Add"}
                style={{
                    width: "100%",
                    backgroundColor: "#30AADD",
                }}
                onPress={() => handleSearch(props.eventID)}
                key = "Search"
            />
            <FAB
                label={"Delete"}
                style={{
                    width: "100%",
                    backgroundColor: "#D11A2A",
                }}
                onPress={() => handleDelete(props.eventID)
                    .then((res) => {
                        props.navigation.push("DashboardNavigation", {params: { post: res}})
                    })
                }/>
            </Box>
    }

    const dispatch = useDispatch();

    // Handle Add Guest
    const handleSearch = () => {
        props.navigation.push("SearchFriendsPage")
    }

    // Handle Delete
    const handleDelete = async () => {
        console.log("Deleting: " + props.eventID);
        const url = 'https://primalpartybackend.azurewebsites.net/events/' + props.eventID
        let newState = dispatch(eventDELETE({eventID: props.eventID}));
        let details = [props.eventID];
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
            return newState;
        } catch (e) {
            return e
        }
    }

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
                    <GuestList />
                    {delButton}
                </>
            </VStack>
        </View>
    )
}

export default EventGuestList;