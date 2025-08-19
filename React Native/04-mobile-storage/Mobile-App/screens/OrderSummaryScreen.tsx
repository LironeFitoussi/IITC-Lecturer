import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function OrderSummaryScreen() {
  const navigation = useNavigation();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: '',
  });
  
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [loading, setLoading] = useState(false);

  if (!cart || cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in cart</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const subtotal = cart.totalAmount;
  const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const validateAddress = (): boolean => {
    if (orderType === 'pickup') return true;
    
    if (!deliveryAddress.street.trim()) {
      Alert.alert('Error', 'Please enter a street address');
      return false;
    }
    if (!deliveryAddress.city.trim()) {
      Alert.alert('Error', 'Please enter a city');
      return false;
    }
    if (!deliveryAddress.state.trim()) {
      Alert.alert('Error', 'Please enter a state');
      return false;
    }
    if (!deliveryAddress.zipCode.trim()) {
      Alert.alert('Error', 'Please enter a ZIP code');
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress()) return;

    try {
      setLoading(true);
      
      // Simulate order placement (since we don't have payment integration)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock order ID
      const orderId = `order_${Date.now()}`;
      
      // Clear cart
      await clearCart();
      
      // Navigate to confirmation
      navigation.reset({
        index: 0,
        routes: [{ name: 'OrderConfirmation', params: { orderId } }],
      });
      
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getEstimatedTime = (): string => {
    if (orderType === 'pickup') {
      return '15-20 minutes';
    }
    return '25-35 minutes';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Order Summary</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Restaurant Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant</Text>
          <Text style={styles.restaurantName}>{cart.restaurant.name}</Text>
          <Text style={styles.restaurantAddress}>
            {cart.restaurant.address.street}, {cart.restaurant.address.city}
          </Text>
        </View>

        {/* Order Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Type</Text>
          <View style={styles.orderTypeContainer}>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === 'delivery' && styles.selectedOrderType,
              ]}
              onPress={() => setOrderType('delivery')}
            >
              <Ionicons
                name="bicycle-outline"
                size={24}
                color={orderType === 'delivery' ? '#FFFFFF' : '#007AFF'}
              />
              <Text
                style={[
                  styles.orderTypeText,
                  orderType === 'delivery' && styles.selectedOrderTypeText,
                ]}
              >
                Delivery
              </Text>
              <Text
                style={[
                  styles.orderTypeSubtext,
                  orderType === 'delivery' && styles.selectedOrderTypeText,
                ]}
              >
                25-35 min • $2.99
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === 'pickup' && styles.selectedOrderType,
              ]}
              onPress={() => setOrderType('pickup')}
            >
              <Ionicons
                name="bag-outline"
                size={24}
                color={orderType === 'pickup' ? '#FFFFFF' : '#007AFF'}
              />
              <Text
                style={[
                  styles.orderTypeText,
                  orderType === 'pickup' && styles.selectedOrderTypeText,
                ]}
              >
                Pickup
              </Text>
              <Text
                style={[
                  styles.orderTypeSubtext,
                  orderType === 'pickup' && styles.selectedOrderTypeText,
                ]}
              >
                15-20 min • Free
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Address (if delivery selected) */}
        {orderType === 'delivery' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            
            <Input
              label="Street Address"
              placeholder="123 Main Street"
              value={deliveryAddress.street}
              onChangeText={(text) =>
                setDeliveryAddress(prev => ({ ...prev, street: text }))
              }
              leftIcon="location-outline"
            />
            
            <View style={styles.addressRow}>
              <Input
                label="City"
                placeholder="City"
                value={deliveryAddress.city}
                onChangeText={(text) =>
                  setDeliveryAddress(prev => ({ ...prev, city: text }))
                }
                style={styles.cityInput}
              />
              
              <Input
                label="State"
                placeholder="State"
                value={deliveryAddress.state}
                onChangeText={(text) =>
                  setDeliveryAddress(prev => ({ ...prev, state: text }))
                }
                style={styles.stateInput}
              />
            </View>
            
            <Input
              label="ZIP Code"
              placeholder="12345"
              value={deliveryAddress.zipCode}
              onChangeText={(text) =>
                setDeliveryAddress(prev => ({ ...prev, zipCode: text }))
              }
              keyboardType="numeric"
            />
            
            <Input
              label="Delivery Instructions (Optional)"
              placeholder="e.g., Leave at door, Ring doorbell"
              value={deliveryAddress.instructions}
              onChangeText={(text) =>
                setDeliveryAddress(prev => ({ ...prev, instructions: text }))
              }
              multiline
              numberOfLines={3}
            />
          </View>
        )}

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {cart.items.map((item) => (
            <View key={item.menuItem._id} style={styles.orderItem}>
              <View style={styles.itemQuantity}>
                <Text style={styles.quantityText}>{item.quantity}x</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.menuItem.name}</Text>
                <Text style={styles.itemPrice}>
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </Text>
                {item.specialInstructions && (
                  <Text style={styles.specialInstructions}>
                    Note: {item.specialInstructions}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          {orderType === 'delivery' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
          )}
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Estimated Time */}
        <View style={styles.section}>
          <View style={styles.estimatedTimeContainer}>
            <Ionicons name="time-outline" size={20} color="#007AFF" />
            <Text style={styles.estimatedTime}>
              Estimated {orderType} time: {getEstimatedTime()}
            </Text>
          </View>
        </View>

        {/* Note about demo */}
        <View style={styles.demoNote}>
          <Text style={styles.demoNoteText}>
            📝 This is a demo app. No actual payment will be processed.
          </Text>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.checkoutSection}>
        <Button
          title={`Place Order • $${total.toFixed(2)}`}
          onPress={handlePlaceOrder}
          loading={loading}
          size="large"
          style={styles.placeOrderButton}
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
  placeholder: {
    width: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#1C1C1E',
    marginBottom: 24,
  },
  backButton: {
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#8E8E93',
  },
  orderTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  orderTypeButton: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOrderType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  orderTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 8,
  },
  selectedOrderTypeText: {
    color: '#FFFFFF',
  },
  orderTypeSubtext: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cityInput: {
    flex: 2,
  },
  stateInput: {
    flex: 1,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  itemQuantity: {
    width: 40,
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
  },
  specialInstructions: {
    fontSize: 12,
    color: '#8E8E93',
    fontStyle: 'italic',
    marginTop: 4,
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
  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
  },
  estimatedTime: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  demoNote: {
    margin: 24,
    padding: 16,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  demoNoteText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  checkoutSection: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  placeOrderButton: {
    backgroundColor: '#34C759',
  },
});

