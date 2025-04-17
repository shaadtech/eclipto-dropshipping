'use client'

import { useState, useEffect } from 'react'
import { amazonClient } from '@/lib/amazon/client'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredProducts = await amazonClient.getFeaturedProducts(8)
        setProducts(featuredProducts)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover our handpicked selection of top-rated products that customers love.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="card product-card h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {product.prime && (
                      <span className="absolute top-2 right-2 badge badge-primary">Prime</span>
                    )}
                    <span className="text-5xl">📦</span>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-foreground/70 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/products" className="btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
