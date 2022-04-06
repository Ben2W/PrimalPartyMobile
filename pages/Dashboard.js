import React, { useContext } from 'react';
import { View, Text } from "react-native";
import Home from "../components/Home"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyTasks from "./MyTasks";


//TESTING
import { StyledButton, ButtonText } from '../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext'


const Tab = createMaterialBottomTabNavigator();


const Dashboard = ({ navigation }) => {
    // const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    // //TEST PURPOSES
    // const logout = () => {
    //     console.log("fuck")
    //     AsyncStorage.removeItem('ppcredentials')
    //         .then(() => {
    //             fetch('http://localhost:8080/logout',
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

    const url = 'http://localhost:8080/events'
    let route;

    fetch(url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: 'include'
        }
    ).then(res => {
        if (res.status == 401) {
            throw Error('you are not authenticated')
        } else if (res.status == 500) {
            throw Error('unexpected error happened on the server')
        } else if (res.status == 200) {
            return res.json()
        }
    })
        .then(res => {
            // console.log(res)
            route = res;
        })

        .catch(e => {
            console.log(e)
        })

    //ROUTE HERE BECOMES EMPTY
    return (
        <View style={{
            flex: 1,
        }}>
            <Tab.Navigator
                initialRouteName="Home"
                shifting={true}
            >
                <Tab.Screen
                    name="Home"
                    children={() => (
                        <Home
                            navigation={navigation}
                            route={route}
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
                    name="MyTasks"
                    children={() => (
                        <MyTasks
                            route={route}
                        />)}
                    options={{
                        tabBarLabel: 'MyTasks',
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
export default Dashboard