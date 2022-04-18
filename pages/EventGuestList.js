import GuestList from "../components/GuestList";
import EventHeading from "../components/EventHeading";
import { Box, Button, FormControl, Input, Modal, Text, View, VStack } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReduxStore from "../redux/ReduxStore";
import { FAB } from "react-native-paper";
import { eventDELETE, eventPOST, eventPUT } from "../redux/eventsReducer";
import { StackActions as navigation } from "react-navigation";
import { CredentialsContext } from "../components/CredentialsContext";
import { Datepicker, NativeDateService } from "@ui-kitten/components";
import CreateNewEvent from "../components/API Calls/CreateNewEvent";
import EditEvent from "../components/API Calls/EditEvent";
import {CommonActions} from "@react-navigation/native";
import {PageTitle} from "../components/styles";


const abortController = new AbortController()
const EventGuestList = (props) => {
    const [newRoute, setNewRoute] = useState(props.route);
    const [pass, setPass] = useState(props.route.params);

    // useEffect(() => {
    //     console.log("!123849123748912739847812934")
    //     console.log(props.route.params)
    //     setPass(props.route.params);
    // }, [])

    useEffect(() => {
        // console.log("!69~")
        setPass(props.route.params);
        setNewRoute(props.route);
        return () => {
            abortController.abort()
        }
    }, [props.route.params])

    let delButton = {};
    if (useContext(CredentialsContext).storedCredentials._id === pass.eventData.admin._id) {
        delButton =
            <Box>
                <FAB
                    label={"Search for Friend to Add"}
                    style={{
                        width: "100%",
                        backgroundColor: "#30AADD",
                    }}
                    onPress={() => handleSearch(pass.eventData._id)}
                    key="Search"
                />
                <FAB
                    label={"Delete"}
                    style={{
                        width: "100%",
                        backgroundColor: "#D11A2A",
                    }}
                    onPress={() => handleDelete(pass.eventData._id)
                        .then((res) => {
                            props.navigation.navigate("DashboardNavigation", { newData: ReduxStore.getState().events, change: "lol" })
                        })
                    }
                    key="Delete"
                />
            </Box>
    }
    else
        delButton = <></>

    const dispatch = useDispatch();

    // Handle Add Guest
    const handleSearch = () => {
        props.navigation.navigate("SearchFriendsPage", { eventID: pass.eventData._id, eventData: pass.eventData, isAdmin: pass.isAdmin })
    }

    // Handle Delete
    const handleDelete = async () => {
        console.log("Deleting: " + pass.eventData._id);
        const url = 'https://primalpartybackend.azurewebsites.net/events/' + pass.eventData._id
        let newState = dispatch(eventDELETE({ eventID: pass.eventData._id }));
        let details = [pass.eventData._id];
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        try {
            const res = await fetch(url,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    credentials: 'include',
                    body: formBody
                })
            return newState;
        } catch (e) {
            return e
        }
    }

    const [showModal, setShowModal] = useState(false);

    // Start of EditModal Logic
    const initDate = new Date(pass.eventData.date);
    const formatDateService = new NativeDateService('en', { format: 'MM-DD-YYYY' });

    const [formData, setData] = useState({ name: pass.eventData.name, date: initDate, location: pass.eventData.address, description: pass.eventData.description });
    const [errors, setErrors] = useState({});

    const validate = ({ formData }) => {
        if (formData.name === undefined || formData.name === "") {
            setErrors({
                ...errors,
                name: 'Name is required'
            });
            return false;
        }
        else {
            // I need to convert to edit
            EditEvent({ formData }, pass.eventData._id)
                .then((res) => {


                    dispatch(eventPUT({ _id: res.updatedEvent._id, eventData: res.updatedEvent }))

                    let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === pass.eventData._id);
                    let eventArray = ReduxStore.getState().events[findEvent];

                    setPass({ eventData: eventArray });
                    props.navigation.getState().routes[0].params = { newData: eventArray };


                    // props.navigation.setParams({
                    //     DashboardNavigation:
                    //     newData: ReduxStore.getState().events
                    // });
                })
            return true;
        }
    };


    useEffect(() => {
        if (showModal) return; // If shown, do nothing

        // Else, clear form
        setData({ name: pass.eventData.name, date: initDate, location: pass.eventData.address, description: pass.eventData.description });
        setErrors({});
        return () => {
            abortController.abort()
        }
    }, [showModal]);

    // End of CreateEventModal Logic

    // Edit Modal
    let editModal = {}
    if (useContext(CredentialsContext).storedCredentials._id === pass.eventData.admin._id) {
        editModal = <View >
            <Button onPress={() => setShowModal(true)}>
                Edit your event!
            </Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} avoidKeyboard={true}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Edit Event</Modal.Header>
                    <Modal.Body>
                        <FormControl isRequired isInvalid={'name' in errors}>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input
                                size="md"
                                placeholder="Javascript Party"
                                value={formData.name}
                                onChangeText={value => setData({
                                    ...formData,
                                    name: value
                                })
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
                                    name: formData.name,
                                    date: nextDate, location:
                                        formData.location,
                                    description: formData.description
                                })}
                            />
                        </FormControl >
                        <FormControl mt="3">
                            <FormControl.Label>Location</FormControl.Label>
                            <Input
                                size="md"
                                placeholder="VS Code"
                                value={formData.location}
                                onChangeText={value => setData({
                                    ...formData,
                                    location: value
                                })}
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Description</FormControl.Label>
                            <Input
                                size="md"
                                placeholder="Let's code collaboratively!"
                                value={formData.description}
                                onChangeText={value => setData({
                                    ...formData,
                                    description: value
                                })}
                            />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={() => {
                            if (validate({ formData })) {
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
    }
    else {
        editModal = <></>
    }

    return (
        <View style={{
            flex: 1,
            alignContent: "center",
            top: "5%",
            marginLeft: "2%",
            marginRight: "2%",
            flexDirection: "column",
        }}>
            <VStack space={"2%"} flex={1}>
                    <PageTitle>
                        {pass.eventData.name}'s Guest List
                    </PageTitle>
                    <EventHeading props={pass} />
                    {editModal}
                    <GuestList props={pass} route={newRoute} isAdmin={(useContext(CredentialsContext).storedCredentials._id === pass.eventData.admin._id)} />
                    {delButton}
            </VStack>
        </View>
    )
}

export default EventGuestList;