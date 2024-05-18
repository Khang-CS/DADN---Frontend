import { View, Text, TouchableOpacity, LogBox, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import env from '../api/env.json'
import axios from 'axios';
import ztoUTC from '../api/SupportFunction';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);



const IP = env.IP
const PORT = env.PORT

const LedScreen = ({ route }) => {
    const { light, setLight, lightColor, setLightColor } = route.params

    const [ledColor, setLedColor] = useState(lightColor)

    const [ledHistoryList, setLedHistoryList] = useState([])

    const [ledHistory, setLedHistory] = useState(false)

    const colorOptions = {
        red: '#ef4444',
        orange: '#f59e0b',
        yellow: '#fbbf24',
        green: '#10b981',
        blue: '#3b82f6',
        indigo: '#6366f1',
        violet: '#8b5cf6',
        black: '#000000'
    }
    // #ef4444 - red
    // #f59e0b - orange
    // #fbbf24 - yellow
    // #10b981 - green
    // #3b82f6 - blue
    // #6366f1 - indigo
    // #8b5cf6 - violet
    // #000000 - black

    const getCurrentLedColorClass = () => {
        if (ledColor == '#ef4444') {
            return 'bg-red-500'
        }

        else if (ledColor == '#f59e0b') {
            return 'bg-orange-500'
        }

        else if (ledColor == '#fbbf24') {
            return 'bg-yellow-500'
        }

        else if (ledColor == '#10b981') {
            return 'bg-green-500'
        }

        else if (ledColor == '#3b82f6') {
            return 'bg-blue-500'
        }

        else if (ledColor == '#6366f1') {
            return 'bg-indigo-500'
        }

        else if (ledColor == '#8b5cf6') {
            return 'bg-violet-500'
        }

        else {
            return 'bg-black'
        }
    }

    const hexToColorClass = (hex) => {
        if (hex == '#ef4444') {
            return 'bg-red-500'
        }

        else if (hex == '#f59e0b') {
            return 'bg-orange-500'
        }

        else if (hex == '#fbbf24') {
            return 'bg-yellow-500'
        }

        else if (hex == '#10b981') {
            return 'bg-green-500'
        }

        else if (hex == '#3b82f6') {
            return 'bg-blue-500'
        }

        else if (hex == '#6366f1') {
            return 'bg-indigo-500'
        }

        else if (hex == '#8b5cf6') {
            return 'bg-violet-500'
        }

        else {
            return 'bg-black'
        }
    }

    const changeLedColor = async (color) => {
        setLedColor(color)
        setLightColor(color)

        if (color == '#000000') {
            setLight(false)
        }
        else {
            setLight(true)
        }

        const feedKey = {
            feedKey: "yolo-led",
            value: color
        }

        await axios.post(`http://${IP}:${PORT}/adafruits/post`, feedKey).then((response) => {
            console.log('call led api', color, response.data)
        })
            .catch(error => {
                console.log(error)
            })
    }

    const getLedHistory = async () => {
        try {
            if (!ledHistory) {
                const ledHistoryResponse = await axios.get(`http://${IP}:${PORT}/adafruits/get-all/light`)
                setLedHistoryList(ledHistoryResponse.data.data)
            }
            // console.log(fanHistoryResponse.data.data[0])
            setLedHistory(!ledHistory)

        }
        catch (error) {
            console.log('Get led history fail:', error)
        }
    }
    return (
        <View className="flex flex-col items-center">
            <View className={`mt-[10px] flex justify-center items-center w-[100px] h-[100px] rounded-full ${getCurrentLedColorClass()}`}>
                <Text className='text-white font-sans font-bold'>{(ledColor == '#000000') ? 'Off' : ''}</Text>
            </View>
            <Text className='my-[10px] font-sans font-bold text-gray-500 text-xl'>Color Options</Text>

            <View className='mt-[10px] flex flex-row flex-wrap justify-between'>
                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-red-200'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.red)}
                        className='flex justify-center items-center bg-red-500 h-[70px] w-[70px] rounded-full'
                    >

                    </TouchableOpacity>
                </View>

                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-orange-200'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.orange)}
                        className='flex justify-center items-center bg-orange-500 h-[70px] w-[70px] rounded-full'
                    >

                    </TouchableOpacity>
                </View>

                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-yellow-200'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.yellow)}
                        className='flex justify-center items-center bg-yellow-500 h-[70px] w-[70px] rounded-full'
                    >

                    </TouchableOpacity>
                </View>

                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-green-200'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.green)}
                        className='flex justify-center items-center bg-green-500 h-[70px] w-[70px] rounded-full'
                    >

                    </TouchableOpacity>
                </View>

                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-blue-200'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.blue)}
                        className='flex justify-center items-center bg-blue-500 h-[70px] w-[70px] rounded-full'
                    >

                    </TouchableOpacity>
                </View>

                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-indigo-200'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.indigo)}
                        className='flex justify-center items-center bg-indigo-500 h-[70px] w-[70px] rounded-full'
                    >

                    </TouchableOpacity>
                </View>

                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-violet-200'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.violet)}
                        className='flex justify-center items-center bg-violet-500 h-[70px] w-[70px] rounded-full'
                    >

                    </TouchableOpacity>
                </View>

                <View className='lex justify-center items-center h-[120px] w-1/4  p-4 bg-gray-500'>
                    <TouchableOpacity
                        onPress={() => changeLedColor(colorOptions.black)}
                        className='flex justify-center items-center bg-black h-[70px] w-[70px] rounded-full'
                    >
                        <Text className='font-sans font-bold text-white'>Off</Text>

                    </TouchableOpacity>
                </View>


            </View>
            <Button
                onPress={getLedHistory}
                title={ledHistory ? 'Close' : 'View Led History'}
            />

            {ledHistory ? (<ScrollView className="mt-[10px] flex flex-col px-[40px] py-[10px] h-[250px] rounded-[20px] w-[80%] bg-slate-400">
                {ledHistoryList.slice(0, 20).map(item => (
                    <View className='flex flex-row py-[10px] justify-center'>
                        <View className={`w-[30px] h-[10px] ${hexToColorClass(item.value)}`}></View>
                        <Text> {ztoUTC(item.created_at)}</Text>
                    </View>

                ))}
                {/* <Text>2024/04/11 04:30:02PM - 0</Text> */}
            </ScrollView>) : (null)}

        </View >
    );
}



export default LedScreen