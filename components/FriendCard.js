import * as React from 'react';
import {Box, Container, Heading, ScrollView, VStack, Text, View, NativeBaseProvider, Center} from "native-base";
import {useState} from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, StyledDeleteButton, DeleteButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import { inlineStyles } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const FriendCard = ({ navigation, friend, setDataState }) => {
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

        setDataState()
      }

    return(
        <LinearGradient colors={['#4555F2', '#6f72da']} style={styles.container}>
            <Container maxW={"100%"} maxH="100%" rounded="md" shadow={3} flexGrow="1" borderColor="red" borderWidth="0" margin="1">
            
                <View style={styles.row}>
                    <Heading style={styles.heading}>
                    {firstNames} {lastNames}
                    </Heading>
                    <View style={styles.space}/>
                    <StyledDeleteButton onPress={handleFriendDelete}>
                        <MaterialCommunityIcons name="delete" size={20} color="white" />
                    </StyledDeleteButton>
                </View>
                
            </Container>
        </LinearGradient>
);
}

const styles = StyleSheet.create({

    space: {
        width: "6%", 
    },

    row: {
        width: "100%",
        height: "100%",
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0
       
    },

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },

    heading: {
        fontSize: 25,
        color: 'white',
        width: "85%"
    },

    container: {
        borderRadius: 5,
        flexGrow: 1,
        margin: 1
    }

})

export default FriendCard