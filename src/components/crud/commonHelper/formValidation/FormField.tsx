import { Select } from '@/components/core/SelectInputField/Select'
import { Input } from '@/components/core/TextInputField/Input'
import OtpInput from '@/components/core/TextInputField/OtpInput'
import { FileInput } from '@/components/core/FileInputField/FileInput'
import { DatePicker } from '@/components/core/DatePickerInputField'
import { DateRangePickerField } from '@/components/core/DateRangePickerField'
import { DualListDnd } from '@/components/core/DualListDnd'
import type { OptionType } from '@/types/components.types'
import { cn } from '@/lib/utils/utills'
import { FormElementProps, FormFieldProps, InputType } from '@/types/form.types'
import { ErrorMessage } from '@hookform/error-message'
import React, { useId } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { combineRules } from './formValidationHelper'

export const FormField = ({ name, type = 'text', label, errorName, rules, validateRule, options, ...atr }: FormFieldProps) => {
  const formContextApi = useFormContext()
  const {
    register,
    control,
    formState: { errors },
  } = formContextApi

  // mix user and react hook form rules
  const newRules = combineRules({ rules, validateRule: { formContextApi, type: type as InputType, name: errorName ?? (typeof label === 'string' ? label : name) ?? name, ...validateRule } })

  // for element props
  const inputId = useId()
  const FormElementProps: FormElementProps = {
    type,
    name,
    newRules,
    register,
    control,
    inputId,
    atr,
    options,
    required: validateRule?.required,
    placeholder: typeof label == 'string' || errorName ? `${type == 'select' ? 'Select' : type == 'daterange' ? '' : 'Enter'} ${label || errorName}`.trim() : undefined,
    validateRule,
  }

  return (
    <div className={cn('w-full', type === 'checkbox' && 'form-field--has-checkbox')}>
      <Label label={label} inputId={inputId} />
      <FormElement {...FormElementProps} />
      <ErrorMessage errors={errors} name={name} render={({ message }: { message: string }) => <p className="text-danger fs-12 mt-1 ms-1 capitalize">{message}</p>} />
    </div>
  )
}

/************* form element ***************/

const FormElement = ({ type, name, newRules, register, control, inputId, required, placeholder, atr, options, validateRule }: FormElementProps) => {
  const { trigger } = useFormContext()
  if (!type || !name) return null

  if (type == 'otp') {
    return <Controller name={name} control={control} rules={newRules} render={({ field: { onChange, value } }) => <OtpInput value={value} onChange={onChange} length={6} />} />
  }

  if (type == 'textarea') {
    return <textarea rows={4} {...register(name, newRules)} placeholder={placeholder} id={inputId} {...atr} className={cn('form-textarea', required && 'required-border', atr?.className)} />
  }

  if (type == 'file') {
    return (
      <Controller
        name={name}
        control={control}
        rules={newRules}
        render={({ field: { onChange, value } }) => (
          <FileInput
            value={value}
            onChange={onChange}
            multiple={atr?.multiple as boolean}
            accept={(atr?.accept as string) || (validateRule?.fileType ? validateRule.fileType.join(',') : undefined)}
            className={atr?.className as string}
            placeholder={(atr?.placeholder as string) ?? placeholder}
          />
        )}
      />
    )
  }

  if (type == 'select') {
    return (
      <Controller
        name={name}
        rules={newRules}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            {...({
              onChange: (val: string | number) => onChange(val),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onBlur: onBlur as any,
              value: value as string | number,
              placeholder,
              ...atr,
              options: options || [],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              className: cn(required && 'required-border rounded-md', (atr as any)?.className),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)}
            ref={ref}
          />
        )}
      />
    )
  }

  if (type == 'date') {
    return (
      <Controller
        name={name}
        rules={newRules}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            value={value as string | Date}
            onChange={(date) => onChange(date ? date.toISOString() : '')}
            placeholder={placeholder}
            className={cn(required && 'required-border rounded-md', atr?.className)}
          />
        )}
      />
    )
  }

  if (type == 'daterange') {
    const rangeRules = {
      ...newRules,
      validate: {
        ...(typeof newRules.validate === 'object' ? newRules.validate : {}),
        dateRangeRequired: (v: unknown) => {
          if (!required) return true
          const from = (v as { from?: string } | undefined)?.from
          const to = (v as { to?: string } | undefined)?.to
          return from && to ? true : `${(validateRule?.name || name).replace(/_/g, ' ').trim().toLocaleLowerCase() || name} is required`
        },
      },
    }

    return (
      <Controller
        name={name}
        control={control}
        rules={rangeRules}
        render={({ field: { value, onChange } }) => (
          <DateRangePickerField
            value={(value as { from?: string; to?: string } | undefined) || { from: '', to: '' }}
            onChange={(next) => {
              onChange({ from: next.from || '', to: next.to || '' })
              trigger(name)
            }}
            placeholder={placeholder || 'Pick a date range'}
            className={cn(required && 'required-border rounded-md', atr?.className)}
            disabled={atr?.disabled as boolean}
          />
        )}
      />
    )
  }

  if (type == 'duallistdnd') {
    return (
      <Controller
        name={name}
        rules={newRules}
        control={control}
        render={({ field: { value, onChange } }) => (
          <DualListDnd value={(Array.isArray(value) ? (value as string[]) : []) ?? []} options={(options as OptionType[]) || []} onChange={(next) => onChange(next)} />
        )}
      />
    )
  }

  if (type == 'checkbox') {
    const { className: atrClassName, ...restAtr } = (atr || {}) as React.HTMLAttributes<HTMLInputElement> & Record<string, unknown>
    return (
      <label className="w-12 h-6 relative mt-1.5 block">
        <input {...register(name, newRules)} type="checkbox" id={inputId} className={cn('custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer', atrClassName)} {...restAtr} />
        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300" />
      </label>
    )
  }

  return <Input {...register(name, newRules)} type={type} placeholder={placeholder} id={inputId} {...atr} className={cn('form-control', required && 'required-border', atr?.className)} />
}

/********  Label Component ********/
const Label = ({ label: LabelComponent, inputId }: { label: string | React.ComponentType<{ inputId: string }> | undefined; inputId: string }) => {
  if (!LabelComponent) return null

  if (typeof LabelComponent == 'string') {
    return (
      <label htmlFor={inputId} className="block">
        {LabelComponent}
      </label>
    )
  }

  return <LabelComponent inputId={inputId} />
}

/******** Optional rending component ********/
export const OptionalFormField = ({ children, name, value }: { children: React.ReactNode; name: string; value: unknown }) => {
  const { control } = useFormContext()
  const fieldValues = useWatch({ control, name })

  if (fieldValues) {
    if (Array.isArray(value) && value.includes(fieldValues)) {
      return children as React.ReactElement
    } else if (value == fieldValues) {
      return children as React.ReactElement
    }
  }

  return null
}
