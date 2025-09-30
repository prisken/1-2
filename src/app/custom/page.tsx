'use client'

import { useState, useRef, useEffect } from 'react'
import { useCart } from '@/components/providers/CartProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import toast from 'react-hot-toast'
import { SparklesIcon, HeartIcon, StarIcon } from '@heroicons/react/24/solid'
import { BeakerIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

interface CustomDrink {
  name: string
  baseFlavor: string
  secondaryFlavor: string
  sweetness: number
  iceLevel: number
  size: string
  addOns: string[]
}

const flavors = [
  { value: 'strawberry', label: 'Strawberry', color: '#FF6B9D', emoji: '🍓' },
  { value: 'mango', label: 'Mango', color: '#FFB347', emoji: '🥭' },
  { value: 'blueberry', label: 'Blueberry', color: '#8A2BE2', emoji: '🫐' },
  { value: 'banana', label: 'Banana', color: '#FFD700', emoji: '🍌' },
  { value: 'pineapple', label: 'Pineapple', color: '#FFE135', emoji: '🍍' },
  { value: 'coconut', label: 'Coconut', color: '#F5F5DC', emoji: '🥥' },
  { value: 'chocolate', label: 'Chocolate', color: '#8B4513', emoji: '🍫' },
  { value: 'vanilla', label: 'Vanilla', color: '#F0E68C', emoji: '🤍' },
  { value: 'matcha', label: 'Matcha', color: '#90EE90', emoji: '🍵' },
  { value: 'coffee', label: 'Coffee', color: '#6F4E37', emoji: '☕' }
]

const addOns = [
  { name: 'Protein Powder', price: 1.50, emoji: '💪' },
  { name: 'Flax Seeds', price: 0.75, emoji: '🌾' },
  { name: 'Spirulina', price: 1.00, emoji: '🌿' },
  { name: 'Cacao Powder', price: 1.25, emoji: '🍫' },
  { name: 'Chia Seeds', price: 0.75, emoji: '🌱' },
  { name: 'Hemp Hearts', price: 1.00, emoji: '🌰' },
  { name: 'Matcha Powder', price: 1.50, emoji: '🍵' }
]

const sizes = [
  { value: 'small', label: 'Small', price: 4.99, emoji: '🥤' },
  { value: 'medium', label: 'Medium', price: 6.99, emoji: '🥤' },
  { value: 'large', label: 'Large', price: 8.99, emoji: '🥤' }
]

export default function CustomDrinkBuilder() {
  const [customDrink, setCustomDrink] = useState<CustomDrink>({
    name: 'My Custom Drink',
    baseFlavor: 'strawberry',
    secondaryFlavor: 'chocolate',
    sweetness: 50,
    iceLevel: 50,
    size: 'medium',
    addOns: []
  })
  
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { addItem } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    updateDrinkVisualization()
  }, [customDrink])

  const updateDrinkVisualization = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get flavor colors
    const baseFlavorData = flavors.find(f => f.value === customDrink.baseFlavor)
    const secondaryFlavorData = flavors.find(f => f.value === customDrink.secondaryFlavor)
    
    const baseColor = baseFlavorData?.color || '#FF6B9D'
    const secondaryColor = secondaryFlavorData?.color || '#8B4513'

    // Draw drink glass
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const glassWidth = 80
    const glassHeight = 120

    // Glass outline
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 3
    ctx.strokeRect(centerX - glassWidth/2, centerY - glassHeight/2, glassWidth, glassHeight)

    // Base flavor (bottom half)
    ctx.fillStyle = baseColor
    ctx.fillRect(centerX - glassWidth/2 + 2, centerY + 2, glassWidth - 4, glassHeight/2 - 4)

    // Secondary flavor (top half)
    ctx.fillStyle = secondaryColor
    ctx.fillRect(centerX - glassWidth/2 + 2, centerY - glassHeight/2 + 2, glassWidth - 4, glassHeight/2 - 4)

    // Add some texture/pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(centerX - glassWidth/2 + 5 + i * 15, centerY - 20, 8, 2)
    }
  }

  const calculateTotalPrice = () => {
    const basePrice = sizes.find(s => s.value === customDrink.size)?.price || 6.99
    const addOnPrice = selectedAddOns.reduce((total, addOn) => {
      const addOnData = addOns.find(a => a.name === addOn)
      return total + (addOnData?.price || 0)
    }, 0)
    return basePrice + addOnPrice
  }

  const handleSave = async () => {
    if (!user) {
      toast.error('Please login to save custom drinks')
      return
    }

    setIsSaving(true)
    try {
      const customDrinkData = {
        ...customDrink,
        addOns: selectedAddOns,
        price: calculateTotalPrice(),
      }

      // Add to cart
      const cartItem = {
        customDrinkId: `custom-${Date.now()}`,
        name: customDrinkData.name,
        price: customDrinkData.price,
        quantity: 1,
        image: '/images/custom-drink.svg',
      }
      
      addItem(cartItem)

      toast.success('Custom drink added to cart!')
    } catch (error) {
      toast.error('Failed to save custom drink')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddOnToggle = (addOnName: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnName) 
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <SparklesIcon className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold">Create Your</h1>
            <HeartIcon className="h-12 w-12 ml-4 text-pink-300" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Perfect Custom Drink</h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Design your unique two-tone healthy beverage with our interactive builder
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Customization */}
          <div className="space-y-8">
            {/* Drink Name */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BeakerIcon className="h-6 w-6 mr-2 text-blue-600" />
                Drink Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drink Name
                  </label>
                  <input
                    type="text"
                    value={customDrink.name}
                    onChange={(e) => setCustomDrink(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your drink name"
                  />
                </div>
              </div>
            </div>

            {/* Flavor Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AdjustmentsHorizontalIcon className="h-6 w-6 mr-2 text-purple-600" />
                Choose Your Flavors
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Base Flavor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Base Flavor
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {flavors.map((flavor) => (
                      <button
                        key={flavor.value}
                        onClick={() => setCustomDrink(prev => ({ ...prev, baseFlavor: flavor.value }))}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          customDrink.baseFlavor === flavor.value
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{flavor.emoji}</div>
                        <div className="text-sm font-medium text-gray-900">{flavor.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secondary Flavor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Secondary Flavor
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {flavors.map((flavor) => (
                      <button
                        key={flavor.value}
                        onClick={() => setCustomDrink(prev => ({ ...prev, secondaryFlavor: flavor.value }))}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          customDrink.secondaryFlavor === flavor.value
                            ? 'border-purple-500 bg-purple-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{flavor.emoji}</div>
                        <div className="text-sm font-medium text-gray-900">{flavor.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Size</h3>
              <div className="grid grid-cols-3 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setCustomDrink(prev => ({ ...prev, size: size.value }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      customDrink.size === size.value
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{size.emoji}</div>
                    <div className="font-semibold text-gray-900">{size.label}</div>
                    <div className="text-sm text-gray-600">${size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Add-ons</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addOns.map((addOn) => (
                  <button
                    key={addOn.name}
                    onClick={() => handleAddOnToggle(addOn.name)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedAddOns.includes(addOn.name)
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{addOn.emoji}</span>
                        <span className="font-medium text-gray-900">{addOn.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">+${addOn.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Preview & Order */}
          <div className="space-y-8">
            {/* Live Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <StarIcon className="h-6 w-6 mr-2 text-yellow-500" />
                Live Preview
              </h3>
              
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={200}
                    height={200}
                    className="border-4 border-gray-200 rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ✨ Custom
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-2xl font-bold text-gray-900">
                  {customDrink.name || 'My Custom Drink'}
                </h4>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg text-gray-600">
                    {flavors.find(f => f.value === customDrink.baseFlavor)?.emoji} {flavors.find(f => f.value === customDrink.baseFlavor)?.label}
                  </span>
                  <span className="text-gray-400">+</span>
                  <span className="text-lg text-gray-600">
                    {flavors.find(f => f.value === customDrink.secondaryFlavor)?.emoji} {flavors.find(f => f.value === customDrink.secondaryFlavor)?.label}
                  </span>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  ${calculateTotalPrice().toFixed(2)}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Price ({customDrink.size})</span>
                  <span className="font-semibold">
                    ${sizes.find(s => s.value === customDrink.size)?.price || 6.99}
                  </span>
                </div>
                
                {selectedAddOns.map(addOn => {
                  const addOnData = addOns.find(a => a.name === addOn)
                  return (
                    <div key={addOn} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">+ {addOn}</span>
                      <span className="font-semibold">+${addOnData?.price || 0}</span>
                    </div>
                  )
                })}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSave}
                disabled={isSaving || !customDrink.name || !customDrink.baseFlavor || !customDrink.secondaryFlavor}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isSaving ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding to Cart...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <HeartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}