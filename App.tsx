
import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebaseInitApp } from './Enviroment'

//Screens 
import HomeScreen from './screens/Home';
import ReservationScreen from './screens/Reservation';
import LogingScreen from './screens/Loging';
import SplashScreen from "./screens/SplashScreen";
import ProfileScreen from "./screens/Profile";

//Disable all app warnings 
console.disableYellowBox = true;

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();
const Stack = createStackNavigator();

function appStack() {
  return (
    <AppStack.Navigator initialRouteName="Home" >
      <AppStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <AppStack.Screen name="Reservation" component={ReservationScreen} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}

export default function App() {
  firebaseInitApp();
  const [isLogged, changeUserStatus] = useState(false);

  useEffect(() => {
    getUserStatus();
  }, []);

  async function getUserStatus() {
    try {
      const value = await AsyncStorage.getItem('@alquimiaUser')
      const user = JSON.parse(value);
      if (value !== 'null' && user && user.uid) {
        changeUserStatus(true);
      }
    } catch (e) {
      changeUserStatus(false);
      console.log('error', e)
    }
  }

  return (
    <NavigationContainer>
      {
        isLogged ?
          <Drawer.Navigator initialRouteName="App">
            <Drawer.Screen name="App" component={appStack} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
          </Drawer.Navigator> :
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Loging" component={LogingScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
