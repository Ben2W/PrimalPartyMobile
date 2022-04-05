import * as React from 'react';
import {View} from "react-native";
import Home from "../components/Home"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Tasks from "./Tasks"
import Inbox from "./Inbox";
const Tab = createMaterialBottomTabNavigator();


const Dashboard = ({ navigation, route }) => {
    return(
        <View style={{
            flex:1,
        }}>
            <Tab.Navigator
                initialRouteName="Home"
                shifting={true}
            >
                <Tab.Screen
                    name="Inbox"
                    component={Inbox}
                    options={{
                        tabBarLabel: 'Inbox',
                        tabBarColor: "#66001d",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="inbox" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Home"
                    children={() => (
                        <Home
                            navigation={navigation}
                            route = {route}
                        />)}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Tasks"
                    children={() => (
                        <Tasks
                            route = {route}
                        />)}
                    options={{
                        tabBarLabel: 'Tasks',
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

export default Dashboard;