import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Box, Button, Center, FormControl, Heading, HStack, Input, Modal, Spinner, VStack } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';

const FriendCard = ({ navigation, data }) => {
    const [firstNames, setFirstNames] = useState(data.firstName)
    const [lastNames, setLastNames] = useState(data.lastName)

    return (
        <View style={{
            marginBottom: "5%",
            width: "100%",
            alignContent: "center",
            paddingLeft: "5%",
            paddingRight: "5%",
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
                    }}></Card.Content>
            <Title>{firstNames}{lastNames}</Title>
            </Card>
        </View>
    )
}

export default FriendCard