'use client'

import { useAuth } from '@/components/auth/AuthContext'
import Link from 'next/link'
import ProfileButton from '@/components/auth/ProfileButton'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              ECLIPTO
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  Products
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  Categories
                </Link>
                {user && (
                  <Link href="/orders" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                    Orders
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <ProfileButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
