import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { useDispatch, useSelector } from 'react-redux'
import EventCard from '../components/EventCard'
import EventCardTile from '../components/EventCardTile'
import { updateEvent } from '../redux/eventAction'
import { Colors, FontSize, Margin, Padding } from '../styles'
import baseAxios from '../utils/baseAxios'

const EventListScreen = ({ navigation }) => {
  const [isGrid, setisGrid] = useState(false)
  const [loading, setloading] = useState(false)

  const user = useSelector(state => state.user)
  const eventList = useSelector(state => state.event.list)
  const dispatch = useDispatch()

  useEffect(() => {
    async function didMount() {
      setloading(true)
      const res = await baseAxios.get('/events.json')
      dispatch(updateEvent(Object.values(res.data)))
      setloading(false)
    }

    didMount()
  }, [])


  return (
    <Grid >
      <Row size={20} style={{ justifyContent: 'space-between', alignItems: 'center', padding: Padding.sm }}>
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

      <Col size={100} style={styles.container}>
        {loading && <Text style={{ alignSelf: 'center' }}>Loading..</Text>}
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
              numColumns={2} />
            :
            <FlatList
              key='list'
              data={eventList}
              renderItem={({ item, index }) => <EventCard
                item={item}
                key={index}
                onPress={() => navigation.navigate('EventDetailScreen', { item, user })} />}
              numColumns={1} />
        }
      </Col>

    </Grid>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16
  }
})

export default EventListScreen
