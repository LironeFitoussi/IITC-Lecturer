import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';;
import { RouteProp } from "@react-navigation/native";
import { type RooStackParamList } from "../App";

interface DetailsScreenProps {
    navigation: NativeStackNavigationProp<RooStackParamList, 'Details'>;
    route: RouteProp<RooStackParamList>
}

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {    
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
      <Button 
        title='Go Back'
        onPress={navigation.goBack}
        // onPress={() => navigation.replace('Home')}
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
  },
});

export default DetailsScreen;
