import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CredentialsContext } from '../components/CredentialsContext'
import { configureFonts, Provider as PaperProvider } from 'react-native-paper';
import defaultTheme from "react-native-paper/src/styles/DefaultTheme";
import { NativeBaseProvider } from "native-base";


const Stack = createNativeStackNavigator()

//screens
import Login from '../pages/Login'
import Register from '../pages/Register'
import VerifyEmail from '../pages/VerifyEmail'
import DisplayCards from '../pages/DisplayCards';
import Dashboard from "../pages/Dashboard"
import ViewEvent from "../pages/ViewEvent";
import EventMain from "../pages/EventMain";
import TasksView from "../pages/TasksView";
import MyTasks from "../pages/MyTasks";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from "@ui-kitten/eva-icons";

//colors
import { Colors } from '../components/styles'
const { tertiary } = Colors

const customTheme = {
    defaultTheme,
    dark: false,
    roundness: 4,
    animation: {
        scale: 1.0,
    },
    colors: {
        primary: '#4555F2',
        accent: '#001021',
        background: '#F1F7ED',
        surface: '#F1F7ED',
        text: '#F1F7ED',
        error: '#B71F0E',
        disabled: '#BEC6C6',
        placeholder: '#1481BA',
        backdrop: '#001021',
        notification: '#cc614b',
    },
    fonts: configureFonts(),
}


const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <ApplicationProvider {...eva} theme={eva.light}>
                    <IconRegistry icons={EvaIconsPack} />
                    <NativeBaseProvider>
                        <PaperProvider theme={customTheme}>
                            <NavigationContainer>
                                <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'transparent' }, headerTintColor: tertiary, headerTransparent: true, headerTitle: '' }} initialRouteName='Login'>

                                    {storedCredentials ? <Stack.Screen name='Dashboard' component={Dashboard} />
                                        : (<>
                                            <Stack.Screen name='Login' component={Login} />
                                            <Stack.Screen name='Register' component={Register} />
                                            <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
                                            <Stack.Screen name="Display Cards" component={DisplayCards} />
                                            <Stack.Screen name="Dashboard" component={Dashboard} />
                                            <Stack.Screen name="ViewEvent" component={ViewEvent} />
                                            <Stack.Screen name="EventMain" component={EventMain} />
                                            <Stack.Screen name="TasksView" component={TasksView} />
                                            <Stack.Screen name="MyTasks" component={MyTasks} />
                                        </>)
                                    }
                                </Stack.Navigator>

                            </NavigationContainer>
                        </PaperProvider>
                    </NativeBaseProvider>
                </ApplicationProvider>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack