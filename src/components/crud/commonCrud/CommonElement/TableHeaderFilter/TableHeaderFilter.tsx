import { Dropdown, DropdownContent, DropdownHeader, DropdownTrigger } from '@/components/ui/dropdown'
import type { HeaderFilterConfig } from './types'
import { TableHeaderFilterDropdown } from './TableHeaderFilterDropdown'
import { Filter } from 'lucide-react'
import React, { useState } from 'react'

export interface TableHeaderFilterProps {
  filterName: string
  filterValue: string | number
  onFilterChange: (name: string, value: string | number) => void
  config: HeaderFilterConfig
  disabled?: boolean
  title?: string
}

/**
 * Wrapper: funnel icon in header; click opens dropdown (shadcn-style, modal-like).
 * Dropdown: select (≤5 options → native, >5 → React Select) or custom component.
 * Icon is highlighted (e.g. orange) when filter has a value.
 */
export function TableHeaderFilter({ filterName, filterValue, onFilterChange, config, disabled, title = 'Filter' }: TableHeaderFilterProps) {
  const [open, setOpen] = useState(false)

  const hasValue = filterValue !== '' && filterValue !== undefined

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          title={title}
          className={`inline-flex items-center justify-center p-1 rounded transition-colors ${
            hasValue ? 'text-primary bg-primary/10' : 'text-gray-500 hover:text-gray-700 hover:bg-black/5 dark:hover:bg-white/10'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <Filter className="h-3.5 w-3.5" />
        </button>
      </DropdownTrigger>
      <DropdownContent align="start" sideOffset={6} className="w-auto min-w-[140px] p-3">
        <DropdownHeader title={title} onClose={() => setOpen(false)} />
        <TableHeaderFilterDropdown
          config={config}
          value={filterValue}
          onChange={(v) => {
            onFilterChange(filterName, v)
            setOpen(false)
          }}
          disabled={disabled}
          onClose={() => setOpen(false)}
        />
      </DropdownContent>
    </Dropdown>
  )
}
