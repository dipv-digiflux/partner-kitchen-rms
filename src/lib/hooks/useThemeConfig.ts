import { ThemeConfigState, themeConfigStore } from '@/store'
import { useStore } from '@tanstack/react-store'

// Custom hook to use theme config store with a selector
export function useThemeConfig<T>(selector: (state: ThemeConfigState) => T): T {
  return useStore(themeConfigStore, selector)
}

// Hook to get the entire theme config state
export function useThemeConfigStore(): ThemeConfigState {
  return useStore(themeConfigStore)
}
