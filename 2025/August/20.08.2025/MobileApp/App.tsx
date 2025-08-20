import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { registerRootComponent } from "expo";
import AsyncStorage from '@react-native-async-storage/async-storage';

registerRootComponent(App);

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState<string>("");

    const getTodos = async () => {
        const todos = await AsyncStorage.getItem("todos");
        setTodos(todos ? JSON.parse(todos) : []);
    }

    const completeTodo = async (id: string) => {
        const newTodos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
    }

    const deleteTodo = async (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
    }

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async () => {
        if (input.trim() === "") {
            Alert.alert("Error", "Please enter a todo item");
            return;
        }
        const newTodos = [...todos, { id: Date.now().toString(), text: input.trim(), completed: false }];
        await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
        setInput("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    📝 My Todo App
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new todo..."
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={addTodo}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                    <Text style={styles.addButtonText}>Add Todo</Text>
                </TouchableOpacity>
                <FlatList
                    style={styles.todosContainer}
                    data={todos}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
                    }
                    renderItem={({ item: todo }) => (
                        <View style={styles.todoItem}>
                            <TouchableOpacity 
                                style={[styles.todoTextContainer, todo.completed && styles.completedTodo]}
                                onPress={() => completeTodo(todo.id)}
                            >
                                <Text style={[styles.todoText, todo.completed && styles.completedText]}>
                                    {todo.completed ? '✅' : '⭕'} {todo.text}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={() => deleteTodo(todo.id)}
                            >
                                <Text style={styles.deleteButtonText}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 50,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#2c3e50',
    },
    input: {
        width: '100%',
        maxWidth: 350,
        height: 50,
        borderWidth: 2,
        borderColor: '#3498db',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addButton: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#3498db',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    todosContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 350,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 40,
        fontStyle: 'italic',
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    todoTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    todoText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    completedTodo: {
        opacity: 0.6,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#7f8c8d',
    },
    deleteButton: {
        padding: 5,
    },
    deleteButtonText: {
        fontSize: 18,
    },
});
