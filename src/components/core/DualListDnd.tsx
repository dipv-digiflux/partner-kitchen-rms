import type { OptionType } from '@/types/components.types'
import { cn } from '@/lib/utils'
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd'
import { GripVertical, Search, X } from 'lucide-react'
import * as React from 'react'

type ContainerId = 'available' | 'selected'

function RecipeCard({
  label,
  onRemove,
  dragHandleProps,
  draggableProps,
  innerRef,
  isDragging,
}: {
  label: string
  onRemove?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dragHandleProps?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  draggableProps?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: any
  isDragging?: boolean
}) {
  return (
    <div ref={innerRef} className={cn('card cursor-grab select-none', isDragging && 'opacity-70')} {...draggableProps} {...dragHandleProps}>
      <div className="card-body p-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-gray-400">
            <GripVertical size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-gray-900" title={label}>
              {label}
            </div>
          </div>

          {onRemove ? (
            <button type="button" className="text-gray-400 hover:text-gray-700 cursor-pointer" aria-label="Remove" onMouseDown={(e) => e.stopPropagation()} onClick={onRemove}>
              <X size={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function DualListDnd({ value, options, onChange, className }: { value: string[]; options: OptionType[]; onChange: (next: string[]) => void; className?: string }) {
  const selectedIds = React.useMemo(() => (Array.isArray(value) ? value.map(String).filter(Boolean) : []), [value])
  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds])

  const availableItems = React.useMemo(() => {
    return (options || []).map((o) => ({ id: String(o.value), label: String(o.label) })).filter((o) => !selectedSet.has(o.id))
  }, [options, selectedSet])

  const selectedItems = React.useMemo(() => {
    const map = new Map((options || []).map((o) => [String(o.value), String(o.label)]))
    return selectedIds.map((id) => ({ id, label: map.get(id) ?? id }))
  }, [options, selectedIds])

  const [query, setQuery] = React.useState('')
  const filteredAvailable = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return availableItems
    return availableItems.filter((i) => i.label.toLowerCase().includes(q))
  }, [availableItems, query])

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination) return

    const from = source.droppableId as ContainerId
    const to = destination.droppableId as ContainerId

    if (from === 'available' && to === 'selected') {
      if (selectedSet.has(draggableId)) return
      onChange([...selectedIds, draggableId])
      return
    }

    if (from === 'selected' && to === 'available') {
      onChange(selectedIds.filter((id) => id !== draggableId))
      return
    }

    if (from === 'selected' && to === 'selected') {
      const next = [...selectedIds]
      const [moved] = next.splice(source.index, 1)
      next.splice(destination.index, 0, moved)
      onChange(next)
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-white">
            <div className="border-b px-3 py-2 text-sm font-semibold">Available</div>
            <div className="px-3 py-2">
              <div className="flex items-center gap-2 rounded-md border bg-white px-2">
                <Search size={16} className="text-gray-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="h-9 w-full bg-transparent text-sm outline-none" />
              </div>
            </div>

            <Droppable droppableId="available">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="max-h-[320px] overflow-auto p-3 pt-0">
                  <div className="space-y-2">
                    {filteredAvailable.length ? (
                      filteredAvailable.map((i, index) => (
                        <Draggable key={i.id} draggableId={i.id} index={index}>
                          {(p, snapshot) => <RecipeCard label={i.label} innerRef={p.innerRef} draggableProps={p.draggableProps} dragHandleProps={p.dragHandleProps} isDragging={snapshot.isDragging} />}
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

          <div className="rounded-lg border bg-white">
            <div className="border-b px-3 py-2 text-sm font-semibold">Selected</div>
            <Droppable droppableId="selected">
              {(provided, snapshot) => (
                <div className="max-h-[404px] overflow-auto p-3">
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn('space-y-2 rounded-md border border-dashed p-2 min-h-[380px]', snapshot.isDraggingOver ? 'border-black bg-black/5' : 'border-gray-200 bg-white')}
                  >
                    {selectedItems.length ? (
                      selectedItems.map((i, index) => (
                        <Draggable key={i.id} draggableId={i.id} index={index}>
                          {(p, snap) => (
                            <RecipeCard
                              label={i.label}
                              innerRef={p.innerRef}
                              draggableProps={p.draggableProps}
                              dragHandleProps={p.dragHandleProps}
                              isDragging={snap.isDragging}
                              onRemove={() => onChange(selectedIds.filter((x) => x !== i.id))}
                            />
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="flex min-h-[360px] items-center justify-center text-center text-xs text-gray-500">Drop items here.</div>
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}
