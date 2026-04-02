import { useMemo } from 'react'
import ReactSelect, { StylesConfig, GroupBase } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { OptionType, SelectProps } from '@/types/components.types'

export const Select = ({ value, onChange, options, onBlur, placeholder, isCreatable, ...atr }: SelectProps & { isCreatable?: boolean }) => {
  const SelectComponent = isCreatable ? CreatableSelect : ReactSelect

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
    const value = option ? (Array.isArray(option) ? option.map((item: OptionType) => item.value) : (option as OptionType).value) : ''
    onChange(value)
  }

  return (
    <SelectComponent
      isClearable
      menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
      styles={customStyles}
      placeholder={placeholder}
      value={Array.isArray(value) ? value.map((item) => optionsObject[item] || { label: item, value: item }) : optionsObject[value] || (value ? { label: value, value } : null)}
      onChange={handleOnchange}
      options={options}
      onBlur={onBlur}
      {...(atr as Record<string, unknown>)}
    />
  )
}

const customStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
  control: (provided, state) => {
    // Extract base tailwind-like logic from props if provided via className
    const atr = state.selectProps as unknown as SelectProps & { isCreatable?: boolean; className?: string }
    const isMinimal = typeof atr.className === 'string' && (atr.className.includes('border-0') || atr.className.includes('border-none'))

    return {
      ...provided,
      backgroundColor: 'transparent',
      borderWidth: isMinimal ? '0px' : '1px',
      borderColor: state.isFocused ? '#101610' : 'var(--color-border-gray-00000014, #e5e7eb)',
      borderRadius: '0.375rem',
      minHeight: '38px',
      boxShadow: 'none',
      outline: 'none',
      width: '100%',
      fontSize: '0.875rem',
      fontWeight: '600',
      paddingLeft: '0.75rem',
      '&:hover': {
        borderColor: state.isFocused ? '#101610' : 'var(--color-border-gray-00000014, #e5e7eb)',
      },
    }
  },
  menu: (provided) => ({
    ...provided,
    zIndex: 99990,
    border: '1px solid var(--color-border-gray-00000014, #e5e7eb)',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#101610' : state.isFocused ? '#f3f4f6' : 'white',
    color: state.isSelected ? 'white' : 'black',
    fontWeight: '500',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#101610',
      color: 'white',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    fontWeight: '600',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
    fontWeight: '400',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    paddingLeft: '2px',
    paddingRight: '6px',
    color: '#9ca3af',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    paddingRight: '2px',
    color: '#9ca3af',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menuPortal: (base) => ({ ...base, zIndex: 99990 }),
}
