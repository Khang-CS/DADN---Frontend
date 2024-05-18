import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import env from '../api/env.json'
import ztoUTC from '../api/SupportFunction'

import axios from 'axios'

const IP = env.IP
const PORT = env.PORT

const DoorScreen = () => {

    const [doorHistoryList, setDoorHistoryList] = useState([])

    const [showDoorHistory, setShowDoorHistory] = useState(false)

    const getDoorHistory = async () => {
        try {
            const getDoorResponse = await axios.get(`http://${IP}:${PORT}/adafruits/get-all/door`)
            console.log(getDoorResponse.data.data)

            setDoorHistoryList(getDoorResponse.data.data)
            setShowDoorHistory(true)
        }
        catch (error) {
            console.log('Get door history failed: ', error)
        }
    }

    return (
        <View className='p-8 flex-col items-center justify-center'>
            <TouchableOpacity
                onPress={getDoorHistory}
                className='h-[50px] w-[100px] bg-red-300 rounded-[20px] flex-col items-center justify-center'>
                <Text>View Door History</Text>
            </TouchableOpacity>

            {showDoorHistory ? (<ScrollView className="mt-[10px] flex flex-col px-[40px] py-[10px] h-[300px] rounded-[20px] w-[75%] bg-slate-400">
                {doorHistoryList.slice(0, 20).map(item => (
                    <Text className='m-[10px]'>{item.value == '1' ? 'Open' : 'Close'} - {ztoUTC(item.created_at)}</Text>
                ))}
                {/* <Text>2024/04/11 04:30:02PM - 0</Text> */}
            </ScrollView>) : (null)}
        </View>
    )
}

export default DoorScreen