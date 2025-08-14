import React from 'react';
import { View, Text, StyleSheet, Image, Button, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* StatusBar Component */}
      {/* The StatusBar component is used to control the appearance of the phone's status bar */}
      <StatusBar
        barStyle="light-content" // Sets the text color to light
        backgroundColor="#74b9ff" // Sets the background color for Android
      />
      {/* Enhanced Toolbar with Buttons */}
      <View style={styles.toolbar}>
        <Button title="Back" onPress={() => alert('Back pressed')} />
        <Text style={styles.toolbarTitle}>My Toolbar</Text>
        <Button title="Settings" onPress={() => alert('Settings pressed')} />
      </View>

      <Text style={styles.hello}>Hello World</Text>

      {/* Example of an Image from a local file */}
      <Image
        source={require('./assets/images/icon.png')}
        style={styles.localImage}
      />

      {/* Example of an Image from a URL */}
      <Image
        source={{ uri: 'https://example.com/image.png' }}
        style={styles.urlImage}
      />
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
  toolbar: {
    width: '100%',
    height: 50,
    backgroundColor: '#74b9ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  toolbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  localImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  urlImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

import { registerRootComponent } from 'expo';

registerRootComponent(App);