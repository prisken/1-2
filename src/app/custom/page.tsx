'use client'

import { useState, useRef, useEffect } from 'react'
import { useCart } from '@/components/providers/CartProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import toast from 'react-hot-toast'

interface CustomDrink {
  name: string
  baseFlavor: string
  secondaryFlavor: string
  sweetness: number
  iceLevel: number
  size: string
  addOns: string[]
}

export default function CustomDrinkBuilder() {
  const [customDrink, setCustomDrink] = useState<CustomDrink>({
    name: '',
    baseFlavor: '',
    secondaryFlavor: '',
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

    // Draw drink visualization
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 60

    // Base layer (bottom half)
    ctx.fillStyle = '#8B4513' // Brown for base
    ctx.beginPath()
    ctx.arc(centerX, centerY + 20, radius, 0, Math.PI, true)
    ctx.fill()

    // Top layer (top half)
    ctx.fillStyle = '#FFB6C1' // Pink for secondary
    ctx.beginPath()
    ctx.arc(centerX, centerY - 20, radius, 0, Math.PI, false)
    ctx.fill()

    // Add gradient effect
    const gradient = ctx.createLinearGradient(0, centerY - 40, 0, centerY + 40)
    gradient.addColorStop(0, '#FFB6C1')
    gradient.addColorStop(0.5, '#FFA500')
    gradient.addColorStop(1, '#8B4513')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fill()
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
        image: '/images/custom-drink.jpg',
      }
      
      addItem(cartItem)

      toast.success('Custom drink added to cart!')
    } catch (error) {
      toast.error('Failed to save custom drink')
    } finally {
      setIsSaving(false)
    }
  }

  const calculateTotalPrice = () => {
    let basePrice = 0
    switch (customDrink.size) {
      case 'small': basePrice = 4.99; break
      case 'medium': basePrice = 6.99; break
      case 'large': basePrice = 8.99; break
    }
    return basePrice + (selectedAddOns.length * 0.50)
  }

  const baseFlavors = [
    'Strawberry', 'Mango', 'Banana', 'Pineapple', 'Blueberry', 'Peach'
  ]

  const secondaryFlavors = [
    'Vanilla', 'Chocolate', 'Coconut', 'Almond', 'Honey', 'Cinnamon'
  ]

  const addOnOptions = [
    'Protein Powder', 'Chia Seeds', 'Flax Seeds', 'Hemp Hearts', 
    'Spirulina', 'Matcha Powder', 'Cacao Powder'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🍹 Create Your Custom Drink
          </h1>
          <p className="text-lg text-gray-600">
            Design your perfect two-tone healthy beverage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customization Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Drink Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drink Name
                  </label>
                  <input
                    type="text"
                    value={customDrink.name}
                    onChange={(e) => setCustomDrink(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Custom Drink"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Flavor
                  </label>
                  <select
                    value={customDrink.baseFlavor}
                    onChange={(e) => setCustomDrink(prev => ({ ...prev, baseFlavor: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select base flavor</option>
                    {baseFlavors.map(flavor => (
                      <option key={flavor} value={flavor}>{flavor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Flavor
                  </label>
                  <select
                    value={customDrink.secondaryFlavor}
                    onChange={(e) => setCustomDrink(prev => ({ ...prev, secondaryFlavor: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select secondary flavor</option>
                    {secondaryFlavors.map(flavor => (
                      <option key={flavor} value={flavor}>{flavor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <div className="flex space-x-4">
                    {['small', 'medium', 'large'].map(size => (
                      <label key={size} className="flex items-center">
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={customDrink.size === size}
                          onChange={(e) => setCustomDrink(prev => ({ ...prev, size: e.target.value }))}
                          className="mr-2"
                        />
                        <span className="capitalize">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add-ons</h2>
              <div className="grid grid-cols-2 gap-2">
                {addOnOptions.map(addOn => (
                  <label key={addOn} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addOn)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAddOns(prev => [...prev, addOn])
                        } else {
                          setSelectedAddOns(prev => prev.filter(item => item !== addOn))
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{addOn}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="flex justify-center mb-4">
                <canvas
                  ref={canvasRef}
                  width={200}
                  height={200}
                  className="border border-gray-300 rounded-lg"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  {customDrink.name || 'My Custom Drink'}
                </p>
                <p className="text-gray-600">
                  {customDrink.baseFlavor} + {customDrink.secondaryFlavor}
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  ${calculateTotalPrice().toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Price ({customDrink.size})</span>
                  <span>${customDrink.size === 'small' ? '4.99' : customDrink.size === 'medium' ? '6.99' : '8.99'}</span>
                </div>
                {selectedAddOns.map(addOn => (
                  <div key={addOn} className="flex justify-between text-sm text-gray-600">
                    <span>+ {addOn}</span>
                    <span>+$0.50</span>
                  </div>
                ))}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSave}
                disabled={isSaving || !customDrink.name || !customDrink.baseFlavor || !customDrink.secondaryFlavor}
                className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}