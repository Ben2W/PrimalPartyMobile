import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View, NativeBaseProvider} from "native-base";
import {useState} from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, StyledDeleteButton, DeleteButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import { inlineStyles } from 'react-native-svg';

const FriendCard = ({ navigation, friend, setState }) => {
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

        setState([])
      }

    return(
        <Container maxW={"100%"} maxH="100%" bg={"indigo.300"} rounded="md" shadow={3} flexGrow="1" borderColor="black" borderWidth="1" margin="1">
            <Box flexGrow="1" >
                <Heading pb="5" size="md" marginLeft="5%" >
                    {firstNames} {lastNames}
                </Heading>
                <StyledDeleteButton onPress={handleFriendDelete} justify-content="center">
                    <DeleteButtonText>
                        Delete Friend
                    </DeleteButtonText>
                </StyledDeleteButton>
            </Box>
        </Container>
);
}

export default FriendCard