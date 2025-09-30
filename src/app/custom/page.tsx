'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useCart } from '@/components/providers/CartProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import toast from 'react-hot-toast'
import { 
  SparklesIcon, 
  HeartIcon, 
  PlusCircleIcon, 
  MinusCircleIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/solid'
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

interface CustomDrink {
  name: string
  baseFlavor: string
  secondaryFlavor: string
  sweetness: number
  iceLevel: number
  size: 'small' | 'medium' | 'large'
  addOns: string[]
}

const flavors = [
  { name: 'Strawberry', color: '#FF6B81', emoji: '🍓' },
  { name: 'Mango', color: '#FFC300', emoji: '🥭' },
  { name: 'Blueberry', color: '#4A4A9F', emoji: '🫐' },
  { name: 'Vanilla', color: '#F3E5AB', emoji: '🍦' },
  { name: 'Chocolate', color: '#7B3F00', emoji: '🍫' },
  { name: 'Spinach', color: '#4CAF50', emoji: '🥬' },
  { name: 'Kale', color: '#3D7E3D', emoji: '🥦' },
  { name: 'Pineapple', color: '#FFD700', emoji: '🍍' },
  { name: 'Coconut', color: '#E0E0E0', emoji: '🥥' },
  { name: 'Coffee', color: '#6F4E37', emoji: '☕' },
]

const addOnsOptions = [
  { name: 'Protein Powder', price: 1.50, emoji: '💪' },
  { name: 'Flax Seeds', price: 0.75, emoji: '🌾' },
  { name: 'Spirulina', price: 1.25, emoji: '🦠' },
  { name: 'Cacao Powder', price: 1.00, emoji: '🍫' },
  { name: 'Chia Seeds', price: 0.75, emoji: '🌱' },
  { name: 'Hemp Hearts', price: 1.00, emoji: '💚' },
  { name: 'Matcha Powder', price: 1.50, emoji: '🍵' },
]

const basePrices = {
  small: 4.99,
  medium: 6.99,
  large: 8.99,
}

export default function CustomDrinkBuilder() {
  const [customDrink, setCustomDrink] = useState<CustomDrink>({
    name: 'My Custom Drink',
    baseFlavor: 'Strawberry',
    secondaryFlavor: 'Vanilla',
    sweetness: 50,
    iceLevel: 50,
    size: 'medium',
    addOns: []
  })

  const [isSaving, setIsSaving] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { addItem } = useCart()
  const { user } = useAuth()

  const getFlavorColor = (flavorName: string) => {
    return flavors.find(f => f.name === flavorName)?.color || '#CCCCCC'
  }

  const getFlavorEmoji = (flavorName: string) => {
    return flavors.find(f => f.name === flavorName)?.emoji || '❓'
  }

  const updateDrinkVisualization = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.4

    ctx.clearRect(0, 0, width, height)

    // Draw the cup outline
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = '#E0E0E0'
    ctx.lineWidth = 4
    ctx.stroke()
    ctx.closePath()

    // Draw the two-tone drink
    const baseColor = getFlavorColor(customDrink.baseFlavor)
    const secondaryColor = getFlavorColor(customDrink.secondaryFlavor)

    // Bottom half (base flavor)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.clip()
    ctx.fillStyle = baseColor
    ctx.fillRect(0, centerY, width, height / 2)
    ctx.closePath()

    // Top half (secondary flavor)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.clip()
    ctx.fillStyle = secondaryColor
    ctx.fillRect(0, 0, width, height / 2)
    ctx.closePath()

    ctx.restore()
  }, [customDrink.baseFlavor, customDrink.secondaryFlavor])

  useEffect(() => {
    updateDrinkVisualization()
  }, [updateDrinkVisualization])

  const calculateTotalPrice = () => {
    let total = basePrices[customDrink.size]
    total += customDrink.addOns.length * 0.50
    return total
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCustomDrink(prev => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomDrink(prev => ({ ...prev, [name]: parseInt(value) }))
  }

  const handleSizeChange = (size: 'small' | 'medium' | 'large') => {
    setCustomDrink(prev => ({ ...prev, size }))
  }

  const handleAddOnToggle = (addOnName: string) => {
    setCustomDrink(prev => {
      const newAddOns = prev.addOns.includes(addOnName)
        ? prev.addOns.filter(item => item !== addOnName)
        : [...prev.addOns, addOnName]
      return { ...prev, addOns: newAddOns }
    })
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add custom drinks to cart')
      return
    }

    setIsSaving(true)
    try {
      const customDrinkData = {
        ...customDrink,
        price: calculateTotalPrice(),
      }

      const cartItem = {
        customDrinkId: `custom-${Date.now()}`,
        name: customDrinkData.name,
        price: customDrinkData.price,
        quantity: 1,
        image: '/images/custom-drink.svg',
        options: {
          baseFlavor: customDrinkData.baseFlavor,
          secondaryFlavor: customDrinkData.secondaryFlavor,
          size: customDrinkData.size,
          addOns: customDrinkData.addOns,
        }
      }

      addItem(cartItem)
      toast.success('Custom drink added to cart!')
    } catch (error) {
      console.error('Failed to add custom drink to cart:', error)
      toast.error('Failed to add custom drink to cart')
    } finally {
      setIsSaving(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Create Your Custom Drink
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Design your perfect two-tone healthy beverage
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="text-sm font-medium text-gray-700">Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-1 bg-rose-500 transition-all duration-300 ${
                currentStep >= 2 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="text-sm font-medium text-gray-700">Add-ons</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-1 bg-rose-500 transition-all duration-300 ${
                currentStep >= 3 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className="text-sm font-medium text-gray-700">Review</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Mobile-First Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Drink Details */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BeakerIcon className="h-6 w-6 text-rose-500 mr-3" />
                  Drink Details
                </h2>
                
                <div className="space-y-6">
                  {/* Drink Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Drink Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customDrink.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Sunset Smoothie"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-base"
                    />
                  </div>

                  {/* Base Flavor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Base Flavor
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {flavors.map(flavor => (
                        <button
                          key={flavor.name}
                          onClick={() => setCustomDrink(prev => ({ ...prev, baseFlavor: flavor.name }))}
                          className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 min-h-[80px] ${
                            customDrink.baseFlavor === flavor.name
                              ? 'border-rose-500 bg-rose-50 text-rose-800 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-rose-300'
                          }`}
                        >
                          <span className="text-2xl mb-1">{flavor.emoji}</span>
                          <span className="text-xs font-medium text-center">{flavor.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Flavor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Secondary Flavor
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {flavors.map(flavor => (
                        <button
                          key={flavor.name}
                          onClick={() => setCustomDrink(prev => ({ ...prev, secondaryFlavor: flavor.name }))}
                          className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 min-h-[80px] ${
                            customDrink.secondaryFlavor === flavor.name
                              ? 'border-pink-500 bg-pink-50 text-pink-800 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
                          }`}
                        >
                          <span className="text-2xl mb-1">{flavor.emoji}</span>
                          <span className="text-xs font-medium text-center">{flavor.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(basePrices).map(([size, price]) => (
                        <button
                          key={size}
                          onClick={() => handleSizeChange(size as 'small' | 'medium' | 'large')}
                          className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                            customDrink.size === size
                              ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          <span className="text-2xl mb-2">🥤</span>
                          <span className="font-medium capitalize text-sm">{size}</span>
                          <span className="text-xs text-gray-500">${price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sweetness & Ice Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="sweetness" className="block text-sm font-medium text-gray-700 mb-2">
                        Sweetness: {customDrink.sweetness}%
                      </label>
                      <input
                        type="range"
                        id="sweetness"
                        name="sweetness"
                        min="0"
                        max="100"
                        value={customDrink.sweetness}
                        onChange={handleSliderChange}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="iceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                        Ice Level: {customDrink.iceLevel}%
                      </label>
                      <input
                        type="range"
                        id="iceLevel"
                        name="iceLevel"
                        min="0"
                        max="100"
                        value={customDrink.iceLevel}
                        onChange={handleSliderChange}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <PlusCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                  Boosters & Add-ons
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addOnsOptions.map(addOn => (
                    <label
                      key={addOn.name}
                      className="flex items-center p-4 rounded-xl border-2 border-gray-200 bg-white cursor-pointer hover:border-green-300 transition-all duration-200 min-h-[80px]"
                    >
                      <input
                        type="checkbox"
                        checked={customDrink.addOns.includes(addOn.name)}
                        onChange={() => handleAddOnToggle(addOn.name)}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{addOn.emoji}</span>
                          <span className="font-medium text-gray-800">{addOn.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">+${addOn.price.toFixed(2)}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckIcon className="h-6 w-6 text-green-500 mr-3" />
                  Review Your Drink
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{customDrink.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Base:</span> {getFlavorEmoji(customDrink.baseFlavor)} {customDrink.baseFlavor}</p>
                      <p><span className="font-medium">Secondary:</span> {getFlavorEmoji(customDrink.secondaryFlavor)} {customDrink.secondaryFlavor}</p>
                      <p><span className="font-medium">Size:</span> {customDrink.size} (${basePrices[customDrink.size].toFixed(2)})</p>
                      <p><span className="font-medium">Sweetness:</span> {customDrink.sweetness}%</p>
                      <p><span className="font-medium">Ice:</span> {customDrink.iceLevel}%</p>
                      {customDrink.addOns.length > 0 && (
                        <div>
                          <span className="font-medium">Add-ons:</span>
                          <ul className="ml-4 mt-1">
                            {customDrink.addOns.map(addOn => (
                              <li key={addOn} className="flex items-center">
                                <span className="mr-2">{addOnsOptions.find(a => a.name === addOn)?.emoji}</span>
                                {addOn}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-rose-50 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                      <span className="text-2xl font-bold text-rose-600">${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[48px]"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors min-h-[48px]"
                >
                  Next
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={isSaving || !customDrink.name || !customDrink.baseFlavor || !customDrink.secondaryFlavor}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px]"
                >
                  {isSaving ? 'Adding to Cart...' : 'Add to Cart'}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Preview - Sticky on mobile */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Your Custom Drink Preview
                </h3>
                
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <canvas
                      ref={canvasRef}
                      width={160}
                      height={160}
                      className="rounded-full border-4 border-gray-200 shadow-inner"
                    />
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {customDrink.name || 'My Custom Drink'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {getFlavorEmoji(customDrink.baseFlavor)} {customDrink.baseFlavor} + {getFlavorEmoji(customDrink.secondaryFlavor)} {customDrink.secondaryFlavor}
                  </p>
                  <p className="text-2xl font-bold text-rose-600">
                    ${calculateTotalPrice().toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}