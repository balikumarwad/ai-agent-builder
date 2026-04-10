import { useDroppable } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'

interface DroppableZoneProps {
  id: string
  children: ReactNode
  title?: string
  emptyMessage?: string
  theme?: 'dark' | 'light'
}

export function DroppableZone({ id, children, title, emptyMessage, theme = 'dark' }: DroppableZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  const hasChildren = Array.isArray(children) ? children.length > 0 : children

  const isDark = theme === 'dark'

  return (
    <div className="space-y-3">
      {title && (
        <h3 className={isDark ? 'text-sm font-semibold text-slate-300 uppercase tracking-wide' : 'text-sm font-semibold text-slate-700 uppercase tracking-wide'}>
          {title}
        </h3>
      )}
      <div
        ref={setNodeRef}
        className={`
          relative p-4 rounded-xl border-2 border-dashed transition-all duration-300 min-h-[120px]
          ${isOver
            ? isDark
              ? 'border-indigo-400 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
              : 'border-sky-400 bg-sky-500/10 shadow-lg shadow-sky-500/20'
            : isDark
              ? 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
              : 'border-slate-300 bg-slate-100/80 hover:border-slate-400'
          }
        `}
        data-testid={`droppable-${id}`}
      >
        {hasChildren ? (
          <div className="space-y-3">
            {children}
          </div>
        ) : (
          <div className={isDark ? 'flex flex-col items-center justify-center h-full text-center py-8 text-slate-400' : 'flex flex-col items-center justify-center h-full text-center py-8 text-slate-500'}>
            <Plus className={isDark ? 'w-8 h-8 text-slate-500 mb-2' : 'w-8 h-8 text-slate-400 mb-2'} />
            <p className={isDark ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
              {emptyMessage || 'Drop items here'}
            </p>
          </div>
        )}

        {isOver && (
          <div className="absolute inset-0 rounded-xl bg-indigo-500/5 pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  )
}
