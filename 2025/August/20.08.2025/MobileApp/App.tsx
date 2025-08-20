import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import AsyncStorage from '@react-native-async-storage/async-storage';

registerRootComponent(App);

export default function App() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    const getTodos = async () => {
        const todos = await AsyncStorage.getItem("todos");
        setTodos(todos ? JSON.parse(todos) : []);
    }

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async () => {
        const newTodos = [...todos, input];
        await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
        setInput("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Hello World
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="~Add Todo"
                    value={input}
                    onChangeText={(text) => {
                        setInput(text);
                    }}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Add Todo" onPress={addTodo} />
                </View>
                {/* Display todos */}
                <View style={styles.todosContainer}>
                    {todos.map((todo, index) => (
                        <Text key={index}>{todo}</Text>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    content: {
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 15,
    },
    todosContainer: {
        width: '100%',
        marginBottom: 15,
    },
});
