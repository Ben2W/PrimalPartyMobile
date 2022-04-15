import * as React from 'react';
import { useEffect, useState, component } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper';
import FriendCard from "../components/FriendCard"
//import { SafeAreaView } from 'react-native-safe-area-context';
//import {NativeBaseProvider, Box, Center, Heading, ScrollView, Flex, VStack, ZStack, Container, View, Text} from "native-base";

const DashboardFriendsList = ({navigation}) => {
    //const [friends, setFriends] = useState([])
    const url = 'https://primalpartybackend.azurewebsites.net/friends';

    /*useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async() => {
        await fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
            .then(data => {
                setFriends(data.friends)
            })
            .catch(err => {
               console.log(err);
            })
    }

    function friendlist(props)
    {
        let Friends = [];

        for (var i=0; i<props.props.length; i++) 
        {
            Friends.push(<friends props = { props.props[i].firstName } key={i}/>)
        }
    }

    fetch(`${url}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue'
    })
    });*/

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getFriends = async () => {
        try {
        const response = await fetch(`${url}`);
        const json = await response.json();
        setData(json.friends);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        getFriends();
    }, []);
    

    /*return(
        <KeyboardAvoidingViewWrapper>
            <PageTitle>
                Friend
            </PageTitle>
        </KeyboardAvoidingViewWrapper>
    )*/

   /* return (
        <KeyboardAvoidingViewWrapper>
          {isLoading ? <ActivityIndicator/> : (
            <><PageTitle>
                    Friends
                </PageTitle><FlatList
                        data={data}
                        //keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <Text>{item.firstName} {item.lastName}</Text>
                        )} /></>
          )}
        </KeyboardAvoidingViewWrapper>
      );
    }*/
    console.log(data)
    return (
        <View style={{
            flex: 1,
            alignContent: "center",
            top: "5%",
            marginLeft: "2%",
            marginRight: "2%",
            flexDirection: "column",
            marginBottom: "15%"
        }}>
          {isLoading ? <ActivityIndicator/> : (
            <><PageTitle>
                    Friends
                </PageTitle><FlatList
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <FriendCard
                            navigation = {navigation}
                            data = {item}
                            key = {item.friends._id}
                            />
                        )} /></>
          )}
        </View>
      );
    }

    /*return (
        <KeyboardAvoidingViewWrapper>
          {isLoading ? <ActivityIndicator/> : (
            <><PageTitle>
                    Friends
                </PageTitle><FlatList
                data = {data}
                //keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <FriendCard
                        navigation = {navigation}
                        data = {item}
                        //key = {item.friends._id}
                        />
                    )}
                /></>
    )}
     </KeyboardAvoidingViewWrapper>
    )
}*/
export default DashboardFriendsList