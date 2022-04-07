import * as React from 'react';
import {View} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from "react-native-paper/src/components/List/ListItem";
import {useCallback, useEffect} from "react";
import EventGuestNavigation from "../pages/EventGuestNavigation";

const CustomCard = ({eventID}) => {

    const [title, setTitle] = React.useState();
    const [location, setLocation] = React.useState();
    const [date, setDate] = React.useState();
    const [desc, setDesc] = React.useState();
    const [curEventID, setCurEventID] = React.useState(eventID);

    const fetchEventData = async() =>{
        const url = 'http://localhost:8080/events/' + curEventID
        try {
            const res = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    credentials: 'include'
                })
             return await res.json()
        } catch (e) {
            return e
        }
    }

    useEffect(() =>{
        fetchEventData()
            .then((event) => {
                setTitle(event.currEvent.name);
                setLocation(event.currEvent.location);
                setDate(event.currEvent.date);
                setDesc(event.currEvent.description);
        })
    }, [])


    const handleClick = (eventID) => {
        // console.log(eventID);
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
                <Paragraph>Location: {location}</Paragraph>
                <Paragraph>Desc: {desc}</Paragraph>
            </Card.Content>
            {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
            <Card.Actions style={{
                alignItems:"center",
                justifyContent: 'center',
            }}>
                <FAB
                    label={"View More"}
                    style={{
                        width: "100%",
                    }}
                    onPress={() => handleClick(eventID)}
                />
            </Card.Actions>
        </LinearGradient>
        </Card>
    </View>
    );
}


export default CustomCard;