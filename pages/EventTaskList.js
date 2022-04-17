import GuestList from "../components/GuestList";
import EventHeading from "../components/EventHeading";
import {Box, Button, FormControl, Input, Modal, Text, View, VStack} from "native-base";
import React, {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ReduxStore from "../redux/ReduxStore";
import {FAB} from "react-native-paper";
import {eventDELETE, eventPOST, eventPUT} from "../redux/eventsReducer";
import {StackActions as navigation} from "react-navigation";
import {CredentialsContext} from "../components/CredentialsContext";
import {Datepicker, NativeDateService} from "@ui-kitten/components";
import CreateNewEvent from "../components/API Calls/CreateNewEvent";
import EditEvent from "../components/API Calls/EditEvent";
import TaskList from "../components/TaskList";
import AddNewTask from "../components/API Calls/AddNewTask";

const EventTaskList = (props) => {
    const [newRoute, setNewRoute] = useState(props.route);
    const [pass, setPass] = useState(props.route.params);

    useEffect(() => {
        // console.log("!69~")
        setPass(props.route.params);
        setNewRoute(props.route);
    }, [props.route.params])

    const dispatch = useDispatch();
    // Start of EditModal Logic
    const [showModal, setShowModal] = useState(false);
    const initDate = new Date(pass.eventData.date);
    const formatDateService = new NativeDateService('en', { format: 'MM-DD-YYYY' });

    const [formData, setData] = useState({ name: "", description: ""});
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
            AddNewTask({ formData }, props.eventData._id, useContext(CredentialsContext).storedCredentials._id)
                .then((res) => {
                    console.log(res.retval.tasks);
                    // dispatch(eventPUT({_id: res.updatedEvent._id, eventData: res.updatedEvent} ))
                    //
                    // let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === pass.eventData._id);
                    // let eventArray = ReduxStore.getState().events[findEvent];
                    //
                    // setPass({eventData: eventArray});
                    // props.navigation.getState().routes[0].params = {newData: eventArray};
                    //
                })
            return true;
        }
    };


    useEffect(() => {
        if (showModal) return; // If shown, do nothing

        // Else, clear form
        setData({ name: "TBD", description: "TBD" });
        setErrors({});
    }, [showModal]);

    // End of CreateEventModal Logic

    // Add Modal
    let addModal = {}
    if (useContext(CredentialsContext).storedCredentials._id === pass.eventData.admin._id){
        addModal =<View>
            <Button onPress={() => setShowModal(true)}>
                Add a task for your friend's poor souls!
            </Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} avoidKeyboard={true}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Add a new task!!!</Modal.Header>
                    <Modal.Body>
                        <FormControl isRequired isInvalid={'name' in errors}>
                            <FormControl.Label>Task Name</FormControl.Label>
                            <Input
                                size="md"
                                placeholder="Bring Puppies"
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
    else{
        addModal = <></>
    }

    const editClick = () => {
        console.log("editing my shit");

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
                <>
                    <EventHeading props={pass}/>
                    {addModal}
                    <TaskList props = {pass} route = {newRoute} isAdmin={(useContext(CredentialsContext).storedCredentials._id === pass.eventData.admin._id)} />
                </>
            </VStack>
        </View>
    )
}

export default EventTaskList;