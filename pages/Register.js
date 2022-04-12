import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { Formik } from 'formik'

import { StyledImageContainer, InnerContainer, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent } from '../components/styles'

import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper';
import MyTextInput from '../components/MyTextInput';

const { darkLight, primary } = Colors;

const Register = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRegister = async (credentials) => {
        handleMessage(null)

        const { username, password, phone, email, firstName, lastName } = { ...credentials }

        const url = 'https://primalpartybackend.azurewebsites.net/register'

        if (username && password && phone && email && firstName && lastName) {

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
                    if (res.status == 500) {
                        throw Error('Unexpected error happened on the server')
                    }

                    if (res.status == 503) {
                        throw Error('Unable to send the verification email')
                    }

                    if (res.status == 410) {
                        throw Error('Username and email already taken')
                    }

                    if (res.status == 411) {
                        throw Error('Username already taken')
                    }

                    if (res.status == 412) {
                        throw Error('Email already taken')
                    }

                    if (res.status == 413) {
                        throw Error('Invalid phone number')
                    }

                    if (res.status == 414) {
                        throw Error('Invalid email address')
                    }

                    return res.json();
                })
                .then(data => {
                    setIsSubmitting(false)
                    navigation.navigate('VerifyEmail', { credentials })
                })
                .catch(err => {
                    setIsSubmitting(false)
                    handleMessage(err.message)
                })

        }

        // missing credentials
        else {
            setIsSubmitting(false)
            handleMessage('Missing fields')
        }
    }


    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
    }

    return (
        <KeyboardAvoidingViewWrapper>
            <StyledImageContainer resizeMode="cover" source={require('../assets/HomeBackground.png')}>
                <StatusBar style="dark" />
                <InnerContainer isRegister={true}>
                    <PageTitle>Primal Party</PageTitle>
                    <Subtitle>REGISTER</Subtitle>


                    <Formik
                        initialValues={{
                            firstName: '', lastName: '', username: '', email: '', phone: '', password: ''
                        }}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleRegister(values)
                            values.password = ''
                            values.firstName = ''
                            values.lastName = ''
                            values.username = ''
                            values.email = ''
                            values.phone = ''

                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                            <MyTextInput
                                label="FIRST NAME*"
                                icon="person"
                                placeholder="John"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />

                            <MyTextInput
                                label="LAST NAME*"
                                icon="person"
                                placeholder="Doe"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />

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

                            <MyTextInput
                                label="PHONE*"
                                icon="device-mobile"
                                placeholder="+14077574245"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                autoCapitalize="none"
                                keyboardType={Platform.OS ? "number-pad" : "numberic"}
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
                                    REGISTER
                                </ButtonText>
                            </StyledButton>)
                            }

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size='large' color={primary}></ActivityIndicator>
                            </StyledButton>)
                            }
                            <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}><TextLinkContent>Sign in</TextLinkContent></TextLink>
                            </ExtraView>

                        </StyledFormArea>)}

                    </Formik>
                </InnerContainer>
            </StyledImageContainer >
        </KeyboardAvoidingViewWrapper>
    )
}

export default Register