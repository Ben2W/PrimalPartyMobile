import {Text, View} from "native-base";
import {useState} from "react";

const TestingViewMore = ({navigation, route}) =>{
    const data = route.params.data.curData;
    const [event, setEvent] = useState({data});
    console.log({data})

    return(
        <View>
            <Text>
                {data.name}
            </Text>
        </View>
    )
}

export default TestingViewMore