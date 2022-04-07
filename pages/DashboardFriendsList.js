import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';


const DashboardFriendsList = () => (
    <View style = {
        {
            justifyContent: 'center',
            alignItems: 'center',
            top: "50%",
        }
    }>
        <Text>
            Friends
        </Text>
    </View>
)

export default DashboardFriendsList