'use client'

import { useState, useEffect } from 'react'
import { amazonClient } from '@/lib/amazon/client'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function HeroSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await amazonClient.getFeaturedProducts(3)
        setFeaturedProducts(products)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-16 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary opacity-10 rounded-full translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing Products at <span className="text-secondary">ECLIPTO</span>
            </h1>
            <p className="text-xl mb-8 text-white/80 max-w-lg mx-auto lg:mx-0">
              Your one-stop dropshipping destination with thousands of quality products from Amazon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products" className="btn-secondary">
                Shop Now
              </Link>
              <Link href="/categories" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Browse Categories
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`card bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-float`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="p-4">
                        <div className="h-32 flex items-center justify-center mb-4">
                          <span className="text-4xl">📦</span>
                        </div>
                        <h3 className="font-semibold text-white mb-2 line-clamp-1">{product.title}</h3>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">${product.price.toFixed(2)}</span>
                          <div className="flex items-center">
                            <span className="text-yellow-300 mr-1">★</span>
                            <span>{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
