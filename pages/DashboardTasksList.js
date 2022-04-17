import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { List, Button, Text, View, Spinner, Center, Box, Heading } from "native-base";
import { CredentialsContext } from "../components/CredentialsContext";
import { ScrollView } from "react-native";
import CustomTaskCard from '../components/CustomTaskCard'
import ReduxStore from "../redux/ReduxStore";
import { useDispatch } from "react-redux";
import GetTasks from "../components/API Calls/GetTasks";
import { taskPOST, taskSET } from "../redux/tasksReducer";

const abortController = new AbortController()
const DashboardTasksList = ({ navigation }) => {

    const [taskData, setTaskData] = useState([])
    const [taskArray, setTaskArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(useContext(CredentialsContext).storedCredentials.username)

    useEffect(async () => {
        const url = 'https://primalpartybackend.azurewebsites.net/tasks'

        try {
            const res = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    credentials: 'include'
                })
            const tasks = await res.json()
            setTaskData(tasks.tasks)
            setTaskList()
            return () => {
                abortController.abort()
            }
        } catch (e) {
            return () => {
                abortController.abort()
            }
        }
    }, [taskData]);

    const setTaskList = () => {
        let temp = []
        if (taskData != null) {
            for (let task of taskData) {
                temp.push(<CustomTaskCard navigation={navigation} key={task._id} data={task}></CustomTaskCard>)
            }
            setTaskArray(temp)
        }
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
                    <Box maxH={"90%"} flexGrow={1} alignItems={"center"}>
                        <Heading textAlign={"center"} style={{ paddingBottom: '5%' }}>
                            Your tasks
                        </Heading>
                        <ScrollView>
                            {taskArray.length > 0 ? taskArray : <Text>You have no tasks</Text>}
                        </ScrollView>
                    </Box>
                </View>
            )
    );
}

export default DashboardTasksList