import React from 'react';
import {SectionList} from "react-native";
import CustomCard from "./CustomCard";
import {View} from "react-native";
import {Text} from "react-native";
import {ScrollView} from "react-native";
import {Title} from "react-native-paper";

const Home = ({ navigation, route }) => {

    const userEvents = route.params.events;
    const eventCards = [];

    for (let i = 0; i < userEvents.length; i++){
        eventCards.push(<CustomCard navigation = {navigation} props = {userEvents[i]} key = {userEvents[i].id} />);
    }

    return (
        <View style={{
            flex: 1,
            top: "5%",
            marginLeft: "2%",
            marginRight: "2%",
        }}>
            <ScrollView>
                {eventCards}
            </ScrollView>
        </View>
    )
}

export default Home