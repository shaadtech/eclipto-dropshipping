'use client'

import { useState, useEffect } from 'react'
import { categories } from '@/lib/amazon/client'
import Link from 'next/link'

export default function CategoryShowcase() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Browse our wide selection of products across various categories to find exactly what you're looking for.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                href={`/products?category=${category.id}`} 
                key={category.id}
                className="group"
              >
                <div className="card overflow-hidden product-card h-full">
                  <div className="h-40 bg-gradient-to-br from-primary-light/20 to-primary/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <span className="text-5xl z-10 group-hover:scale-110 transition-transform duration-300">
                      {getCategoryEmoji(category.id)}
                    </span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function getCategoryEmoji(categoryId: string): string {
  const emojiMap: Record<string, string> = {
    'electronics': '📱',
    'fashion': '👕',
    'home': '🏠',
    'toys': '🎮',
    'books': '📚',
    'beauty': '💄',
    'sports': '🏀',
    'grocery': '🍎'
  }
  
  return emojiMap[categoryId] || '📦'
}
