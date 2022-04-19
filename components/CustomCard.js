import {Platform, View} from "react-native";
import { Avatar, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from "react-native-paper/src/components/List/ListItem";
import {useCallback, useContext, useEffect, useState} from "react";
import EventGuestNavigation from "../pages/EventGuestNavigation";
import {CredentialsContext} from "./CredentialsContext";
import Moment from "react-moment";
import {Box, Heading, Icon, Text, Button} from "native-base";
import ReduxStore from "../redux/ReduxStore";
import {find} from "styled-components/test-utils";
import {useFocusEffect} from "@react-navigation/native";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";

const CustomCard = ({navigation, data, route}, props) => {
    const [title, setTitle] = useState(data.name);
    const [address, setAddress] = useState(data.address);
    const [date, setDate] = useState(new Date(data.date));
    const [desc, setDesc] = useState(data.description);
    const [guests, setGuests] = useState(data.guests.length);
    const [curData, setCurData] = useState(data);
    const [adminID, setAdminID] = useState(data.admin._id);
    const [userID, setUserID] = useState(useContext(CredentialsContext).storedCredentials._id)

    const checkAdmin = userID === adminID;
    const [isAdmin, setIsAdmin] = useState(checkAdmin);

    const [curEventID, setCurEventID] = useState(data._id);

    useFocusEffect(
        useCallback(() => {
            const bruh = () => {
                let curState = ReduxStore.getState().events;
                let findEvent = curState.findIndex((obj) => obj._id === data._id);
                setCurData(curState[findEvent]);

                if (curState[findEvent] !== undefined){
                    setTitle(curState[findEvent].name);
                    setAddress(curState[findEvent].address);
                    setDate(new Date(curState[findEvent].date));
                    setDesc(curState[findEvent].description);
                    setAdminID(curState[findEvent].admin._id)
                    setGuests(curState[findEvent].guests.length)
                }
            }

            bruh();
            return () => bruh;
        }, [])
    );

    const handleClick = ({navigation}) => {
        let curState = ReduxStore.getState().events;
        let findEvent = curState.findIndex((obj) => obj._id === data._id);
        setCurData(curState[findEvent]);

        navigation.navigate("EventGuestNavigation", {eventID: curEventID, eventData: curState[findEvent], isAdmin: isAdmin});
        // navigation.navigate("TestingViewMore")
        // navigation.navigate("EventGuestNavigation", {data:{curData}} )
    }

    let AdminButton;
    if (userID === adminID){
        AdminButton =
        <View
            style={{
                width: "100%",
        }}
        >
            <FAB
                label={"Edit Your Event"}
                style={{
                    width: "100%",
                    backgroundColor: '#800020',
                    borderRadius: '500'
                }}
                onPress={() => handleClick({navigation})}
            />
        </View>
    }

    else{
        AdminButton =
            <View
                style={{
                    width: "100%",
                }}
            >
                <FAB
                    label={"View More"}
                    labelStyle={{ color: "#334EEB", fontSize: 18 }}
                    style={{
                        width: "100%",
                        backgroundColor:'#121212',
                        borderRadius: '500',
                        borderColor: '#121212'
                    }}
                    onPress={() => handleClick({navigation})}

                />
            </View>
    }

    return (
    <View style={{
        marginBottom : "5%",
        width: "100%",
        alignContent:"center",
        paddingLeft: "5%",
        paddingRight: "5%",
    }}>
        <Card
            // mode="outlined"
            elevation = {50}
            borderRadius={50}
        >
            {/*<Card.Title title={props.title} subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="party-popper" />} />*/}
            <LinearGradient
                colors={['#4052F2', '#6A7FF0']}
            >
            <Card.Content style={{
                // alightItems : Platform.OS === 'ios' ? "left" : '',
                marginTop: '2%',
                justifyContent: 'center',
            }}>
                <Box flexGrow="1" flexDir={'column'} >
                    <Box flexDir={'row'} width={'50%'}>
                        <Icon as={MaterialCommunityIcons} name="party-popper" color="#121212" size={'md'} _dark={{
                            color: "warmGray.50"
                        }} />
                        <Heading size={'lg'} color={'#FFFFFF'}>
                            {"  " + title} {"\n"}
                        </Heading>
                    </Box>
                    <Box flexDir={'row'} width={'50%'}>
                        <Icon as={Entypo} name="calendar" color="#121212" size={'md'} _dark={{
                            color: "warmGray.50"
                        }} />
                        <Heading size={'lg'} color={'#FFFFFF'}>
                            {"  " + new Date(date).toLocaleDateString("en-US")} {"\n"}
                        </Heading>
                    </Box>
                </Box>
                <Box flexGrow="1" flexDir={'column'} >
                <Box flexDir={'row'}>
                    <Icon as={Entypo} name="location-pin" color="#121212" size={'md'} _dark={{
                        color: "warmGray.50"
                    }} />
                    <Heading size={'lg'} color={'#FFFFFF'}>
                        {"  " + address} {"\n"}
                    </Heading>
                </Box>
                <Box flexDir={'row'}>
                    <Icon as={Entypo} name="users" color="#121212" size={'md'} _dark={{
                        color: "warmGray.50"
                    }} />
                    <Heading size={'lg'} color={'#FFFFFF'}>
                            {"  " + guests + " Guests"} {"\n"}
                    </Heading>
                </Box>
            </Box>
            </Card.Content>
            {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
            <Card.Actions style={{
                alightItems : Platform.OS === 'ios' ? "center" : '',
                justifyContent: 'center',
            }}>
                {AdminButton}
            </Card.Actions>
        </LinearGradient>
        </Card>
    </View>
    );
}


export default CustomCard;