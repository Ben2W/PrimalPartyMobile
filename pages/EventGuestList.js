import GuestList from "../components/GuestList";
import EventHeading from "../components/EventHeading";
import {View, VStack} from "native-base";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ReduxStore from "../redux/ReduxStore";
import {FAB} from "react-native-paper";
import {eventDELETE} from "../redux/eventsReducer";

const EventGuestList = (props) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        console.log("Deleting: " + props.eventID);
        const url = 'http://localhost:8080/events/' + props.eventID
        dispatch(eventDELETE({eventID: props.eventID}));

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
            return res;
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
                    <FAB
                        label={"Delete"}
                        style={{
                            width: "100%",
                            backgroundColor: "#D11A2A",
                        }}
                        onPress={() => handleDelete(props.eventID)
                            .then(props.navigation.navigate("DashboardNavigation"))}
                    />
                </>
            </VStack>
        </View>
    )
}

export default EventGuestList;