'use client'

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const sortOptions = [
  { value: 'createdAt', order: 'desc', label: 'Newest First' },
  { value: 'createdAt', order: 'asc', label: 'Oldest First' },
  { value: 'price', order: 'asc', label: 'Price: Low to High' },
  { value: 'price', order: 'desc', label: 'Price: High to Low' },
  { value: 'name', order: 'asc', label: 'Name: A to Z' },
  { value: 'name', order: 'desc', label: 'Name: Z to A' },
]

interface SortDropdownProps {
  sortBy: string
  sortOrder: string
  onSortChange: (sortBy: string, sortOrder: string) => void
}

export default function SortDropdown({ sortBy, sortOrder, onSortChange }: SortDropdownProps) {
  const selectedOption = sortOptions.find(
    option => option.value === sortBy && option.order === sortOrder
  ) || sortOptions[0]

  const handleChange = (option: typeof sortOptions[0]) => {
    onSortChange(option.value, option.order)
  }

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border border-gray-300">
          <span className="block truncate">{selectedOption.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {sortOptions.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}


