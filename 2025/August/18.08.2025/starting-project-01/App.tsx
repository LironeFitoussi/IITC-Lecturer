import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
export type RooStackParamList = {
  Home: undefined;
  Details: { itemId: number }
  Profile: undefined;
  Search: undefined;
}

// const Stack = createNativeStackNavigator<RooStackParamList>()
const Tab = createBottomTabNavigator<RooStackParamList>()

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons: any = {
              Home: 'home',
              Search: 'search',
              Profile: 'person',
              Details: 'information-circle'
            }

            return <Ionicons name={icons[route.name]} size={size} color={color} />
          },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#999'
        })}>
          <Tab.Screen name='Home' component={HomeScreen} options={{
            title: 'בית',
            headerStyle: {
              backgroundColor: '#6200ee'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'left' // TODO Check  On  that
          }} />
          <Tab.Screen name="Details" component={DetailsScreen} options={{
            title: 'פרטים'
          }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{
            title: 'פרופיל'
          }} />
          <Tab.Screen name="Search" component={SearchScreen} options={{
            title: 'חיפוש'
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}




registerRootComponent(App);