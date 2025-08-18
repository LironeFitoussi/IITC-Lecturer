import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { type RooStackParamList } from '../App'
// type HomeScreenNavigationProp = NativeStackNavigationProp<RooStackParamList, 'Home'>;
type HomeScreenNavigationProp = DrawerNavigationProp<RooStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: {navigation: HomeScreenNavigationProp} ) => {

    const handleNavigate = (number: number) => {
        navigation.navigate("Details", { itemId: number})
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button 
        title='Go to Item 43'
        onPress={() => handleNavigate(43)}
      />
      <Button 
        title='Go to Item 55'
        onPress={() => handleNavigate(55)}
      />
      <Button 
        title='Open Drawer'
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F8F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

