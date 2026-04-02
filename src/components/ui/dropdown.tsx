'use client'

import { cn } from '@/lib/utils/utills'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'

/**
 * Common dropdown (shadcn-style) using Radix Popover.
 * Modal-like UI: optional backdrop, rounded panel, shadow. Use for filters, menus, etc.
 */

const Dropdown = PopoverPrimitive.Root

const DropdownTrigger = PopoverPrimitive.Trigger

const DropdownAnchor = PopoverPrimitive.Anchor

const DropdownContent = React.forwardRef<React.ComponentRef<typeof PopoverPrimitive.Content>, React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>>(
  ({ className, align = 'start', sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        avoidCollisions
        collisionPadding={8}
        className={cn(
          'z-999 min-w-32 rounded-lg border border-[#e0e6ed] dark:border-[#191e3a] bg-white dark:bg-[#1b2e4b] p-3 text-[#0e1726] dark:text-white-dark shadow-lg outline-none',
          // Prevent clipping on small screens / inside modals
          'max-h-(--radix-popover-content-available-height) max-w-(--radix-popover-content-available-width) overflow-auto',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
)
DropdownContent.displayName = PopoverPrimitive.Content.displayName

/** Optional header for dropdown (title + close). Modal-like feel. */
const DropdownHeader = ({ className, title, onClose, ...props }: React.HTMLAttributes<HTMLDivElement> & { title?: string; onClose?: () => void }) => (
  <div className={cn('flex flex-col space-y-1.5 pb-2 border-b border-[#e0e6ed] dark:border-[#191e3a]', className)} {...props}>
    {title != null && (
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium leading-none">{title}</span>
        {onClose != null && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none dark:ring-offset-[#1b2e4b]"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    )}
  </div>
)

export { Dropdown, DropdownAnchor, DropdownContent, DropdownHeader, DropdownTrigger }
