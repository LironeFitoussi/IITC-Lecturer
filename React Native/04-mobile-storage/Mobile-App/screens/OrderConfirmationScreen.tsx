import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/Button';

export default function OrderConfirmationScreen() {
  const navigation = useNavigation();

  const handleContinueShopping = () => {
    navigation.navigate('Tabs', { screen: 'Restaurants' });
  };

  const handleViewOrders = () => {
    navigation.navigate('Tabs', { screen: 'Orders' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#34C759" />
        </View>
        
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your order has been placed successfully and is being prepared.
        </Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#8E8E93" />
            <Text style={styles.infoText}>Estimated delivery: 25-35 minutes</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="receipt-outline" size={20} color="#8E8E93" />
            <Text style={styles.infoText}>Order #12345</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="View My Orders"
            onPress={handleViewOrders}
            style={styles.primaryButton}
          />
          
          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
            variant="outline"
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 12,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    marginBottom: 0,
  },
  secondaryButton: {
    marginBottom: 0,
  },
});
