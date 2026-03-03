import { cn } from '@/lib/utils/utills'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BackButtonProps {
  to: string
  text: string
  className?: string
}

export const BackButton = ({ to, text, className }: BackButtonProps) => {
  return (
    <Link to={to} className={cn('flex items-center gap-2 text-icon-secondary-disabled hover:text-neutral-950 transition-colors w-fit', className)}>
      <ArrowLeft className="w-4 h-4" />
      <span className="fs-14 font-medium text-icon-secondary-disabled">{text}</span>
    </Link>
  )
}
