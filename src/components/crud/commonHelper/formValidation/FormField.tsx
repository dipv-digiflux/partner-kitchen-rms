import { Select } from '@/components/core/SelectInputField/Select'
import { Input } from '@/components/core/TextInputField/Input'
import OtpInput from '@/components/core/TextInputField/OtpInput'
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
    placeholder: typeof label == 'string' || errorName ? `${type == 'select' ? 'Select' : 'Enter'} ${label || errorName}` : undefined,
  }

  return (
    <div className="w-full">
      <Label label={label} inputId={inputId} />
      <FormElement {...{ ...FormElementProps }} />
      <ErrorMessage errors={errors} name={name} render={({ message }: { message: string }) => <p className="text-danger fs-12 mt-1 ms-1">{message}</p>} />
    </div>
  )
}

/************* form element ***************/

const FormElement = ({ type, name, newRules, register, control, inputId, required, placeholder, atr, options }: FormElementProps) => {
  if (!type || !name) return null

  if (type == 'otp') {
    return <Controller name={name} control={control} rules={newRules} render={({ field: { onChange, value } }) => <OtpInput value={value} onChange={onChange} length={6} />} />
  }

  if (type == 'textarea') {
    return <textarea rows={4} {...register(name, newRules)} placeholder={placeholder} id={inputId} {...atr} className={cn('form-textarea', required && 'required-border', atr?.className)} />
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

  return (
    <Input
      {...register(name, newRules)}
      type={type}
      placeholder={placeholder}
      id={inputId}
      {...atr}
      className={cn('form-control', required && type !== 'checkbox' && 'required-border', type == 'checkbox' && 'form-switch', atr?.className)}
    />
  )
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
