import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputSpinner from "react-native-input-spinner";
import ToggleSwitch from 'toggle-switch-react-native';
import { LogBox } from 'react-native';

import axios from 'axios'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const IP = '10.230.147.151'
const PORT = '3002'

const FanScreen = ({ route }) => {

    const { fan, setFan, fanSpeed, setFanSpeed } = route.params

    const [fanChild, setFanChild] = useState(fan)
    const [fanSpeedChild, setFanSpeedChild] = useState(fanSpeed)

    const changeFanStatus = async () => {
        // setFanStatus(fan)
        let toSet = !fanChild
        setFan(toSet)
        setFanChild(toSet)

        let feedKey = {
            feedKey: "yolo-fan",
            value: "50"
        }

        if (!toSet) {
            feedKey.value = "0"
        }

        setFanSpeed(feedKey.value)
        setFanSpeedChild(feedKey.value)

        //Call BE
        await axios.post(`http://${IP}:${PORT}/adafruits/post`, feedKey).then((response) => {
            console.log('call fan api', response.data)
        })
            .catch(error => {
                console.log(error)
            })
        //
    }

    const changeFanSpeed = async (speed) => {
        setFanSpeed(speed)
        setFanSpeedChild(speed)

        if (speed > 0) {
            setFan(true)
            setFanChild(true)
        }

        else {
            setFan(false)
            setFanChild(false)
        }

        let feedKey = {
            feedKey: "yolo-fan",
            value: speed.toString()
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

    return (
        <View className="fex flex-col justify-center items-center">
            <View className="my-[10px] flex justify-center items-center w-[200px] h-[200px] rounded-full bg-blue-300">
                <Text className="font-sans font-extrabold text-[30px]">{fanSpeedChild} RPM</Text>
            </View>

            <View>
                <InputSpinner
                    max={100}
                    min={0}
                    step={10}
                    colorMax={"rgba(255,16,0,0.9)"}
                    colorMin={"rgba(255,195,0,0.9)"}
                    value={fanSpeedChild}
                    onChange={(value) => changeFanSpeed(value)}
                />
            </View>

            <View className="my-[20px]">
                <ToggleSwitch
                    isOn={fanChild}
                    onColor="rgba(102, 255, 102, 1)"
                    offColor="grey"
                    label="SWITCH"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="large"
                    onToggle={changeFanStatus}
                />
            </View>


            <ScrollView className="flex flex-col px-[40px] py-[10px] h-[300px] rounded-[20px] w-[75%] bg-slate-400">
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
                <Text>2024/04/11 04:30:02PM - 0</Text>
            </ScrollView>
        </View >
    )
}

export default FanScreen