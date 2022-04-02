import React from 'react'
import { Text } from 'react-native'
import KeyboardAvoidingViewWrapper from '../components/KeyboardAvoidingWrapper'
import { StyledContainer } from '../components/styles'

const Welcome = ({ navigation }) => {
    return (
        <KeyboardAvoidingViewWrapper>
            <StyledContainer>
                <Text>
                    Register Screen
                </Text>
            </StyledContainer>
        </KeyboardAvoidingViewWrapper>
    )
}

export default Welcome
