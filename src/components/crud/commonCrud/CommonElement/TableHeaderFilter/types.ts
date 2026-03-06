import type { OptionType } from '@/types/components.types'
import type { ComponentType } from 'react'

/** Select filter: ≤5 options → native dropdown, >5 → React Select */
export interface HeaderFilterSelectConfig {
  type: 'select'
  options: OptionType[]
  placeholder?: string
}

/** Custom filter: pass your own component. Receives value, onChange, and any extra props from config. */
export interface HeaderFilterCustomConfig {
  type: 'custom'
  /** Your component; receives { value, onChange, ...restProps } from this config */
  component: ComponentType<HeaderFilterCustomProps>
  [key: string]: unknown
}

export interface HeaderFilterCustomProps {
  value: string | number | (string | number)[]
  onChange: (value: string | number | (string | number)[]) => void
  disabled?: boolean
  [key: string]: unknown
}

export type HeaderFilterConfig = HeaderFilterSelectConfig | HeaderFilterCustomConfig

export function isSelectConfig(c: HeaderFilterConfig): c is HeaderFilterSelectConfig {
  return c.type === 'select'
}

export function isCustomConfig(c: HeaderFilterConfig): c is HeaderFilterCustomConfig {
  return c.type === 'custom'
}
