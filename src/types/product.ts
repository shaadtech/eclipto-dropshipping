export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  brand: string;
  inStock: boolean;
  prime: boolean;
}
