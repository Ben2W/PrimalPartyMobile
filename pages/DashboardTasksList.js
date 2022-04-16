import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { List, Button, Text, View, Spinner, Center, Box, Heading } from "native-base";
import { CredentialsContext } from "../components/CredentialsContext";
import { ScrollView } from "react-native";
import CustomTaskCard from '../components/CustomTaskCard'
import ReduxStore from "../redux/ReduxStore";
import { useDispatch } from "react-redux";
import GetTasks from "../components/API Calls/GetTasks";
import { taskPOST, taskSET } from "../redux/tasksReducer";


const DashboardTasksList = ({ navigation }) => {

    const [taskData, setTaskData] = useState([])
    const [taskArray, setTaskArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(useContext(CredentialsContext).storedCredentials.username)


    useEffect(async () => {
        setTaskData(ReduxStore.getState().tasks)
        setTaskList()
    }, [taskData]);

    const setTaskList = () => {
        let temp = []
        for (let task of taskData) {
            temp.push(<CustomTaskCard navigation={navigation} key={task._id} data={task}></CustomTaskCard>)
        }
        setTaskArray(temp)
        setLoading(false)
    }

    return (
        loading ?
            <Center h="100%">
                < Box >
                    <Spinner size="lg" />
                    <Heading color="#397367" fontSize="md">
                        Welcome to {username}'s tasks!
                    </Heading>
                </Box >
            </Center >
            :
            (
                <View style={{
                    flex: 1,
                    top: "8%",
                    marginLeft: "2%",
                    marginRight: "2%",
                }}>
                    <Box maxH={"90%"} flexGrow={1}>
                        <Heading textAlign={"center"} style={{ paddingBottom: '5%' }}>
                            Your tasks
                        </Heading>
                        <ScrollView>
                            {taskArray}
                        </ScrollView>
                    </Box>
                </View>
            )
    );
}

export default DashboardTasksList