import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native'
import Constants from 'expo-constants'

const StatusBarHeight = Constants.statusBarHeight

//colors
export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#3f51b5',
    green: '#10B981',
    red: '#EF4444',
    black: '#000000'
}

const { primary, secondary, tertiary, darkLight, brand, green, red, black } = Colors

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
`

export const StyledImageContainer = styled.ImageBackground`
    flex: 1;
    height:100%;
    flexDirection: column;
    justifyContent:center;
    alignItems: center;
    padding-top: ${StatusBarHeight + 5}px;
`

export const InnerContainer = styled.View`
    border-radius: 5px;
    width: 90%;
    height: 90%;
    align-items: center;
    background-color: ${primary};
    flex: ${props => props.isRegister == true ? 1 : 0}
`

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${black};
    padding: 10px;
`

export const Subtitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`

export const StyledFormArea = styled.View`
    width: 90%;
`

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`
export const StyledDeleteButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${red};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 0px;
    height: 60px;
    width: 60px;
`

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
    font-weight: bold
`

export const DeleteButtonText = styled.Text`
    color: ${primary};
    font-size: 10px;
    font-weight: bold
`

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? green : red}
`

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight}
    margin-vertical: 10px;
`

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    padding-bottom: 15px;
`

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`