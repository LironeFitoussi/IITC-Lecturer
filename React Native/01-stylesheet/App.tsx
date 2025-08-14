import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from './globalStyles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello World</Text>
      <Text style={{ fontSize: 20, color: '#636e72', marginVertical: 10 }}>Inline Styled Text</Text>
      <Text style={globalStyles.globalText}>Global Styled Text</Text>
    </View>
  );
}

// Example of using StyleSheet to create styles for a component
// The StyleSheet.create method helps in creating a style object
// which can be used to style components in React Native.
// It provides better performance by reducing the number of objects created.

// Example of a container style
// This style centers its children both vertically and horizontally
// and gives a light gray background color.
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full space available
    backgroundColor: '#f5f6fa', // Light gray background color
    alignItems: 'center', // Centers children horizontally
    justifyContent: 'center', // Centers children vertically
  },
  // Example of a text style
  // This style makes the text bold, increases the font size,
  // changes the color to dark gray, and adds letter spacing.
  hello: {
    fontSize: 32, // Large font size
    fontWeight: 'bold', // Bold text
    color: '#2d3436', // Dark gray color
    letterSpacing: 1, // Adds space between letters
  },
});

import { registerRootComponent } from 'expo';

registerRootComponent(App);