import React, {useContext, useEffect, useState} from "react";
import {Box, Button, FormControl, Heading, HStack, Icon, IconButton, Input, Modal, Text, View} from "native-base";
import {Entypo} from "@expo/vector-icons";
import {IndexPath, NativeDateService, Select, SelectItem} from "@ui-kitten/components";
import AddNewTask from "./API Calls/AddNewTask";
import {eventTaskPOST, eventTaskPUT} from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";
import {useDispatch} from "react-redux";
import {CredentialsContext} from "./CredentialsContext";
import {shouldThrowAnErrorOutsideOfExpo} from "expo/build/environment/validatorState";
import EditTask from "./API Calls/EditTask";
const abortController = new AbortController()

const EventTasksCard = (props) => {
    const [pass, setPass] = useState(props);
    const [userID, setUserID] = useState(useContext(CredentialsContext).storedCredentials._id)
    const [isAdmin, setIsAdmin] = useState(props.isAdmin);
    const [eventData, setEventData] = useState(props.eventData);
    const [taskData, setTaskData] = useState(props.taskData);

    // // sort displayed names
    // useEffect(() => {
    //     let parseMap = JSON.parse(JSON.stringify(eventData.guests))
    //
    //     // sort array first by alphabetical order
    //     parseMap.sort((a,b) => a.firstName > b.firstName);
    //
    //     setEventData({...eventData, guests: parseMap});
    //
    //     // filter already selected
    //     let holdIndexArray = [];
    //     let sortedAssignees = [];
    //     parseMap = parseMap.filter((element, index) => {
    //         return taskData.assignees.find(el => {
    //             if (element._id === el._id){
    //                 sortedAssignees.push(element);
    //                 holdIndexArray.push(
    //                     eventData.guests.findIndex(item => element._id === item._id)
    //                 );
    //             }
    //         })
    //     })
    //
    //     setTaskData({...taskData, assignees: sortedAssignees});
    // }, [])
    // // end of Sort









    // Start of EditModal Logic
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const [formData, setData] = useState({ name: taskData.name, description: taskData.description, assignees: taskData.assignees, done: taskData.done} );
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

            // API Edit Call
            EditTask({formData}, eventData._id, taskData._id)
                .then((res) => {
                    // Redux Store Call
                    dispatch(
                        eventTaskPUT({eventID: eventData._id, taskID: taskData._id, taskData: res.updatedTask})
                    );
                    // Set State Call

                    let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === eventData._id);
                    let eventArray = ReduxStore.getState().events[findEvent];

                    // console.log(eventArray.tasks)

                    let findTask = ReduxStore.getState().events[findEvent].tasks.findIndex((obj) => obj._id === taskData._id);


                    // setEventData(eventArray);
                    // setTaskData(eventArray.tasks[findTask]);
                    //
                    // console.log(eventArray.tasks[findTask]);

                    //
                }
            )

            return true;
        }
    };


    // MultiSelect Assignees
    // pass.eventData.guests === total list of guests to choose from
    const [selectedIndex, setSelectedIndex] = React.useState([new IndexPath(0)]);
    const groupDisplayValues = selectedIndex.map(index => {
        // console.log(eventData);
        let name = eventData.guests[index.row].firstName + ' ' + eventData.guests[index.row].lastName;
        return name;
    }).join(', ');

    // FormData === selected Data
    // useEffect(() => {
    //     setData( {...formData,
    //         assignees: selectedIndex.map(index => {
    //             return pass.eventData.guests[index.row];
    //         })
    //     })
    //
    //
    // }, [selectedIndex])



    useEffect(() => {
        if (showModal) return; // If shown, do nothing

        // Else, reset form
        setData({ name: taskData.name, description: taskData.description, assignees: taskData.assignees, done: taskData.done });
        setErrors({}); return () => {
            abortController.abort()
        }
    }, [showModal]);

    // End of AddTaskModal Logic
    const handleClick = () => {

        let parseMap = eventData.guests;
        let holdIndexArray = [];

        // filter through assignees
        parseMap = parseMap.filter((element, index) => {
            return taskData.assignees.find(el => {
                if (element._id === el._id){
                    holdIndexArray.push(
                        eventData.guests.findIndex(item => element._id === item._id)
                    );
                }
            })
        })

        let SelectedPeople = [];
        holdIndexArray.map(obj => {
            SelectedPeople.push(new IndexPath(obj));
        })
        setSelectedIndex(SelectedPeople);
        // console.log('editing');
        setShowModal(true);
    }


    // Edit Modal
    let editModal = {}
    if (isAdmin) {
        editModal = <View>
            <IconButton icon={<Icon as={Entypo} name="edit" />}
                        w={'100%'}
                        height={'40px'}
                        size={'md'}
                        onPress={() => handleClick()}>
                {"Edit This Task!"}
            </IconButton>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} avoidKeyboard={true}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Editing task</Modal.Header>
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
        editModal = <></>
    }











    return (
        <Box
            background={'#B9F8D3'}
            marginBottom={'5%'}
            width={'100%'}
            borderRadius={8}
            pb={"1%"} pt={"1%"}

        >
            <Box flexDirection={"row"} marginLeft="5%" pb={"3%"} pt={"3%"} >
                <HStack space={"2%"} flex={1} alignItems={'center'} >
                    <Box width={"35%"} >
                        <Heading
                            textAlign={"left"}  pt="2%" size={'sm'} flexWrap={'wrap'}>
                            {taskData.name}
                        </Heading>
                        <Text>
                            {taskData.description}
                        </Text>
                    </Box>
                    <Box w={'30%'} ml={'5%'}>
                        <Text >
                            Assignees: {'\n'}
                            {taskData.assignees.map((obj, index) => index + 1 + ': ' + obj.firstName + '\n') }
                        </Text>
                    </Box>
                    {editModal}
                </HStack>
            </Box>
        </Box>
    )
}

export default EventTasksCard;