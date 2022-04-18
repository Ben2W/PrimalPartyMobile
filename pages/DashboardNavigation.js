import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardTasksList from "./DashboardTasksList";


//TESTING
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext'
import DashboardFriendsList from "./DashboardFriendsList";
import DashboardAccount from "./DashboardAccount";
import ReduxTesting from "./ReduxTesting";
import InitDashboard from "../components/InitDashboard";

const abortController = new AbortController()
const Tab = createMaterialBottomTabNavigator();

const DashboardNavigation = ({ navigation, route }) => {
    // useEffect(() => {
    //     console.log('23854u69284576894375967')
    //     return () => {
    //         abortController.abort()
    //     }
    // }, [navigation.getState().routes[0]])

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    return (
        <View style={{
            flex: 1,
        }}>
            <Tab.Navigator
                initialRouteName="InitDashboard"
                shifting={true}
            >
                <Tab.Screen
                    name="Home"
                    children={() => (
                        <InitDashboard
                            navigation={navigation}
                            route={route}
                            newNav={navigation}
                        />)}
                    options={{
                        tabBarLabel: 'Dashboard',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="DashboardAccount"
                    children={() => (
                        <DashboardAccount
                            navigation={navigation}
                        />)}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarColor: "#397367",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="DashboardFriendsList"
                    children={() => (
                        <DashboardFriendsList
                            navigation={navigation}
                        />)}
                    options={{
                        tabBarLabel: 'Friends',
                        tabBarColor: "#397367",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account-group" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="DashboardTasksList"
                    children={() => (
                        <DashboardTasksList
                            navigation={navigation}
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
export default DashboardNavigation
