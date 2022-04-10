import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { List, Text, View, Spinner, Center, Box, Heading } from "native-base";
import { CredentialsContext } from "../components/CredentialsContext";
import { ScrollView } from "react-native";
import CustomTaskCard from '../components/CustomTaskCard'


const DashboardTasksList = ({ navigation }) => {

    const [tasks, setTasks] = useState([])
    const [taskArray, setTaskArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [firstName, setFirstName] = useState(useContext(CredentialsContext).storedCredentials.firstName)

    const fetchTasks = async () => {
        const url = 'http://localhost:8080/tasks'

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
            setTasks(tasks.tasks)
            return tasks.tasks
        } catch (e) {
            return e
        }
    }

    const setTaskList = async (currTasks) => {
        let tempTasks = []
        for (let task of currTasks) {
            tempTasks.push(<CustomTaskCard navigation={navigation} key={task.id} data={task}></CustomTaskCard>);
        }
        setTaskArray(tempTasks);
    }

    useEffect(() => {
        fetchTasks()
            .then((currTasks) => {
                setTaskList(currTasks)
                    .then(() => {
                        setLoading(false);
                    }
                    )
            }).catch(e => {
                return e
            })

    }, [])

    return (
        loading ?
            <Center h="100%">
                < Box >
                    <Spinner size="lg" />
                    <Heading color="#397367" fontSize="md">
                        Welcome to {firstName}'s tasks!
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