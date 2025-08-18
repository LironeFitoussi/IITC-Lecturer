import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Screen (Dummy)</Text>
      <Text>This is a placeholder for the search screen.</Text>
      <Ionicons 
        name='filter'
        size={24}
        color='green'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default SearchScreen;
