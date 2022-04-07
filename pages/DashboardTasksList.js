import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {List, Text, View} from "native-base";
import ListItem from "native-base/src/components/primitives/List/ListItem";
import DashboardTasksListHelper from "../components/DashboardTasksListHelper";


const DashboardTasksList = () =>{

    const [tasks, setTasks] = useState([])
    const url = 'https://primalpartybackend.azurewebsites.net/tasks';

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async() => {
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log("TESTING");
                //console.log(data.tasks[0].name) //name of first task
                //console.log(data.tasks);
                //console.log(data.tasks[0].event.name) //Name of event associated with first task
                setTasks(data.tasks)
            })
            .catch(err => {
               console.log(err);
            })
    }

    return(
        <View>
            <ScrollView>
                <DashboardTasksListHelper props = { tasks }/>
            </ScrollView>
        </View>
    );
}

export default DashboardTasksList