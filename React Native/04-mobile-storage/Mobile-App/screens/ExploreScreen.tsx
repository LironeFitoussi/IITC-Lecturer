import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Ionicons name="compass-outline" size={48} color="#007AFF" />
          <Text style={styles.sectionTitle}>Discover New Restaurants</Text>
          <Text style={styles.sectionSubtitle}>
            Find amazing restaurants and cuisines near you
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="star-outline" size={32} color="#FF9500" />
          <Text style={styles.featureTitle}>Featured Cuisines</Text>
          <Text style={styles.featureText}>Italian • Chinese • Mexican • Indian</Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="location-outline" size={32} color="#34C759" />
          <Text style={styles.featureTitle}>Popular Areas</Text>
          <Text style={styles.featureText}>Downtown • City Center • Uptown</Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="time-outline" size={32} color="#FF3B30" />
          <Text style={styles.featureTitle}>Quick Delivery</Text>
          <Text style={styles.featureText}>Fast delivery from your favorite restaurants</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  content: {
    flex: 1,
  },
  section: {
    alignItems: 'center',
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
