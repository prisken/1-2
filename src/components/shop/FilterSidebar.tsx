'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface Filters {
  category: string
  search: string
  minPrice: string
  maxPrice: string
  sortBy: string
  sortOrder: string
}

interface FilterSidebarProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
}

const categories = [
  { value: '', labelKey: 'all_categories' },
  { value: 'SMOOTHIES', labelKey: 'cat_smoothies' },
  { value: 'JUICES', labelKey: 'cat_juices' },
  { value: 'TEAS', labelKey: 'cat_teas' },
  { value: 'COFFEE', labelKey: 'cat_coffee' },
  { value: 'ENERGY_DRINKS', labelKey: 'cat_energy' },
  { value: 'CUSTOM', labelKey: 'cat_custom' },
]

const priceRanges = [
  { value: '', labelKey: 'any_price' },
  { value: '0-10', labelKey: 'under_10' },
  { value: '10-20', labelKey: '10_20' },
  { value: '20-30', labelKey: '20_30' },
  { value: '30-50', labelKey: '30_50' },
  { value: '50+', labelKey: 'over_50' },
]

const healthBenefits = [
  'Antioxidants',
  'Protein',
  'Vitamins',
  'Low Sugar',
  'Organic',
  'Gluten Free',
  'Dairy Free',
  'Vegan',
]

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const t = useTranslations('shop')
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    benefits: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handlePriceRangeChange = (range: string) => {
    if (range === '') {
      onFilterChange({ minPrice: '', maxPrice: '' })
    } else {
      const [min, max] = range.split('-')
      onFilterChange({ 
        minPrice: min, 
        maxPrice: max === '+' ? '' : max 
      })
    }
  }

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
    })
  }

  const hasActiveFilters = filters.category || filters.search || filters.minPrice || filters.maxPrice

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{t('filters')}</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {t('clear_all')}
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('search')}
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder={t('search_products')}
          className="input w-full"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
        >
          {t('category')}
          {expandedSections.category ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.value} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={filters.category === category.value}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{t(category.labelKey)}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
        >
          {t('price_range')}
          {expandedSections.price ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={
                    range.value === '' 
                      ? !filters.minPrice && !filters.maxPrice
                      : range.value === `${filters.minPrice}-${filters.maxPrice || '+'}`
                  }
                  onChange={() => handlePriceRangeChange(range.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{t(range.labelKey)}</span>
              </label>
            ))}
            
            {/* Custom Price Range */}
            <div className="pt-2 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder={t('min')}
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                  className="input text-sm"
                />
                <input
                  type="number"
                  placeholder={t('max')}
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                  className="input text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Health Benefits Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('benefits')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
        >
          {t('health_benefits')}
          {expandedSections.benefits ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.benefits && (
          <div className="space-y-2">
            {healthBenefits.map((benefit) => (
              <label key={benefit} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{benefit}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">{t('active_filters')}</h3>
          <div className="space-y-1">
            {filters.category && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{t('category')}: {t(categories.find(c => c.value === filters.category)?.labelKey || 'all_categories')}</span>
                <button
                  onClick={() => onFilterChange({ category: '' })}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            )}
            {filters.search && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Search: "{filters.search}"</span>
                <button
                  onClick={() => onFilterChange({ search: '' })}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                </span>
                <button
                  onClick={() => onFilterChange({ minPrice: '', maxPrice: '' })}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


