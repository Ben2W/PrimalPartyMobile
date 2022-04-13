import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Card, Title } from 'react-native-paper'
import { Box, Button, Center, FormControl, Heading, HStack, Input, Modal, Spinner, VStack, Text } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { StyledDeleteButton } from '../components/styles'
import { inlineStyles } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        
        //const delIndex = allFriends.indexof(data._id)
        const result = friendsList.filter(friendsList => friendsList._id != friend._id)
        console.log("FILTER TESTTTTTTTT")
        console.log(friendsList)
        setState(result)
        //setState(friendsList.splice(1, 1))
        //setState(friendsList.splice(0))
        //console.log(friendsList);
    }


    return (
        <View style={{
            marginBottom: "5%",
            width: "100%",
            alignContent: "center",
            paddingLeft: "5%",
            paddingRight: "5%",
            flexDirection: 'row',
        }}>
            <Card
                mode="outlined"
                elevation={20}
                borderRadius={50}
                style={{ width: '100%' }}
            >
            <Card.Content style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: 10
                    }}>

            <Heading>{firstNames} {lastNames}</Heading>

            <TouchableOpacity 
            onPress={() => handleFriendDelete()}
                style = {styles.deleteButton}>
            <Text>Remove friend</Text>
            </TouchableOpacity>

            </Card.Content>
            </Card>
            
        </View>
    )

}

const styles = StyleSheet.create({ 
        
    deleteButton: {
    marginLeft: "95%",
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 3,
    backgroundColor: 'red',
  }})

export default FriendCard