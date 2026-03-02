import { Dispatch, SetStateAction } from 'react'

export interface ThemeContextProps {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  toggleTheme: () => void
}
