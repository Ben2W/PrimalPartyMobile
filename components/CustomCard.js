import * as React from 'react';
import {View} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from "react-native-paper/src/components/List/ListItem";

const CustomCard = ({navigation, props}) => {
    const eventDetails = {props};

    const handleClick = ({navigation, eventDetails}) =>{
        navigation.navigate("ViewEvent", {
            navigation: navigation,
            props: eventDetails,
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
                colors={['#4555F2', '#6675F4']}
            >
            <Card.Content style={{
                alignItems:"left",
                justifyContent: 'center',
            }}>
                <Title>{props.title}</Title>
                <Paragraph>Location: {props.location}</Paragraph>
                <Paragraph>Date: {props.date}</Paragraph>
                <Paragraph>Desc: {props.desc}</Paragraph>
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
                    onPress={() => handleClick({navigation, eventDetails})}
                />
            </Card.Actions>
        </LinearGradient>
        </Card>
    </View>
    );
}


export default CustomCard;