import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CredentialsContext } from '../components/CredentialsContext'

const Stack = createNativeStackNavigator()

//screens
import Login from '../screens/Login'
import Register from '../screens/Register'
import Welcome from '../screens/Welcome'
import VerifyEmail from '../screens/VerifyEmail'

//colors
import { Colors } from '../components/styles'
const { tertiary } = Colors


const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'transparent' }, headerTintColor: tertiary, headerTransparent: true, headerTitle: '' }} initialRouteName='Login'>

                        {storedCredentials ? <Stack.Screen name='Welcome' component={Welcome} />
                            : (<>
                                <Stack.Screen name='Login' component={Login} />
                                <Stack.Screen name='Register' component={Register} />
                                <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
                                <Stack.Screen name='Welcome' component={Welcome} />
                            </>)
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack