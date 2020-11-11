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
  const [orderDesc, setorderDesc] = useState(false)

  const user = useSelector(state => state.user)
  const eventList = useSelector(state => state.event.list)
  const dispatch = useDispatch()

  useEffect(() => {
    async function didMount() {
      const res = await baseAxios.get('/events.json')
      dispatch(updateEvent(Object.values(res.data)))
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
          <Text>Show Grid</Text>
          <Switch
            trackColor={{ false: Colors.lightGray, true: Colors.darkBlue }}
            thumbColor={isGrid ? Colors.blue : Colors.lightBlue}
            ios_backgroundColor={Colors.lightGray}
            onValueChange={() => setisGrid(prevState => !prevState)}
            value={isGrid}
            style={{ marginHorizontal: Margin.xs }}
          />
        </View>
      </Row>

      <Col size={100} style={styles.container}>
        <View style={{ padding: Padding.sm, flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={{ fontSize: FontSize.xl, fontWeight: 'bold' }}>Event List</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Text>Sort By Oldest</Text>
            <Switch
              trackColor={{ false: Colors.gray, true: "#81b0ff" }}
              thumbColor={isGrid ? Colors.blue : Colors.lightBlue}
              ios_backgroundColor={Colors.lightGray}
              onValueChange={() => setorderDesc(prevState => !prevState)}
              value={orderDesc}
              style={{ marginHorizontal: Margin.xs }}
            />
          </View>
        </View>
        {
          isGrid ?
            <FlatList
              key='grid'
              data={orderDesc ? eventList.slice(0).reverse() : eventList}
              renderItem={({ item, index }) => <EventCardTile
                item={item}
                key={index}
                onPress={() => navigation.navigate('EventDetailScreen', { item, user })}
              />}
              numColumns={3}
              keyExtractor={({ index }) => index} />
            :
            <FlatList
              key='list'
              data={orderDesc ? eventList.slice(0).reverse() : eventList}
              renderItem={({ item, index }) => <EventCard
                item={item}
                key={index}
                onPress={() => navigation.navigate('EventDetailScreen', { item, user })} />}
              numColumns={1}
              keyExtractor={({ index }) => index} />
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
