'use client'

import { useAuth } from '@/components/auth/AuthContext'
import Link from 'next/link'

export default function ProfileButton() {
  const { user, signOut, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
    )
  }

  if (!user) {
    return (
      <Link 
        href="/login" 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Login
      </Link>
    )
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {user.email?.charAt(0).toUpperCase()}
        </div>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
        <div className="px-4 py-2 text-sm text-gray-700 border-b">
          {user.email}
        </div>
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Profile
        </Link>
        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Orders
        </Link>
        <button 
          onClick={signOut}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
