import React, { useEffect, useState } from 'react';
import { SectionList } from "react-native";
import CustomCard from "./CustomCard";
import { View } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { Title } from "react-native-paper";
import { Box, Button, FormControl, Heading, Input, Modal, VStack } from "native-base";
import DatePicker from "./DatePicker";

const Home = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);
    const [userEvents, setUserEvents] = useState([])

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
        } catch (e) {
            return e
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const eventCards = [];

    if (userEvents) {
        console.log("PRINTING ROUTE")
        for (let event of userEvents) {
            eventCards.push(<CustomCard navigation={navigation} eventID={event._id} key={event._id} />);
        }


        return (
            <View style={{
                flex: 1,
                top: "5%",
                marginLeft: "2%",
                marginRight: "2%",
            }}>
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
            </View>
        )
    } else {
        return (
            <View>
                <View>
                    <Text>
                        FUCK ME IT IS EMPTY
                    </Text>
                </View>
            </View>
        )
    }
}

export default Home