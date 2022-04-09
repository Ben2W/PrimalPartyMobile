import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import { SectionList } from "react-native";
import CustomCard from "./CustomCard";
import { View } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { Title } from "react-native-paper";
import {Box, Button, Center, FormControl, Heading, HStack, Input, Modal, Spinner, VStack} from "native-base";
import {CredentialsContext} from "./CredentialsContext";
import FetchEventData from "./FetchEventData";
import {Datepicker, NativeDateService} from "@ui-kitten/components";
import CreateNewEvent from "./CreateNewEvent";

const DashboardHome = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);
    const [userEvents, setUserEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [eventCards, setEventCards] = useState([])
    const [firstName, setFirstName] = useState(useContext(CredentialsContext).storedCredentials.firstName)

// Start of DisplayCards Logic

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
    )}, [userEvents])
// End of DisplayCards Logic

// Start of CreateEventModal Logic
    const initDate = new Date();
    const formatDateService = new NativeDateService('en', { format: 'MM-DD-YYYY' });

    const [formData, setData] = useState({date: initDate, location: "", description: ""});
    const [errors, setErrors] = useState({});

    const validate = ({formData}) => {
        if (formData.name === undefined) {
            setErrors({
                ...errors,
                name: 'Name is required'
            });
            return false;
        }
        else {
            CreateNewEvent({formData})
                .then()
            return true;
        }
    };

    useEffect(() => {
        if (showModal) return; // If shown, do nothing

        // Else, clear form
        setData({date: initDate, location: "", description: ""});
        setErrors({});
    }, [showModal]);

// End of CreateEventModal Logic

        return (
            <View style={{
                flex: 1,
                top: "5%",
                marginLeft: "2%",
                marginRight: "2%",
            }}>
                {loading ?
                    <Center h="100%">
                        <Box>
                            <Spinner size="lg"/>
                            <Heading color="primary.500" fontSize="md">
                            Welcome to {firstName}'s dashboard!
                            </Heading>
                        </Box>
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
                                    <FormControl isRequired isInvalid={'name' in errors}>
                                        <FormControl.Label>Title</FormControl.Label>
                                        <Input
                                            size="md"
                                            placeholder = "Javascript Party"
                                            value = {formData.name}
                                            onChangeText={value => setData({ ...formData,
                                                name: value})
                                        }
                                        />
                                        {'name' in errors ? <FormControl.ErrorMessage>Required</FormControl.ErrorMessage> : <FormControl.HelperText>
                                        </FormControl.HelperText>}
                                    </FormControl>
                                    <FormControl mt="3">
                                        <FormControl.Label>Date</FormControl.Label>
                                        <Datepicker
                                            placement={"left"}
                                            min={initDate}
                                            date={formData.date}
                                            dateService={formatDateService}
                                            onSelect={nextDate => setData({
                                                name : formData.name,
                                                date: nextDate, location:
                                                formData.location,
                                                description: formData.description})}
                                        />
                                    </FormControl >
                                    <FormControl mt="3">
                                        <FormControl.Label>Location</FormControl.Label>
                                        <Input
                                            size="md"
                                            placeholder = "VS Code"
                                            value = {formData.location}
                                            onChangeText={value => setData({ ...formData,
                                                    location: value})}
                                        />
                                    </FormControl>
                                    <FormControl mt="3">
                                        <FormControl.Label>Description</FormControl.Label>
                                        <Input
                                            size="md"
                                            placeholder = "Let's code collaboratively!"
                                            value = {formData.description}
                                            onChangeText={value => setData({ ...formData,
                                                description: value})}
                                        />
                                    </FormControl>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onPress={() => {
                                        if (validate({formData})){
                                            setShowModal(false);
                                        }
                                        else
                                            console.log("bruh");
                                    }}>
                                        Save
                                    </Button>
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