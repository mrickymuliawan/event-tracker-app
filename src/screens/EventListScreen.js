import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView, FlatList, Switch } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { TextInput } from 'react-native-gesture-handler'
import BaseLayout from '../components/BaseLayout'
import EventCard from '../components/EventCard'
import EventCardTile from '../components/EventCardTile'
import Section from '../components/Section'
import { Colors, FontSize, Margin, Padding } from '../styles'
import baseAxios from '../utils/baseAxios'

const EventListScreen = ({ navigation, route }) => {
  const [eventList, seteventList] = useState([])
  const [isGrid, setisGrid] = useState(false)
  const [loading, setloading] = useState(false)
  const { user } = route.params

  useEffect(() => {
    async function didMount() {
      setloading(true)
      const res = await baseAxios.get('/events.json')
      seteventList(Object.values(res.data))
      setloading(false)
    }

    didMount()
  }, [])


  return (
    <ScrollView >
      <Section>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', padding: Padding.sm }}>
          <View>
            <Text style={{ fontSize: FontSize.xl, fontWeight: 'bold' }}>Welcome</Text>
            <Text style={{ fontSize: FontSize.xxl }}>{user.name}</Text>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>List</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isGrid ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setisGrid(prevState => !prevState)}
              value={isGrid}
              style={{ marginHorizontal: Margin.xs }}
            />
            <Text>Grid</Text>
          </View>
        </Row>
      </Section>
      {loading && <Text style={{ alignSelf: 'center' }}>Loading..</Text>}
      <View style={styles.container}>
        <View style={{ padding: Padding.sm }}>
          <Text style={{ fontSize: FontSize.xl, fontWeight: 'bold' }}>Event List</Text>
        </View>
        {
          isGrid ?
            <FlatList
              key='grid'
              data={eventList}
              renderItem={({ item, index }) => <EventCardTile
                item={item}
                key={index}
                onPress={() => navigation.navigate('EventDetailScreen', { item, user })}
              />}
              numColumns={2}
              keyExtractor={({ index }) => index} />
            :
            <FlatList
              key='list'
              data={eventList}
              renderItem={({ item, index }) => <EventCard
                item={item}
                key={index}
                onPress={() => navigation.navigate('EventDetailScreen', { item, user })} />}
              keyExtractor={({ index }) => index}
              numColumns={1} />
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16
  },

})

export default EventListScreen
