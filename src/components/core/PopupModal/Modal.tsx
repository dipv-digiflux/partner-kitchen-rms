import { cn } from '@/lib/utils/utils'
import { ModalProps } from '@/types/components.types'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export const Modal = ({ open, onClose, children, title, className }: ModalProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="modal-backdrop" />
      <DialogPrimitive.Content className={cn('modal modal-md', className)} onInteractOutside={(e) => e.preventDefault()}>
        <div className="card flex flex-col h-full">
          <div className="card-header flex-shrink-0">
            <DialogPrimitive.Title asChild>
              <h2 className="capitalize text-base font-semibold tracking-tight">{title}</h2>
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <button type="button" className="close-btn" aria-label="Close modal">
                <X size={18} strokeWidth={2} aria-hidden />
              </button>
            </DialogPrimitive.Close>
          </div>
          <div className="card-body overflow-auto flex-1">{children}</div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)
