import React from 'react'
import { Image, StyleSheet, Text, } from 'react-native'
import { Col } from 'react-native-easy-grid'
import { Colors, FontSize, Margin, Padding } from '../styles'
import Section from './Section'

const EventCardTile = ({ item, onPress }) => {
  return (
    <Col onPress={onPress} style={styles.listContainer}>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <Section>
        <Text style={styles.title}>{item.name}</Text>
      </Section>
    </Col>
  )
}

export default EventCardTile

const styles = StyleSheet.create({
  listContainer: {
    margin: Margin.xxs,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: Padding.xxs,
    maxWidth: 200
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover'
  }
})
