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

const SendResetEmail = ({ navigation }) => {
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const handleVerify = (email) => {

        const details = {
            'email': email
        };
    
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('https://primalpartybackend.azurewebsites.net' + '/forgot', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: 'include',
            body: formBody,
        })
            .then(response => {
                switch(response.status) {
                case 200:
                    handleMessage('SUCCESS', 'SUCCESS');
                    navigation.navigate('VerifyPasswordReset')
                    return;
                case 403:
                    handleMessage('Cannot reset password while logged in.')
                    return;
                case 404:
                    handleMessage('Email not associated with account.');
                    return;
                case 409:
                    handleMessage('Please wait longer than 15 seconds to reset password.');
                    return;
                case 412:
                    handleMessage('Invalid email syntax.');
                    return;
                case 500:
                    handleMessage('Unexpected error.');
                    return;
                case 503:
                    handleMessage('Email service unavailable');
                    return;
            }
            })
            .then((res) => {
                setIsSubmitting(false)
                //persistRegister({ ...res.user })
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
                <PageTitle>RESET PASSWORD</PageTitle>
                <View style={styles.container}>
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleVerify(values.email)
                            values.email = ''
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                            <MyTextInput
                                label="EMAIL ADDRESS*"
                                icon="mail"
                                placeholder="johndoe@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                autoCapitalize="none"
                                keyboardType='email-address'
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    SEND EMAIL
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

export default SendResetEmail
