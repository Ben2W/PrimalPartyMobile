import {View} from "react-native";
import React, {useEffect, useState} from "react";
import EventGuestList from "./EventGuestList";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import EventTaskList from "./EventTaskList";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import ReduxStore from "../redux/ReduxStore";

const Tab = createMaterialBottomTabNavigator();

const EventGuestNavigation = ({navigation, route}) => {
    const dispatch = useDispatch();
    const [eventID, setEventID] = useState(route.params.eventID)

    let tempData = ReduxStore.getState().events.find(obj => obj._id === eventID)
    const [eventData, setEventData] = useState(tempData);



    return (
        <View style={{
            flex: 1,
        }}>
            <Tab.Navigator
                initialRouteName="EventGuestList"
                shifting={true}
            >
            <Tab.Screen
                name = "EventGuestList"
                children={() => (
                    <EventGuestList
                        eventID={eventID}
                        eventData={eventData}
                        navigation={navigation}
                    />)}
                options={{
                    tabBarLabel: 'EventGuestList',
                    tabBarColor: "#1F44EA",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-group" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name = "EventTaskList"
                children={() => (
                    <EventTaskList
                        eventID={eventID}
                    />)}
                options={{
                    tabBarLabel: 'EventTasksList',
                    tabBarColor: "#397367",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
                    ),
                }}
            />
            </Tab.Navigator>
        </View>
    )
}

export default EventGuestNavigation;