import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
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
// const Tab = createBottomTabNavigator<RooStackParamList>()
const Drawer = createDrawerNavigator<RooStackParamList>()

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home' screenOptions={({ route, navigation }) => ({
          drawerIcon: ({ color, size }) => {
            const icons: any = {
              Home: 'home',
              Search: 'search',
              Profile: 'person',
              Details: 'information-circle'
            }

            return <Ionicons name={icons[route.name]} size={size} color={color} />
          },
          headerLeft: () => (
            <Ionicons
              name='menu'
              size={24}
              color='#fff'
              style={{
                marginLeft: 12,
                marginRight: 12
              }}
              onPress={navigation.openDrawer}
              />
          ),
          drawerType: 'front',
          swipeEnabled: false,
          headerTitleAlign: 'center',
          drawerActiveTintColor: '#6200ee',
          drawerInactiveTintColor: '#999',
          drawerStyle: { width: 200 }
        })}>
          <Drawer.Screen name='Home' component={HomeScreen} options={{
            title: 'בית',
            headerStyle: {
              backgroundColor: '#6200ee'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'left' // TODO Check  On  that
          }} />
          <Drawer.Screen name="Details" component={DetailsScreen} options={{
            title: 'פרטים'
          }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{
            title: 'פרופיל'
          }} />
          <Drawer.Screen name="Search" component={SearchScreen} options={{
            title: 'חיפוש'
          }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}




registerRootComponent(App);




// screenOptions={({ route }) => ({
//   tabBarIcon: ({ color, size }) => {
//     const icons: any = {
//       Home: 'home',
//       Search: 'search',
//       Profile: 'person',
//       Details: 'information-circle'
//     }

//     return <Ionicons name={icons[route.name]} size={size} color={color} />
//   },