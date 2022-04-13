import * as React from 'react';
import { useEffect, useState, component } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper';
import FriendCard from "../components/FriendCard"

const DashboardFriendsList = ({navigation}) => {
    //const [friends, setFriends] = useState([])
    const url = 'https://primalpartybackend.azurewebsites.net/friends';

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const setState = ( list ) =>{
        setData(list)
        //console.log(list)
        //console.log("state changed")
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
    //console.log(data)
    return (
        <View>
          {isLoading ? <ActivityIndicator/> : (
            <><PageTitle>
                    Friends
                </PageTitle><FlatList
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <FriendCard
                            navigation = {navigation}
                            friend = {item}
                            friendsList = {data}
                            setState = {setState}
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