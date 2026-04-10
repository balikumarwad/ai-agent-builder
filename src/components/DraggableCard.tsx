import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Sparkles, Layers } from 'lucide-react'

interface DraggableCardProps {
  id: string
  name: string
  category?: string
  description?: string
  type?: 'skill' | 'layer'
  theme?: 'dark' | 'light'
}

export function DraggableCard({ id, name, category, description, type, theme = 'dark' }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      type: type || 'skill',
      id,
      name,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  const Icon = type === 'layer' ? Layers : Sparkles

  const isDark = theme === 'dark'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative flex flex-col p-2 space-y-2 rounded-2xl cursor-grab active:cursor-grabbing transition-all duration-200 group ${isDragging ? 'opacity-40' : 'opacity-100'} ${isDark ? 'bg-slate-900/80 border border-slate-800/70 hover:border-cyan-400 hover:bg-slate-800/70 shadow-[0_12px_30px_-18px_rgba(56,189,248,0.18)]' : 'bg-white/90 border border-slate-200 hover:border-sky-300 hover:bg-slate-100 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.06)]'}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${isDark ? 'bg-slate-950/70 text-cyan-300 border-slate-800/70' : 'bg-slate-200 text-sky-500 border-slate-200'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className={isDark ? 'font-semibold text-slate-100 text-sm' : 'font-semibold text-slate-950 text-sm'}>{name}</p>
            <p className={isDark ? 'text-[10px] text-slate-400 uppercase tracking-[0.25em]' : 'text-[10px] text-slate-500 uppercase tracking-[0.25em]'}>{category}</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-slate-700 text-xs">
          {type}
        </span>
      </div>
      <p className="text-xs text-slate-400 line-clamp-2">{description}</p>

      <div className={`absolute top-1/2 -left-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        <GripVertical className="w-3 h-3" />
      </div>
    </div>
  )
}
