import GuestList from "../components/GuestList";
import EventHeading from "../components/EventHeading";
import {Box, Button, CheckIcon, FormControl, Input, Modal, Text, View, VStack} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReduxStore from "../redux/ReduxStore";
import { FAB } from "react-native-paper";
import { eventDELETE, eventPOST, eventPUT, eventTaskPOST } from "../redux/eventsReducer";
import { StackActions as navigation } from "react-navigation";
import { CredentialsContext } from "../components/CredentialsContext";
import {Datepicker, IndexPath, NativeDateService, SelectItem, Select} from "@ui-kitten/components";
import CreateNewEvent from "../components/API Calls/CreateNewEvent";
import EditEvent from "../components/API Calls/EditEvent";
import TaskList from "../components/TaskList";
import AddNewTask from "../components/API Calls/AddNewTask";
import {PageTitle} from "../components/styles";

const abortController = new AbortController()

const EventTaskList = (props) => {
    const [newRoute, setNewRoute] = useState(props.route);
    const [pass, setPass] = useState(props.route.params);
    const [userID, setUserID] = useState(useContext(CredentialsContext).storedCredentials._id)
    const [adminID, setAdminID] = useState(pass.eventData.admin._id)
    const [eventData, setEventData] = useState(pass.eventData);

    useEffect(() => {
        // console.log("!69~")
        setPass(props.route.params);
        setNewRoute(props.route);
        return () => {
            abortController.abort()
        }
    }, [props.route.params])

    const dispatch = useDispatch();

    // Start of EditModal Logic
    const [showModal, setShowModal] = useState(false);

    const [formData, setData] = useState({ name: "TBD", description: "TBD", assignees: eventData.guests } );
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
            AddNewTask({ formData }, props.eventData._id, userID)
                .then((res) => {
                    dispatch(eventTaskPOST({ eventID: res.retval._id, eventData: res.retval }))
                    let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === eventData._id);
                    let eventArray = ReduxStore.getState().events[findEvent];

                    console.log(eventArray);

                    setPass({eventData: eventArray} );
                    setEventData(eventArray);
                })
            return true;
        }
    };

    // MultiSelect Assignees
    // pass.eventData.guests === total list of guests to choose from
    const [selectedIndex, setSelectedIndex] = React.useState([]);
    const groupDisplayValues = selectedIndex.map(index => {
        let name = eventData.guests[index.row].firstName + ' ' + eventData.guests[index.row].lastName;
        return name;
    }).join(', ');

    // FormData === selected Data
    useEffect(() => {
        setData( {...formData,
            assignees: selectedIndex.map(index => {
                    return eventData.guests[index.row];
                })
        })


    }, [selectedIndex])



    useEffect(() => {
        if (showModal) return; // If shown, do nothing

        // Else, clear form
        setData({ name: "", description: "", assignees: eventData.guests });
        setSelectedIndex([]);
        setErrors({}); return () => {
            abortController.abort()
        }
    }, [showModal]);

    // End of AddTaskModal Logic

    // Add Modal
    let addModal = {}
    if (userID === adminID) {
        addModal = <View>
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
                                placeholder="Maltese Puppies Preferred"
                                value={formData.description}
                                onChangeText={value => setData({
                                    ...formData,
                                    description: value
                                })}
                            />
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label>Assignees</FormControl.Label>
                            <Select
                                multiSelect={true}
                                selectedIndex={selectedIndex}
                                placeholder='Rick Leinecker'
                                value={groupDisplayValues}
                                // value={formData.assignees.map(obj => obj.firstName + obj.lastName).join(', ')}
                                onSelect={index => setSelectedIndex(index)}>
                                {eventData.guests.map((person) =>
                                    <SelectItem title={person.firstName + " " + person.lastName} key={person._id} />
                                )}
                            </Select>
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
        addModal = <></>
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
                    <PageTitle>
                        {eventData.name}'s Task List
                    </PageTitle>
                    <EventHeading props={pass} />
                    {addModal}
                    <TaskList props={pass} route={newRoute} isAdmin={(useContext(CredentialsContext).storedCredentials._id === eventData.admin._id)} />
                </>
            </VStack>
        </View>
    )
}

export default EventTaskList;
