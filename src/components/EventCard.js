import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Colors, FontSize, Margin, Padding } from '../styles'
import { formatDate } from '../utils/helpers'
import Section from './Section'

const EventCard = ({ item, onPress }) => {
  return (
    <Row onPress={onPress} style={styles.listContainer}>
      <Col size={50} style={{ marginRight: Margin.md, alignItems: 'center' }}>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
      </Col>
      <Col size={100} style={{ justifyContent: 'center' }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>At {item.location}</Text>
        <Section>
          <Text>{formatDate(item.date)}</Text>
        </Section>
        <Section>
          <Text style={{ color: Colors.blue }}>See More</Text>
        </Section>
      </Col>
    </Row>
  )
}

export default EventCard

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: Margin.xs,
    padding: Padding.xxs,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.darkGray
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  }
})
