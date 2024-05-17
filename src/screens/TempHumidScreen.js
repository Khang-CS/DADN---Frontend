import { View, Text, Button, LogBox, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import env from '../api/env.json'
import { useNavigation } from '@react-navigation/native'

const IP = env.IP
const PORT = env.PORT

LogBox.ignoreAllLogs(); //Ignore all log notifications



const TempHumidScreen = () => {
    const navigation = useNavigation()

    const [temp, setTemp] = useState(null)
    const [humid, setHumid] = useState(null)

    const [tempUpper, setTempUpper] = useState(null)
    const [tempLower, setTempLower] = useState(null)

    const [humidUpper, setHumidUpper] = useState(null)
    const [humidLower, setHumidLower] = useState(null)




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response_temp = await axios.get(`http://${IP}:${PORT}/adafruits/get/temp`);
                const response_humid = await axios.get(`http://${IP}:${PORT}/adafruits/get/humid`);

                const tempThresholdResponse = await axios.get(`http://${IP}:${PORT}/temps/get`)
                const humidThresholdResponse = await axios.get(`http://${IP}:${PORT}/humids/get`)

                setTempLower(tempThresholdResponse.data.data[0])
                setTempUpper(tempThresholdResponse.data.data[1])

                setHumidLower(humidThresholdResponse.data.data[0])
                setHumidUpper(humidThresholdResponse.data.data[1])


                setTemp(response_temp.data.value);
                setHumid(response_humid.data.value);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };



        fetchData(); // Fetch data initially

        const interval = setInterval(fetchData, 7000); // Fetch data every 5 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);






    let content = null
    let backgroundColor = null
    if ((tempLower <= temp && temp <= tempUpper) && (humidLower <= humid && humid <= humidUpper)) {
        content = 'Normal'
        backgroundColor = 'bg-green-300'
    }

    else {
        if (temp < tempLower) {
            content = 'Temperature is low'
            backgroundColor = 'bg-blue-500'
        }

        else if (temp > tempUpper) {
            content = 'Temperature is high'
            backgroundColor = 'bg-red-500'
        }

        else if (humid < humidLower) {
            content = 'Humidity is low'
            backgroundColor = 'bg-[#B6A795]'
        }
        else {
            content = 'Humidity is High'

            backgroundColor = 'bg-[#808080]'
        }
    }

    const renderComponent = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('TempHumidHistory')}
                className={`flex justify-center items-center w-[200px] h-[200px] rounded-full ${backgroundColor}`}
            >
                <Text className="font-sans font-extrabold text-[40px]">{temp}° C</Text>
                <Text className="font-sans font-extrabold text-[20px]">H: {humid}%</Text>
                <Text className="font-sans font-extrabold text-[15px]">{content}</Text>
            </TouchableOpacity>
        )
    }





    return (
        <View className="my-[10px] flex justify-center items-center">
            {renderComponent()}

            {/* <Button
                title="click me"
                onPress={test}
            /> */}
        </View >
    )
}

export default TempHumidScreen