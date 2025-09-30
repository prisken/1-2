'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

interface InstagramPost {
  id: string
  media_url: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  caption?: string
  permalink: string
  timestamp: string
  like_count?: number
  comments_count?: number
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInstagramPosts()
  }, [])

  const fetchInstagramPosts = async () => {
    try {
      // In a real implementation, you would call your Instagram API endpoint
      // For now, we'll use mock data
      const mockPosts: InstagramPost[] = [
        {
          id: '1',
          media_url: '/images/instagram-1.jpg',
          media_type: 'IMAGE',
          caption: 'Our signature two-tone smoothie bowl! 🥤✨ #halfdrinks #healthy #smoothie',
          permalink: '#',
          timestamp: new Date().toISOString(),
          like_count: 124,
          comments_count: 23
        },
        {
          id: '2',
          media_url: '/images/instagram-2.jpg',
          media_type: 'IMAGE',
          caption: 'Custom creation by @customer_name - love the color combination! 💜💙',
          permalink: '#',
          timestamp: new Date().toISOString(),
          like_count: 89,
          comments_count: 15
        },
        {
          id: '3',
          media_url: '/images/instagram-3.jpg',
          media_type: 'IMAGE',
          caption: 'Behind the scenes of our handcrafting process 🎨 #handmade #artisan',
          permalink: '#',
          timestamp: new Date().toISOString(),
          like_count: 156,
          comments_count: 31
        },
        {
          id: '4',
          media_url: '/images/instagram-4.jpg',
          media_type: 'IMAGE',
          caption: 'New seasonal flavors are here! 🍂 Which one will you try first?',
          permalink: '#',
          timestamp: new Date().toISOString(),
          like_count: 203,
          comments_count: 42
        },
        {
          id: '5',
          media_url: '/images/instagram-5.jpg',
          media_type: 'IMAGE',
          caption: 'Team lunch featuring our latest creations 🥗 #team #healthy',
          permalink: '#',
          timestamp: new Date().toISOString(),
          like_count: 78,
          comments_count: 12
        },
        {
          id: '6',
          media_url: '/images/instagram-6.jpg',
          media_type: 'IMAGE',
          caption: 'Customer spotlight: @happy_customer sharing their favorite combo! 🌟',
          permalink: '#',
          timestamp: new Date().toISOString(),
          like_count: 134,
          comments_count: 28
        }
      ]

      setPosts(mockPosts)
    } catch (error) {
      console.error('Failed to fetch Instagram posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Follow Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              See what our community is creating and sharing
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Follow Our Journey
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            See what our community is creating and sharing
          </p>
          <a
            href="https://instagram.com/halfdrinks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243s.122-.928.49-1.243c.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243s-.122.928-.49 1.243c-.369.315-.807.49-1.297.49z"/>
            </svg>
            Follow @halfdrinks
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <HeartIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">{post.like_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">{post.comments_count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hashtag */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Share your creations with{' '}
            <span className="font-semibold text-blue-600">#halfdrinks</span>
          </p>
        </div>
      </div>
    </section>
  )
}
