import { Box, Button, Center, Divider, Heading, HStack, Image, ScrollView, Text, View, VStack, FlatList } from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PeopleCard from "./PeopleCard";
import { guestREMOVE } from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";
import RemoveUser from "./API Calls/RemoveUser";
import EventTasksCard from "./EventTasksCard";
const abortController = new AbortController()

const TaskList = (pass) => {
    const [props, setProps] = useState(pass.props.eventData)
    const [id, setID] = useState(pass.props.eventData._id)
    const [guests, setGuests] = useState(pass.props.eventData.guests)
    const [tasks, setTasks] = useState(pass.props.eventData.tasks)
    const dispatch = useDispatch();



    useEffect(() => {
        setProps(pass.eventData);
        setGuests(pass.props.eventData.guests);
        setTasks(pass.props.eventData.tasks);
    }, [ReduxStore.getState().events])
    // let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === props._id);
    // let eventArray = ReduxStore.getState().events[findEvent];
    // const [curState, setCurState] = useState(eventArray);
    //
    //
    //
    //
    // useEffect(() => {
    //     setProps(pass.props.eventData)
    //     return () => {
    //         abortController.abort()
    //     }
    // }, [pass.props.eventData])
    let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === id);

    // const [firstLoad, setFirstLoad] = useState(true);
    //

    // useEffect(() => {
    //     if (Array.isArray(props.tasks[0])) {
    //         let findEvent = ReduxStore.getState().events.findIndex((obj) => obj._id === id);
    //         let eventArray = ReduxStore.getState().events[findEvent];
    //
    //         setProps(eventArray);
    //         setGuests(eventArray.guests);
    //
    //         let hutToArray = eventArray.tasks;
    //         setTasks(hutToArray[0]);
    //         console.log(hutToArray);
    //         console.log('updated')
    //     }
    // }, [ReduxStore.getState().events])

    // useEffect(() => {
    //     setProps(pass.route.params.eventData)
    //     setGuests(pass.route.params.eventData.guests);
    //     setTasks(pass.route.params.eventData.tasks)
    //     return () => {
    //         abortController.abort()
    //     }
    // }, [pass.route.params, pass])

    const img = require('./dino_icon2.png');

    let insideStuff = {};
    if (!pass.isAdmin) {
        insideStuff =
            <>
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                        <EventTasksCard eventData={props} taskData={item}/>
                    )}
                    keyExtractor={item => item._id.toString()}

                    showsVerticalScrollIndicator={true}
                    borderColor={"black"}
                    rounded="md"
                    bg="violet.300"
                    maxH={"85%"} marginLeft="5%" marginRight="5%"
                    textAlign={"center"}
                    lineHeight={10}
                />
            </>
    }
    else {
        insideStuff =
            <>
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                        <EventTasksCard eventData={props} taskData={item} bruh = {item._id} />
                    )}
                    keyExtractor={item => item._id}

                    showsVerticalScrollIndicator={true}
                    borderColor={"black"}
                    rounded="md"
                    bg="violet.300"
                    maxH={"85%"} marginLeft="5%" marginRight="5%"
                    textAlign={"center"}
                    lineHeight={10}
                />
            </>
    }

    let flatList;
    if (tasks.length === 0) {
        flatList =
            <Center>
                <Image source={img} alt="PrimalParty" size='2xl' />
                <Heading>{'\n'}Let's get this PrimalParty started!</Heading>
            </Center>

    }
    else {
        flatList = insideStuff;
    }

    return (
        <Box flexGrow={1} maxW="100%" maxH={"50%"} bg="violet.400" rounded="md" shadow={3}>
            <Box>
                <Heading pb="3" size="lg" textAlign={"center"}>
                    "TaskList"
                </Heading>
                {flatList}
            </Box>
        </Box>
    );
}

export default TaskList;