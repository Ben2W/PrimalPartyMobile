import {Box, Button, Center, FormControl, Heading, Input, Modal, Spinner, Text, View} from "native-base"
import ReduxStore from "../redux/ReduxStore";
import {useDispatch} from "react-redux";
import GetEvents from "./GetEvents";
import {eventPOST, eventSET} from "../redux/eventsReducer";
import React, {useContext, useEffect, useState} from "react";
import {CredentialsContext} from "./CredentialsContext";
import {FlatList} from "react-native";
import CustomCard from "./CustomCard";
import {Datepicker, NativeDateService} from "@ui-kitten/components";
import CreateNewEvent from "./CreateNewEvent";

const InitDashboard = ({navigation}) => {
    const [eventData, setEventData] = useState([]);
    const [firstName, setFirstName] = useState(useContext(CredentialsContext).storedCredentials.firstName)
    const [showModal, setShowModal] = useState(false);

    // Redux Initialization
    const dispatch = useDispatch();
    const init = () => {
        GetEvents.then((events) => {
            dispatch(eventSET({events}))
            setEventData(events)
        })
    }
    useEffect(() => {
        init();
    }, []);

    // End of Redux Initialization

    // Start of CreateEventModal Logic
    const initDate = new Date();
    const formatDateService = new NativeDateService('en', { format: 'MM-DD-YYYY' });

    const [formData, setData] = useState({date: initDate, location: "TBD", description: "TBD"});
    const [errors, setErrors] = useState({});

    const validate = ({formData}) => {
        if (formData.name === undefined || formData.name === "") {
            setErrors({
                ...errors,
                name: 'Name is required'
            });
            return false;
        }
        else {
            CreateNewEvent({formData})
                .then((res) => {
                    dispatch(eventPOST(res.newEvent))
                    setEventData(ReduxStore.getState().events)
                })
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
        <>
            <Box maxH={"80%"} flexGrow={1} borderWidth={"2"} borderColor={"indigo.100"} >
                <Heading textAlign={"center"}>
                    Upcoming Events
                </Heading>
                <FlatList
                    data = {eventData}
                    renderItem={({ item }) => (
                        <CustomCard
                            navigation = {navigation}
                            data = {item}
                            key = {item._id}
                        />
                    )}
                    keyExtractor={item => item._id}
                />
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
        </View>
    )
}

export default InitDashboard;