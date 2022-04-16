import * as React from 'react';
import { useEffect, useState, component } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledAddButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper';
import FriendCard from "../components/FriendCard"
//import { SafeAreaView } from 'react-native-safe-area-context';
//import {NativeBaseProvider, Box, Center, Heading, ScrollView, Flex, VStack, ZStack, Container, View, Text} from "native-base";

const DashboardFriendsList = ({ navigation }) => {
    const url = 'https://primalpartybackend.azurewebsites.net/friends';

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    //Function used to rerender the friends list every time a friend is added or deleted
    const setDataState = () => {
        setData([])
    }

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

    useEffect(() => {
        getFriends();
    }, [data]);

    //console.log(data)
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
            {isLoading ? <ActivityIndicator /> : (
                <><PageTitle>
                    Friends
                </PageTitle>
                    <StyledAddButton onPress={() => navigation.navigate('SearchAddFriend')}>
                        <ButtonText>
                            Add Friends
                        </ButtonText>
                    </StyledAddButton>
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => index}
                        renderItem={({ item }) => (
                            <FriendCard
                                navigation={navigation}
                                friend={item}
                                setDataState={setDataState}
                                key={item.friends._id}
                            />
                        )} /></>
            )}
        </View>
    );
}

export default DashboardFriendsList