import {Box, Button, Text} from "native-base";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {eventDELETE, guestADD} from "../redux/eventsReducer";
import {StackActions as navigation} from "react-navigation";
import ReduxStore from "../redux/ReduxStore";

const PeopleCard = (pass) => {
    const [props, setProps] = useState(pass);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("new Page")
        // setProps(pass);
    }, [])

    // Handle Add
    const handleGuestAdd = async ({userData, eventID}) => {
        console.log("Adding: " + userData._id + " - " + eventID);
        const url = 'https://primalpartybackend.azurewebsites.net/events/' + eventID + '/guests/' + userData._id;
        dispatch(guestADD({userData: userData, eventID: eventID}))

        let details = [eventID, userData._id];
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
            let postData = await res.json();
            return;
        } catch (e) {
            return e
        }
    }


    const handleClick = () => {
        handleGuestAdd({userData: props.props, eventID: props.eventID})
            .then(() => {
                let newState = ReduxStore.getState().events.find((obj) => obj._id === props.eventID);
                // console.log(newState);
                props.navigation.push("EventGuestNavigation", {eventData: newState})
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