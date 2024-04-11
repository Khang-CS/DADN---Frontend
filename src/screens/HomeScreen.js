import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {
    const navigation = useNavigation();

    const [isLightOn, setLight] = useState(false);
    const [isFanOn, setFan] = useState(false);
    const [isDoorOpen, setDoor] = useState(false);



    const setFanStatus = (status) => {
        setFan(!status)
    }

    const setLightStatus = () => {
        setLight(!isLightOn)
    }

    const setDoorStatus = () => {
        setDoor(!isDoorOpen)
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
                                    fanStatus: isFanOn,
                                    setFanStatus: setFanStatus
                                }
                            )
                        }
                        className='flex justify-center items-center bg-blue-300 h-[170px] w-[170px] rounded-[20px]'
                    >
                        <Text className="mb-[10px] font-sans font-bold">Fan</Text>
                        <Image className="h-[30px] w-[30px] mb-[10px]" source={require('../../assets/fan.png')} />
                        <ToggleSwitch
                            isOn={isFanOn}
                            onColor="rgba(102, 255, 102, 1)"
                            offColor="grey"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={() => setFanStatus(isFanOn)}
                        />
                    </TouchableOpacity>
                </View>

                <View className="flex justify-center items-center h-[200px] w-1/2  p-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Led')}
                        className='flex justify-center items-center bg-yellow-200 h-[170px] w-[170px] rounded-[20px]'
                    >
                        {/* Light Control */}
                        <Text className="mb-[10px] font-sans font-bold">Light</Text>
                        <Image className="h-[30px] w-[30px] mb-[10px]" source={require('../../assets/light.png')} />
                        <ToggleSwitch
                            isOn={isLightOn}
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
                            isOn={isDoorOpen}
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