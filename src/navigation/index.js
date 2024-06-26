// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import FanScreen from '../screens/FanScreen'
import LedScreen from '../screens/LedScreen'
import LogScreen from '../screens/LogScreen'
import DoorScreen from '../screens/DoorScreen'
import ThresholdScreen from '../screens/ThresholdScreen';
import TempHumidHistoryScreen from '../screens/TempHumidHistoryScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='Home'>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Fan" component={FanScreen} />
                <Stack.Screen name="Light" component={LedScreen} />
                <Stack.Screen name='Door' component={DoorScreen} />
                <Stack.Screen name='Threshold' component={ThresholdScreen} />
                <Stack.Screen name='TempHumidHistory' component={TempHumidHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;