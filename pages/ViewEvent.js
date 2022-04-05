import * as React from 'react';
import {View} from "react-native";
import {Headline, Paragraph, Text} from "react-native-paper";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import EventMain from "../components/EventMain"
import Tasks from "./Tasks";

const Tab = createMaterialBottomTabNavigator();

const ViewEvent = ({navigation, route}) => {

    console.log("bruh");
    console.log(route.params);
    const props = route.params;

    return (
        <View style={{
            flex: 1,
        }}>
            <Tab.Navigator
                initialRouteName="EventMain"
                shifting={true}
            >
                <Tab.Screen
                    name="EventMain"
                    children={() => (
                        <EventMain
                            navigation={navigation}
                            route = {route}
                        />)}
                    options={{
                        tabBarLabel: 'EventMain',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="party-popper" color={color} size={26} />
                        ),
                }}/>
                <Tab.Screen
                    name = "Tasks"
                    children={() => (
                        <Tasks
                            navigation={navigation}
                            route = {route}
                        />)}
                    options={{
                        tabBarLabel: 'Tasks',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
                        ),
                    }}/>
            </Tab.Navigator>
        </View>
    );
}

export default ViewEvent;