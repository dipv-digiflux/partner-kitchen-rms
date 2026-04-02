'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayPicker, type DayButton } from 'react-day-picker'

import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, components, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-white p-3 [--cell:28px]',
        '[&_table]:block [&_thead]:block [&_tbody]:block',
        '[&_table]:w-auto! [&_table]:border-separate! [&_table]:border-spacing-0!',
        '[&_tr]:border-0! [&_tr]:border-none! [&_tr]:bg-transparent!',
        '[&_td]:p-0! [&_td]:border-0! [&_td]:text-center!',
        '[&_th]:p-0! [&_th]:border-0! [&_th]:bg-transparent!',
        '[&_thead_tr]:bg-transparent!',
        className,
      )}
      classNames={{
        root: 'w-fit',
        months: 'relative flex flex-col gap-4 md:flex-row',
        month: 'flex flex-col gap-3',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
        button_previous: 'inline-flex items-center justify-center size-(--cell) rounded-md p-0 hover:bg-[#f3f4f6] transition-colors',
        button_next: 'inline-flex items-center justify-center size-(--cell) rounded-md p-0 hover:bg-[#f3f4f6] transition-colors',
        month_caption: 'flex h-(--cell) items-center justify-center',
        caption_label: 'text-sm font-medium',
        weekdays: 'flex',
        weekday: 'm-0 box-border w-(--cell) h-(--cell) p-0 inline-flex items-center justify-center text-xs font-normal text-[#6b7280] bg-transparent',
        week: 'mt-0.5 flex',
        day: 'relative box-border m-0 h-(--cell) w-(--cell) p-0 text-center',
        range_start: 'bg-[#101610]/10 rounded-l-md',
        range_middle: 'bg-[#101610]/10',
        range_end: 'bg-[#101610]/10 rounded-r-md',
        today: 'bg-[#101610]/10 rounded-md',
        outside: 'text-[#6b7280]/40',
        disabled: 'text-[#6b7280]/40 pointer-events-none',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => (orientation === 'left' ? <ChevronLeftIcon className="size-4" /> : <ChevronRightIcon className="size-4" />),
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

function CalendarDayButton({ className, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isStart = modifiers.range_start
  const isEnd = modifiers.range_end
  const isMid = modifiers.range_middle
  const isSingle = modifiers.selected && !isStart && !isEnd && !isMid

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex h-(--cell) w-(--cell) items-center justify-center rounded-md text-[13px] font-normal transition-colors',
        'hover:bg-[#f3f4f6]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101610]/30',
        isSingle && 'bg-[#101610] text-white! hover:bg-[#101610]/90',
        isStart && 'bg-[#101610] text-white! hover:bg-[#101610]/90',
        isEnd && 'bg-[#101610] text-white! hover:bg-[#101610]/90',
        isMid && 'rounded-none bg-transparent hover:bg-[#101610]/10',
        modifiers.outside && 'text-[#6b7280]/40',
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
