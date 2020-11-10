
import React from 'react';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import RootNavigator from './navigator/RootNavigator';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootNavigator />
    </SafeAreaView>
  )
}

export default App;
