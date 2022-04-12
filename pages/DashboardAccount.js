import React, { useState, useContext } from 'react'
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackActions as navigation} from "react-navigation";
import {CredentialsContext} from "../components/CredentialsContext";


import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { Formik } from 'formik'

import { StyledImageContainer, InnerContainer, PageTitle, StyledFormArea, Subtitle, Colors, StyledButton, ButtonText, MsgBox, ExtraView, ExtraText, TextLink, TextLinkContent } from '../components/styles'

import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper';
import MyTextInput from '../components/MyTextInput';

const { darkLight, primary } = Colors;

const DashboardAccount = () => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRegister = async (credentials) => {
        handleMessage(null)

        const { username, phone, email, firstName, lastName } = { ...credentials }

        const url = 'https://primalpartybackend.azurewebsites.net/account'

        if (!username && !phone && !email && !firstName && !lastName){
            setIsSubmitting(false)
            handleMessage('You havent made any updates!')
            return
        }


        let formBody = [];
        for (let property in credentials) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(credentials[property]);

            if (!encodedValue){
                encodedValue = storedCredentials[property]
            }

            console.log(encodedKey + "=" + encodedValue)
            formBody.push(encodedKey + "=" + encodedValue);
           
        }
        formBody = formBody.join("&");
        

        await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: 'include',
            body: formBody
        })
            .then(res => {
                if (res.status == 500) {
                    throw Error('Unexpected error: Maybe your phone number is not 12 characters long')
                }
                if (res.status == 503) {
                    throw Error('Unable to send the verification email')
                }

                if (res.status == 410) {
                    throw Error('phone already taken')
                }

                if (res.status == 411) {
                    throw Error('email already taken')
                }

                if (res.status == 412) {
                    throw Error('username already taken')
                }

                if(res.status == 401){
                    throw Error('You are not authenticated')
                }
                if(res.status == 200){
                    return res.json();
                }
                
            })
            .then(data => {
                setIsSubmitting(false)
                if(storedCredentials.username != username && username){
                    logout()
                }
            })
            .catch(err => {
                setIsSubmitting(false)
                handleMessage(err.message)
            })



        // // missing credentials
        // else {
        //     setIsSubmitting(false)
        //     console.log(storedCredentials)
        //     handleMessage('Missing fields')
        // }
    }


    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message)
        setMessageType(type)
    }





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

return (
        <KeyboardAvoidingViewWrapper>
            <StyledImageContainer resizeMode="cover" source={require('../assets/HomeBackground.png')}>
                <StatusBar style="dark" />
                <InnerContainer isRegister={true}>
                    <PageTitle>Primal Party</PageTitle>
                    <Subtitle>Edit Your Account</Subtitle>


                    <Formik
                        initialValues={{
                            firstName: '', lastName: '', username: '', email: '', phone: ''
                        }}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleRegister(values)
                            //logout()
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
                                placeholder={storedCredentials.firstName}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />

                            <MyTextInput
                                label="LAST NAME*"
                                icon="person"
                                placeholder={storedCredentials.lastName}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />

                            <MyTextInput
                                label="USERNAME*"
                                icon="person"
                                placeholder={storedCredentials.username}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                autoCapitalize="none"
                            />

                            <MyTextInput
                                label="EMAIL ADDRESS*"
                                icon="mail"
                                placeholder={storedCredentials.email}
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
                                placeholder={storedCredentials.phone}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                autoCapitalize="none"
                                keyboardType={Platform.OS ? "number-pad" : "numberic"}
                            />


                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Save Changes
                                </ButtonText>
                            </StyledButton>)
                            }

                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (<StyledButton onPress={logout}>
                                <ButtonText>
                                    Logout
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

export default DashboardAccount