import React, {useState} from "react";
import {Box, Button, Heading, HStack, Icon, IconButton, Text} from "native-base";
import {Entypo} from "@expo/vector-icons";

const EventTasksCard = (props) => {
    // console.log(props.bruh)
    const [eventData, setEventData] = useState(props.eventData);
    const [taskData, setTaskData] = useState(props.taskData);


    const handleClick = () => {
        console.log(taskData.assignees)
        console.log('editing');
    }

    return (
        <Box
            background={'#B9F8D3'}
            marginBottom={'5%'}
            width={'100%'}
            borderRadius={8}
            pb={"1%"} pt={"1%"}

        >
            <Box flexDirection={"row"} marginLeft="5%" pb={"3%"} pt={"3%"} >
                <HStack space={"2%"} flex={1} alignItems={'center'} >
                    <Box width={"40%"} >
                        <Heading
                            textAlign={"left"}  pt="2%" size={'sm'} flexWrap={'wrap'}>
                            {taskData.name}
                        </Heading>
                        <Text>
                            {taskData.description}
                        </Text>
                    </Box>
                    <Box w={'30%'} ml={'5%'}>
                        <Text >
                            Assignees: {'\n'}
                            { taskData.assignees.map((obj) => obj.firstName + ' ' + obj.lastName) }
                        </Text>
                    </Box>
                    <IconButton icon={<Icon as={Entypo} name="edit" />}
                        w={'15%'}
                        height={'40px'}
                        size={'md'}
                        onPress={() => handleClick()}>
                        {"Edit This Task!"}
                    </IconButton>
                </HStack>
            </Box>
        </Box>
    )
}

export default EventTasksCard;