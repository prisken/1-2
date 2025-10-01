'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ProductCard from '@/components/shop/ProductCard'
import FilterSidebar from '@/components/shop/FilterSidebar'
import SortDropdown from '@/components/shop/SortDropdown'
import Pagination from '@/components/shop/Pagination'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  images: string[]
  averageRating: number
  reviewCount: number
  shortDescription?: string
  category: string
  tags: string[]
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function ShopPage() {
  const t = useTranslations('shop')
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc'
  })
  const [tempFilters, setTempFilters] = useState<typeof filters | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [filters, pagination.page])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters
      })

      const url = `/api/products?${params}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
        setPagination(data.pagination || { page: 1, limit: 12, total: 0, totalPages: 0, hasNext: false, hasPrev: false })
      }
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">{t('title')}</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={filters.search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm sm:text-base"
              />
            </div>
            <button
              onClick={() => {
                setTempFilters(filters)
                setShowMobileFilters(true)
              }}
              className="flex items-center space-x-2 px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors min-h-[48px]"
            >
              <FunnelIcon className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">{t('filters')}</span>
            </button>
          </div>
        </div>
        <div className="lg:hidden border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto">
            <div className="flex gap-2 min-w-full">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => handleFilterChange({ category: cat.value })}
                  className={`whitespace-nowrap px-3 py-2 rounded-full text-sm border ${
                    (filters.category === cat.value)
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {t(cat.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileFilters(false)}>
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{t('filters')}</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <FilterSidebar 
                filters={tempFilters || filters} 
                onFilterChange={(newFilters) => setTempFilters(prev => ({ ...(prev || filters), ...newFilters }))} 
              />
            </div>
            <div className="fixed bottom-0 right-0 w-full max-w-sm bg-white border-t border-gray-200 p-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setTempFilters({ ...filters, category: '', search: '', minPrice: '', maxPrice: '' })}
                className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium w-1/3"
              >
                {t('clear_all')}
              </button>
              <button
                onClick={() => {
                  if (tempFilters) handleFilterChange(tempFilters)
                  setShowMobileFilters(false)
                }}
                className="px-4 py-3 rounded-xl bg-rose-600 text-white font-semibold flex-1"
              >
                {t('apply') || 'Apply'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div className="flex items-center justify-between">
                <p className="text-sm sm:text-base text-gray-600">
                  {t('results_count', { count: products.length, total: pagination.total })}
                </p>
                <div className="lg:hidden">
                  <SortDropdown 
                    sortBy={filters.sortBy} 
                    sortOrder={filters.sortOrder} 
                    onSortChange={(sortBy, sortOrder) => handleFilterChange({ sortBy, sortOrder })} 
                  />
                </div>
              </div>
              <div className="hidden lg:block">
                <SortDropdown 
                  sortBy={filters.sortBy} 
                  sortOrder={filters.sortOrder} 
                  onSortChange={(sortBy, sortOrder) => handleFilterChange({ sortBy, sortOrder })} 
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">{t('no_products')}</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto">
                  {t('try_adjusting')}
                </p>
                <button
                  onClick={() => handleFilterChange({ 
                    category: '', 
                    search: '', 
                    minPrice: '', 
                    maxPrice: '', 
                    sortBy: 'createdAt', 
                    sortOrder: 'desc' 
                  })}
                  className="inline-flex items-center px-4 py-3 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-colors text-sm sm:text-base min-h-[48px]"
                >
                  {t('clear_all')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {pagination.totalPages > 1 && (
              <div className="mt-8 sm:mt-12">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Filter pill on mobile */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <button
          aria-label="Open filters"
          onClick={() => setShowMobileFilters(true)}
          className="shadow-lg inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700"
        >
          <FunnelIcon className="h-5 w-5" />
          Filter
        </button>
      </div>
    </div>
  )
}

// removed re-export; this file now contains the localized shop page implementation


