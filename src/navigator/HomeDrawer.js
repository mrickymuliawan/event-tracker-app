import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();
const HomeDrawer = () => {
  return (
    <Drawer.Navigator drawerPosition='right' drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="HomeStack" options={{ headerShown: false }} component={HomeStack} />
    </Drawer.Navigator>
  );
}

export default HomeDrawer

