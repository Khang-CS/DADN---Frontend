import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LineChart, LinearGradient, Stop } from "react-native-gifted-charts";
import env from '../api/env.json'
import axios from 'axios';
import ztoUTC from '../api/SupportFunction';

const IP = env.IP
const PORT = env.PORT

const TempHumidHistoryScreen = () => {
    const [tempDrawList, setTempDrawList] = useState([])
    const [tempPrintList, setTempPrintList] = useState([])
    const [showTemp, setShowTemp] = useState(false)

    const [humidDrawList, setHumidDrawList] = useState([])
    const [humidPrintList, setHumidPrintList] = useState([])
    const [showHumid, setShowHumid] = useState(false)




    const getTempHistory = async () => {
        try {
            const tempHistoryResponse = await axios.get(`http://${IP}:${PORT}/adafruits/get-all/temp`)
            const tempHistoryList = tempHistoryResponse.data.data

            const drawList = tempHistoryList.slice(0, 20).map((item) => {
                return {
                    value: Number(item.value),
                }
            })


            setShowTemp(true)
            setShowHumid(false)

            setTempDrawList(drawList)
            setTempPrintList(tempHistoryList)
        }
        catch (error) {
            console.log('get temperature history failed: ', error)
        }
    }

    const getHumidHistory = async () => {
        try {
            const humidHistoryResponse = await axios.get(`http://${IP}:${PORT}/adafruits/get-all/humid`)
            const humidHistoryList = humidHistoryResponse.data.data

            const drawList = humidHistoryList.slice(0, 20).map((item) => {
                return {
                    value: Number(item.value),
                }
            })


            setShowTemp(false)
            setShowHumid(true)

            setHumidDrawList(drawList)
            setHumidPrintList(humidHistoryList)
        }
        catch (error) {
            console.log('get humidity history failed: ', error)
        }
    }

    return (
        <View className='flex-col items-center justify-center'>
            <View className='mt-[20px] flex-row items-center justify-center'>
                <View
                    className='h-[100px] w-1/2 items-center justify-center'
                >
                    <TouchableOpacity
                        onPress={getTempHistory}
                        className='h-[80px] w-[90%] bg-yellow-200 rounded-[20px] items-center justify-center'>
                        <Text className='font-sans font-bold'>View Temperature</Text>
                        <Text className='font-sans font-bold'>History</Text>
                    </TouchableOpacity>

                </View>

                <View
                    className='h-[100px] w-1/2 items-center justify-center'
                >
                    <TouchableOpacity
                        onPress={getHumidHistory}
                        className='h-[80px] w-[90%] bg-indigo-400 rounded-[20px] items-center justify-center'>
                        <Text className='font-sans font-bold'>View Humidity</Text>
                        <Text className='font-sans font-bold'>History</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {showTemp ? (
                <View className='mt-[10px] flex-col items-center justify-center h-[550px] w-[100%]'>
                    <Text className=' text-[20px]'>Temperature Graph</Text>
                    <LineChart
                        data={tempDrawList}

                        spacing={16}
                        isAnimated
                    />
                    <Text className=' text-[20px] my-[10px] '>20 latest values</Text>
                    <ScrollView className="w-[75%] bg-slate-400">
                        {tempPrintList.slice(0, 20).map(item => (
                            <Text className='m-[10px]'>{item.value}°C - {ztoUTC(item.created_at)}</Text>
                        ))}
                    </ScrollView>
                </View>
            ) : (null)}


            {showHumid ? (
                <View className='mt-[10px] flex-col items-center justify-center h-[550px] w-[100%]'>
                    <Text className=' text-[20px]'>Humidity Graph</Text>
                    <LineChart
                        data={humidDrawList}

                        spacing={16}
                        isAnimated
                    />
                    <Text className=' text-[20px] my-[10px] '>20 latest values</Text>
                    <ScrollView className="w-[75%] bg-slate-400">
                        {humidPrintList.slice(0, 20).map(item => (
                            <Text className='m-[10px]'>{item.value}% - {ztoUTC(item.created_at)}</Text>
                        ))}
                    </ScrollView>
                </View>
            ) : (null)}
        </View>
    )
}

export default TempHumidHistoryScreen