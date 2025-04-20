export type ProductCategory = 
  | 'Fruits'
  | 'Vegetables'
  | 'Bakery'
  | 'Dairy'
  | 'Juice'
  | 'Groceries';

export interface Product {
  id: string;
  title: string;
  price: string;
  imageUrls: string[];
  description: string;
  origin: string;
  quality: string;
  storage: string;
  packaging: string;
  weight: string;
  category: ProductCategory;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {} 