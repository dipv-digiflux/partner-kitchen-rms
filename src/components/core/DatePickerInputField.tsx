'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Dropdown, DropdownContent, DropdownTrigger } from '@/components/ui/dropdown'

function parseDateString(value: string): Date | undefined {
  // If backend stores "YYYY-MM-DD", parse as *local* date to avoid timezone shifting.
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (dateOnlyMatch) {
    const y = Number(dateOnlyMatch[1])
    const m = Number(dateOnlyMatch[2])
    const d = Number(dateOnlyMatch[3])
    const local = new Date(y, m - 1, d)
    return isNaN(local.getTime()) ? undefined : local
  }

  const parsed = new Date(value)
  return isNaN(parsed.getTime()) ? undefined : parsed
}

/* ─── Single Date Picker ─── */

export interface DatePickerProps {
  value?: Date | string
  onChange?: (date?: Date) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ value, onChange, placeholder = 'Pick a date', className }: DatePickerProps) {
  const date = React.useMemo(() => {
    if (!value) return undefined
    if (typeof value === 'string') return parseDateString(value)
    return isNaN(value.getTime()) ? undefined : value
  }, [value])

  const [month, setMonth] = React.useState<Date | undefined>(date || new Date())

  React.useEffect(() => {
    if (date) setMonth(date)
  }, [date])

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button type="button" className={cn('btn btn-outline w-full justify-start text-left font-normal h-9 px-3', !date && 'text-muted-foreground', className)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : placeholder}
        </button>
      </DropdownTrigger>
      <DropdownContent className="w-max p-0" align="center" sideOffset={8}>
        <Calendar mode="single" selected={date} onSelect={onChange} month={month} onMonthChange={setMonth} initialFocus />
      </DropdownContent>
    </Dropdown>
  )
}

/* ─── Date Range Picker (dual picker in one) ─── */

export interface DateRangePickerProps {
  startDate?: Date | string
  endDate?: Date | string
  onStartDateChange?: (date?: Date) => void
  onEndDateChange?: (date?: Date) => void
  startPlaceholder?: string
  endPlaceholder?: string
  className?: string
  disabled?: boolean
}

function parseDate(value?: Date | string): Date | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return parseDateString(value)
  return isNaN(value.getTime()) ? undefined : value
}

export function DateRangePicker({
  startDate: startProp,
  endDate: endProp,
  onStartDateChange,
  onEndDateChange,
  startPlaceholder = 'Start Date',
  endPlaceholder = 'End Date',
  className,
  disabled,
}: DateRangePickerProps) {
  const start = React.useMemo(() => parseDate(startProp), [startProp])
  const end = React.useMemo(() => parseDate(endProp), [endProp])
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date>(start || new Date())

  React.useEffect(() => {
    if (start) setMonth(start)
  }, [start])

  // Use react-day-picker's native DateRange type
  const selected = React.useMemo(() => {
    if (!start) return undefined
    return { from: start, to: end }
  }, [start, end])

  const handleRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range) {
      onStartDateChange?.(undefined)
      onEndDateChange?.(undefined)
      return
    }
    onStartDateChange?.(range.from)
    onEndDateChange?.(range.to)
    if (range.from && range.to) setOpen(false)
  }

  const label =
    start && end ? `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}` : start ? `${format(start, 'MMM d, yyyy')} - ${endPlaceholder}` : `${startPlaceholder} - ${endPlaceholder}`

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <button type="button" disabled={disabled} className={cn('btn btn-outline w-full justify-start text-left font-normal h-9 px-3', !start && !end && 'text-muted-foreground', className)}>
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{label}</span>
        </button>
      </DropdownTrigger>
      <DropdownContent className="w-max p-2" align="center" sideOffset={8}>
        <Calendar mode="range" numberOfMonths={2} selected={selected} onSelect={handleRangeSelect} month={month} onMonthChange={setMonth} initialFocus />
        <div className="mt-2 flex items-center justify-end gap-2 px-1">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => {
              onStartDateChange?.(undefined)
              onEndDateChange?.(undefined)
              setOpen(false)
            }}
          >
            Clear
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
            Done
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  )
}
