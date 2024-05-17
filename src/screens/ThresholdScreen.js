import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputSpinner from "react-native-input-spinner";
import env from '../api/env.json'
import axios from 'axios';

const IP = env.IP
const PORT = env.PORT


const ThresholdScreen = () => {

    const [tempUpper, setTempUpper] = useState(null)
    const [tempLower, setTempLower] = useState(null)

    const [humidUpper, setHumidUpper] = useState(null)
    const [humidLower, setHumidLower] = useState(null)

    useEffect(() => {
        // Function to be called on mount
        getCurrentThreshold()
    }, []);


    const getCurrentThreshold = async () => {
        try {
            const tempThresholdResponse = await axios.get(`http://${IP}:${PORT}/temps/get`)
            const humidThresholdResponse = await axios.get(`http://${IP}:${PORT}/humids/get`)

            setTempLower(tempThresholdResponse.data.data[0])
            setTempUpper(tempThresholdResponse.data.data[1])

            setHumidLower(humidThresholdResponse.data.data[0])
            setHumidUpper(humidThresholdResponse.data.data[1])

        } catch (error) {
            console.log(error)
        }

    }

    const saveThreshold = async () => {
        try {
            const tempThresholdInput = {
                "lowerThreshold": tempLower,
                "upperThreshold": tempUpper,
                "feedKey": "yolo-temp"
            }

            const humidThresholdInput = {
                "lowerThreshold": humidLower,
                "upperThreshold": humidUpper,
                "feedKey": "yolo-humid"
            }
            const saveTempThreshold = await axios.post(`http://${IP}:${PORT}/temps/set`, tempThresholdInput)
            const saveHumidThreshold = await axios.post(`http://${IP}:${PORT}/humids/set`, humidThresholdInput)

            console.log(saveTempThreshold.data.message)
            console.log(saveHumidThreshold.data.message)

        }
        catch (error) {
            console.log('Save threshold failed: ', error)
        }
    }



    return (
        <View className='flex flex-col justify-center items-center'>

            <View className='mt-[50px] flex-col justify-center items-center p-10'>
                <Text className='text-xl font-sans font-bold my-[5px]'>SET THRESHOLD FORM</Text>

                <Text className='mb-[6px] text-[15px] font-sans'>Lower Temperature Threshold</Text>
                <InputSpinner
                    // style={Styles.spinner}
                    value={tempLower}
                    min={0}
                    max={100}
                    step={1}
                    skin="round"
                    showBorder={true}
                    editable={false}
                    onChange={value => {
                        setTempLower(value)
                    }}
                />

                <Text className='mt-[20px] mb-[6px] text-[15px] font-sans'>Upper Temperature Threshold</Text>
                <InputSpinner
                    // style={Styles.spinner}
                    value={tempUpper}
                    min={0}
                    max={100}
                    step={1}
                    skin="round"
                    showBorder={true}
                    editable={false}
                    onChange={value => {
                        setTempUpper(value)
                    }}
                />

                <Text className='mt-[20px] mb-[6px] text-[15px] font-sans'>Lower Humidity Threshold</Text>
                <InputSpinner
                    // style={Styles.spinner}
                    value={humidLower}
                    min={0}
                    max={100}
                    step={1}
                    skin="round"
                    showBorder={true}
                    editable={false}
                    onChange={value => {
                        setHumidLower(value)
                    }}
                />

                <Text className='mt-[20px] mb-[6px] text-[15px] font-sans'>Upper Humidity Threshold</Text>
                <InputSpinner
                    // style={Styles.spinner}
                    value={humidUpper}
                    min={0}
                    max={100}
                    step={1}
                    skin="round"
                    showBorder={true}
                    editable={false}
                    onChange={value => {
                        setHumidUpper(value)
                    }}
                />

                <TouchableOpacity
                    className='border-red-300 border-4 mt-[50px] w-[100px] h-[40px] bg-red-500 rounded-full flex-col justify-center items-center'
                    onPress={saveThreshold}
                >
                    <Text className='font-sans font-bold '>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ThresholdScreen