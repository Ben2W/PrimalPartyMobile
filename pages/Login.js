import React, { useState, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { Formik } from 'formik'

import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent } from '../components/styles'

import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper';
import MyTextInput from '../components/MyTextInput';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext'

const { darkLight, primary } = Colors;

const Login = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const handleLogin = async (credentials) => {
        handleMessage(null)

        const { username, password } = { ...credentials }

        const url = 'https://primalpartybackend.azurewebsites.net/login'

        if (username && password) {

            let formBody = [];
            for (let property in credentials) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(credentials[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include',
                body: formBody
            })
                .then(res => {
                    if (res.status == 400) {
                        throw Error('Wrong username or password')
                    }

                    if (res.status == 500) {
                        throw Error('Unexpected error happened on the server')
                    }

                    return res.json();
                })
                .then(data => {
                    setIsSubmitting(false)
                    persistLogin({ ...data.user })
                })
                .catch(err => {
                    setIsSubmitting(false)
                    handleMessage(err.message)
                })

        }

        // missing credentials
        else {
            setIsSubmitting(false)
            handleMessage('Missing username or password')
        }
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
            <StyledImageContainer resizeMode="cover" source={require('../assets/HomeBackground.png')}>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="contain" source={require('../assets/PartyHatDinoLogo.png')} />
                    <PageTitle>Primal Party</PageTitle>
                    <Subtitle>LOGIN</Subtitle>


                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleLogin(values)
                            values.password = ''
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                            <MyTextInput
                                label="USERNAME*"
                                icon="person"
                                placeholder="johndoe"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                autoCapitalize="none"
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
                                    SIGN IN
                                </ButtonText>
                            </StyledButton>)
                            }

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size='large' color={primary}></ActivityIndicator>
                            </StyledButton>)
                            }
                            <ExtraView>
                                <TextLink><TextLinkContent>Forgot Password?</TextLinkContent></TextLink>
                            </ExtraView>

                            <ExtraView>
                                <ExtraText>Don't have an account? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Register')}><TextLinkContent>Sign up</TextLinkContent></TextLink>
                            </ExtraView>

                        </StyledFormArea>)}

                    </Formik>
                </InnerContainer>
            </StyledImageContainer >
        </KeyboardAvoidingViewWrapper>
    )
}

export default Login