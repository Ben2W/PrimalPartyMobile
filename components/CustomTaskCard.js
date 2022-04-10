import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Box, Button, Center, FormControl, Heading, HStack, Input, Modal, Spinner, VStack } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';

const CustomTaskCard = ({ navigation, data }) => {

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description);
    const [done, setDone] = useState(data.done);
    const [event, setEvent] = useState(data.event.name)
    const [assignees, setAssignees] = useState(data.assignees)

    return (
        <View style={{
            marginBottom: "5%",
            width: "100%",
            alignContent: "center",
            paddingLeft: "5%",
            paddingRight: "5%",
        }}>


            <Card
                mode="outlined"
                elevation={20}
                borderRadius={50}
                style={{ width: '100%' }}
            >
                {/*<Card.Title title={props.title} subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="party-popper" />} />*/}
                <LinearGradient
                    colors={['#000000', '#000000']}
                >
                    <Card.Content style={{
                        alignItems: "left",
                        justifyContent: 'center',
                        paddingBottom: 10
                    }}>
                        <Title>{name}</Title>
                        <Paragraph>Event: {event}</Paragraph>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} avoidKeyboard={true}>
                            <Modal.Content maxWidth="400px">
                                <Modal.Header>{name}</Modal.Header>
                                <Modal.Body>
                                    <VStack space={3}>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium">Event</Text>
                                            <Text color="blueGray.400">{event}</Text>
                                        </HStack>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium">Description</Text>
                                            <Text color="blueGray.400">{description}</Text>
                                        </HStack>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium">Assigned to</Text>
                                            <HStack>

                                                <VStack>
                                                    <ScrollView>
                                                        {assignees.map((user) => (<Text key={user._id}>{user.username}</Text>))}
                                                    </ScrollView>
                                                </VStack>

                                            </HStack>
                                        </HStack>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium">Completed?</Text>
                                            {(done) ? <Text style={{ color: "green" }}>Yes</Text> : <Text style={{ color: "red" }}>No</Text>}
                                        </HStack>
                                    </VStack>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button.Group space={2}>
                                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                            setShowModal(false);
                                        }}>
                                            Close
                                        </Button>
                                    </Button.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </Card.Content>
                </LinearGradient>



                <Button onPress={() => setShowModal(true)}>
                    View Details
                </Button>
            </Card>

            <View>

            </View>
        </View>
    )
}

export default CustomTaskCard