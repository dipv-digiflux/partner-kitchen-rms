import { useThemeConfig, useThemeConfigStore } from '@/lib/hooks/useThemeConfig'
import { PropsWithChildren, useEffect } from 'react'
import './assets/css/global.css'
import { toggleAnimation, toggleLayout, toggleLocale, toggleMenu, toggleNavbar, toggleRTL, toggleSemidark, toggleTheme } from './store/themeConfigSlice'

function App({ children }: PropsWithChildren) {
  const themeConfig = useThemeConfigStore()
  const sidebar = useThemeConfig((state) => state.sidebar)

  useEffect(() => {
    toggleTheme(localStorage.getItem('theme') || themeConfig.theme)
    toggleMenu(localStorage.getItem('menu') || themeConfig.menu)
    toggleLayout(localStorage.getItem('layout') || themeConfig.layout)
    toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass)
    toggleAnimation(localStorage.getItem('animation') || themeConfig.animation)
    toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar)
    toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale)
    toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark)
  }, [themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark])

  return (
    <div className={`${(sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass} main-section antialiased relative font-inter text-sm font-normal`}>
      {children}
    </div>
  )
}

export default App
