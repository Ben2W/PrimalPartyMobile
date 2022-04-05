import * as React from 'react';
import {View} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from "react-native-paper/src/components/List/ListItem";
import {useCallback} from "react";
import ViewEvent from "../pages/ViewEvent";

const CustomCard = ({navigation, props}) => {

    const [title, setTitle] = React.useState(props.title);
    const [location, setLocation] = React.useState(props.location);
    const [date, setDate] = React.useState(props.date);
    const [desc, setDesc] = React.useState(props.desc);
    const [id, setID] = React.useState(props.id);

    const [eventArray, setEventArray] = React.useState({props});

    const handleClick = (eventDetails) => {
        console.log(eventDetails)
        navigation.navigate("ViewEvent", {
            title: eventDetails.title,
            location: eventDetails.location,
            date: eventDetails.date,
            desc: eventDetails.desc,
        })
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
                <Paragraph>Location: {location}</Paragraph>
                <Paragraph>Date: {date}</Paragraph>
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
                    onPress={() => handleClick(eventArray)}
                />
            </Card.Actions>
        </LinearGradient>
        </Card>
    </View>
    );
}


export default CustomCard;