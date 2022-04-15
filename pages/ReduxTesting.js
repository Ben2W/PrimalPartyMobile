import {Button, Center, Text, View} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {eventDELETE, eventPOST, eventPUT, eventSET, eventsSlice} from "../redux/eventsReducer";
import ReduxStore from "../redux/ReduxStore";
import GetEvents from "../components/API Calls/GetEvents";

const ReduxTesting = () => {

    const dispatch = useDispatch();

    return (
        <View style={{
            flex: 1,
            top: "50%",
            marginLeft: "2%",
            marginRight: "2%",
        }}>
            <Center>
                <Button onPress={ () => console.log(
                    ReduxStore.getState())
                }> Get Events button</Button>

                <Button onPress={ () => console.log(
                    dispatch( eventPOST({_id: 9, name: "postPayload"}) )
                    )}> Post Events button</Button>

                <Button onPress={ () => console.log(
                    dispatch( eventPUT({_id: 2, name: "putPayload"} ))
                )}> Put Events button</Button>

                <Button onPress={ () => console.log(
                    dispatch( eventDELETE({_id: 1}) )
                )}> Delete Events button</Button>

                <Button onPress={ () => console.log(
                    GetEvents.then((res) => {
                        console.log("*****DISPATCHING********")
                        dispatch(eventSET({res}))
                    })
                )}> Set User Events button</Button>
                <Text> Bruh </Text>
            </Center>
        </View>
    )
}

export default ReduxTesting