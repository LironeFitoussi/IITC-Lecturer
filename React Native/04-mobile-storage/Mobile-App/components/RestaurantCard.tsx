import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 24px margin on each side, 24px gap between cards

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
}) => {
  const getPriceRange = (range: number): string => {
    return '$'.repeat(range);
  };

  const formatCuisine = (cuisines: string[]): string => {
    return cuisines.slice(0, 2).join(', ') + (cuisines.length > 2 ? '...' : '');
  };

  const getDeliveryTime = (): string => {
    // Mock delivery time calculation
    return '25-35 min';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {restaurant.images && restaurant.images.length > 0 ? (
          <Image
            source={{ uri: restaurant.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="restaurant-outline" size={32} color="#8E8E93" />
          </View>
        )}
        
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>
            {restaurant.rating > 0 ? restaurant.rating.toFixed(1) : 'New'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        
        <Text style={styles.cuisine} numberOfLines={1}>
          {formatCuisine(restaurant.cuisine)}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceRange}>{getPriceRange(restaurant.priceRange)}</Text>
          </View>
          
          <Text style={styles.separator}>•</Text>
          
          <View style={styles.deliveryContainer}>
            <Ionicons name="time-outline" size={12} color="#8E8E93" />
            <Text style={styles.deliveryTime}>{getDeliveryTime()}</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={12} color="#8E8E93" />
          <Text style={styles.location} numberOfLines={1}>
            {restaurant.address.city}, {restaurant.address.state}
          </Text>
        </View>

        {restaurant.features && restaurant.features.length > 0 && (
          <View style={styles.featuresContainer}>
            {restaurant.features.includes('Delivery') && (
              <View style={styles.featureBadge}>
                <Text style={styles.featureText}>Delivery</Text>
              </View>
            )}
            {restaurant.features.includes('Takeout') && (
              <View style={styles.featureBadge}>
                <Text style={styles.featureText}>Takeout</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1C1C1E',
    marginLeft: 2,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceRange: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
  },
  separator: {
    fontSize: 12,
    color: '#8E8E93',
    marginHorizontal: 6,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 2,
    flex: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  featureBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  featureText: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: '500',
  },
});

