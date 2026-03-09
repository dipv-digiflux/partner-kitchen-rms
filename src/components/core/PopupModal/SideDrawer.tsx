import { cn } from '@/lib/utils/utils'
import type { ModalProps } from '@/types/components.types'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export const SideDrawer = ({ open, onClose, children, title, className, footer }: ModalProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="modal-backdrop" />
      <DialogPrimitive.Content className={cn('drawer', className)} onInteractOutside={(e) => e.preventDefault()}>
        <div className="card flex h-full flex-col">
          <div className="card-header flex-shrink-0">
            <DialogPrimitive.Title asChild>
              <h2 className="capitalize text-base font-semibold tracking-tight">{title}</h2>
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">{title} contents</DialogPrimitive.Description>
            <DialogPrimitive.Close asChild>
              <button type="button" className="close-btn" aria-label="Close drawer">
                <X size={18} strokeWidth={2} aria-hidden />
              </button>
            </DialogPrimitive.Close>
          </div>
          <div className="card-body overflow-auto flex-1">{children}</div>
          {footer ? <div className="card-footer shrink-0 border-t bg-white dark:bg-[#191e3a] border-[#e0e6ed] dark:border-[#1b2e4b] px-5 py-4 mt-auto">{footer}</div> : null}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)
