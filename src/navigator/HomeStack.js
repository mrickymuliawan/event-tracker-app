import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import EventDetailScreen from '../screens/EventDetailScreen';
import EventListScreen from '../screens/EventListScreen';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventListScreen" component={EventListScreen} options={{
        title: 'Home',
        headerBackTitle: false
      }} />
      <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} options={{
        title: 'Detail'
      }} />
    </Stack.Navigator>
  )
}

export default HomeStack
