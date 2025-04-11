
import { createClient } from '@supabase/supabase-js';

// Set default values for development if environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product types
export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  imageUrl: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  stock: number;
  created_at?: string;
}

// Order types
export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'packed' | 'shipped' | 'delivered';
  shipping_address: string;
  tracking_number?: string;
  created_at: string;
  delivery_date?: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  title: string;
  imageUrl: string;
}

// User profile type
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  phone?: string;
}

// Product related functions
export const getProducts = async (category?: string, limit: number = 10): Promise<Product[]> => {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (category && category !== 'All Products') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data;
};

// Order related functions
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data || [];
};

export const createOrder = async (order: Omit<Order, 'id' | 'created_at'>): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating order:', error);
    return null;
  }
  
  return data;
};

// User profile functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data;
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id as string)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }
  
  return data;
};
