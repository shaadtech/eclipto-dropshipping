'use client'

import { useState, useEffect } from 'react'
import { amazonClient } from '@/lib/amazon/client'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([])
  const [loading, setLoading] = useState(true)
  const [subtotal, setSubtotal] = useState(0)

  // Simulate loading cart items
  useEffect(() => {
    const loadCart = async () => {
      try {
        // In a real implementation, this would load cart items from local storage or a database
        const allProducts = await amazonClient.getProducts()
        // Simulate 2-3 items in cart
        const sampleCart = [
          { product: allProducts[0], quantity: 1 },
          { product: allProducts[2], quantity: 2 },
        ]
        setCartItems(sampleCart)
        
        // Calculate subtotal
        const total = sampleCart.reduce(
          (sum, item) => sum + item.product.price * item.quantity, 
          0
        )
        setSubtotal(total)
      } catch (error) {
        console.error('Error loading cart:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    )
    
    // Update subtotal
    setSubtotal(
      cartItems.reduce(
        (sum, item) => sum + item.product.price * (
          item.product.id === productId ? newQuantity : item.quantity
        ), 
        0
      )
    )
  }

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId))
    
    // Update subtotal
    setSubtotal(
      cartItems
        .filter(item => item.product.id !== productId)
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    )
  }

  const handleCheckout = () => {
    // In a real implementation, this would proceed to checkout
    alert('Proceeding to checkout...')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/products" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.product.id} className="p-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center mr-4">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.title}</h3>
                      <p className="text-sm text-gray-600">{item.product.brand}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm">{item.product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 border border-gray-300 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b border-gray-300">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 border border-gray-300 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6 text-right">
                      <div className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</div>
                      <button 
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>${(subtotal + subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>
            <div className="mt-4 text-center">
              <Link href="/products" className="text-blue-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
