import { Product } from '@/types/product';

// This is a simulated Amazon API client that returns placeholder product data
// In a real implementation, this would use the Amazon Product Advertising API with proper credentials

// Sample product categories
export const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'toys', name: 'Toys & Games' },
  { id: 'books', name: 'Books' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'sports', name: 'Sports & Outdoors' },
  { id: 'grocery', name: 'Grocery' }
];

// Sample products data
const products: Product[] = [
  {
    id: 'B08N5KWB9H',
    title: 'Smartphone Pro Max',
    description: 'Latest smartphone with 6.7-inch Super Retina XDR display, 5G cellular, A14 Bionic chip, Pro camera system, LiDAR Scanner, and more.',
    price: 1099.99,
    rating: 4.8,
    reviewCount: 2456,
    category: 'electronics',
    images: ['/images/products/smartphone.jpg'],
    brand: 'TechBrand',
    inStock: true,
    prime: true
  },
  {
    id: 'B07ZPML7NP',
    title: 'Wireless Noise Cancelling Headphones',
    description: 'Premium noise cancelling headphones with 30 hours of battery life, touch controls, and voice assistant support.',
    price: 349.99,
    rating: 4.7,
    reviewCount: 1823,
    category: 'electronics',
    images: ['/images/products/headphones.jpg'],
    brand: 'AudioTech',
    inStock: true,
    prime: true
  },
  {
    id: 'B08J65DST5',
    title: 'Ultra HD Smart TV 55"',
    description: '55-inch 4K Ultra HD smart TV with HDR, voice remote, and streaming capabilities.',
    price: 499.99,
    rating: 4.6,
    reviewCount: 3254,
    category: 'electronics',
    images: ['/images/products/tv.jpg'],
    brand: 'VisionTech',
    inStock: true,
    prime: true
  },
  {
    id: 'B07V4GCFP9',
    title: 'Men\'s Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 129.99,
    rating: 4.5,
    reviewCount: 1256,
    category: 'fashion',
    images: ['/images/products/shoes.jpg'],
    brand: 'SportGear',
    inStock: true,
    prime: true
  },
  {
    id: 'B08L5P1PZ7',
    title: 'Women\'s Casual Dress',
    description: 'Comfortable casual dress with floral pattern, perfect for summer days.',
    price: 39.99,
    rating: 4.3,
    reviewCount: 867,
    category: 'fashion',
    images: ['/images/products/dress.jpg'],
    brand: 'StyleFashion',
    inStock: true,
    prime: false
  },
  {
    id: 'B07JW9H4J1',
    title: 'Stainless Steel Cookware Set',
    description: '10-piece stainless steel cookware set including pots, pans, and lids.',
    price: 199.99,
    rating: 4.7,
    reviewCount: 2134,
    category: 'home',
    images: ['/images/products/cookware.jpg'],
    brand: 'KitchenPro',
    inStock: true,
    prime: true
  },
  {
    id: 'B07X5JJFN7',
    title: 'Robot Vacuum Cleaner',
    description: 'Smart robot vacuum with mapping technology, app control, and voice assistant compatibility.',
    price: 299.99,
    rating: 4.4,
    reviewCount: 1543,
    category: 'home',
    images: ['/images/products/vacuum.jpg'],
    brand: 'CleanTech',
    inStock: false,
    prime: true
  },
  {
    id: 'B08HVJCW95',
    title: 'Building Blocks Set',
    description: 'Creative building blocks set with 1000+ pieces, compatible with all major brands.',
    price: 59.99,
    rating: 4.9,
    reviewCount: 3421,
    category: 'toys',
    images: ['/images/products/blocks.jpg'],
    brand: 'BuildFun',
    inStock: true,
    prime: true
  },
  {
    id: 'B07FZ8S74R',
    title: 'Remote Control Car',
    description: 'High-speed remote control car with rechargeable battery and all-terrain capabilities.',
    price: 49.99,
    rating: 4.2,
    reviewCount: 987,
    category: 'toys',
    images: ['/images/products/car.jpg'],
    brand: 'SpeedToys',
    inStock: true,
    prime: false
  },
  {
    id: 'B08PFHGZS4',
    title: 'Bestselling Novel',
    description: 'The latest bestselling novel from a renowned author, now available in hardcover.',
    price: 24.99,
    rating: 4.8,
    reviewCount: 2765,
    category: 'books',
    images: ['/images/products/book.jpg'],
    brand: 'PublishHouse',
    inStock: true,
    prime: true
  },
  {
    id: 'B07YP5X9BJ',
    title: 'Skincare Set',
    description: 'Complete skincare set with cleanser, toner, moisturizer, and serum for all skin types.',
    price: 89.99,
    rating: 4.6,
    reviewCount: 1432,
    category: 'beauty',
    images: ['/images/products/skincare.jpg'],
    brand: 'GlowBeauty',
    inStock: true,
    prime: true
  },
  {
    id: 'B08KGVB6X9',
    title: 'Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and GPS.',
    price: 129.99,
    rating: 4.5,
    reviewCount: 2198,
    category: 'sports',
    images: ['/images/products/tracker.jpg'],
    brand: 'FitTech',
    inStock: true,
    prime: true
  }
];

// Simulated Amazon API client
export class AmazonApiClient {
  // Get all products
  async getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return products;
  }

  // Get products by category
  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return products.filter(product => product.category === categoryId);
  }

  // Get product by ID
  async getProductById(productId: string): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.find(product => product.id === productId) || null;
  }

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      product => 
        product.title.toLowerCase().includes(lowercaseQuery) || 
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Get featured products (for homepage)
  async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    // Sort by rating and return top products
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Get related products
  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    
    // Get products in the same category
    return products
      .filter(p => p.category === product.category && p.id !== productId)
      .slice(0, limit);
  }
}

// Create and export a singleton instance
export const amazonClient = new AmazonApiClient();
