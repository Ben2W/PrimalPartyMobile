import GuestList from "../components/GuestList";
import EventHeading from "../components/EventHeading";
import {View} from "native-base";

const EventTaskList = ({eventID}) => {
    return (
        <View>
            <EventHeading eventID={eventID}/>
            {/*<GuestList/>*/}
        </View>
    )
}

export default EventTaskList;