import { setStatusBarStyle } from 'expo-status-bar';
import React, { useState } from 'react'

import {
    StyleSheet, View, SafeAreaView, Button,
    ImageBackground, TextInput, Keyboard,
    TouchableWithoutFeedback, KeyboardAvoidingView,
    Linking, Image
} from 'react-native';

import { Text, Badge } from 'react-native-paper';
import ColorPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';


const Login = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ImageBackground source={require('../HomeBackground.png')} resizeMode="cover" style={styles.image}>

                    <View style={styles.login_container}>

                        <View style={styles.switches}>
                            <Text>Sign In</Text>
                            <Text>Sign up</Text>
                        </View>


                        <View style={styles.header}>

                            <View style={styles.icon}>
                                <Image source={require('../lock-outline.png')} />
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Sign In</Text>
                        </View>

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                onChangeText={username => setUsername(username)}
                                defaultValue={username}
                                placeholder="Enter Username*"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={password => setPassword(password)}
                                defaultValue={password}
                                secureTextEntry={true}
                                placeholder="Enter Password*"
                            />

                            <View style={styles.button}>
                                <Button
                                    title='Sign In'
                                    color="white"
                                    onPress={handleLogin}
                                >
                                </Button>
                            </View>

                            <View style={styles.links}>
                                <Text>
                                    Forgot password?
                                </Text>
                                <Text>
                                    Do you have an account? Sign Up
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View >
    );
}

//push everything when keyboard pops up

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    login_container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: 'white',
        width: "70%",
        height: "50%"
    },
    form: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    input: {
        paddingTop: 20,
        height: 40,
        width: "95%",
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
    },
    button: {
        width: "95%",
        backgroundColor: "#3f51b5",
    },
    links: {
        marginTop: "5%",
    },
    switches: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: "100%",
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#3f51b5"
    },
    icon: {
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 25,
        marginBottom: "5%",
        height: 40,
        width: 40
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
    }
});

export default Login
