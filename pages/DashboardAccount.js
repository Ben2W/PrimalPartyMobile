import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import {ButtonText, StyledButton} from "../components/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackActions as navigation} from "react-navigation";
import {useContext} from "react";
import {CredentialsContext} from "../components/CredentialsContext";


const DashboardAccount = () => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const logout = () => {
        AsyncStorage.removeItem('ppcredentials')
            .then(() => {
                fetch('https://primalpartybackend.azurewebsites.net/logout',
                    {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        credentials: 'include'
                    }
                )
                    .then((data) => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    })
                    .catch(e => {
                        console.log(e)
                    })
                setStoredCredentials('')
            })
            .catch(e => {
                console.log(err)
            })
    }

    return(
        <View style = {
            {
                justifyContent: 'center',
                alignItems: 'center',
                top: "50%",
            }
        }>
            <Text>
                Account
            </Text>
            <StyledButton onPress={logout}><ButtonText>Log out</ButtonText></StyledButton>
        </View>
    )
}

export default DashboardAccount