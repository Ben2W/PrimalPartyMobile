import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BottomNavBar from "./components/BottomNavBar";
import defaultTheme from "react-native-paper/src/styles/DefaultTheme";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'

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
    accent: '#11B5E4',
    background: '#F1F7ED',
    surface: '#F1F7ED',
    text: '#001021',
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
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
