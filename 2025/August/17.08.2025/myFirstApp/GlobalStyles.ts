import { StyleSheet } from "react-native";
import styled from 'styled-components/native'

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        fontWeight: 700
    },
    secondTitle: {
        color: 'red',

        // For Android Devices
        elevation: 10,
        
        // For iOS Devices
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    }
})

export const Card = styled.ScrollView`
    padding: 16px;
    background-color: #6200EE;
    flex: 1;
`;