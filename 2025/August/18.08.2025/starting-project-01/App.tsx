import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RooStackParamList = {
  Home: undefined;
  Details: { itemId: number }
}

const Stack = createNativeStackNavigator<RooStackParamList>()

export default function App() {
  return (
    
  );
}


import { registerRootComponent } from 'expo';

registerRootComponent(App);