import {Box, Button, Text} from "native-base";
import React from "react";
import {useDispatch} from "react-redux";
import {eventDELETE, guestADD} from "../redux/eventsReducer";
import {StackActions as navigation} from "react-navigation";
import ReduxStore from "../redux/ReduxStore";

const PeopleCard = (props) => {
    const dispatch = useDispatch();

    // Handle Delete
    const handleGuestAdd = async ({_id, eventID}) => {
        console.log("Adding: " + _id + " - " + eventID);
        const url = 'https://primalpartybackend.azurewebsites.net/events/' + eventID + '/guests/' + _id;
        dispatch(guestADD({_id: _id, eventID: eventID}))
        let newState = ReduxStore.getState().events.find((obj) => obj._id === eventID);

        let details = [eventID, _id];
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
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    credentials: 'include',
                    body: formBody
                })
            await res.json();
            return newState;
        } catch (e) {
            return e
        }
    }


    const handleClick = () => {
        handleGuestAdd({_id: props._id, eventID: props.eventID})
            .then((res) => {
                props.navigation.push("EventGuestNavigation", {eventData: res})
            })
    }

    return (
        <Box
            background={'#B9F8D3'}
            marginBottom={'5%'}
            width={'100%'}
            borderRadius={8}
            pb={"1%"} pt={"1%"}
        >
            <Box flexDirection={"row"} alignSelf={'center'} pb={"1%"} pt={"1%"}>
                <Text textAlign={"center"} width={"50%"}>
                    {props.props.firstName} {props.props.lastName}
                </Text>
            </Box>
            <Button onPress={() => handleClick()}>
                {"Add " + props.props.username}
            </Button>
        </Box>
    )
}

export default PeopleCard