import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
  stock: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        if (existingItem.quantity + 1 > item.stock) {
          toast({
            title: "Stock limit reached",
            description: `Cannot add more ${item.title} to cart. Only ${item.stock} available.`,
            variant: "destructive",
          });
          return prevItems;
        }

        toast({
          title: "Item already in cart",
          description: `Increased quantity of ${item.title}`,
        });

        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        if (item.stock < 1) {
          toast({
            title: "Out of stock",
            description: `${item.title} is currently out of stock`,
            variant: "destructive",
          });
          return prevItems;
        }

        toast({
          title: "Added to cart",
          description: `${item.title} added to your cart`,
        });

        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => String(item.id).includes(id));

      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.title} removed from your cart`,
        });
      }
      return prevItems.filter((item) => !String(item.id).includes(id));
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => String(item.id).includes(id));
      
      if (!itemToUpdate) return prevItems;

      if (quantity > itemToUpdate.stock) {
        toast({
          title: "Stock limit reached",
          description: `Cannot add more than ${itemToUpdate.stock} items of ${itemToUpdate.title}`,
          variant: "destructive",
        });
        return prevItems;
      }

      return prevItems.map((item) =>
        String(item.id).includes(id) ? { ...item, quantity } : item
      );
    });
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
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return total + priceValue * item.quantity;
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
    getTotalItems,
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
