import React from 'react'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { LeftIcon, RightIcon, StyledInputLabel, StyledTextInput, Colors } from './styles'

const { brand, darkLight } = Colors

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

export default MyTextInput