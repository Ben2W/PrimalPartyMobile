import { Box, Button, Center, Divider, Heading, HStack, Image, ScrollView, Text, View, VStack, FlatList } from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PeopleCard from "./PeopleCard";
import { guestREMOVE } from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";
import RemoveUser from "./API Calls/RemoveUser";
import {PageTitle} from "./styles";

const GuestList = (pass) => {
    const [props, setProps] = useState(pass.props.eventData)
    const [guests, setGuests] = useState(pass.props.eventData.guests)
    const [removing, setRemoving] = useState(false);
    const dispatch = useDispatch();

    const abortController = new AbortController()

    const handleRemove = (guestID, eventID) => {
        // console.log(guestID)
        // console.log(eventID)
        // console.log(guests.length)
        // remove from local storage
        dispatch(guestREMOVE({ guestID: guestID, eventID: eventID }));
        setRemoving(true);
        // remove from API storage
        RemoveUser(eventID, guestID)
            .then();
    }


    useEffect(() => {
        if (removing === true) {
            let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === props._id);
            let eventArray = ReduxStore.getState().events[findEvent];
            // console.log(eventArray.guests)
            setGuests(eventArray.guests);
            // console.log(guests.length)
            setProps(eventArray);
            setRemoving(false);
        }

        return () => {
            abortController.abort()
        }
    }, [removing])

    useEffect(() => {
        setProps(pass.route.params.eventData)
        setGuests(pass.route.params.eventData.guests);

        return () => {
            abortController.abort()
        }
    }, [pass.route.params])


    const img = require('./dino_icon2.png');


    let insideStuff = {};
    if (!pass.isAdmin) {
        insideStuff =
            <>
                <FlatList
                    data={guests}
                    renderItem={({ item }) => (
                        <Box flexDirection={"row"} marginLeft="5%" pb={"3%"} pt={"3%"} alignItems={'center'}
                        // background={'fuchsia.200'}
                        >
                            <HStack space={"2%"} flex={1} alignItems={'center'} justifyContent={'center'}
                            >
                                <Heading textAlign={"center"} width={"50%"} pt="2%" size={'sm'} flexWrap={'wrap'}>
                                    {item.firstName} {item.lastName}
                                </Heading>
                            </HStack>
                        </Box>
                    )}
                    keyExtractor={item => item._id}

                    showsVerticalScrollIndicator={true}
                    borderColor={"black"}
                    rounded="md"
                    bg="violet.300"
                    maxH={"85%"} marginLeft="5%" marginRight="5%" h={'85%'}
                    textAlign={"center"}
                    lineHeight={10}
                />
            </>
    }
    else {
        insideStuff =
            <>
                <FlatList
                    data={guests}
                    renderItem={({ item }) => (
                        <Box
                            background={'#B9F8D3'}
                            marginBottom={'5%'}
                            width={'100%'}
                            borderRadius={8}
                            pb={"1%"} pt={"1%"}
                        >
                        <Box flexDirection={"row"} marginLeft="5%" pb={"3%"} pt={"3%"}
                        >
                            <HStack space={"2%"} flex={1} alignItems={'center'}>
                                <Heading textAlign={"left"} width={"50%"} pt="2%" size={'sm'} flexWrap={'wrap'}>
                                    {item.firstName} {item.lastName}
                                </Heading>
                                <Button
                                    maxW={'50%'}
                                    height={'40px'}
                                    size={'sm'}
                                    onPress={() => handleRemove(item._id, props._id)}>
                                    {'Remove from Guest List'}
                                    {/*{"Remove: " + item.username }*/}
                                </Button>
                            </HStack>
                        </Box>
                        </Box>
                    )}
                    keyExtractor={item => item._id}

                    showsVerticalScrollIndicator={true}
                    borderColor={"black"}
                    rounded="md"
                    bg="violet.300"
                    maxH={"85%"} marginLeft="5%" marginRight="5%" h={'85%'}
                    textAlign={"center"}
                    lineHeight={10}
                />
            </>
    }



    let flatList;
    if (guests.length === 0) {
        flatList =
            <Center>
                <Image source={img} alt="PrimalParty" size='2xl' />
                <Heading>{'\n'}Let's get this PrimalParty started!</Heading>
            </Center>

    }
    else {
        flatList = insideStuff;
    }


    let flatHeight = ''
    if (!pass.isAdmin){
        flatHeight = '60%'
    }
    else{
        flatHeight = '50%'
    }

    return (
        <Box flexGrow={1} maxW="100%" maxH={flatHeight} bg="violet.400" rounded="md" shadow={3}>
            <Box>
                <Heading pb="3" size="lg" textAlign={"center"}>
                    Guest List
                </Heading>
                {flatList}
            </Box>
        </Box>
    );
}

export default GuestList;