import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Cart, CartItem, MenuItem, Restaurant } from '../types';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (restaurant: Restaurant, menuItem: MenuItem, quantity?: number, specialInstructions?: string) => Promise<void>;
  removeFromCart: (menuItemId: string) => Promise<void>;
  updateQuantity: (menuItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize cart on app start
  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const cartData = JSON.parse(storedCart);
        setCart(cartData);
      }
    } catch (error) {
      console.error('Error initializing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async (cartData: Cart | null) => {
    try {
      if (cartData) {
        await AsyncStorage.setItem('cart', JSON.stringify(cartData));
      } else {
        await AsyncStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = async (
    restaurant: Restaurant,
    menuItem: MenuItem,
    quantity: number = 1,
    specialInstructions?: string
  ): Promise<void> => {
    try {
      let newCart: Cart;

      if (!cart) {
        // Create new cart
        newCart = {
          restaurant,
          items: [{ menuItem, quantity, specialInstructions }],
          totalAmount: menuItem.price * quantity,
        };
      } else if (cart.restaurant._id !== restaurant._id) {
        // Different restaurant - ask user to confirm cart replacement
        Toast.show({
          type: 'info',
          text1: 'Different Restaurant',
          text2: 'Your cart will be cleared to add items from this restaurant',
        });
        
        newCart = {
          restaurant,
          items: [{ menuItem, quantity, specialInstructions }],
          totalAmount: menuItem.price * quantity,
        };
      } else {
        // Same restaurant - add or update item
        const existingItemIndex = cart.items.findIndex(
          (item) => item.menuItem._id === menuItem._id
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
            specialInstructions: specialInstructions || updatedItems[existingItemIndex].specialInstructions,
          };

          newCart = {
            ...cart,
            items: updatedItems,
            totalAmount: calculateTotal(updatedItems),
          };
        } else {
          // Add new item
          const updatedItems = [...cart.items, { menuItem, quantity, specialInstructions }];
          newCart = {
            ...cart,
            items: updatedItems,
            totalAmount: calculateTotal(updatedItems),
          };
        }
      }

      setCart(newCart);
      await saveCart(newCart);

      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: `${menuItem.name} x${quantity}`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add item to cart',
      });
    }
  };

  const removeFromCart = async (menuItemId: string): Promise<void> => {
    try {
      if (!cart) return;

      const updatedItems = cart.items.filter((item) => item.menuItem._id !== menuItemId);
      
      if (updatedItems.length === 0) {
        // Cart is empty, clear it
        setCart(null);
        await saveCart(null);
      } else {
        const updatedCart = {
          ...cart,
          items: updatedItems,
          totalAmount: calculateTotal(updatedItems),
        };
        setCart(updatedCart);
        await saveCart(updatedCart);
      }

      Toast.show({
        type: 'info',
        text1: 'Item Removed',
        text2: 'Item removed from cart',
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to remove item from cart',
      });
    }
  };

  const updateQuantity = async (menuItemId: string, quantity: number): Promise<void> => {
    try {
      if (!cart || quantity < 1) return;

      const updatedItems = cart.items.map((item) =>
        item.menuItem._id === menuItemId ? { ...item, quantity } : item
      );

      const updatedCart = {
        ...cart,
        items: updatedItems,
        totalAmount: calculateTotal(updatedItems),
      };

      setCart(updatedCart);
      await saveCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update quantity',
      });
    }
  };

  const clearCart = async (): Promise<void> => {
    try {
      setCart(null);
      await saveCart(null);
      
      Toast.show({
        type: 'info',
        text1: 'Cart Cleared',
        text2: 'All items removed from cart',
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  };

  const getCartItemCount = (): number => {
    if (!cart) return 0;
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    return cart?.totalAmount || 0;
  };

  const value: CartContextType = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

