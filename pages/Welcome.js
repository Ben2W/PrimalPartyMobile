import React, { useContext } from 'react'
import { Text } from 'react-native'
import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper'
import { ButtonText, StyledButton, StyledContainer } from '../components/styles'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext'

import { NavigationActions } from '@react-navigation/native';


const Welcome = ({ navigation }) => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { firstName, lastName, email, username } = storedCredentials

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

    // TESTING

    const goToAccount = () => {
        fetch('https://primalpartybackend.azurewebsites.net/account',
            {
                method: 'GET',
                credentials: 'include'
            }
        )
            .then(res => {
                console.log('tried going to account')
                return res.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })

        //TESTING
    }

    return (
        <KeyboardAvoidingViewWrapper>
            <StyledContainer>
                <Text>
                    Welcome Screen
                </Text>

                <Text>firstName: {firstName}</Text>
                <Text>lastName: {lastName}</Text>
                <Text>username: {username}</Text>
                <Text>email: {email}</Text>
                <StyledButton onPress={logout}><ButtonText>Log out</ButtonText></StyledButton>

                <StyledButton onPress={goToAccount}><ButtonText>/account</ButtonText></StyledButton>
            </StyledContainer>
        </KeyboardAvoidingViewWrapper>
    )
}

export default Welcome
