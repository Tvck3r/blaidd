'use client'
import { Input, InputProps } from '@heroui/input'
import React, { useEffect, useState } from 'react'

import { debounce } from '../utils/utils'

import { SearchIcon } from './icons'

import { SearchFilter } from '@/types'

interface SearchInputProps extends InputProps {
  onSearch: (search: SearchFilter) => void
  onClear?: () => void // Optional clear function
  delay?: number // Optional delay, default to 500ms
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, delay = 500, ...restProps }) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>()

  useEffect(() => {
    const debouncedSearch = debounce(onSearch, delay)

    return () => {
      debouncedSearch.cancel && debouncedSearch.cancel() // Clean up on unmount
    }
  }, [onSearch, delay])

  useEffect(() => {
    onSearch({ search: searchTerm })
  }, [searchTerm, onSearch])

  const onSearchChange = React.useCallback((value?: string) => setSearchTerm(value), [])

  return (
    <Input
      isClearable
      {...restProps}
      startContent={<SearchIcon />}
      value={searchTerm}
      onClear={() => onSearchChange('')}
      onValueChange={onSearchChange}
    />
  )
}

export default SearchInput
