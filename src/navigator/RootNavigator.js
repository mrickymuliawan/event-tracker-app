import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import EventListScreen from '../screens/EventListScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="HomeScren" options={{ headerShown: false }} component={WelcomeScreen} />
        <RootStack.Screen name="EventListScreen" component={EventListScreen} />
        <RootStack.Screen name="EventDetailScreen" component={EventDetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator
