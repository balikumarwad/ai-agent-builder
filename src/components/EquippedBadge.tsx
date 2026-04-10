import { Check } from 'lucide-react'

interface EquippedBadgeProps {
  count: number
}

export function EquippedBadge({ count }: EquippedBadgeProps) {
  if (count === 0) return null

  return (
    <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full border-2 border-slate-950 shadow-sm">
      <Check className="w-3 h-3" />
    </div>
  )
}