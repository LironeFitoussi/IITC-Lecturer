import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RestaurantCard } from '../components/RestaurantCard';
import { Restaurant, RestaurantQuery } from '../types';
import ApiService from '../services/api';
import { useCart } from '../contexts/CartContext';

const CUISINES = [
  'All',
  'Italian',
  'Chinese',
  'Indian',
  'Mexican',
  'Japanese',
  'Thai',
  'American',
  'Fast Food',
];

export default function RestaurantListScreen() {
  const navigation = useNavigation();
  const { getCartItemCount } = useCart();
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);



  const fetchRestaurants = useCallback(async (
    pageNum: number = 1,
    isRefresh: boolean = false
  ) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      }

      const query: RestaurantQuery = {
        page: pageNum,
        limit: 10,
        search: searchQuery || undefined,
        cuisine: selectedCuisine !== 'All' ? selectedCuisine : undefined,
      };

      const response = await ApiService.getRestaurants(query);
      
      if (isRefresh || pageNum === 1) {
        setRestaurants(response.restaurants);
      } else {
        setRestaurants(prev => [...prev, ...response.restaurants]);
      }

      setHasMore(response.restaurants.length === 10);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      Alert.alert('Error', 'Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery, selectedCuisine]);

  useEffect(() => {
    fetchRestaurants(1, true);
  }, [fetchRestaurants]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRestaurants(1, true);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchRestaurants(page + 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== '') {
        fetchRestaurants(1, true);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchRestaurants]);

  const handleCuisineSelect = (cuisine: string) => {
    if (cuisine !== selectedCuisine) {
      setSelectedCuisine(cuisine);
      // Show loading immediately when switching filters
      setLoading(true);
    }
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurantId: restaurant._id });
  };

  const renderRestaurant = ({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item)}
    />
  );

  const renderCuisineFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.cuisineChip,
        selectedCuisine === item && styles.selectedCuisineChip,
      ]}
      onPress={() => handleCuisineSelect(item)}
    >
      <Text
        style={[
          styles.cuisineText,
          selectedCuisine === item && styles.selectedCuisineText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={CUISINES}
        renderItem={renderCuisineFilter}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cuisineList}
      />
    </View>
  );

  const renderFooter = () => {
    if (!loading || page === 1) return null;
    
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="restaurant-outline" size={64} color="#8E8E93" />
        <Text style={styles.emptyTitle}>No restaurants found</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your search or filter criteria
        </Text>
      </View>
    );
  };

  const cartItemCount = getCartItemCount();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.topBar}>
        <Text style={styles.title}>Restaurants</Text>
        
        {cartItemCount > 0 && (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="bag-outline" size={24} color="#007AFF" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {loading && restaurants.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading restaurants...</Text>
        </View>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    paddingVertical: 12,
  },
  cuisineList: {
    paddingVertical: 8,
  },
  cuisineChip: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCuisineChip: {
    backgroundColor: '#007AFF',
  },
  cuisineText: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  selectedCuisineText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

