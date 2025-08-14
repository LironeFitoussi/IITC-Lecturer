import React from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello World</Text>
      
      {/* Example of a Button component */}
      {/* The Button component is used to trigger actions when pressed */}
      <Button
        title="Press Me"
        onPress={() => alert('Button Pressed!')}
      />

      {/* Example of an Image component */}
      {/* The Image component is used to display images from various sources */}
      <Image
        source={require('./assets/images/icon.png')}
        style={{ width: 50, height: 50 }}
      />

      {/* Example of a TextInput component */}
      {/* The TextInput component is used to accept user input */}
      <TextInput
        style={styles.input}
        placeholder="Type here..."
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

import { registerRootComponent } from 'expo';

registerRootComponent(App);