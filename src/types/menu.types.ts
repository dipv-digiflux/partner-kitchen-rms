import { FC } from 'react'
import { IconProps } from './icon.types'

export interface SubItem {
  label: string
  path: string
  target?: string
  subItems?: SubItem[]
}

export interface MenuItem {
  id: string
  label: string
  icon: FC<IconProps>
  path?: string
  target?: string
  subItems?: SubItem[]
}

export interface Section {
  label?: string
  icon?: FC<IconProps>
  items: MenuItem[]
}
