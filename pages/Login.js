import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyleSheet, View, ScrollView, Button,
    ImageBackground, TextInput, Keyboard,
    TouchableWithoutFeedback, KeyboardAvoidingView,
    Linking, Image
} from 'react-native';

import { Text, Badge } from 'react-native-paper';


const Login = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [page, setPage] = useState('login')

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    const details = {
        'username': username,
        'password': password
    };

    const handleLogin = async () => {
        const url = 'http://localhost:8080/login'

        if (username && password) {

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include',
                body: formBody
            })

            const data = await response.json()

            await storeData(data)

            navigation.navigate('Dashboard', { username: username })


        } else {
            //handle empty input
            console.log("missing input")
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ImageBackground source={require('../HomeBackground.png')} resizeMode="cover" style={styles.image}>

                    <View style={styles.login_container}>
                        <View style={styles.switches}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: "50%", borderBottomColor: '#3f51b5', borderBottomWidth: 1 }}><Text style={{ paddingBottom: 10, fontSize: 15, color: "#3f51b5", fontWeight: "500" }}>Sign In</Text></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: "50%", borderBottomColor: '#3f51b5', borderBottomWidth: 0 }}><Text style={{ paddingBottom: 10, fontSize: 15, fontWeight: "500" }}>Sign up</Text></View>
                        </View>


                        <View style={styles.header}>

                            <View style={styles.icon}>
                                <Image source={require('../lock-outline.png')} />
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Sign In</Text>
                        </View>

                        <View style={styles.form}>
                            <TextInput
                                autoCapitalize='none'
                                style={styles.input}
                                onChangeText={username => setUsername(username)}
                                defaultValue={username}
                                placeholder="Enter Username*"
                            />
                            <TextInput
                                autoCapitalize='none'
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

                            <View style={styles.links_list}>
                                <Text style={styles.links}>Forgot password?</Text>
                                <Text>Do you have an account? <Text style={styles.links}>Sign Up</Text></Text>
                            </View>
                        </View>
                    </View >
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
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
        justifyContent: "space-between",
        backgroundColor: 'white',
        width: "70%",
        height: "60%"
    },
    form: {
        flexDirection: "column",
        flexGrow: 1.2,
        alignItems: "center",
        justifyContent: 'space-around',
        width: "100%"
    },
    input: {
        paddingTop: 20,
        height: 50,
        width: "95%",
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
        fontSize: 15
    },
    button: {
        width: "95%",
        backgroundColor: "#3f51b5",
    },
    links_list: {
        marginTop: "10%",
        width: "95%",
    },
    links: {
        paddingBottom: "3%",
        color: "#3f51b5"
    },
    switches: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: "100%",
        marginTop: 15,
        marginBottom: 25,
    },
    icon: {
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 25,
        marginBottom: "5%",
        height: 40,
        width: 40,
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    }
});

export default Login
