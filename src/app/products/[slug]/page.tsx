'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/components/providers/CartProvider'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { StarIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  averageRating: number
  reviewCount: number
  relatedProducts: any[]
}

export default function ProductPage() {
  const t = useTranslations()
  const params = useParams()
  const slug = params?.slug as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const { addItem } = useCart()

  useEffect(() => {
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        toast.error(t('product.not_found'))
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error(t('product.not_found'))
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAddingToCart(true)
    try {
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0],
      }
      
      addItem(cartItem)
      toast.success(`${product.name} ${t('product.add_to_cart')}`)
    } catch (error) {
      toast.error(t('product.failed'))
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('product.not_found')}</h1>
          <p className="text-gray-600 mb-8">{t('product.not_found_hint')}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('product.go_back')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImage] || '/images/placeholder-drink.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.averageRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviewCount} {t('product.reviews')})
                  </span>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartOutlineIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isAddingToCart ? t('product.adding_to_cart') : t('product.add_to_cart')}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <TruckIcon className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{t('product.free_shipping')}</p>
                  <p className="text-sm text-gray-600">{t('product.on_orders_over')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{t('product.quality_guarantee')}</p>
                  <p className="text-sm text-gray-600">{t('product.fresh_ingredients')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowPathIcon className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{t('product.easy_returns')}</p>
                  <p className="text-sm text-gray-600">{t('product.return_policy')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('product.related_products')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={relatedProduct.images[0] || '/images/placeholder-drink.jpg'}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-blue-600 font-bold">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}