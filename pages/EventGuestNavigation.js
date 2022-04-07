import * as React from 'react';
import {View} from "react-native";
import {Headline, Paragraph, Text} from "react-native-paper";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import EventGuestGuestsListView from "./EventGuestGuestsListView"
import EventGuestTasksView from "./EventGuestTasksView";

const Tab = createMaterialBottomTabNavigator();

const EventGuestNavigation = ({navigation, route}) => {
    const props = route.params;

    return (
        <View style={{
            flex: 1,
        }}>
            <Tab.Navigator
                initialRouteName="EventGuestGuestsListView"
                shifting={true}
            >
                <Tab.Screen
                    name="EventMain"
                    children={() => (
                        <EventGuestGuestsListView
                            navigation={navigation}
                            route = {route}
                        />)}
                    options={{
                        tabBarLabel: 'EventGuestGuestsListView',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="party-popper" color={color} size={26} />
                        ),
                }}/>
                <Tab.Screen
                    name = "TasksView"
                    children={() => (
                        <EventGuestTasksView
                            navigation={navigation}
                            route = {route}
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