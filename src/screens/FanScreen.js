import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputSpinner from "react-native-input-spinner";
import ToggleSwitch from 'toggle-switch-react-native';

const FanScreen = ({ route }) => {
    // console.log(route.params)
    const { fanStatus, setFanStatus } = route.params

    const [fan, setFan] = useState(fanStatus)

    const [fanSpeed, setFanSpeed] = useState(10)

    const changeFanStatus = () => {
        setFanStatus(fan)
        setFan(!fan)
    }

    return (
        <View className="fex flex-col justify-center items-center">
            <View className="my-[10px] flex justify-center items-center w-[200px] h-[200px] rounded-full bg-blue-300">
                <Text className="font-sans font-extrabold text-[30px]">{fanSpeed} RPM</Text>
            </View>

            <View>
                <InputSpinner
                    max={20}
                    min={1}
                    step={1}
                    colorMax={"rgba(255,16,0,0.9)"}
                    colorMin={"rgba(255,195,0,0.9)"}
                    value={fanSpeed}
                    onChange={(fanSpeed) => {
                        setFanSpeed(fanSpeed)
                        console.log(fanSpeed);
                    }}
                />
            </View>

            <View className="my-[20px]">
                <ToggleSwitch
                    isOn={fan}
                    onColor="rgba(102, 255, 102, 1)"
                    offColor="grey"
                    label="SWITCH"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="large"
                    onToggle={changeFanStatus}
                />
            </View>
            <View>
                <Text>FAN LOG</Text>
            </View>
        </View>
    )
}

export default FanScreen