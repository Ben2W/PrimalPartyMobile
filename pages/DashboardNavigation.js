import React, { useContext, useState } from 'react';
import { View, Text } from "react-native";
import DashboardHome from "../components/DashboardHome"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardTasksList from "./DashboardTasksList";


//TESTING
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext'
import DashboardFriendsList from "./DashboardFriendsList";
import DashboardAccount from "./DashboardAccount";
import TestingViewMore from "./TestingViewMore";
import ReduxTesting from "./ReduxTesting";
import InitDashboard from "../components/InitDashboard";


const Tab = createMaterialBottomTabNavigator();


const DashboardNavigation = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    // //TEST PURPOSES
    // const logout = () => {
    //     console.log("fuck")
    //     AsyncStorage.removeItem('ppcredentials')
    //         .then(() => {
    //             fetch('https://primalpartybackend.azurewebsites.net/logout',
    //                 {
    //                     method: 'POST',
    //                     headers: {
    //                         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //                     },
    //                     credentials: 'include'
    //                 }
    //             )
    //                 .then((data) => {
    //                     navigation.reset({
    //                         index: 0,
    //                         routes: [{ name: 'Login' }],
    //                     });
    //                 })
    //                 .catch(e => {
    //                     console.log(e)
    //                 })
    //             setStoredCredentials('')
    //         })
    //         .catch(e => {
    //             console.log(err)
    //         })
    // }

    // logout()

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
                        />)}
                    options={{
                        tabBarLabel: 'InitDashboard',
                        tabBarColor: "#1F44EA",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                    on
                />
                <Tab.Screen
                    name="DashboardAccount"
                    children={() => (
                        <DashboardAccount
                            navigation={navigation}
                        />)}
                    options={{
                        tabBarLabel: 'DashboardAccount',
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
                        tabBarLabel: 'DashboardFriendsList',
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
                        tabBarLabel: 'DashboardTasksList',
                        tabBarColor: "#397367",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ReduxTesting"
                    children={() => (
                        <ReduxTesting
                        />)}
                    />
            </Tab.Navigator>
        </View>
    )
}
export default DashboardNavigation