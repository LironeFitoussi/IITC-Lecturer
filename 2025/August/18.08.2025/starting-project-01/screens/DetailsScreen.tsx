import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from "@react-navigation/native";
import { type RooStackParamList } from "../App";

const DetailsScreen = ({ route }: { route: RouteProp<RooStackParamList> }) => {
    if (!route.params?.itemId) {
        return <View>
            <Text>
                Item Not Found
            </Text>
        </View>
    }
    
    const { itemId } = route.params
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen: {itemId}</Text>
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
  },
});

export default DetailsScreen;
