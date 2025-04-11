
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase, Product } from "@/lib/supabase";

export interface CartItem {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
      
      // Subscribe to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUserId(session?.user?.id || null);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    checkAuth();
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    // If user is logged in, sync cart with Supabase
    if (userId) {
      syncCartWithSupabase();
    }
  }, [cartItems, userId]);
  
  // Sync cart with Supabase
  const syncCartWithSupabase = async () => {
    if (!userId) return;
    
    try {
      // First delete existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
        
      // Then insert new cart items
      if (cartItems.length > 0) {
        const cartItemsForDb = cartItems.map(item => ({
          user_id: userId,
          product_id: item.id,
          quantity: item.quantity,
        }));
        
        await supabase
          .from('cart_items')
          .insert(cartItemsForDb);
      }
    } catch (error) {
      console.error('Error syncing cart with Supabase:', error);
    }
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: `Increased quantity of ${item.title}`,
        });
        
        return prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        toast({
          title: "Added to cart",
          description: `${item.title} added to your cart`,
        });
        
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.title} removed from your cart`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Extract numeric value from price string (e.g., "PKR 218.00" -> 218.00)
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (priceValue * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
