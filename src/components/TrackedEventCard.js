import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from 'react-native-easy-grid'
import { Colors, FontSize, Margin, Padding } from '../styles'
import { formatDate } from '../utils/helpers'
import Section from './Section'

const TrackedEventCard = ({ item, onPress, onRemove }) => {
  return (
    <Row style={styles.listContainer}>
      <Col size={50} style={{ marginRight: Margin.md, alignItems: 'center' }}>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
      </Col>
      <Col size={100} style={{ justifyContent: 'center' }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>At {item.location}</Text>
        <Section>
          <Text>{formatDate(item.date)}</Text>
        </Section>
        <Row style={{ justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={onPress}>
            <Text style={{ color: Colors.blue }}>See Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRemove}>
            <Text style={{ color: Colors.red }}>Remove</Text>
          </TouchableOpacity>
        </Row>
      </Col>
    </Row>
  )
}

export default TrackedEventCard

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: Margin.xs,
    padding: Padding.xxs,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: FontSize.xs,
    color: Colors.darkGray
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  }
})
