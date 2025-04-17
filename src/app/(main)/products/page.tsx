'use client'

import { useState, useEffect } from 'react'
import { amazonClient, categories } from '@/lib/amazon/client'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [sortOption, setSortOption] = useState('featured')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [primeOnly, setPrimeOnly] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await amazonClient.getProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    // Filter products based on all criteria
    let filtered = [...products]
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      )
    }
    
    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    
    // Price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock)
    }
    
    // Prime filter
    if (primeOnly) {
      filtered = filtered.filter(product => product.prime)
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // In a real implementation, this would sort by date
        filtered.sort((a, b) => b.id.localeCompare(a.id))
        break
      default: // 'featured'
        // Keep default order
        break
    }
    
    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, priceRange, inStockOnly, primeOnly, sortOption, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is handled by the useEffect
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value)
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number]
      newRange[index] = value
      return newRange
    })
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="card p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Price Range</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="input w-full"
                />
                <input
                  type="number"
                  min={priceRange[0]}
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="input w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="card p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Filter By</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                  className="mr-2"
                />
                In Stock Only
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={() => setPrimeOnly(!primeOnly)}
                  className="mr-2"
                />
                Prime Eligible
              </label>
            </div>
          </div>
          
          <div className="card p-4">
            <h2 className="text-xl font-semibold mb-4">Sort By</h2>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="input w-full"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-foreground/70">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setFilteredProducts([...products])}
                className="text-sm text-primary hover:underline"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-lg text-foreground/70">No products found. Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
      </div>
    </div>
  )
}
