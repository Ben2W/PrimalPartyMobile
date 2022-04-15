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
import ReduxStore from "../redux/ReduxStore";
import {logoutRESET} from "../redux/eventsReducer";

const { darkLight, primary } = Colors;

const DashboardAccount = () => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRegister = async (credentials) => {
        handleMessage(null)

        const { username, phone, firstName, lastName } = { ...credentials }

        const url = 'https://primalpartybackend.azurewebsites.net/account'

        if (!username && !phone && !firstName && !lastName){
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

                if (res.status == 410) {
                    throw Error('phone already taken')
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
                    console.log(storedCredentials.username)
                    console.log(username)
                    logout()
                    //return
                } else persistLogin({ ...data.updatedUser })
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
                handleMessage('You successfully updated your account!', 'SUCCESS')
                setTimeout(()=>{
                    handleMessage('')
                }, 2000)
            })
            .catch(err => {
                handleMessage('Persisting Login information failed')
            })
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
                        logoutRESET();
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
                            firstName: storedCredentials.firstName, lastName: storedCredentials.lastName, username: storedCredentials.username, phone: storedCredentials.phone
                        }}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleRegister(values)

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


                        </StyledFormArea>)}

                    </Formik>
                </InnerContainer>
            </StyledImageContainer >
        </KeyboardAvoidingViewWrapper>
    )
}

export default DashboardAccount