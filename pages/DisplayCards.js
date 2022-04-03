import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import CustomCard from "../components/CustomCard";

const DisplayCards = ({ route }) => {

    return <ScrollView style={
        {
            flex: 1,
            top: "5%",
            marginLeft: "2%",
            marginRight: "2%",
        }
    }>
        <Text style={
                        {
                            fontSize: 40,
                            fontFamily: "TimesNewRomanPS-BoldItalicMT",
                        }
                    }>
                Welcome {route.params.username}!
        </Text>

        {/*<CustomCard*/}
        {/*    title={route.params.username}*/}
        {/*    date="04/19/2022"*/}
        {/*    location="The Bruh Mansion"*/}
        {/*    desc="It's a bruhbruh party, say 50 bruh or else bruh."*/}
        {/*/>*/}

        <CustomCard
            title="BruhBruh Party!"
            date="04/19/2022"
            location="The Bruh Mansion"
            desc="It's a bruhbruh party, say 50 bruh or else bruh."
        />
        <CustomCard
            title="Factorio Meeting"
            date="3/28/2030"
            location="Crash Landing Site"
            desc="I just thought we needed more storage. "
        />
        <CustomCard
            title="People vs. Everything LAN Party"
            date="04/19/2022"
            location="Ben's Mom's House"
            desc="&quot;Why is there a scooter outside of my mom's house?&quot; -Benjamin Werner's last words"
        />
        <CustomCard
            title="Smoothie Ruler Crowning"
            date="06/20/2022"
            location="London, UK"
            desc="Find out who's gonna be Smoothie King, or Queen!"
        />
        <CustomCard
            title="PowerSmoking Session"
            date="04/20/2022"
            location="Colorado Lake"
            desc="So what we get drunk ..."
        />
    </ScrollView>
}

export default DisplayCards;