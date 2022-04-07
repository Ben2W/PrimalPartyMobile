import {List, Text, View} from "native-base";
import ListItem from "native-base/src/components/primitives/List/ListItem";


const DashboardTasksList = () =>{
    return(
        <View>
            <List>
                <ListItem>
                    <Text>
                        Task 1
                    </Text>
                </ListItem>
            </List>
        </View>
    );
}

export default DashboardTasksList