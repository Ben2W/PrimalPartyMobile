import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CredentialsContext } from '../components/CredentialsContext'
import { configureFonts, Provider as PaperProvider } from 'react-native-paper';
import defaultTheme from "react-native-paper/src/styles/DefaultTheme";
import { NativeBaseProvider } from "native-base";
import {SSRProvider} from '@react-aria/ssr'


const Stack = createNativeStackNavigator()

//screens
import Login from '../pages/Login'
import Register from '../pages/Register'
import VerifyEmail from '../pages/VerifyEmail'
import DashboardNavigation from "../pages/DashboardNavigation"
import EventGuestNavigation from "../pages/EventGuestNavigation";
import DashboardTasksList from "../pages/DashboardTasksList";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from "@ui-kitten/eva-icons";

//colors
import { Colors } from '../components/styles'
import DashboardFriendsList from "../pages/DashboardFriendsList";
import CustomCard from "../components/CustomCard";
import ReduxTesting from "../pages/ReduxTesting";
import GetEvents from "../components/API Calls/GetEvents";
import {eventSET} from "../redux/eventsReducer";
import {useDispatch} from "react-redux";
import ReduxStore from "../redux/ReduxStore";
import InitDashboard from "../components/InitDashboard";
import SearchFriendsPage from "../pages/SearchFriendsPage";
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
    const dispatch = useDispatch();

     const init = () => {
         GetEvents.then((res) => {
             dispatch(eventSET({res}))
         })
     }

    useEffect(() => {
        init();
    }, []);


    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
            <SSRProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <IconRegistry icons={EvaIconsPack} />
                    <NativeBaseProvider>
                        <PaperProvider theme={customTheme}>
                            <NavigationContainer>
                                <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'transparent' }, headerTintColor: tertiary, headerTransparent: true, headerTitle: '' }} initialRouteName='Login'>

                                    {storedCredentials ?
                                            <>
                                            <Stack.Screen name="DashboardNavigation" component={DashboardNavigation} />
                                            <Stack.Screen name='InitialLoadingScreen' component={InitDashboard} />
                                            <Stack.Screen name="DashboardTasksList" component={DashboardTasksList} />
                                            <Stack.Screen name="DashboardFriendsList" component={DashboardFriendsList} />
                                            <Stack.Screen name="EventGuestNavigation" component={EventGuestNavigation} />
                                            <Stack.Screen name="ReduxTesting" component={ReduxTesting} />
                                            <Stack.Screen name="CustomCard" component={CustomCard} />
                                            <Stack.Screen name="SearchFriendsPage" component={SearchFriendsPage} />
                                            </>
                                        : (<>
                                            <Stack.Screen name='Login' component={Login} />
                                            <Stack.Screen name='Register' component={Register} />
                                            <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
                                        </>)
                                    }
                                </Stack.Navigator>

                            </NavigationContainer>
                        </PaperProvider>
                    </NativeBaseProvider>
                </ApplicationProvider>
            </SSRProvider>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack