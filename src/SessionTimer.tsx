import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export function SessionTimer() {
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
      <Clock className="w-4 h-4 text-slate-400" />
      <span className="text-sm text-slate-300 font-mono">
        {formatTime(sessionTime)}
      </span>
    </div>
  )
}
