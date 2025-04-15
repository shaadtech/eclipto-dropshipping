'use client'

import { useState, useEffect } from 'react'
import { amazonClient } from '@/lib/amazon/client'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function SearchPage({
  searchParams
}: {
  searchParams: { query?: string }
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState('relevance')
  const initialQuery = searchParams.query || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (initialQuery) {
          const results = await amazonClient.searchProducts(initialQuery)
          setProducts(results)
        } else {
          const allProducts = await amazonClient.getProducts()
          setProducts(allProducts)
        }
      } catch (error) {
        console.error('Error searching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default: // 'relevance'
        return 0
    }
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {initialQuery 
          ? `Search Results for "${initialQuery}"`
          : 'All Products'
        }
      </h1>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="input flex-grow"
          />
          <button
            type="submit"
            className="btn-primary"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="text-foreground/70 mb-2 sm:mb-0">
          {products.length} {products.length === 1 ? 'result' : 'results'} found
        </p>
        
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-foreground/70">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="input"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="text-lg text-foreground/70 mb-4">No products found matching your search.</p>
          <Link href="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="card product-card h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  {product.prime && (
                    <span className="absolute top-2 right-2 badge badge-primary">Prime</span>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <span className="badge bg-red-100 text-red-800 text-sm px-3 py-1">Out of Stock</span>
                    </div>
                  )}
                  <span className="text-5xl">📦</span>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-foreground/70 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/60">{product.brand}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
