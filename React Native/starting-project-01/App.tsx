import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hello: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    letterSpacing: 1,
  },
});

import { registerRootComponent } from 'expo';

registerRootComponent(App);