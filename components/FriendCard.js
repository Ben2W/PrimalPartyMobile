import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View, NativeBaseProvider} from "native-base";
import {useState} from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import { inlineStyles } from 'react-native-svg';

const FriendCard = ({ navigation, data }) => {
    const [firstNames, setFirstNames] = useState(data.firstName)
    const [lastNames, setLastNames] = useState(data.lastName)
    //const [data, setData] = useState([])

    const handleFriendDelete = () => {

        const url = 'https://primalpartybackend.azurewebsites.net/friends/'

        console.log(data._id)

        fetch(url + (data._id) ,{
            method: 'DELETE',
            credentials: 'include',
        })
        .then(response =>{
            console.log("RESPONSE: " + response.status);
        })
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