import { LayoutGrid, UserCircle } from 'lucide-react'

export const apiRoutListData = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    path: '/',
  },
  {
    heading: 'Pages',
  },
  {
    title: 'Profile',
    icon: UserCircle,
    children: [{ title: 'User', path: '/user' }],
  },
]
