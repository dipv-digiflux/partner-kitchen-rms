import type { ButtonClassOptions, ButtonSize } from '@/types/components.types'

const SIZE_CLASS_MAP: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

/**
 * Builds the CSS class string for a Button based on its variant, size,
 * and modifier options. Uses the design-token-driven `@utility btn-*`
 * classes defined in `button.css`.
 */
export function getButtonClasses(options: ButtonClassOptions): string {
  const variantClass = options.outline ? `btn-outline btn-${options.variant}` : `btn-${options.variant}`
  const sizeClass = SIZE_CLASS_MAP[options.size]
  const roundedClass = options.rounded ? 'rounded-full' : ''
  const iconOnlyClass = options.iconOnly ? 'w-10 h-10 p-0 flex items-center justify-center' : ''

  return [variantClass, sizeClass, roundedClass, iconOnlyClass].filter(Boolean).join(' ')
}
