import { View, Text, ScrollView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputSpinner from "react-native-input-spinner";
import ToggleSwitch from 'toggle-switch-react-native';
import { LogBox } from 'react-native';
import env from '../api/env.json'
import ztoUTC from '../api/SupportFunction';

import axios from 'axios'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const IP = env.IP
const PORT = env.PORT

const FanScreen = ({ route }) => {

    const { fan, setFan, fanSpeed, setFanSpeed } = route.params

    const [fanChild, setFanChild] = useState(fan)
    const [fanSpeedChild, setFanSpeedChild] = useState(fanSpeed)
    const [fanHistory, setFanHistory] = useState(false)
    const [fanHistoryList, setFanHistoryList] = useState([])

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
            console.log('call fan api fan speed: ', speed, response.data)
        })
            .catch(error => {
                console.log(error)
            })
        //
    }

    const getFanHistory = async () => {
        try {
            if (!fanHistory) {
                const fanHistoryResponse = await axios.get(`http://${IP}:${PORT}/adafruits/get-all/fan`)
                setFanHistoryList(fanHistoryResponse.data.data)
            }
            // console.log(fanHistoryResponse.data.data[0])
            setFanHistory(!fanHistory)

        }
        catch (error) {
            console.log('Get fan history fail:', error)
        }
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
            <Button
                title={fanHistory ? 'Close' : 'View Fan History'}
                onPress={getFanHistory}
            />

            {fanHistory ? (<ScrollView className="mt-[10px] flex flex-col px-[40px] py-[10px] h-[300px] rounded-[20px] w-[75%] bg-slate-400">
                {fanHistoryList.slice(0, 20).map(item => (
                    <Text className='m-[10px]'>{item.value} - {ztoUTC(item.created_at)}</Text>
                ))}
                {/* <Text>2024/04/11 04:30:02PM - 0</Text> */}
            </ScrollView>) : (null)}


        </View >
    )
}

export default FanScreen