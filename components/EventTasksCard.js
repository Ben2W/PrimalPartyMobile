import React, {useState} from "react";
import {Box, Button, Heading, HStack, Text} from "native-base";

const EventTasksCard = (props) => {
    // console.log(props.bruh)
    const [eventData, setEventData] = useState(props.eventData);
    const [taskData, setTaskData] = useState(props.taskData);


    const handleClick = () => {
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
            <Box flexDirection={"row"} marginLeft="5%" pb={"3%"} pt={"3%"}>
                <HStack space={"2%"} flex={1} alignItems={'center'} >
                    <Box width={"50%"}>
                        <Heading
                            textAlign={"left"}  pt="2%" size={'sm'} flexWrap={'wrap'}>
                            {taskData.name}
                        </Heading>
                        <Text>
                            {taskData.description}
                        </Text>
                    </Box>
                    <Button
                        w={'40%'}
                        height={'40px'}
                        size={'sm'}
                        onPress={() => handleClick()}>
                        {"Edit This Task!"}
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}

export default EventTasksCard;