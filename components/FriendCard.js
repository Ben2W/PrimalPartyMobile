import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Card, Title } from 'react-native-paper'
import { Box, Button, Center, FormControl, Heading, HStack, Input, Modal, Spinner, VStack, Text } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { StyledDeleteButton } from '../components/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { inlineStyles } from 'react-native-svg';

const FriendCard = ({ navigation, data }) => {
    const [firstNames, setFirstNames] = useState(data.firstName)
    const [lastNames, setLastNames] = useState(data.lastName)
    const [data, setData] = useState([])

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