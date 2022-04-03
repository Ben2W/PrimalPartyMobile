import * as React from 'react';
import {View} from "react-native-web";
import {Headline, Paragraph} from "react-native-paper";

const ViewEvent = ({navigation, props}) => {
    console.log(props)

    return (
        <View>
            <Headline>{props.title}</Headline>
            <Paragraph>Location: {props.location}</Paragraph>
            <Paragraph>Date: {props.date}</Paragraph>
            <Paragraph>Desc: {props.desc}</Paragraph>
        </View>
    )
}

export default ViewEvent