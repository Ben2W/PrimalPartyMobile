import React, { useState } from 'react'

//navigation
import RootStack from './navigators/RootStack'

import AppLoading from 'expo-app-loading'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './components/CredentialsContext'

// Redux
import ReduxStore from "./redux/ReduxStore";
import {Provider as ReduxProvider} from "react-redux";

export default function App() {

  const [appReady, setAppReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState('')

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('ppcredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result))
        } else {
          setStoredCredentials(null)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => { setAppReady(true) }}
        onError={console.warn}
      />
    )
  }
  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <ReduxProvider store={ReduxStore}>
        <RootStack />
      </ReduxProvider>
    </CredentialsContext.Provider>
  )
}
