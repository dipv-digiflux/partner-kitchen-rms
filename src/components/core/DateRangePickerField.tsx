'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'
import { Dropdown, DropdownContent, DropdownTrigger } from '@/components/ui/dropdown'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/lib/hooks/useIsMobile.hook'

function parseDateOnly(value: string): Date | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!m) return undefined
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return isNaN(d.getTime()) ? undefined : d
}

function toDateOnly(date?: Date): string {
  return date ? format(date, 'yyyy-MM-dd') : ''
}

export type DateRangeValue = { from?: string; to?: string }

export type DateRangePickerFieldProps = {
  value?: DateRangeValue
  onChange: (next: DateRangeValue) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateRangePickerField({ value, onChange, placeholder = 'Pick a date range', className, disabled }: DateRangePickerFieldProps) {
  const from = value?.from ? parseDateOnly(value.from) : undefined
  const to = value?.to ? parseDateOnly(value.to) : undefined
  const selected: DateRange | undefined = from ? { from, to } : undefined
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()

  const label = from && to ? `${format(from, 'LLL dd, y')} - ${format(to, 'LLL dd, y')}` : from ? format(from, 'LLL dd, y') : placeholder

  const triggerBtn = (
    <button type="button" disabled={disabled} className={cn('btn btn-outline w-full justify-start text-left font-normal h-9 px-3', !from && 'text-muted-foreground', className)}>
      <CalendarIcon className="mr-2 size-4 shrink-0 opacity-60" />
      <span className="truncate text-sm">{label}</span>
    </button>
  )

  const calendarContent = (
    <Calendar
      mode="range"
      numberOfMonths={isMobile ? 1 : 2}
      selected={selected}
      onSelect={(range) =>
        onChange({
          from: toDateOnly(range?.from),
          to: toDateOnly(range?.to),
        })
      }
      defaultMonth={from}
      classNames={{
        range_start: 'bg-[#101610]/10 rounded-l-md',
        range_middle: 'bg-[#101610]/10',
        range_end: 'bg-[#101610]/10 rounded-r-md',
        today: 'bg-[#101610]/10 rounded-md',
      }}
      {...(isMobile && {
        className: 'w-full [--cell:40px] [&_td>button]:w-full!',
        classNames: {
          root: 'w-full',
          months: 'relative flex flex-col gap-4',
          month: 'flex flex-col gap-3 w-full',
          nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
          weekdays: 'flex w-full',
          weekday: 'm-0 box-border flex-1 h-(--cell) p-0 inline-flex items-center justify-center text-xs font-normal text-muted-foreground bg-transparent',
          week: 'mt-0.5 flex w-full',
          day: 'relative box-border m-0 h-(--cell) flex-1 p-0 text-center',
          range_start: 'bg-[#101610]/10 rounded-l-md',
          range_middle: 'bg-[#101610]/10',
          range_end: 'bg-[#101610]/10 rounded-r-md',
          today: 'bg-[#101610]/10 rounded-md',
        },
      })}
    />
  )

  const footerButtons = (
    <div className="flex items-center justify-end gap-2 border-t border-border px-3 py-2">
      <button
        type="button"
        className="btn btn-sm px-4 py-1.5"
        onClick={() => {
          onChange({ from: '', to: '' })
          setOpen(false)
        }}
      >
        Clear
      </button>
      <button type="button" className="btn btn-primary btn-sm px-4 py-1.5" onClick={() => setOpen(false)}>
        Done
      </button>
    </div>
  )

  if (isMobile) {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>{triggerBtn}</DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[9999] bg-black/30" />
          <DialogPrimitive.Content className="fixed inset-x-0 bottom-0 z-[10000] flex max-h-[85vh] flex-col rounded-t-2xl bg-background shadow-2xl outline-none">
            <DialogPrimitive.Title className="sr-only">Select date range</DialogPrimitive.Title>
            <div className="flex justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">{calendarContent}</div>
            {footerButtons}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>{triggerBtn}</DropdownTrigger>
      <DropdownContent className="w-auto p-0! min-w-0!" align="start" sideOffset={4}>
        {calendarContent}
        {footerButtons}
      </DropdownContent>
    </Dropdown>
  )
}
