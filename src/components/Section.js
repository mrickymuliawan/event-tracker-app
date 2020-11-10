import React from 'react'
import { View } from 'react-native'

const Section = ({ children }) => {
  return (
    <View style={{ paddingVertical: 8 }}>
      {children}
    </View>
  )
}

export default Section
