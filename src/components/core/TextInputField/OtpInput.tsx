import { OtpInputProps } from '@/types/form.types'
import React, { useRef, useState } from 'react'

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value = '', onChange }) => {
  // Initialize state from props
  const [otp, setOtp] = useState<string[]>(() => {
    const initialOtp = value.split('').slice(0, length)
    while (initialOtp.length < length) initialOtp.push('')
    return initialOtp
  })
  const [prevValue, setPrevValue] = useState(value)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Derived state: Update internal state if prop changes
  // This runs during render, not effect, avoiding the "setState in effect" warning
  // and ensuring the UI is consistent in the same pass.
  if (value !== prevValue) {
    setPrevValue(value)
    const newOtp = value.split('').slice(0, length)
    while (newOtp.length < length) newOtp.push('')
    setOtp(newOtp)
  }

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)
    onChange(newOtp.join(''))

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, i) => {
      if (i < length) newOtp[i] = char
    })
    setOtp(newOtp)
    onChange(newOtp.join(''))

    // Focus the last filled input or the first empty one
    const nextFocusIndex = Math.min(pastedData.length, length - 1)
    inputRefs.current[nextFocusIndex]?.focus()
  }

  return (
    <div className="flex gap-3">
      {otp.map((data, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            maxLength={1}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`w-12 h-14 border rounded-lg text-center fs-20 font-medium focus:outline-none transition-all
              ${data ? 'border-text-primary-default text-text-primary-default' : 'border-border-gray-200 bg-surface-secondary-default'}
              focus:border-text-primary-default focus:ring-1 focus:ring-text-primary-default
            `}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export default OtpInput
