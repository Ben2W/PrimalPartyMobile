import { Box, Button, Center, Input, Text, View, VStack, FlatList } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import SearchUsers from "../components/API Calls/SearchUsers";
import CustomCard from "../components/CustomCard";
import PeopleCard from "../components/PeopleCard";
import { CredentialsContext } from "../components/CredentialsContext";

const abortController = new AbortController()

const SearchFriendsPage = ({ navigation, route }) => {
    const [eventID, setEventID] = useState(route.params.eventID);
    const [people, setPeople] = useState()
    const [formData, setData] = useState({ search: ' ' });
    const [myID, setMyID] = useState(useContext(CredentialsContext).storedCredentials._id)

    async function handleClick(value) {
        const temp = await SearchUsers(value)
            .then((res) => {
                // list of user objects
                let parseMap = res.map((obj) => obj)

                // filter duplicates
                parseMap = parseMap.filter(element => {
                    return !route.params.eventData.guests.find(el => {
                        return element._id === el._id;
                    })
                })

                // filter friends
                parseMap = parseMap.filter(element => {
                    return element.friends.includes(myID);
                })

                setPeople(parseMap);
            })
    }

    useEffect(() => {
        // preload searchList
        handleClick(' ');
        setEventID(route.params.eventID)
        return () => {
            abortController.abort()
        }
    }, [])

    return (
        <View style={{
            flex: 1,
            alignContent: "center",
            top: "10%",
            marginLeft: "2%",
            marginRight: "2%",
            flexDirection: "column",
        }}>
            <VStack space={3}>
                <Input
                    size="md"
                    style={{height: 40, borderWidth: 1}}
                    placeholder="Search for a new guest!"
                    value={formData.search}
                    onChangeText={value => {
                        setData({
                            ...formData,
                            search: value
                        })
                        handleClick(value);
                    }
                    }
                />
                <Box flexGrow={1} maxW="100%" maxH={"90%"} minH={'80%'} bg="violet.400" rounded="md" shadow={3}
                >
                    <FlatList
                        data={people}
                        renderItem={({ item }) => (
                            <PeopleCard props={item} _id={item._id} key={item._id} eventID={eventID} navigation={navigation} route={route} isAdmin={route.params.isAdmin} />
                        )}
                        keyExtractor={item => item._id}

                        showsVerticalScrollIndicator={true}
                        borderColor={"black"}
                        rounded="md"
                        // bg="violet.300"
                        maxH={"90%"} marginLeft="5%" marginRight="5%" marginTop={'5%'}
                        textAlign={"center"}
                        lineHeight={10}


                    />
                </Box>
            </VStack>
        </View>
    )
}

export default SearchFriendsPage