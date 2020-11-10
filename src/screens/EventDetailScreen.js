import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Grid, Row } from 'react-native-easy-grid'
import EventCardTile from '../components/EventCardTile'
import Section from '../components/Section'
import { FontSize, Padding } from '../styles'
import baseAxios from '../utils/baseAxios'
import { formatDate } from '../utils/helpers'

const EventDetailScreen = ({ route }) => {
  const [eventList, seteventList] = useState([])
  const [loading, setloading] = useState(false)
  const { item, user } = route.params

  useEffect(() => {
    async function didMount() {
      const res = await baseAxios.get('/events.json')
      seteventList(Object.values(res.data))
    }

    didMount()
  }, [])

  const trackEvent = async () => {
    setloading(true)
    let tracked = user.trackedEvents || []
    tracked = [...tracked, item.id]

    const res = await baseAxios.patch(`/users/${user.id}/.json`, {
      trackedEvents: tracked
    })
    if (res.data) {
      alert('Tracked Successfully')
    }
    setloading(false)
  }

  return (
    <Grid >
      <Row size={50}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </Row>
      <Row size={50}>
        <ScrollView>

          <View style={styles.container}>
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
                    'Rp.' + item.price
                }
              </Text>
            </Section>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
              <TouchableOpacity style={styles.button} onPress={trackEvent}>
                <Text style={[styles.subtitle, { color: 'white' }]}>Track Event</Text>
              </TouchableOpacity>
            </Row>

            <Section>
              <Text style={styles.subtitle}>Other Events</Text>
              <FlatList
                horizontal={true}
                key='grid'
                data={eventList}
                renderItem={({ item, index }) => <EventCardTile
                  item={item}
                  key={index}
                  onPress={() => alert((123))}
                />}
                keyExtractor={({ index }) => index} />
            </Section>
          </View>
        </ScrollView>

      </Row>

    </Grid>
  )
}

export default EventDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    resizeMode: 'cover'
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: '#546E7A'
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#2196F3',
    padding: Padding.xs,
  },
  price: {
    fontSize: FontSize.md,
    color: '#2ECC71',
  },
  date: {
    fontSize: FontSize.md,
    fontWeight: 'bold'
  }
})
