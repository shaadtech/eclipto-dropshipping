'use client'

import { useState, useEffect } from 'react'
import { amazonClient } from '@/lib/amazon/client'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await amazonClient.getProductById(params.id)
        setProduct(productData)
        
        if (productData) {
          const related = await amazonClient.getRelatedProducts(productData.id)
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    // In a real implementation, this would add the product to the cart
    alert(`Added ${quantity} of ${product?.title} to cart`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-foreground/70 mb-4">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="btn-primary">
            Return to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-primary hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </Link>
      </div>
      
      <div className="card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="h-64 w-64 flex items-center justify-center">
              <span className="text-8xl">📦</span>
            </div>
          </div>
          
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-foreground/70 mb-4">Brand: {product.brand}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-foreground/70">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            
            <div className="text-2xl font-bold mb-4 text-primary">${product.price.toFixed(2)}</div>
            
            <div className="mb-4">
              <div className="flex items-center">
                <span className={`mr-2 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.prime && (
                  <span className="badge badge-primary">Prime</span>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-foreground/70 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  className="px-3 py-2 border border-input rounded-l-md bg-background hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 px-3 py-2 border-t border-b border-input text-center focus:outline-none disabled:opacity-50"
                  disabled={!product.inStock}
                />
                <button 
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={!product.inStock}
                  className="px-3 py-2 border border-input rounded-r-md bg-background hover:bg-gray-100 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-primary flex-grow"
              >
                Add to Cart
              </button>
              <button
                className="btn-outline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-border pt-4">
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <p className="text-foreground/70 text-sm">
                Free shipping on orders over $35. Estimated delivery: 2-5 business days.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'description' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'specifications' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'reviews' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Description</h2>
                <p className="text-foreground/80">{product.description}</p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b border-border pb-2">
                    <span className="font-medium">Brand:</span> {product.brand}
                  </div>
                  <div className="border-b border-border pb-2">
                    <span className="font-medium">Category:</span> {amazonClient.categories.find(c => c.id === product.category)?.name || product.category}
                  </div>
                  <div className="border-b border-border pb-2">
                    <span className="font-medium">In Stock:</span> {product.inStock ? 'Yes' : 'No'}
                  </div>
                  <div className="border-b border-border pb-2">
                    <span className="font-medium">Prime Eligible:</span> {product.prime ? 'Yes' : 'No'}
                  </div>
                  <div className="border-b border-border pb-2">
                    <span className="font-medium">Product ID:</span> {product.id}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-500 text-3xl mr-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{product.rating} out of 5</div>
                    <div className="text-foreground/70">{product.reviewCount} customer ratings</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Simulated reviews */}
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500 mr-2">★★★★★</div>
                      <span className="font-medium">Great product!</span>
                    </div>
                    <p className="text-foreground/70 mb-2">This product exceeded my expectations. The quality is excellent and it arrived quickly.</p>
                    <div className="text-sm text-foreground/60">John D. - April 10, 2025</div>
                  </div>
                  
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500 mr-2">★★★★☆</div>
                      <span className="font-medium">Good value for money</span>
                    </div>
                    <p className="text-foreground/70 mb-2">I'm happy with my purchase. It works as described and the price is reasonable.</p>
                    <div className="text-sm text-foreground/60">Sarah M. - April 5, 2025</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500 mr-2">★★★★★</div>
                      <span className="font-medium">Highly recommended</span>
                    </div>
                    <p className="text-foreground/70 mb-2">This is my second purchase and I'm still impressed with the quality. Fast shipping too!</p>
                    <div className="text-sm text-foreground/60">Michael P. - March 28, 2025</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                <div className="card product-card h-full flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    {relatedProduct.prime && (
                      <span className="absolute top-2 right-2 badge badge-primary">Prime</span>
                    )}
                    <span className="text-4xl">📦</span>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-md mb-1 line-clamp-2">{relatedProduct.title}</h3>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
