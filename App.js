import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation'
import Orientation from 'react-native-orientation-locker';
Orientation.lockToPortrait();
const App = () => {
  return (
    <AppNavigation />
  )
}

export default App