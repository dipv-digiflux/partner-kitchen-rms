import IconMenuCalendar from '@/assets/Icon/Menu/IconMenuCalendar'
import IconMenuDashboard from '@/assets/Icon/Menu/IconMenuDashboard'
import IconMenuPages from '@/assets/Icon/Menu/IconMenuPages'
import IconMenuUsers from '@/assets/Icon/Menu/IconMenuUsers'
import { FC } from 'react'
import { IconProps } from '@/types/icon.types'

type MenuSubItem = {
  label: string
  path: string
  target?: string
  subItems?: MenuSubItem[]
}

export const MENU_DATA: {
  label?: string
  items: {
    id: string
    label: string
    icon: FC<IconProps>
    path?: string
    subItems?: MenuSubItem[]
  }[]
}[] = [
  {
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: IconMenuDashboard as FC<IconProps>,
        path: '/',
      },
      {
        id: 'user',
        label: 'Users & Permissions',
        icon: IconMenuUsers as FC<IconProps>,
        path: '/user',
      },
      {
        id: 'recipe',
        label: 'Recipe Master',
        icon: IconMenuPages as FC<IconProps>,
        path: '/recipe',
      },
      {
        id: 'weekly-menu',
        label: 'Weekly Menu',
        icon: IconMenuCalendar as FC<IconProps>,
        path: '/weekly-menu',
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        id: 'master-data',
        label: 'Master Data',
        icon: IconMenuPages as FC<IconProps>,
        subItems: [
          { label: 'Category', path: '/category' },
          { label: 'Ingredient', path: '/ingredient' },
          { label: 'Dish Type', path: '/dishtype' },
          { label: 'Cuisine', path: '/cuisine' },
          { label: 'Packaging Material', path: '/packaging-material' },
          { label: 'Variant', path: '/variant' },
          { label: 'Allergens', path: '/allergens' },
          { label: 'Barcode Place', path: '/barcode-place' },
        ],
      },
    ],
  },
]
