import { useMemo } from 'react'
import ReactSelect, { StylesConfig, GroupBase } from 'react-select'
import { OptionType, SelectProps } from '@/types/components.types'

export const Select = ({ value, onChange, options, onBlur, placeholder, ...atr }: SelectProps) => {
  const optionsObject = useMemo(() => {
    if (options && Array.isArray(options)) {
      return options.reduce((acc: Record<string | number, OptionType>, { label, value }: OptionType) => {
        acc[value] = { value, label }
        return acc
      }, {})
    }

    return {}
  }, [options])

  const handleOnchange = (option: unknown) => {
    const value = option ? (Array.isArray(option) ? option.map((item) => item.value) : (option as OptionType).value) : ''
    onChange(value)
  }

  return (
    <ReactSelect
      isClearable
      styles={customStyles}
      placeholder={placeholder}
      value={Array.isArray(value) ? value.map((item) => optionsObject[item]) : optionsObject[value]}
      onChange={handleOnchange}
      options={options}
      onBlur={onBlur}
      {...(atr as Record<string, unknown>)}
    />
  )
}

const customStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--theme-bg-color-body)',
    borderWidth: '1px',
    borderColor: 'var(--theme-border-color-input)', // border-input-border
    borderRadius: 'var(--radius-md)', // rounded-md
    color: 'var(--theme-text-color-body)', // text-body
    boxShadow: state.isFocused ? '0 0 0 2px color-mix(in oklab, var(--theme-input-focus-ring-color-theme) /* #d4d4d8 */ 30%, transparent)' : 'none', // ring-2 ring-input-ring/30
    width: '100%',
    fontSize: '13px',
    '&:hover': {
      borderColor: 'var(--theme-border-color-input)', // border-input-border
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--theme-text-color-body)', // text-body
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--theme-text-color-muted)', // placeholder:text-muted
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    paddingLeft: '3px',
    paddingRight: '8px',
    fontSize: '13px',
    color: 'var(--theme-text-color-muted)', // text-muted
  }),
  clearIndicator: (provided) => ({
    ...provided,
    paddingInline: '0px',
    paddingRight: '3px',
    fontSize: '13px',
    color: 'var(--theme-text-color-muted)', // text-muted
  }),
  menuPortal: (base) => ({ ...base, zIndex: 99990 }),
}
