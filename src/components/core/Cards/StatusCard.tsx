import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface StatusCardProps extends ComponentPropsWithoutRef<'div'> {
  title: string
  description: string
  statusColor?: string
  dotShadowColor?: string
}

const StatusCard = ({ title, description, statusColor = '#FFB905', dotShadowColor = 'rgba(255,185,5,0.2)', className, ...props }: StatusCardProps) => {
  return (
    <div className={twMerge('bg-surface-primary p-5 rounded-xl flex items-start gap-4 border border-border-gray-00000014', className)} {...props}>
      <div
        className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
        style={{
          backgroundColor: statusColor,
          boxShadow: `0 0 0 2px ${dotShadowColor}`,
        }}
      />
      <div>
        <div className="font-semibold text-sm text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 mt-0.5">{description}</div>
      </div>
    </div>
  )
}

export default StatusCard
