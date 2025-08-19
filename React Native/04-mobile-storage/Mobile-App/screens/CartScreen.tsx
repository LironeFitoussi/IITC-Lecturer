import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function CartScreen() {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  const handleQuantityChange = async (menuItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeFromCart(menuItemId);
    } else {
      await updateQuantity(menuItemId, newQuantity);
    }
  };

  const handleRemoveItem = async (menuItemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeFromCart(menuItemId)
        },
      ]
    );
  };

  const handleClearCart = async () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => clearCart()
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Sign In Required',
        'Please sign in to continue with your order.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Sign In',
            onPress: () => navigation.navigate('Login')
          },
        ]
      );
      return;
    }

    navigation.navigate('OrderSummary');
  };

  if (!cart || cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.title}>Cart</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.emptyContainer}>
          <Ionicons name="bag-outline" size={64} color="#8E8E93" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some delicious items from restaurants
          </Text>
          <Button
            title="Browse Restaurants"
            onPress={() => navigation.navigate('Tabs')}
            style={styles.browseButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const subtotal = getCartTotal();
  const deliveryFee = 2.99; // Fixed delivery fee for demo
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Restaurant Info */}
        <View style={styles.restaurantSection}>
          <Text style={styles.restaurantName}>{cart.restaurant.name}</Text>
          <Text style={styles.restaurantAddress}>
            {cart.restaurant.address.street}, {cart.restaurant.address.city}
          </Text>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsSection}>
          {cart.items.map((item) => (
            <View key={item.menuItem._id} style={styles.cartItem}>
              <View style={styles.itemContent}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.menuItem.name}</Text>
                  <Text style={styles.itemPrice}>${item.menuItem.price.toFixed(2)}</Text>
                  
                  {item.specialInstructions && (
                    <Text style={styles.specialInstructions}>
                      Note: {item.specialInstructions}
                    </Text>
                  )}
                  
                  <View style={styles.dietaryInfo}>
                    {item.menuItem.isVegetarian && (
                      <View style={styles.dietaryBadge}>
                        <Text style={styles.dietaryText}>V</Text>
                      </View>
                    )}
                    {item.menuItem.isVegan && (
                      <View style={[styles.dietaryBadge, styles.veganBadge]}>
                        <Text style={styles.dietaryText}>VG</Text>
                      </View>
                    )}
                    {item.menuItem.isGlutenFree && (
                      <View style={[styles.dietaryBadge, styles.glutenFreeBadge]}>
                        <Text style={styles.dietaryText}>GF</Text>
                      </View>
                    )}
                  </View>
                </View>

                {item.menuItem.image && (
                  <Image
                    source={{ uri: item.menuItem.image }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                )}
              </View>

              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.menuItem._id, item.quantity - 1)}
                >
                  <Ionicons name="remove" size={16} color="#007AFF" />
                </TouchableOpacity>
                
                <Text style={styles.quantity}>{item.quantity}</Text>
                
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.menuItem._id, item.quantity + 1)}
                >
                  <Ionicons name="add" size={16} color="#007AFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.menuItem._id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutSection}>
        <Button
          title={`Checkout • $${total.toFixed(2)}`}
          onPress={handleCheckout}
          size="large"
          style={styles.checkoutButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  clearButton: {
    padding: 4,
  },
  clearText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
  placeholder: {
    width: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  restaurantSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#8E8E93',
  },
  itemsSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  cartItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
    marginBottom: 8,
  },
  specialInstructions: {
    fontSize: 12,
    color: '#8E8E93',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  dietaryInfo: {
    flexDirection: 'row',
    gap: 4,
  },
  dietaryBadge: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    width: 16,
    height: 16,
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
    fontSize: 8,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#FFE5E5',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  summarySection: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    marginTop: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  summaryValue: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  checkoutSection: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  checkoutButton: {
    backgroundColor: '#34C759',
  },
});

