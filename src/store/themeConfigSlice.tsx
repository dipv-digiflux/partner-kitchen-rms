import { Store } from '@tanstack/react-store'
import i18next from 'i18next'
import themeConfig from '../theme.config'
import { type ThemeConfigState } from '@/types/store.types'
export type { ThemeConfigState }

const defaultState: ThemeConfigState = {
  isDarkMode: false,
  mainLayout: 'app',
  theme: 'light',
  menu: 'vertical',
  layout: 'full',
  rtlClass: 'ltr',
  animation: '',
  navbar: 'navbar-sticky',
  locale: 'en',
  sidebar: false,
  pageTitle: '',
  languageList: [
    { code: 'zh', name: 'Chinese' },
    { code: 'da', name: 'Danish' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'es', name: 'Spanish' },
    { code: 'sv', name: 'Swedish' },
    { code: 'tr', name: 'Turkish' },
  ],
  semidark: false,
}

const initialState: ThemeConfigState = {
  theme: (localStorage.getItem('theme') as string) || themeConfig.theme,
  menu: (localStorage.getItem('menu') as string) || themeConfig.menu,
  layout: (localStorage.getItem('layout') as string) || themeConfig.layout,
  rtlClass: (localStorage.getItem('rtlClass') as string) || themeConfig.rtlClass,
  animation: (localStorage.getItem('animation') as string) || themeConfig.animation,
  navbar: (localStorage.getItem('navbar') as string) || themeConfig.navbar,
  locale: (localStorage.getItem('i18nextLng') as string) || themeConfig.locale,
  isDarkMode: false,
  sidebar: localStorage.getItem('sidebar') === 'true' || defaultState.sidebar,
  semidark: localStorage.getItem('semidark') === 'true' || themeConfig.semidark,
  mainLayout: 'app',
  pageTitle: '',
  languageList: [
    { code: 'zh', name: 'Chinese' },
    { code: 'da', name: 'Danish' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'es', name: 'Spanish' },
    { code: 'sv', name: 'Swedish' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ae', name: 'Arabic' },
  ],
}

// Create the TanStack store
export const themeConfigStore = new Store<ThemeConfigState>(initialState)

// Action functions
export const toggleTheme = (payload?: string) => {
  const currentState = themeConfigStore.state
  payload = payload || currentState.theme

  localStorage.setItem('theme', payload)

  let isDarkMode = false
  if (payload === 'light') {
    isDarkMode = false
  } else if (payload === 'dark') {
    isDarkMode = true
  } else if (payload === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode = true
    } else {
      isDarkMode = false
    }
  }

  if (isDarkMode) {
    document.querySelector('body')?.classList.add('dark')
  } else {
    document.querySelector('body')?.classList.remove('dark')
  }

  themeConfigStore.setState((state) => ({
    ...state,
    theme: payload!,
    isDarkMode,
  }))
}

export const toggleMenu = (payload?: string) => {
  const currentState = themeConfigStore.state
  payload = payload || currentState.menu

  localStorage.setItem('menu', payload)

  themeConfigStore.setState((state) => ({
    ...state,
    menu: payload!,
    sidebar: false,
  }))
}

export const toggleLayout = (payload?: string) => {
  const currentState = themeConfigStore.state
  payload = payload || currentState.layout

  localStorage.setItem('layout', payload)

  themeConfigStore.setState((state) => ({
    ...state,
    layout: payload!,
  }))
}

export const toggleRTL = (payload?: string) => {
  const currentState = themeConfigStore.state
  payload = payload || currentState.rtlClass

  localStorage.setItem('rtlClass', payload)
  document.querySelector('html')?.setAttribute('dir', payload || 'ltr')

  themeConfigStore.setState((state) => ({
    ...state,
    rtlClass: payload!,
  }))
}

export const toggleAnimation = (payload?: string) => {
  const currentState = themeConfigStore.state
  payload = payload || currentState.animation
  payload = payload?.trim()

  localStorage.setItem('animation', payload)

  themeConfigStore.setState((state) => ({
    ...state,
    animation: payload!,
  }))
}

export const toggleNavbar = (payload?: string) => {
  const currentState = themeConfigStore.state
  payload = payload || currentState.navbar

  localStorage.setItem('navbar', payload)

  themeConfigStore.setState((state) => ({
    ...state,
    navbar: payload!,
  }))
}

export const toggleSemidark = (payload?: boolean | string) => {
  const value = payload === true || payload === 'true'

  localStorage.setItem('semidark', String(value))

  themeConfigStore.setState((state) => ({
    ...state,
    semidark: value,
  }))
}

export const toggleLocale = (payload?: string) => {
  const currentState = themeConfigStore.state
  payload = payload || currentState.locale

  i18next.changeLanguage(payload)

  themeConfigStore.setState((state) => ({
    ...state,
    locale: payload!,
  }))
}

export const toggleSidebar = () => {
  themeConfigStore.setState((state) => ({
    ...state,
    sidebar: !state.sidebar,
  }))
}

export const setPageTitle = (payload: string) => {
  document.title = `${payload} | Molt Kitchen RMS`

  themeConfigStore.setState((state) => ({
    ...state,
    pageTitle: payload,
  }))
}
