import {Platform, View} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from "react-native-paper/src/components/List/ListItem";
import {useCallback, useContext, useEffect, useState} from "react";
import EventGuestNavigation from "../pages/EventGuestNavigation";
import {CredentialsContext} from "./CredentialsContext";
import Moment from "react-moment";
import {Text} from "native-base";
import ReduxStore from "../redux/ReduxStore";
import {find} from "styled-components/test-utils";
import {useFocusEffect} from "@react-navigation/native";

const CustomCard = ({navigation, data, route}, props) => {
    const [title, setTitle] = useState(data.name);
    const [address, setAddress] = useState(data.address);
    const [date, setDate] = useState(new Date(data.date));
    const [desc, setDesc] = useState(data.description);
    const [curData, setCurData] = useState(data);
    const [adminID, setAdminID] = useState(data.admin._id);
    const [userID, setUserID] = useState(useContext(CredentialsContext).storedCredentials._id)

    const checkAdmin = userID === adminID;
    const [isAdmin, setIsAdmin] = useState(checkAdmin);

    const [curEventID, setCurEventID] = useState(data._id);

    useFocusEffect(
        useCallback(() => {
            const bruh = () => {
                let curState = ReduxStore.getState().events;
                let findEvent = curState.findIndex((obj) => obj._id === data._id);
                setCurData(curState[findEvent]);

                if (curState[findEvent] !== undefined){
                    setTitle(curState[findEvent].name);
                    setAddress(curState[findEvent].address);
                    setDate(new Date(curState[findEvent].date));
                    setDesc(curState[findEvent].description);
                    setAdminID(curState[findEvent].admin._id)
                }
            }

            bruh();
            return () => bruh;
        }, [])
    );

    const handleClick = ({navigation}) => {
        let curState = ReduxStore.getState().events;
        let findEvent = curState.findIndex((obj) => obj._id === data._id);
        setCurData(curState[findEvent]);

        navigation.navigate("EventGuestNavigation", {eventID: curEventID, eventData: curState[findEvent], isAdmin: isAdmin});
        // navigation.navigate("TestingViewMore")
        // navigation.navigate("EventGuestNavigation", {data:{curData}} )
    }

    let AdminButton;
    if (userID === adminID){
        AdminButton =
        <View
            style={{
                width: "100%",
        }}
        >
            <FAB
                label={"Edit/View More"}
                style={{
                    width: "100%",
                    backgroundColor: '#721121',
                    borderRadius: '500'
                }}
                onPress={() => handleClick({navigation})}
            />
        </View>
    }

    else{
        AdminButton =
            <View
                style={{
                    width: "100%",
                }}
            >
                <FAB
                    label={"View More"}
                    style={{
                        width: "100%",
                        backgroundColor:'#FFC07F',
                        borderRadius: '500'
                    }}
                    onPress={() => handleClick({navigation})}
                />
            </View>
    }

    return (
    <View style={{
        marginBottom : "5%",
        width: "100%",
        alignContent:"center",
        paddingLeft: "5%",
        paddingRight: "5%",
    }}>
        <Card
            mode="outlined"
            elevation = {20}
            borderRadius={50}
        >
            {/*<Card.Title title={props.title} subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="party-popper" />} />*/}
            <LinearGradient
                colors={['#4555F2', '#878af7']}
            >
            <Card.Content style={{
                alightItems : Platform.OS === 'ios' ? "left" : '',
                
                justifyContent: 'center',
            }}>
                <Title>{title}</Title>
                <Paragraph>Date: {date.toLocaleDateString("en-US")}</Paragraph>
                <Paragraph>Location: {address}</Paragraph>
                <Paragraph>Desc: {desc}</Paragraph>
            </Card.Content>
            {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
            <Card.Actions style={{
                alightItems : Platform.OS === 'ios' ? "center" : '',
                justifyContent: 'center',
            }}>
                {AdminButton}
            </Card.Actions>
        </LinearGradient>
        </Card>
    </View>
    );
}


export default CustomCard;