import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ColorOptions from '../components/ColorOptions';


const LedScreen = () => {
    const [color, setColor] = useState("#aabbcc");
    return (
        <View>
            <ColorOptions />
        </View>
    )
}

export default LedScreen