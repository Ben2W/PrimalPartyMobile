import GuestList from "../components/GuestList";
import EventHeading from "../components/EventHeading";
import {Box, View, VStack} from "native-base";
import React, {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ReduxStore from "../redux/ReduxStore";
import {FAB} from "react-native-paper";
import {eventDELETE} from "../redux/eventsReducer";
import {StackActions as navigation} from "react-navigation";
import {CredentialsContext} from "../components/CredentialsContext";

const EventGuestList = (props) => {
    const [newRoute, setNewRoute] = useState(props.route);
    const [pass, setPass] = useState(props.route.params);

    // useEffect(() => {
    //     console.log("!123849123748912739847812934")
    //     console.log(props.route.params)
    //     setPass(props.route.params);
    // }, [])

    useEffect(() => {
        // console.log("!69~")
        setPass(props.route.params);
        setNewRoute(props.route);
    }, [props.route.params])

    let delButton = {};
    if (useContext(CredentialsContext).storedCredentials._id === pass.eventData.admin._id){
        delButton =
            <Box>
            <FAB
                label={"Search for Friend to Add"}
                style={{
                    width: "100%",
                    backgroundColor: "#30AADD",
                }}
                onPress={() => handleSearch(pass.eventData._id)}
                key = "Search"
            />
            <FAB
                label={"Delete"}
                style={{
                    width: "100%",
                    backgroundColor: "#D11A2A",
                }}
                onPress={() => handleDelete(pass.eventData._id)
                    .then((res) => {
                        props.navigation.navigate("DashboardNavigation", {newData: ReduxStore.getState().events, change: "lol"})
                    })
                }
                key = "Delete"
            />
            </Box>
    }
    else
        delButton = <></>

    const dispatch = useDispatch();

    // Handle Add Guest
    const handleSearch = () => {
        props.navigation.navigate("SearchFriendsPage", { eventID: pass.eventData._id, eventData: pass.eventData })
    }

    // Handle Delete
    const handleDelete = async () => {
        console.log("Deleting: " + pass.eventData._id);
        const url = 'https://primalpartybackend.azurewebsites.net/events/' + pass.eventData._id
        let newState = dispatch(eventDELETE({eventID: pass.eventData._id}));
        let details = [pass.eventData._id];
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
                    <EventHeading props={pass}/>
                    <GuestList props = {pass} route = {newRoute} />
                    {delButton}
                </>
            </VStack>
        </View>
    )
}

export default EventGuestList;