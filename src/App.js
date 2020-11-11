
import React from 'react';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import RootNavigator from './navigator/RootNavigator';
import configureStore from './redux';

const store = configureStore()
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  )
}

export default App;
