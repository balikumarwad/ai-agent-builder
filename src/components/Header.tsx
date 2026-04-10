import { SessionTimer } from '../SessionTimer'
import { Sparkles, Moon, Sun } from 'lucide-react'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const isDark = theme === 'dark'

  return (
    <header className="relative pb-8 mb-8 text-center">
      <button
        type="button"
        onClick={onToggleTheme}
        className={
          isDark
            ? 'absolute right-4 top-4 inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:bg-slate-800 active:scale-95 sm:right-8 sm:top-8'
            : 'absolute right-4 top-4 inline-flex items-center gap-2 rounded-3xl bg-slate-200/90 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:bg-slate-300 active:scale-95 sm:right-8 sm:top-8'
        }
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {isDark ? 'Switch to Light' : 'Switch to Dark'}
      </button>

      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Sparkles className={isDark ? 'w-8 h-8 text-indigo-400' : 'w-8 h-8 text-slate-700'} />
          <h1 className={isDark ? 'text-4xl font-bold text-slate-100' : 'text-4xl font-bold text-slate-950'}>AI Agent Builder</h1>
        </div>

        <p className={isDark ? 'text-lg text-slate-400 mb-6' : 'text-lg text-slate-600 mb-6'}>
          Design your custom AI personality and capability set.
        </p>

        <div className="flex justify-center">
          <SessionTimer />
        </div>
      </div>
    </header>
  )
}
