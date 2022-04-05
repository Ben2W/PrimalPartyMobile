import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {configureFonts, Provider as PaperProvider} from 'react-native-paper';
import BottomNavBar from "./components/BottomNavBar";
import defaultTheme from "react-native-paper/src/styles/DefaultTheme";
import { NativeBaseProvider, Box } from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DisplayCards from './pages/DisplayCards';
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard"
import ViewEvent from "./pages/ViewEvent";
import EventMain from "./components/EventMain";
import Tasks from "./pages/Tasks";

const Stack = createNativeStackNavigator();

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

// export default function App() {
//   return (
//     <PaperProvider theme={customTheme} >
//       <BottomNavBar />
//       <StatusBar style="auto" />
//     </PaperProvider>
//   );
// }

export default function App() {

  return (
      <NativeBaseProvider>
        <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
            <Stack.Screen name="Display Cards" component={DisplayCards} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="ViewEvent" component={ViewEvent} />
            <Stack.Screen name="EventMain" component={EventMain} />
            <Stack.Screen name="Tasks" component={Tasks} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
