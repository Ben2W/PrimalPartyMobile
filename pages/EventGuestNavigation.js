import * as React from 'react';
import {View} from "react-native";
import {Headline, Paragraph, Text} from "react-native-paper";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import EventGuestGuestsListView from "./EventGuestGuestsListView"
import EventGuestTasksView from "./EventGuestTasksView";
import {useState} from "react";

const Tab = createMaterialBottomTabNavigator();

const EventGuestNavigation = ({navigation, route}) => {
    let data = route.params.data.curData;
    const [event, setEvent] = useState({data});

    return (
        <View style={{
            flex: 1,
        }}>
            <Tab.Navigator
                initialRouteName="EventGuestGuestsListView"
                shifting={true}
            >
                <Tab.Screen
                    name="EventGuestGuestsListView"
                    children={() => (
                        <EventGuestGuestsListView
                            navigation={navigation}
                            data = {event}
                        />)}
                    options={{
                        tabBarLabel: 'EventGuestGuestsListView',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="party-popper" color={color} size={26} />
                        ),
                }}/>
                <Tab.Screen
                    name = "EventGuestTasksView"
                    children={() => (
                        <EventGuestTasksView
                            navigation={navigation}
                            data = {event}
                        />)}
                    options={{
                        tabBarLabel: 'EventGuestTasksView',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
                        ),
                    }}/>
            </Tab.Navigator>
        </View>
    );
}

export default EventGuestNavigation;