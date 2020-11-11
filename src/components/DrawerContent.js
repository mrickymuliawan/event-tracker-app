import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../redux/userAction'
import { FontSize, Margin, Padding } from '../styles'
import baseAxios from '../utils/baseAxios'
import TrackedEventCard from './TrackedEventCard'

const DrawerContent = () => {
  const user = useSelector(state => state.user)
  const eventList = useSelector(state => state.event.list)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const userTracked = eventList.length > 0 ? eventList.filter(event => user.trackedEvents.includes(event.id)) : []

  const removeFromTracked = async (item) => {
    const newTracked = user.trackedEvents.filter(eventId => eventId != item.id)
    const res = await baseAxios.patch(`/users/${user.id}/.json`, {
      ...user,
      trackedEvents: newTracked
    })

    dispatch(updateUser(res.data))
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: FontSize.lg, marginVertical: Margin.sm }}>My Tracked Events</Text>
      <FlatList
        data={userTracked}
        renderItem={({ item, index }) => <TrackedEventCard
          item={item}
          key={index}
          onPress={() => navigation.navigate('EventDetailScreen', { item })}
          onRemove={() => removeFromTracked(item)}
        />}
        keyExtractor={({ index }) => index} />
    </View>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.sm
  }
})
