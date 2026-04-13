import type { OptionType } from '@/types/components.types'
import type { WeeklyMenuRecipeEntry } from '@/types/payload/weekly-menu.payload'
import { cn } from '@/lib/utils'
import { DragDropContext, Draggable, Droppable, type DraggableProvided, type DraggableRubric, type DraggableStateSnapshot, type DropResult } from '@hello-pangea/dnd'
import { ChefHat, GripVertical, Pencil, Search, X } from 'lucide-react'
import { Modal } from '@/components/core/PopupModal/Modal'
import { ErrorMessage } from '@hookform/error-message'
import * as React from 'react'
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form'

/* eslint-disable react-hooks/refs */
type ContainerId = 'available' | 'selected'
type DndHandle = Pick<DraggableProvided, 'innerRef' | 'draggableProps' | 'dragHandleProps'>

export type WeeklyMenuRecipeDualListRenderers = {
  renderAvailableRow?: (args: { id: string; label: string; isDragging: boolean } & DndHandle) => React.ReactNode
  renderSelectedRow?: (
    args: {
      entry: WeeklyMenuRecipeEntry
      title: string
      isDragging: boolean
      onEdit: () => void
      onRemove: () => void
    } & DndHandle,
  ) => React.ReactNode
  renderDragPreview?: (args: { label: string }) => React.ReactNode
}

const WEEK_DAYS = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
] as const

const PROFILE_ROWS: { key: keyof Pick<WeeklyMenuRecipeEntry, 'highProtein' | 'balanced' | 'vegetarian'>; label: string }[] = [
  { key: 'highProtein', label: 'High protein' },
  { key: 'balanced', label: 'Balanced' },
  { key: 'vegetarian', label: 'Vegetarian' },
]

/** Matches card / modal tokens used elsewhere in the app */
const sx = {
  panel: 'rounded-lg border border-[#e0e6ed] bg-white dark:border-[#1b2e4b] dark:bg-[#191e3a]',
  panelMuted: 'rounded-lg border border-[#e0e6ed] bg-white-light/30 dark:border-[#1b2e4b] dark:bg-[#121e32]/50',
  heading: 'text-sm font-semibold text-[#0e1726] dark:text-[#e2e8f0]',
  labelMuted: 'text-xs font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]',
  dayChip:
    'inline-flex mb-0 cursor-pointer items-center rounded-md border border-[#e0e6ed] bg-white px-3 py-2 text-sm text-[#0e1726] hover:bg-white-light/40 dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:text-[#e2e8f0] dark:hover:bg-[#181f32]',
  footerRule: 'border-t border-[#e0e6ed] pt-4 dark:border-[#1b2e4b]',
} as const

function emptyEntry(recipeId: string): WeeklyMenuRecipeEntry {
  return { recipeId, days: [], highProtein: false, balanced: false, vegetarian: false }
}

function menuItemsRules(label: string) {
  return {
    validate: {
      recipesRequired: (v: unknown) => (Array.isArray(v) && v.length > 0 ? true : `${label} is required`),
      serveDaysRequired: (v: unknown) => {
        if (!Array.isArray(v) || v.length === 0) return true
        const entries = v as WeeklyMenuRecipeEntry[]
        return entries.every((e) => Array.isArray(e.days) && e.days.length > 0) ? true : 'Serve on days is required for each recipe'
      },
    },
  }
}

function DragPreviewCard({ label }: { label: string }) {
  return (
    <div className="rounded-lg border-2 border-primary bg-primary/10 px-4 py-3 shadow-lg">
      <div className="flex items-center gap-2">
        <ChefHat className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <span className="text-sm font-semibold text-[#0e1726] dark:text-[#e2e8f0]">{label}</span>
      </div>
      <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">Adding to weekly menu…</p>
    </div>
  )
}

function AvailableRow({ label, isDragging, ...dnd }: { label: string; isDragging?: boolean } & DndHandle) {
  return (
    <div ref={dnd.innerRef} className={cn('card cursor-grab select-none', isDragging && 'opacity-60')} {...dnd.draggableProps} {...dnd.dragHandleProps}>
      <div className="card-body p-3">
        <div className="flex items-start gap-3">
          <GripVertical className="mt-0.5 shrink-0 text-gray-400" size={18} />
          <div className="min-w-0 flex-1 truncate text-sm font-semibold text-[#0e1726] dark:text-[#e2e8f0]" title={label}>
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

function SelectedRow({
  entry,
  title,
  onEdit,
  onRemove,
  isDragging,
  ...dnd
}: { entry: WeeklyMenuRecipeEntry; title: string; onEdit: () => void; onRemove: () => void; isDragging?: boolean } & DndHandle) {
  const dayLabels = WEEK_DAYS.filter((d) => entry.days.includes(d.key)).map((d) => d.label)
  const tags = [entry.highProtein && 'High protein', entry.balanced && 'Balanced', entry.vegetarian && 'Vegetarian'].filter(Boolean) as string[]

  return (
    <div ref={dnd.innerRef} className={cn('card relative cursor-grab select-none', isDragging && 'opacity-60')} {...dnd.draggableProps} {...dnd.dragHandleProps}>
      <button
        type="button"
        className="absolute right-2 top-2 z-10 rounded-md border border-[#e0e6ed] bg-white p-1 text-[#64748b] shadow-sm hover:bg-white-light/40 hover:text-[#0e1726] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:text-[#94a3b8] dark:hover:bg-[#181f32] dark:hover:text-[#e2e8f0]"
        aria-label="Edit recipe schedule"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onEdit()
        }}
      >
        <Pencil size={14} />
      </button>
      <div className="card-body p-3 pr-10">
        <div className="flex items-start gap-3">
          <GripVertical className="mt-0.5 shrink-0 text-gray-400" size={18} />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="truncate text-sm font-semibold text-[#0e1726] dark:text-[#e2e8f0]" title={title}>
              {title}
            </div>
            {dayLabels.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {dayLabels.map((d) => (
                  <span key={d} className="rounded bg-white-light/80 px-1.5 py-0.5 text-[10px] font-medium text-[#0e1726] dark:bg-[#1b2e4b] dark:text-[#e2e8f0]">
                    {d}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-fs-size-11 text-amber-700">No days selected — use Edit</p>
            )}
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-1 border-t border-[#e0e6ed] pt-2 dark:border-[#1b2e4b]">
                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <button type="button" className="mt-0.5 shrink-0 text-gray-400 hover:text-gray-700" aria-label="Remove" onMouseDown={(e) => e.stopPropagation()} onClick={onRemove}>
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

type ModalOpen = { open: true; mode: 'add' | 'edit'; index: number; draft: WeeklyMenuRecipeEntry }

function RecipeScheduleModal({
  state,
  recipeTitle,
  daysError,
  onClose,
  onSave,
  onToggleDay,
  onProfile,
}: {
  state: ModalOpen
  recipeTitle: string
  daysError: string | null
  onClose: () => void
  onSave: () => void
  onToggleDay: (key: string) => void
  onProfile: (k: (typeof PROFILE_ROWS)[number]['key'], checked: boolean) => void
}) {
  const { draft, mode } = state
  const title = mode === 'add' ? 'Add recipe to menu' : 'Edit recipe on menu'

  return (
    <Modal open onClose={onClose} title={title} className="modal-lg">
      <div className="flex flex-col gap-6">
        <div className={cn('px-4 py-3', sx.panelMuted)}>
          <p className={sx.labelMuted}>Recipe</p>
          <p className="text-base font-semibold text-[#0e1726] dark:text-[#e2e8f0]">{recipeTitle}</p>
        </div>

        <div>
          <p className={cn('mb-3', sx.heading)}>
            Serve on days <span className="text-danger">*</span>
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7" role="group" aria-describedby={daysError ? 'modal-days-error' : undefined}>
            {WEEK_DAYS.map((d) => (
              <label key={d.key} className={sx.dayChip}>
                <input
                  type="checkbox"
                  className="form-checkbox outline-primary shrink-0 h-4 w-4"
                  checked={draft.days.includes(d.key)}
                  onChange={() => onToggleDay(d.key)}
                />
                <span>{d.label}</span>
              </label>
            ))}
          </div>
          {daysError ? (
            <p id="modal-days-error" className="text-danger fs-12 mt-2 ms-0.5 capitalize" role="alert">
              {daysError}
            </p>
          ) : null}
        </div>

        <div>
          <p className={cn('mb-3', sx.heading)}>Meal profile</p>
          <div className={cn('space-x-2 space-y-2 p-4', sx.panel)}>
            {PROFILE_ROWS.map(({ key, label: lbl }) => (
              <label key={key} className={cn('inline-flex mb-0 cursor-pointer items-center text-sm text-[#0e1726] dark:text-[#e2e8f0]')}>
                <input
                  type="checkbox"
                  className="form-checkbox outline-primary shrink-0 h-4 w-4"
                  checked={!!draft[key]}
                  onChange={(e) => onProfile(key, e.target.checked)}
                />
                <span>{lbl}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={cn('flex justify-end gap-2', sx.footerRule)}>
          <button type="button" className="btn btn-sm btn-outline px-4" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-sm btn-primary px-4" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  )
}

export function WeeklyMenuRecipeDualList<TFieldValues extends FieldValues>({
  name,
  label = 'Recipes',
  options,
  className,
  renderers,
}: {
  name: Path<TFieldValues>
  label?: string
  options: OptionType[]
  className?: string
  renderers?: WeeklyMenuRecipeDualListRenderers
}) {
  const { control } = useFormContext<TFieldValues>()
  const rules = React.useMemo(() => menuItemsRules(label), [label])
  const { field } = useController({ control, name, rules })

  const value = (Array.isArray(field.value) ? field.value : []) as WeeklyMenuRecipeEntry[]
  const setValue = field.onChange

  const selectedSet = React.useMemo(() => new Set(value.map((e) => e.recipeId)), [value])
  const labelById = React.useMemo(() => new Map(options.map((o) => [String(o.value), String(o.label)])), [options])

  const availableItems = React.useMemo(() => options.map((o) => ({ id: String(o.value), label: String(o.label) })).filter((o) => !selectedSet.has(o.id)), [options, selectedSet])

  const [query, setQuery] = React.useState('')
  const filteredAvailable = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? availableItems.filter((i) => i.label.toLowerCase().includes(q)) : availableItems
  }, [availableItems, query])

  const [modal, setModal] = React.useState<{ open: false } | ModalOpen>({ open: false })
  const [daysError, setDaysError] = React.useState<string | null>(null)

  const closeModal = React.useCallback(() => {
    setDaysError(null)
    setModal({ open: false })
  }, [])

  const openAdd = React.useCallback((recipeId: string) => {
    setDaysError(null)
    setModal({ open: true, mode: 'add', index: -1, draft: emptyEntry(recipeId) })
  }, [])

  const openEdit = React.useCallback(
    (index: number) => {
      const row = value[index]
      if (!row) return
      setDaysError(null)
      setModal({ open: true, mode: 'edit', index, draft: { ...row, days: [...row.days] } })
    },
    [value],
  )

  const saveModal = React.useCallback(() => {
    if (!modal.open) return
    const { mode, index, draft } = modal
    if (!draft.days.length) {
      setDaysError('Serve on days is required')
      return
    }
    setDaysError(null)
    if (mode === 'add') setValue([...value, draft])
    else if (index >= 0) {
      const next = [...value]
      next[index] = draft
      setValue(next)
    }
    setModal({ open: false })
  }, [modal, setValue, value])

  const onDragEnd = React.useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result
      if (!destination) return
      const from = source.droppableId as ContainerId
      const to = destination.droppableId as ContainerId

      if (from === 'available' && to === 'selected') {
        if (!selectedSet.has(draggableId)) openAdd(draggableId)
        return
      }
      if (from === 'selected' && to === 'available') {
        setValue(value.filter((e) => e.recipeId !== draggableId))
        return
      }
      if (from === 'selected' && to === 'selected') {
        const next = [...value]
        const [moved] = next.splice(source.index, 1)
        next.splice(destination.index, 0, moved)
        setValue(next)
      }
    },
    [openAdd, selectedSet, setValue, value],
  )

  const toggleDay = React.useCallback((key: string) => {
    setModal((m) => {
      if (!m.open) return m
      const set = new Set(m.draft.days)
      if (set.has(key)) set.delete(key)
      else set.add(key)
      const days = Array.from(set)
      if (days.length > 0) setDaysError(null)
      return { ...m, draft: { ...m.draft, days } }
    })
  }, [])

  const onProfile = React.useCallback((k: (typeof PROFILE_ROWS)[number]['key'], checked: boolean) => {
    setModal((m) => (m.open ? { ...m, draft: { ...m.draft, [k]: checked } } : m))
  }, [])

  const cloneAvailable = React.useCallback(
    (provided: DraggableProvided, _snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => {
      const item = filteredAvailable[rubric.source.index]
      return (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="pointer-events-none">
          {item ? (renderers?.renderDragPreview ? renderers.renderDragPreview({ label: item.label }) : <DragPreviewCard label={item.label} />) : null}
        </div>
      )
    },
    [filteredAvailable, renderers],
  )

  const cloneSelected = React.useCallback(
    (provided: DraggableProvided, _snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => {
      const entry = value[rubric.source.index]
      const lbl = entry ? (labelById.get(entry.recipeId) ?? entry.recipeId) : ''
      return (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="pointer-events-none">
          {entry ? (renderers?.renderDragPreview ? renderers.renderDragPreview({ label: lbl }) : <DragPreviewCard label={lbl} />) : null}
        </div>
      )
    },
    [labelById, renderers, value],
  )

  return (
    <div className={cn('space-y-2', className)}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={sx.panel}>
            <div className="border-b border-[#e0e6ed] px-3 py-2 text-sm font-semibold dark:border-[#1b2e4b]">Available</div>
            <div className="px-3 py-2">
              <div className="flex items-center gap-2 rounded-md border border-[#e0e6ed] bg-white px-2 dark:border-[#1b2e4b] dark:bg-[#121e32]">
                <Search size={16} className="text-gray-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="h-9 w-full bg-transparent text-sm outline-none" />
              </div>
            </div>
            <Droppable droppableId="available" renderClone={cloneAvailable}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="max-h-[320px] overflow-auto p-3 pt-0">
                  <div className="space-y-2">
                    {filteredAvailable.length ? (
                      filteredAvailable.map((i, index) => (
                        <Draggable key={i.id} draggableId={i.id} index={index}>
                          {(p, s) =>
                            renderers?.renderAvailableRow ? (
                              renderers.renderAvailableRow({
                                id: i.id,
                                label: i.label,
                                innerRef: p.innerRef,
                                draggableProps: p.draggableProps,
                                dragHandleProps: p.dragHandleProps,
                                isDragging: s.isDragging,
                              })
                            ) : (
                              <AvailableRow label={i.label} innerRef={p.innerRef} draggableProps={p.draggableProps} dragHandleProps={p.dragHandleProps} isDragging={s.isDragging} />
                            )
                          }
                        </Draggable>
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-gray-500">No items.</div>
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>

          <div className={sx.panel}>
            <div className="border-b border-[#e0e6ed] px-3 py-2 text-sm font-semibold dark:border-[#1b2e4b]">Selected</div>
            <Droppable droppableId="selected" renderClone={cloneSelected}>
              {(provided, snapshot) => (
                <div className="max-h-[404px] overflow-auto p-3">
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      'space-y-2 rounded-md border border-dashed p-2 min-h-[380px]',
                      snapshot.isDraggingOver ? 'border-primary bg-primary/5' : 'border-[#e0e6ed] bg-white dark:border-[#1b2e4b] dark:bg-[#121e32]',
                    )}
                  >
                    {value.length ? (
                      value.map((entry, index) => (
                        <Draggable key={entry.recipeId} draggableId={entry.recipeId} index={index}>
                          {(p, s) =>
                            renderers?.renderSelectedRow ? (
                              renderers.renderSelectedRow({
                                entry,
                                title: labelById.get(entry.recipeId) ?? entry.recipeId,
                                innerRef: p.innerRef,
                                draggableProps: p.draggableProps,
                                dragHandleProps: p.dragHandleProps,
                                isDragging: s.isDragging,
                                onEdit: () => openEdit(index),
                                onRemove: () => setValue(value.filter((e) => e.recipeId !== entry.recipeId)),
                              })
                            ) : (
                              <SelectedRow
                                entry={entry}
                                title={labelById.get(entry.recipeId) ?? entry.recipeId}
                                innerRef={p.innerRef}
                                draggableProps={p.draggableProps}
                                dragHandleProps={p.dragHandleProps}
                                isDragging={s.isDragging}
                                onEdit={() => openEdit(index)}
                                onRemove={() => setValue(value.filter((e) => e.recipeId !== entry.recipeId))}
                              />
                            )
                          }
                        </Draggable>
                      ))
                    ) : (
                      <div className="flex min-h-[360px] items-center justify-center px-2 text-center text-xs text-gray-500">Drag recipes here, then set days and profile in the modal.</div>
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {modal.open ? (
        <RecipeScheduleModal
          state={modal}
          recipeTitle={labelById.get(modal.draft.recipeId) ?? modal.draft.recipeId}
          daysError={daysError}
          onClose={closeModal}
          onSave={saveModal}
          onToggleDay={toggleDay}
          onProfile={onProfile}
        />
      ) : null}
    </div>
  )
}

export function WeeklyMenuRecipesField<TFieldValues extends FieldValues>({ name, label = 'Recipes', options }: { name: Path<TFieldValues>; label?: string; options: OptionType[] }) {
  const { formState } = useFormContext<TFieldValues>()
  return (
    <div className="w-full">
      <label className="mb-1 block">{label}</label>
      <WeeklyMenuRecipeDualList<TFieldValues> name={name} label={label} options={options} />
      <ErrorMessage
        errors={formState.errors}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={name as any}
        render={({ message }: { message: string }) => <p className="text-danger fs-12 mt-1 ms-1 capitalize">{message}</p>}
      />
    </div>
  )
}
