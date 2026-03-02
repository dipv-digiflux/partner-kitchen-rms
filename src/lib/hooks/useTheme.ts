import { ThemeContext } from '@/lib/context/ThemeContext'
import { useContext } from 'react'

export const useTheme = () => useContext(ThemeContext)
