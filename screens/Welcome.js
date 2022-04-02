import React, { useContext } from 'react'
import { Text } from 'react-native'
import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper'
import { ButtonText, StyledButton, StyledContainer } from '../components/styles'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext'



const Welcome = ({ navigation }) => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { firstName, lastName, email, username } = storedCredentials


    const logout = () => {
        AsyncStorage.removeItem('ppcredentials')
            .then(() => {
                fetch('http://localhost:8080/logout',
                    {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        credentials: 'include'
                    }
                )
                    .then((data) => {
                        console.log('logged out')
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


    const goToAccount = () => {
        fetch('http://localhost:8080/account',
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
