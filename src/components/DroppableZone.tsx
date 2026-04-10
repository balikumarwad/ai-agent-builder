import { useDroppable } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'

interface DroppableZoneProps {
  id: string
  children: ReactNode
  title?: string
  emptyMessage?: string
  theme?: 'dark' | 'light'
  isDropdownOpen?: boolean
  onAddClick?: () => void
  dropdownContent?: ReactNode
}

export function DroppableZone({
  id,
  children,
  title,
  emptyMessage,
  theme = 'dark',
  isDropdownOpen = false,
  onAddClick,
  dropdownContent,
}: DroppableZoneProps) {
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
      <div className="relative">
        {isDropdownOpen && dropdownContent && (
          <div
            className={isDark
              ? 'pointer-events-auto absolute left-0 top-[calc(100%+12px)] z-50 max-h-56 w-full overflow-y-auto rounded-2xl border border-slate-700/80 bg-slate-900/80 p-3 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
              : 'pointer-events-auto absolute left-0 top-[calc(100%+12px)] z-50 max-h-56 w-full overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xl shadow-slate-300/30 backdrop-blur-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
            }
          >
            {dropdownContent}
          </div>
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
              {onAddClick && (
                <button
                  type="button"
                  onClick={onAddClick}
                  className={isDark
                    ? 'w-full rounded-xl border border-slate-700/70 bg-slate-900/40 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800/50 hover:text-cyan-300'
                    : 'w-full rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-200 hover:text-sky-700'
                  }
                >
                  + Add more
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onAddClick}
              className={isDark
                ? 'flex h-full w-full flex-col items-center justify-center rounded-lg py-8 text-center text-slate-400 transition hover:bg-slate-800/50'
                : 'flex h-full w-full flex-col items-center justify-center rounded-lg py-8 text-center text-slate-500 transition hover:bg-slate-200/70'
              }
            >
              <Plus className={isDark ? 'w-8 h-8 text-slate-500 mb-2' : 'w-8 h-8 text-slate-400 mb-2'} />
              <p className={isDark ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
                {emptyMessage || 'Drop items here'}
              </p>
            </button>
          )}

          {isOver && (
            <div className="absolute inset-0 rounded-xl bg-indigo-500/5 pointer-events-none animate-pulse" />
          )}
        </div>
      </div>
    </div>
  )
}
