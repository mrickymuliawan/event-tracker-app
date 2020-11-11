import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { useDispatch, useSelector } from 'react-redux'
import EventCardTile from '../components/EventCardTile'
import Section from '../components/Section'
import { updateUser } from '../redux/userAction'
import { Colors, FontSize, Padding } from '../styles'
import baseAxios from '../utils/baseAxios'
import { currencyFormat, formatDate } from '../utils/helpers'

const EventDetailScreen = ({ route, navigation }) => {
  const user = useSelector(state => state.user)
  const eventList = useSelector(state => state.event.list)
  const dispatch = useDispatch()
  const { item } = route.params

  const trackEvent = async () => {
    let tracked = user.trackedEvents || []

    if (tracked.indexOf(item.id) === -1) {
      tracked = [...tracked, item.id]
    }

    const res = await baseAxios.patch(`/users/${user.id}/.json`, {
      ...user,
      trackedEvents: tracked
    })

    dispatch(updateUser(res.data))

    if (res.data) {
      alert('Added to Tracked List')
    }
  }

  return (

    <Grid >
      <Row size={50}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </Row>
      <Col size={100} style={styles.container}>
        <ScrollView>
          <Section>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>At {item.location}</Text>
          </Section>
          <Section>
            <Text style={styles.price}>
              {
                item.price == 0 ?
                  'Free Entry'
                  :
                  'IDR ' + currencyFormat(item.price)
              }
            </Text>
          </Section>

          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.date}>{formatDate(item.date)}</Text>
            {
              (user.trackedEvents || []).some(eventId => eventId == item.id) ?
                <TouchableOpacity style={styles.buttonDisabled} disabled onPress={trackEvent}>
                  <Text style={[styles.subtitle]}>Tracked</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={trackEvent}>
                  <Text style={[styles.subtitle, { color: 'white' }]}>Track Event</Text>
                </TouchableOpacity>
            }

          </Row>

          <Section>
            <Text style={styles.subtitle}>Other Events</Text>

            <FlatList
              horizontal={true}
              data={eventList}
              renderItem={({ item, index }) => <EventCardTile
                item={item}
                key={index}
                onPress={() => navigation.navigate('EventDetailScreen', { item })}
              />}
              keyExtractor={({ index }) => index} />

          </Section>
        </ScrollView>
      </Col>

    </Grid>
  )
}

export default EventDetailScreen

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    resizeMode: 'contain'
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: '#546E7A'
  },
  button: {
    borderRadius: 8,
    backgroundColor: Colors.darkOrange,
    padding: Padding.xs,
  },
  buttonDisabled: {
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    padding: Padding.xs,
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.green,
  },
  date: {
    fontSize: FontSize.md,
    fontWeight: 'bold'
  }
})
