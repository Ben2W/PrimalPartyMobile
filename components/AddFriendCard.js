import {Box, Button, Text} from "native-base";
import React from "react";
import {useDispatch} from "react-redux";
import {eventDELETE, guestADD} from "../redux/eventsReducer";
import {StackActions as navigation} from "react-navigation";
import ReduxStore from "../redux/ReduxStore";
import {useState} from "react";

const AddFriendCard = ({ navigation, friend, setDataState }) => {

    const [firstNames, setFirstNames] = useState(friend.firstName)
    const [lastNames, setLastNames] = useState(friend.lastName)
    
const handleAddFriend = async () => {
    const url = 'https://primalpartybackend.azurewebsites.net/friends/'

    await fetch(url + (friend._id) ,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        credentials: 'include',
    })
    .then(response =>{
        console.log("RESPONSE: " + response.status);
    })

    //setDataState()
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
                    {firstNames} {lastNames}
                </Text>
            </Box>
            <Button onPress={() => handleAddFriend()}>
                {"Add"}
            </Button>
        </Box>
    )
}

export default AddFriendCard