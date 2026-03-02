import { IconProps } from '@/types/icon.types'
import { FC } from 'react'

const IconArrowRight: FC<IconProps> = ({ className }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M9.00005 18.75C8.85505 18.75 8.71105 18.694 8.60005 18.583C8.38005 18.363 8.38005 18.007 8.60005 17.787L14.387 12L8.60005 6.213C8.38005 5.993 8.38005 5.637 8.60005 5.417C8.82005 5.197 9.17605 5.197 9.39605 5.417L15.581 11.603C15.801 11.823 15.801 12.179 15.581 12.399L9.39605 18.585C9.28805 18.692 9.14405 18.75 9.00005 18.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default IconArrowRight
