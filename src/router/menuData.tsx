import { Section } from '@/types/menu.types'
import IconMenuCalendar from '@/assets/Icon/Menu/IconMenuCalendar'
import IconMenuContacts from '@/assets/Icon/Menu/IconMenuContacts'
import IconMenuDashboard from '@/assets/Icon/Menu/IconMenuDashboard'
import IconMenuUsers from '@/assets/Icon/Menu/IconMenuUsers'

export const MENU_DATA: Section[] = [
  {
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: IconMenuDashboard,
        path: '/',
      },
      {
        id: 'users',
        label: 'Users',
        icon: IconMenuUsers,
        path: '/user',
      },
      {
        id: 'events',
        label: 'Events',
        icon: IconMenuCalendar,
        path: '/event',
      },
      {
        id: 'permissions',
        label: 'Permissions',
        icon: IconMenuContacts,
        path: '/permissions',
      },
    ],
  },
]
