import React from 'react';
import { StatusBar } from 'react-native';
import {  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

type RooStackParamList = {
  Home: undefined;
  Details: { itemId: number }
}

const Stack = createNativeStackNavigator<RooStackParamList>()

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerTitleAlign: 'center'
        }}>
          <Stack.Screen name='Home' component={HomeScreen} options={{
            title: 'בית'
          }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{
            title: 'פרטים'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


import { registerRootComponent } from 'expo';

registerRootComponent(App);