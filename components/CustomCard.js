import * as React from 'react';
import {View} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from "react-native-paper/src/components/List/ListItem";
import {useCallback, useEffect} from "react";
import EventGuestNavigation from "../pages/EventGuestNavigation";
import FetchEventData from "./FetchEventData";

const CustomCard = ({data}) => {
    console.log(data)

    const [title, setTitle] = React.useState(data.currEvent.name);
    const [location, setLocation] = React.useState(data.currEvent.location);
    const [date, setDate] = React.useState(data.currEvent.date);
    const [desc, setDesc] = React.useState(data.currEvent.description);
    const [curEventID, setCurEventID] = React.useState(data.currEvent._id);

    const handleClick = () => {
        console.log(curEventID);
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
                    onPress={() => handleClick()}
                />
            </Card.Actions>
        </LinearGradient>
        </Card>
    </View>
    );
}


export default CustomCard;