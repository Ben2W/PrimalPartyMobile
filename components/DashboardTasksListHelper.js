import React from "react";
import TaskItem from "./TaskItem"
import {View} from "react-native";

export default function DashboardTasksListHelper(props){
    //console.log(props.props)

    let Tasks = [];
    for (var i=0; i<props.props.length; i++) {
        //console.log(props.props[i].name);
        //console.log(props.props[i].event.name);
        Tasks.push(<TaskItem props = { props.props[i].name } key={i}/>)
    }


    return (
       
        <View>
            {Tasks}
        </View>
        
    )
    
}