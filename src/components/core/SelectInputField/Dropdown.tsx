import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPopper, type Instance as PopperInstance, Placement } from '@popperjs/core'
import { DropdownProps, DropdownHandle } from '@/types/components.types'

const Dropdown = (props: DropdownProps, forwardedRef: React.Ref<DropdownHandle>) => {
  const [visibility, setVisibility] = useState<boolean>(false)

  const referenceRef = useRef<HTMLButtonElement>(null)
  const popperRef = useRef<HTMLDivElement>(null)
  const popperInstance = useRef<PopperInstance | null>(null)

  useEffect(() => {
    if (referenceRef.current && popperRef.current) {
      popperInstance.current = createPopper(referenceRef.current, popperRef.current, {
        placement: (props.placement as Placement) || 'bottom-end',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: props.offset || [0, 0],
            },
          },
        ],
      })
    }

    return () => {
      popperInstance.current?.destroy()
    }
  }, [props.placement, props.offset])

  useEffect(() => {
    if (visibility) {
      popperInstance.current?.update()
    }
  }, [visibility])

  const handleDocumentClick = (event: MouseEvent) => {
    if (referenceRef.current?.contains(event.target as Node) || popperRef.current?.contains(event.target as Node)) {
      return
    }

    setVisibility(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  useImperativeHandle(forwardedRef, () => ({
    close() {
      setVisibility(false)
    },
  }))

  return (
    <>
      <button ref={referenceRef} type="button" className={props.btnClassName} onClick={() => setVisibility(!visibility)}>
        {props.button}
      </button>

      <div ref={popperRef} className="z-50" style={{ visibility: visibility ? 'visible' : 'hidden' }} onClick={() => setVisibility(!visibility)}>
        {visibility ? props.children : null}
      </div>
    </>
  )
}

export default forwardRef(Dropdown)
