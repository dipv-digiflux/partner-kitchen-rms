import { cn } from '@/lib/utils/utills'
import { ModalProps } from '@/types/components.types'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export const Modal = ({ open, onClose, children, title, className }: ModalProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={onClose}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="modal-backdrop" />
      <DialogPrimitive.Content className={cn('modal', className)} onInteractOutside={(e) => e.preventDefault()}>
        <div className="card flex flex-col h-full">
          {/* Header */}
          <div className="card-header flex-shrink-0">
            <h5 className="capitalize">{title}</h5>
            <button onClick={onClose} className="close-btn">
              <X size={14} />
            </button>
          </div>
          {/* Body */}
          <div className="card-body overflow-auto flex-1">{children}</div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
)
