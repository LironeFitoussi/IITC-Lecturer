import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

interface ProductCardProps {
    name: string,
    price: string,
    image: string,
    onAddToCart: () => void
}

export default function ProductCard({
    name,
    price,
    image,
    onAddToCart
}: ProductCardProps ) {
    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Image 
                source={{ uri: image}}
                style={{
                    width: 100,
                    height: 100
                }}
            />
            <Text>{price}$</Text>
            <Pressable 
                onPress={onAddToCart}
                hitSlop={{
                    top: 8,
                    right: 8,
                    bottom: 8,
                    left: 8
                }}
                android_ripple={{ color: '#fffff3' }}
                style={({ pressed }) => [
                    styles.button,
                    pressed && { opacity: 0.7 }
                ]}
            >
                <Text style={styles.buttonTitle}>Click Me!</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        padding: 20,
        width: 200,
        height: 200,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        // For Android Devices
        elevation: 10,

        // For iOS Devices
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    button: {
        backgroundColor: '#03045e',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 16,
        borderRadius: 5
    },
    buttonTitle: {
        color: '#fff',
        textAlign: 'center'
    }
})