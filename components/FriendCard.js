import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View, NativeBaseProvider} from "native-base";
import {useState} from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import { inlineStyles } from 'react-native-svg';

const FriendCard = ({ navigation, friend, friendsList, setState }) => {
    const [firstNames, setFirstNames] = useState(friend.firstName)
    const [lastNames, setLastNames] = useState(friend.lastName)

    const handleFriendDelete = async () => {

        const url = 'https://primalpartybackend.azurewebsites.net/friends/'

        console.log(friend._id)

        await fetch(url + (friend._id) ,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: 'include',
        })
        .then(response =>{
            console.log("RESPONSE: " + response.status);
        })

        const updatedList = friendsList.filter(friendsList => friendsList._id != friend._id)
        console.log("FILTER TESTTTTTTTT")
        console.log(friendsList)
        setState(updatedList)

      }

    return(
        <Container maxW={"100%"} maxH="100%" bg={"indigo.300"} rounded="md" shadow={3} flexGrow="1" borderColor="black" borderWidth="1" margin="1">
            <Box flexGrow="1" >
                <Heading pb="5" size="md" marginLeft="5%" >
                    {firstNames} {lastNames}
                </Heading>
                <StyledButton onPress={handleFriendDelete}>
                    <ButtonText>
                        Delete friend
                    </ButtonText>
                </StyledButton>
            </Box>
        </Container>
);
}

export default FriendCard