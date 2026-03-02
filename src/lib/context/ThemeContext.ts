import { createContext } from 'react'
import { ThemeContextProps } from '@/types/context.types'

export const ThemeContext = createContext<ThemeContextProps | null>(null)
