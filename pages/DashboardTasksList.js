import React, { useState, useEffect } from 'react'
import { List, Text, View } from "native-base";
import ListItem from "native-base/src/components/primitives/List/ListItem";


const DashboardTasksList = () => {

    const [tasks, setTasks] = useState([])

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
            console.log(tasks)
            setTasks(tasks)
            // return events.events
        } catch (e) {
            return e
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [tasks])



    return (
        <View>
            <List>
                <ListItem>
                    <Text>
                        Task 1
                    </Text>
                </ListItem>
            </List>
        </View>
    );
}

export default DashboardTasksList