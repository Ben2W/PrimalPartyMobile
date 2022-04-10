import {View} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from "react-native-paper/src/components/List/ListItem";
import {useCallback, useContext, useEffect, useState} from "react";
import EventGuestNavigation from "../pages/EventGuestNavigation";
import FetchEventData from "./FetchEventData";
import EventGuestGuestsListView from "../pages/EventGuestGuestsListView";
import TestingViewMore from "../pages/TestingViewMore";
import {shouldThrowAnErrorOutsideOfExpo} from "expo/build/environment/validatorState";
import {CredentialsContext} from "./CredentialsContext";

const CustomCard = ({navigation, data}) => {
    const [title, setTitle] = useState(data.currEvent.name);
    const [address, setAddress] = useState(data.currEvent.address);
    const [date, setDate] = useState(data.currEvent.date);
    const [desc, setDesc] = useState(data.currEvent.description);
    const [curData, setCurData] = useState(data.currEvent);
    const [adminID, setAdminID] = useState(data.currEvent.admin._id);
    const [userID, setUserID] = useState(useContext(CredentialsContext).storedCredentials._id)
    const [isAdmin, setIsAdmin] = useState(() => {return adminID === userID});

    const [curEventID, setCurEventID] = useState(data.currEvent._id);

    const handleClick = ({navigation}) => {
        navigation.navigate("EventGuestNavigation", {data: {curData}});
        // navigation.navigate("TestingViewMore")
        // navigation.navigate("EventGuestNavigation", {data:{curData}} )
    }



    let AdminButton;
    if (isAdmin){
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
                }}
                onPress={() => handleClick({navigation})}
            />
        </View>
    }
    else{
        AdminButton =
            <View>
                <FAB
                    label={"View More"}
                    style={{
                        width: "100%",
                    }}
                    onPress={() => handleClick({navigation})}
                />
            </View>
        ;
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
                alignItems:"left",
                justifyContent: 'center',
            }}>
                <Title>{title}</Title>
                <Paragraph>Date: {date}</Paragraph>
                <Paragraph>Location: {address}</Paragraph>
                <Paragraph>Desc: {desc}</Paragraph>
            </Card.Content>
            {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
            <Card.Actions style={{
                alignItems:"center",
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