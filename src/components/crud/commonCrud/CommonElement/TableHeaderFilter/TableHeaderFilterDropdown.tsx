import { Select } from '@/components/core/SelectInputField/Select'
import type { HeaderFilterConfig, HeaderFilterCustomProps } from './types'
import { isCustomConfig, isSelectConfig } from './types'

const MAX_OPTIONS_FOR_NATIVE_SELECT = 5

interface TableHeaderFilterDropdownProps {
  config: HeaderFilterConfig
  value: string | number
  onChange: (value: string | number) => void
  disabled?: boolean
  onClose?: () => void
}

/** Renders the filter control: native select (≤5 options), React Select (>5), or custom component. */
export function TableHeaderFilterDropdown({ config, value, onChange, disabled }: TableHeaderFilterDropdownProps) {
  if (isSelectConfig(config)) {
    const options = config.options
    const Native = options.length <= MAX_OPTIONS_FOR_NATIVE_SELECT

    if (Native) {
      return (
        <select
          className="form-select form-select-sm w-full text-sm min-w-[120px]"
          value={String(value)}
          onChange={(e) => onChange(e.target.value === '' ? '' : e.target.value)}
          disabled={disabled}
          autoFocus
        >
          {options.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    }

    return (
      <div className="min-w-[160px]">
        <Select value={value} onChange={(v) => onChange(v as string | number)} options={options} placeholder={config.placeholder ?? 'Select...'} disabled={disabled} />
      </div>
    )
  }

  if (isCustomConfig(config)) {
    const CustomComponent = config.component
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { component: _component, type: _type, ...restProps } = config
    const customProps: HeaderFilterCustomProps = {
      value,
      onChange: (v) => onChange(Array.isArray(v) ? ((v[0] as string | number) ?? '') : v),
      disabled,
      ...restProps,
    }
    return <CustomComponent {...customProps} />
  }

  return null
}
