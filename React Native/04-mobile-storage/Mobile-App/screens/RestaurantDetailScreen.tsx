import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant, MenuItem } from '../types';
import ApiService from '../services/api';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

export default function RestaurantDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantId } = route.params as { restaurantId: string };
  const { addToCart, getCartItemCount } = useCart();
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantData();
    }
  }, [restaurantId]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      
      const [restaurantData, menuData, categoriesData] = await Promise.all([
        ApiService.getRestaurant(restaurantId!),
        ApiService.getMenuItems(restaurantId!),
        ApiService.getMenuCategories(restaurantId!),
      ]);
      
      setRestaurant(restaurantData);
      setMenuItems(menuData.menuItems);
      setCategories(['All', ...categoriesData]);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      Alert.alert('Error', 'Failed to load restaurant details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (menuItem: MenuItem) => {
    if (!restaurant) return;
    
    try {
      await addToCart(restaurant, menuItem);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const getFilteredMenuItems = (): MenuItem[] => {
    if (selectedCategory === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === selectedCategory);
  };

  const getPriceRange = (range: number): string => {
    return '$'.repeat(range);
  };

  const formatHours = (hours: any): string => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = hours[today];
    
    if (!todayHours || todayHours.closed) {
      return 'Closed today';
    }
    
    return `${todayHours.open} - ${todayHours.close}`;
  };

  const renderMenuItem = (item: MenuItem) => (
    <View key={item._id} style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.menuItemDetails}>
            <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.menuItemTime}>• {item.preparationTime} min</Text>
          </View>
          
          <View style={styles.dietaryInfo}>
            {item.isVegetarian && (
              <View style={styles.dietaryBadge}>
                <Text style={styles.dietaryText}>V</Text>
              </View>
            )}
            {item.isVegan && (
              <View style={[styles.dietaryBadge, styles.veganBadge]}>
                <Text style={styles.dietaryText}>VG</Text>
              </View>
            )}
            {item.isGlutenFree && (
              <View style={[styles.dietaryBadge, styles.glutenFreeBadge]}>
                <Text style={styles.dietaryText}>GF</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.menuItemRight}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
          )}
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading restaurant...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Restaurant not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const cartItemCount = getCartItemCount();
  const filteredMenuItems = getFilteredMenuItems();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerImageContainer}>
          {restaurant.images && restaurant.images.length > 0 ? (
            <Image
              source={{ uri: restaurant.images[0] }}
              style={styles.headerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderHeader}>
              <Ionicons name="restaurant-outline" size={64} color="#8E8E93" />
            </View>
          )}
          
          <TouchableOpacity style={styles.backIconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          {cartItemCount > 0 && (
            <TouchableOpacity
              style={styles.cartIconButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Ionicons name="bag-outline" size={24} color="#FFFFFF" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          
          <View style={styles.restaurantMeta}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>
                {restaurant.rating > 0 ? restaurant.rating.toFixed(1) : 'New'}
              </Text>
            </View>
            
            <Text style={styles.separator}>•</Text>
            <Text style={styles.priceRange}>{getPriceRange(restaurant.priceRange)}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.cuisine}>{restaurant.cuisine.join(', ')}</Text>
          </View>
          
          <Text style={styles.description}>{restaurant.description}</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#8E8E93" />
            <Text style={styles.infoText}>{formatHours(restaurant.hours)}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#8E8E93" />
            <Text style={styles.infoText}>
              {restaurant.address.street}, {restaurant.address.city}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} color="#8E8E93" />
            <Text style={styles.infoText}>{restaurant.contact.phone}</Text>
          </View>
        </View>

        {/* Category Filter */}
        {categories.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedCategoryChip,
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu</Text>
          
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map(renderMenuItem)
          ) : (
            <View style={styles.emptyMenu}>
              <Text style={styles.emptyMenuText}>No items available in this category</Text>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#1C1C1E',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  headerImageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  placeholderHeader: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIconButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
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
  restaurantInfo: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginLeft: 4,
  },
  separator: {
    fontSize: 14,
    color: '#8E8E93',
    marginHorizontal: 8,
  },
  priceRange: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
  },
  cuisine: {
    fontSize: 14,
    color: '#8E8E93',
  },
  description: {
    fontSize: 16,
    color: '#1C1C1E',
    lineHeight: 22,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
    flex: 1,
  },
  categoryList: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  categoryChip: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  menuSection: {
    padding: 24,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 8,
  },
  menuItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
  },
  menuItemTime: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  dietaryInfo: {
    flexDirection: 'row',
    gap: 4,
  },
  dietaryBadge: {
    backgroundColor: '#34C759',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  veganBadge: {
    backgroundColor: '#FF9500',
  },
  glutenFreeBadge: {
    backgroundColor: '#007AFF',
  },
  dietaryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuItemRight: {
    alignItems: 'center',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMenu: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyMenuText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});

