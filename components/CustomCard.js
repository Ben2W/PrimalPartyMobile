import * as React from 'react';
import {View} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';

const CustomCard = (props) => (
    <View style={{
        marginBottom : "5%",
    }}>
        <Card mode="outlined" elevation = {20} >
            {/*<Card.Title title={props.title} subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="party-popper" />} />*/}
            <Card.Content>
                <Title>{props.title}</Title>
                <Paragraph>Date - {props.date}</Paragraph>
                <Paragraph>Location - {props.location}</Paragraph>
                <Paragraph>{props.desc}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions style={{
                alignItems:"center",
                justifyContent: 'center',
            }}>
                <FAB
                    label={"View More"}
                    onPress={() => console.log('Pressed')}
                />
            </Card.Actions>
        </Card>
    </View>

);

export default CustomCard;