import React, { useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { Formik } from 'formik'

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import { StyledContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, Subtitle, LeftIcon, RightIcon, StyledInputLabel, StyledTextInput, Colors, StyledButton, ButtonText, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent } from '../components/styles'

const { brand, darkLight, primary } = Colors;

const Login = () => {

    const [hidePassword, setHidePassword] = useState(true)




    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="contain" source={require('../assets/PartyHatDinoLogo.png')} />
                <PageTitle>Primal Party</PageTitle>
                <Subtitle>Account Login</Subtitle>

                <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={(values) => console.log(values)}
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

                        <MsgBox></MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>

                        <ExtraView>
                            <TextLink><TextLinkContent>Forgot Password?</TextLinkContent></TextLink>
                        </ExtraView>

                        <ExtraView>
                            <ExtraText>Don't have an account? </ExtraText>
                            <TextLink><TextLinkContent>Sign up</TextLinkContent></TextLink>
                        </ExtraView>

                    </StyledFormArea>)}

                </Formik>


            </InnerContainer>
        </StyledContainer>
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