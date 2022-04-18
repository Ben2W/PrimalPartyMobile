import {Box, Button, Center, Input, Text, View, VStack} from "native-base";
import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledAddButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainer } from '../components/styles'
import {FAB} from "react-native-paper";
import React, {useContext, useState} from 'react';
import SearchUsers from "../components/API Calls/SearchUsers";
import {FlatList} from "react-native";
import AddFriendCard from "../components/AddFriendCard";
import {CredentialsContext} from "../components/CredentialsContext";
//import { TextInput } from 'react-native';

const SearchAddFriend = () => {

    const [people, setPeople] = useState()
    const [formData, setData] = useState({search: ' '} );
    const [myID, setMyID] = useState(useContext(CredentialsContext).storedCredentials._id)

    async function handleClick(value) {
        const temp = await SearchUsers(value)
            .then((res) => {
                let parseMap = res.map((obj) => obj)
                setPeople(parseMap);
            })
    }

    return(
        <View style={{
            flex: 1,
            alignContent: "center",
            top: "5%",
            marginLeft: "2%",
            marginRight: "2%",
            flexDirection: "column",
            marginBottom: "15%"
        }}>
        <PageTitle>
            Add Friend 
        </PageTitle>
        <Input
            style={{height: 40, borderWidth: 1}}
            size="md"
            placeholder="Type here to search!"
            value = {formData.search}
            onChangeText={value => {
                setData({...formData, search: value})
                handleClick(value)
            }}
        />
                    <Box flexGrow={1} maxW="100%" maxH={"75%"} bg="violet.400" rounded="md" shadow={3}
                    >
                        <FlatList
                            data = {people}
                            renderItem={({ item }) => (
                                <AddFriendCard friend ={item} _id={item._id} key = {item._id}  />
                            )}
                            keyExtractor={item => item._id}

                            showsVerticalScrollIndicator={true}
                            borderColor={"black"}
                            rounded="md"
                            bg="violet.300"
                            maxH={"90%"} marginLeft= "5%" marginRight="5%" marginTop={'5%'}
                            textAlign={"center"}
                            lineHeight={10}


                        />
                    </Box>
        </View>
    )
    }
export default SearchAddFriend