import React, { useState, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { Formik } from 'formik'

import { Octicons, Ionicons } from '@expo/vector-icons'

import { StyledImageContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, LeftIcon, RightIcon, StyledInputLabel, StyledTextInput, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent } from '../components/styles'

import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext'

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const handleLogin = async (credentials) => {
        handleMessage(null)

        const { username, password } = { ...credentials }

        const url = 'http://localhost:8080/login'

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
                    handleMessage(err.message, 'FAILED')
                })

        }

        // missing credentials
        else {
            setIsSubmitting(false)
            handleMessage('Missing username or password', 'FAILED')
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

    const goToProtected = () => {
        fetch('http://localhost:8080/protected')
            .then(res => {
                console.log('tried going to protected')
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
            <StyledImageContainer resizeMode="cover" source={require('../assets/HomeBackground.png')}>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="contain" source={require('../assets/PartyHatDinoLogo.png')} />
                    <PageTitle>Primal Party</PageTitle>
                    <Subtitle>Login</Subtitle>


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
                                label="Username"
                                icon="person"
                                placeholder="johndoe"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.email}
                                autoCapitalize="none"
                            />

                            <MyTextInput
                                label="Password"
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
                                    Sign In
                                </ButtonText>
                            </StyledButton>)
                            }

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size='large' color={primary}></ActivityIndicator>
                            </StyledButton>)
                            }


                            {/* TESTING */}
                            <StyledButton onPress={goToProtected}>
                                <ButtonText>
                                    /protected
                                </ButtonText>
                            </StyledButton>
                            {/* TESTING */}

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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login