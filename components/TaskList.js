import { Box, Button, Center, Divider, Heading, HStack, Image, ScrollView, Text, View, VStack, FlatList } from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PeopleCard from "./PeopleCard";
import { guestREMOVE } from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";
import RemoveUser from "./API Calls/RemoveUser";

const TaskList = (pass) => {
    const [props, setProps] = useState(pass.props.eventData)
    const [guests, setGuests] = useState(pass.props.eventData.guests)
    const [tasks, setTasks] = useState(pass.props.eventData.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        setProps(pass.props.eventData)
        return () => {
            abortController.abort()
        }
    }, [])

    useEffect(() => {
        setProps(pass.route.params.eventData)
        setGuests(pass.route.params.eventData.guests);
        setTasks(pass.route.params.eventData.tasks)
        return () => {
            abortController.abort()
        }
    }, [pass.route.params])

    const img = require('./dino_icon2.png');

    let insideStuff = {};
    if (!pass.isAdmin) {
        insideStuff =
            <>
                <Text>
                    {JSON.parse(JSON.stringify(Object.values(tasks))).map(obj => 'Name: ' + obj.name + ' Description: ' + obj.description).join('\r\n')}
                </Text>
            </>
    }
    else {
        insideStuff =
            <>
                <Text fontSize={'xl'}>
                    {JSON.parse(JSON.stringify(Object.values(tasks))).map(obj => 'Name: ' + obj.name + ' Description: ' + obj.description).join('\r\n')}
                </Text>
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