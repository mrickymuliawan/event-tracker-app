import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'

const BaseLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView contentContainerStyle={styles.container}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16
  },
  safeAreaStyle: {
    flex: 1
  }
})
export default BaseLayout

