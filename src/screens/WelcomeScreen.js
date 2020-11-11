import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FontSize, Margin, Padding } from '../styles'
import baseAxios from '../utils/baseAxios'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/userAction'

const WelcomeScreen = (props) => {
  const [name, setName] = useState(null)
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()

  const submit = async () => {
    setloading(true)

    const users = await fetchUser()
    const user = users.find(user => user.name == name)

    if (user) {
      dispatch(updateUser(user))
      props.navigation.navigate('HomeDrawer')
    }
    else {
      const unix = moment().unix()
      const body = {
        id: unix,
        name: name
      }
      const res = await baseAxios.patch(`/users/${unix}/.json`, body)
      dispatch(updateUser(res.data))
      props.navigation.navigate('HomeDrawer')
    }
    setloading(false)

  }

  const fetchUser = async () => {
    const res = await baseAxios.get(`/users.json`)
    return Object.values(res.data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Tracker App</Text>
      <Text style={styles.text}>Enter your name</Text>
      <TextInput style={styles.input} onChangeText={text => setName(text)} value={name} />
      <Button style={styles.button} onPress={submit} title={loading ? 'Loading..' : 'Go'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Margin.sm
  },
  input: {
    width: '100%',
    padding: Padding.md,
    backgroundColor: '#fafafa',
    marginVertical: Margin.xs,
  },
  title: {
    fontSize: FontSize.xxl
  },
  text: {
    marginVertical: Margin.xs
  },
})

export default WelcomeScreen
