import React, {useEffect, useLayoutEffect, useState} from 'react';
import { SectionList } from "react-native";
import CustomCard from "./CustomCard";
import { View } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { Title } from "react-native-paper";
import {Box, Button, Center, FormControl, Heading, Input, Modal, Spinner, VStack} from "native-base";
import DatePicker from "./DatePicker";
import {CredentialsContext} from "./CredentialsContext";
import FetchEventData from "./FetchEventData";

const DashboardHome = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);
    const [userEvents, setUserEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [eventCards, setEventCards] = useState([])

    const fetchEvents = async () => {
        const url = 'http://localhost:8080/events'

        try {
            const res = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    credentials: 'include'
                })
            const events = await res.json()
            // console.log(events.events)
            setUserEvents(events.events)
            return events.events
        } catch (e) {
            return e
        }
    }

    const setDisplayCards = async (curUserEvents) => {
        let tempEvents = []
        for (let event of curUserEvents){
            await FetchEventData(event._id)
                .then((data) => {
                    console.log(data)
                    tempEvents.push(<CustomCard navigation={navigation} data={data} key={event._id}/>);
                })
            }
        setEventCards(tempEvents);
    }

    useLayoutEffect(() => {
        fetchEvents()
            .then((curUserEvents) => {
                setDisplayCards(curUserEvents)
                    .then(() => {
                    setLoading(false);
                    }
                )
            }
    )}, [])


        return (
            <View style={{
                flex: 1,
                top: "5%",
                marginLeft: "2%",
                marginRight: "2%",
            }}>
                {loading ?
                    <Center h="100%">
                        <Spinner>
                            <Heading color="primary.500" fontSize="md">
                                Loading
                            </Heading>
                        </Spinner>
                    </Center>
                    :
                <>
                <Box maxH={"80%"} flexGrow={1} borderWidth={"2"} borderColor={"indigo.100"} >
                    <Heading textAlign={"center"}>
                        Upcoming Events
                    </Heading>
                    <ScrollView>
                        {eventCards}
                    </ScrollView>
                </Box>
                <Box pt={"5%"}>
                    <View>
                        <Button onPress={() => setShowModal(true)}>
                            Create Event
                        </Button>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} avoidKeyboard={true}>
                            <Modal.Content maxWidth="400px">
                                <Modal.CloseButton />
                                <Modal.Header>Create Event</Modal.Header>
                                <Modal.Body>
                                    <FormControl>
                                        <FormControl.Label>Title</FormControl.Label>
                                        <Input />
                                    </FormControl>
                                    <FormControl mt="3">
                                        <FormControl.Label>Date</FormControl.Label>
                                        <DatePicker />
                                    </FormControl>
                                    <FormControl mt="3">
                                        <FormControl.Label>Location</FormControl.Label>
                                        <Input />
                                    </FormControl>
                                    <FormControl mt="3">
                                        <FormControl.Label>Description</FormControl.Label>
                                        <Input />
                                    </FormControl>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button.Group space={2}>
                                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                            setShowModal(false);
                                        }}>
                                            Cancel
                                        </Button>
                                        <Button onPress={() => {
                                            setShowModal(false);
                                        }}>
                                            Save
                                        </Button>
                                    </Button.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </View>
                </Box>
                </>
                }
            </View>
        )
}

export default DashboardHome