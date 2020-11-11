import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeDrawer from './HomeDrawer';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="WelcomeScreen" options={{ headerShown: false }} component={WelcomeScreen} />
        <RootStack.Screen name='HomeDrawer' options={{ headerShown: false }} component={HomeDrawer} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator
