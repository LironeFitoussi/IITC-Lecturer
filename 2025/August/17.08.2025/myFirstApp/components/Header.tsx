import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Header() {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/partial-react-logo.png')}
                style={styles.image}
            />
            <Text style={styles.title}>My Burger</Text>
            <AntDesign name="shoppingcart" size={24} color="black" />
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#03045e',
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
    }, 
    container: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    image: {
        width: 30,
        height: 30
    }
})