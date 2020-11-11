import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventListScreen from '../screens/EventListScreen';
import { Padding } from '../styles';
const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  const customHeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ padding: Padding.sm }}>
      <Text>
        Tracked List
      </Text>
    </TouchableOpacity>
  )
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventListScreen" component={EventListScreen} options={{
        title: 'Home',
        headerBackTitle: false,
        headerRight: customHeaderRight
      }} />
      <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} options={{
        title: 'Detail',
        headerRight: customHeaderRight
      }} />
    </Stack.Navigator>
  )
}

export default HomeStack
