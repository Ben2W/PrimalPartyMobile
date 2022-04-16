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
    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const handleVerify = (values) => {

        const { token, password } = { ...values }

        const details = {
            'password': password
        };
    
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        fetch('https://primalpartybackend.azurewebsites.net/reset/' + token, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: 'include',
            body: formBody,
            })
            .then(response => {
                switch(response.status) {
                    case 200:
                        handleMessage('SUCCESS, Please Log in with your new credentials!', 'SUCCESS');
                        return response.json();
                    case 404:
                        handleMessage('Token Does not exist')
                        return;
                    case 410:
                        handleMessage('Token expired');
                        return;
                    case 500:
                        handleMessage('Unexpected error.');
                        return;
                }
            })
            .then((data) => {
                setIsSubmitting(false)
                persistLogin({ ...data.user })
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

    const persistLogin = (credentials) => {
        AsyncStorage.setItem('ppcredentials', JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials)
            })
            .catch(err => {
                handleMessage('Persisting Login information failed')
            })
    }



    return (
        <KeyboardAvoidingViewWrapper>
            <StyledContainer>
                <PageTitle>Enter Your New Password</PageTitle>
                <View style={styles.container}>
                    <Formik
                        initialValues={{
                            token: '', password: ''
                        }}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleVerify(values)
                            values.token = ''
                            values.password = ''
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

                            <MyTextInput
                                label="PASSWORD*"
                                icon="lock"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                autoCapitalize="none"
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
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
