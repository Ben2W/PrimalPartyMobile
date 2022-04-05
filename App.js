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
import EventMain from "./pages/EventMain";
import TasksView from "./pages/TasksView";
import MyTasks from "./pages/MyTasks";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import {mapping} from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {SSRProvider} from '@react-aria/ssr'

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
      <SSRProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
          <NativeBaseProvider>
              <PaperProvider theme={customTheme}>
              <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
                    <Stack.Screen name="Display Cards" component={DisplayCards} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="ViewEvent" component={ViewEvent} />
                    <Stack.Screen name="EventMain" component={EventMain} />
                    <Stack.Screen name="TasksView" component={TasksView} />
                    <Stack.Screen name="MyTasks" component={MyTasks} />
                  </Stack.Navigator>
                </NavigationContainer>
              </PaperProvider>
          </NativeBaseProvider>
      </ApplicationProvider>
  </SSRProvider>
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
