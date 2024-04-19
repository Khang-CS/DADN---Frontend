import { View, Text, SafeAreaView, TouchableOpacity, Image, LogBox } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'


const IP = '10.230.147.151'
const PORT = '3002'


LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const HomeScreen = () => {
    const navigation = useNavigation();

    const [light, setLight] = useState(false);

    const [fan, setFan] = useState(false);
    const [fanSpeed, setFanSpeed] = useState(0)

    const [door, setDoor] = useState(false);



    const setFanStatus = async () => {
        let toSet = !fan
        setFan(toSet)

        let feedKey = {
            feedKey: "yolo-fan",
            value: "50"
        }

        if (!toSet) {
            feedKey.value = "0"
        }

        //Call BE
        await axios.post(`http://${IP}:${PORT}/adafruits/post`, feedKey).then((response) => {
            console.log('call fan api', response.data)
        })
            .catch(error => {
                console.log(error)
            })
        //
    }

    const setLightStatus = async () => {
        let toSet = !light

        setLight(toSet)

        let feedKey = {
            feedKey: "yolo-led",
            value: "#ed1c1c"
        }

        if (!toSet) {
            feedKey.value = "#000000"
        }

        //Call BE
        await axios.post(`http://${IP}:${PORT}/adafruits/post`, feedKey).then((response) => {
            console.log('call led api', response.data)
        })
            .catch(error => {
                console.log(error)
            })
        //
    }

    const setDoorStatus = async () => {
        let toSet = !door

        setDoor(toSet)

        let feedKey = { feedKey: "yolo-door" }

        //Call BE
        await axios.post(`http://${IP}:${PORT}/adafruits/post/toggle`, feedKey).then((response) => {
            console.log('call door api', response.data)
        })
            .catch(error => {
                console.log(error)
            })
        //
    }

    return (
        <SafeAreaView className="flex flex-col">
            <View className="my-[10px] flex justify-center items-center">
                <View className="flex justify-center items-center w-[200px] h-[200px] rounded-full bg-pink-300">
                    <Text className="font-sans font-extrabold text-[50px]">12° C</Text>
                </View>
            </View>

            <View className="mt-[10px] flex flex-row flex-wrap justify-between">
                <View className="flex justify-center items-center h-[200px] w-1/2  p-4">
                    {/* Fan control */}
                    <TouchableOpacity
                        onPress={
                            () => navigation.navigate('Fan',
                                {
                                    fan: fan,
                                    setFan: setFan,

                                    fanSpeed: fanSpeed,
                                    setFanSpeed: setFanSpeed,
                                }
                            )
                        }
                        className='flex justify-center items-center bg-blue-300 h-[170px] w-[170px] rounded-[20px]'
                    >
                        <Text className="mb-[10px] font-sans font-bold">Fan</Text>
                        <Image className="h-[30px] w-[30px] mb-[10px]" source={require('../../assets/fan.png')} />
                        <ToggleSwitch
                            isOn={fan}
                            onColor="rgba(102, 255, 102, 1)"
                            offColor="grey"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={setFanStatus}
                        />
                    </TouchableOpacity>
                </View>

                <View className="flex justify-center items-center h-[200px] w-1/2  p-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Light')}
                        className='flex justify-center items-center bg-yellow-200 h-[170px] w-[170px] rounded-[20px]'
                    >
                        {/* Light Control */}
                        <Text className="mb-[10px] font-sans font-bold">Light</Text>
                        <Image className="h-[30px] w-[30px] mb-[10px]" source={require('../../assets/light.png')} />
                        <ToggleSwitch
                            isOn={light}
                            onColor="rgba(102, 255, 102, 1)"
                            offColor="grey"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={setLightStatus}
                        />
                    </TouchableOpacity>
                </View>

                <View className="flex justify-center items-center h-[200px] w-1/2 p-4">
                    <TouchableOpacity className='flex justify-center items-center bg-red-300 h-[170px] w-[170px] rounded-[20px]'>
                        {/* Door Control */}
                        <Text className="mb-[10px] font-sans font-bold">Door</Text>
                        <Image className="h-[30px] w-[30px] mb-[10px]" source={require('../../assets/door.png')} />
                        <ToggleSwitch
                            isOn={door}
                            onColor="rgba(102, 255, 102, 1)"
                            offColor="grey"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={setDoorStatus}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default HomeScreen