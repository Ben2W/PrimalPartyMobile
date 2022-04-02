import { setStatusBarStyle } from 'expo-status-bar';
import React, { useState } from 'react'

import {
    StyleSheet, View, ScrollView, Button,
    ImageBackground, TextInput, Keyboard,
    TouchableWithoutFeedback, KeyboardAvoidingView,
    Linking, Image
} from 'react-native';

import { Text, Badge } from 'react-native-paper';


const Register = ({ navigation }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [page, setPage] = useState('Register')


    const handleRegister = async (e) => {
        // make an API request and store the session
        const details = {
            'username': username,
            'password': password,
            'email': email,
            'firstName': firstname,
            'lastName': lastname,
            'phone': phone
        };

        const url = 'https://primalpartybackend.azurewebsites.net/register'

        //setIsPending(true);

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody);

       await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: 'include',
            body: formBody,
        })
        .then(response => {
            console.log(response.status);
            if(!response.ok) {
                throw Error('could not fetch the data for that resource')
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            //setIsPending(false);
            //navigate('/verify');
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    return (
        <KeyboardAvoidingView behavior='position' style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ImageBackground source={require('../HomeBackground.png')} resizeMode="cover" style={styles.image}>

                    <View style={styles.register_container}>
                        <View style={styles.switches}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: "50%", borderBottomColor: '#3f51b5', borderBottomWidth: 1 }}><Text style={{ paddingBottom: 10, fontSize: 15, color: "#3f51b5", fontWeight: "500" }}>Sign In</Text></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: "50%", borderBottomColor: '#3f51b5', borderBottomWidth: 0 }}>
                            </View>
                        </View>


                        <View style={styles.header}>

                            <View style={styles.icon}>
                                <Image source={require('../lock-outline.png')} />
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Sign up</Text>
                        </View>

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                onChangeText={firstname => setFirstname(firstname)}
                                defaultValue={firstname}
                                placeholder="Enter first name*"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={lastname => setLastname(lastname)}
                                defaultValue={lastname}
                                placeholder="Enter last name*"
                            />

                            <TextInput
                                style={styles.input}
                                onChangeText={username => setUsername(username)}
                                defaultValue={username}
                                placeholder="Enter username*"
                            />

                            <TextInput
                                style={styles.input}
                                onChangeText={email => setEmail(email)}
                                defaultValue={email}
                                placeholder="Enter email*"
                            />

                            <TextInput
                                style={styles.input}
                                onChangeText={phone => setPhone(phone)}
                                defaultValue={phone}
                                placeholder="Enter phone*"
                            />

                            <TextInput
                                style={styles.input}
                                onChangeText={password => setPassword(password)}
                                defaultValue={password}
                                placeholder="Enter password*"
                            />

                            <View style={styles.button}>
                                <Button
                                    title='Sign In'
                                    color="white"
                                    onPress={handleRegister}
                                >
                                </Button>
                            </View>
                            <View style={{height: 10}}>
                                
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
    register_container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'white',
        width: "70%",
        height: "80%"
    },
    form: {
        flexDirection: "column",
        flexGrow: 0,
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

export default Register
