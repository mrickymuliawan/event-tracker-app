
import React from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import RootNavigator from './navigator/RootNavigator';
import configureStore from './redux';
LogBox.ignoreLogs(['Warning:'])

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
