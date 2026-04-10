import { SessionTimer } from '../SessionTimer'
import { Sparkles, Moon, Sun } from 'lucide-react'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const isDark = theme === 'dark'

  return (
    <header className="text-center py-8 mb-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-8 mb-4">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className={isDark ? 'w-8 h-8 text-indigo-400' : 'w-8 h-8 text-slate-700'} />
          <h1 className={isDark ? 'text-4xl font-bold text-slate-100' : 'text-4xl font-bold text-slate-950'}>AI Agent Builder</h1>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className={
            isDark
              ? 'inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800'
              : 'inline-flex items-center gap-2 rounded-3xl bg-slate-200/90 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-300'
          }
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </div>

      <p className={isDark ? 'text-lg text-slate-400 mb-6' : 'text-lg text-slate-600 mb-6'}>
        Design your custom AI personality and capability set.
      </p>
      <div className="flex justify-center">
        <SessionTimer />
      </div>
    </header>
  )
}
