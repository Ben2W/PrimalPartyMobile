import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { CredentialsContext } from '../components/CredentialsContext'
import { Formik } from 'formik'

import { StyledContainer, PageTitle, StyledFormArea, StyledButton, ButtonText, MsgBox } from '../components/styles'
import { ActivityIndicator } from 'react-native'
import MyTextInput from '../components/MyTextInput'
import { Colors } from '../components/styles'
import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper'

const { darkLight, primary } = Colors;

const VerifyPasswordReset = ({ navigation }) => {
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const handleVerify = (token) => {
        fetch('https://primalpartybackend.azurewebsites.net/reset/' + token, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw Error("Unexpected error happened while trying to verify your email. Please try again")
                }
                return response.json();
            })
            .then((res) => {
                setIsSubmitting(false)
                persistRegister({ ...res.user })
            })
            .catch(err => {
                setIsSubmitting(false)
                handleMessage(err.message)
            })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
    }

    const persistRegister = (credentials) => {
        AsyncStorage.setItem('ppcredentials', JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials)
            })
            .catch(err => {
                handleMessage('Persisting Register information failed')
            })
    }



    return (
        <KeyboardAvoidingViewWrapper>
            <StyledContainer>
                <PageTitle>Verify Email</PageTitle>
                <View style={styles.container}>
                    <Formik
                        initialValues={{
                            token: ''
                        }}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleVerify(values.token)
                            values.token = ''
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                            <MyTextInput
                                label="VERIFY TOKEN*"
                                icon="key"
                                placeholder="enter token"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('token')}
                                onBlur={handleBlur('token')}
                                value={values.token}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    VERIFY
                                </ButtonText>
                            </StyledButton>)
                            }

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size='large' color={primary}></ActivityIndicator>
                            </StyledButton>)
                            }
                        </StyledFormArea>)}
                    </Formik>

                </View>
            </StyledContainer>
        </KeyboardAvoidingViewWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default VerifyPasswordReset
