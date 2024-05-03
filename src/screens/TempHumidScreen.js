import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const IP = '192.168.1.9'
const PORT = '3002'

const TempHumidScreen = () => {


    return (
        <View className="my-[10px] flex justify-center items-center">
            <View className="flex justify-center items-center w-[200px] h-[200px] rounded-full bg-pink-300">
                <Text className="font-sans font-extrabold text-[50px]">12° C</Text>
            </View>
        </View>
    )
}

export default TempHumidScreen